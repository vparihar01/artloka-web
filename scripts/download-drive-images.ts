import { loadEnvConfig } from "@next/env";
import { readSheet } from "read-excel-file/node";
import { google } from "googleapis";
import { createWriteStream, existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pipeline } from "node:stream/promises";

type SheetCell = string | number | boolean | Date | null;

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "data/source/ArtLoka_Website_Sync.xlsx");
const PUBLIC_PRODUCTS = path.join(ROOT, "public/assets/products");

function text(value: SheetCell | undefined): string {
  if (value === null || value === undefined) return "";
  return value instanceof Date ? value.toISOString() : String(value).trim();
}

function numberOrNull(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function safeFileSegment(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "product";
}

function rowToRecord(header: string[], row: SheetCell[]): Record<string, SheetCell> {
  const record: Record<string, SheetCell> = {};
  header.forEach((name, index) => { record[name] = row[index] ?? null; });
  return record;
}

function driveFileId(url: string): string | null {
  return url.match(/\/d\/([^/]+)/)?.[1] ?? url.match(/[?&]id=([^&]+)/)?.[1] ?? null;
}

function extensionForMimeType(mimeType: string): string {
  if (mimeType === "image/png") return ".png";
  if (mimeType === "image/webp") return ".webp";
  return ".jpg";
}

function redactedEmail(email: string): string {
  return email.replace(/^(.{4}).*(@.*)$/, "$1...$2");
}

function isDriveNotFoundError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const maybeError = error as { code?: number; status?: number; message?: string };
  return maybeError.code === 404 || maybeError.status === 404 || maybeError.message?.includes("File not found") === true;
}

async function main(): Promise<void> {
  loadEnvConfig(ROOT);

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !privateKey) {
    throw new Error("Google Drive image download requires GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY in .env.local.");
  }

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"]
  });
  const drive = google.drive({ version: "v3", auth });

  const rows = await readSheet(SOURCE, "Images") as unknown as SheetCell[][];
  const header = rows[0].map((value) => text(value));
  let downloaded = 0;
  let skipped = 0;

  for (const row of rows.slice(1)) {
    const record = rowToRecord(header, row);
    const listingStatus = text(record["Listing Status"]).toLowerCase();
    const approved = text(record["Approved"]).toLowerCase();
    if (listingStatus === "listed" || !["yes", "true", "approved", "1"].includes(approved)) {
      skipped += 1;
      continue;
    }

    const sku = text(record["SKU"]);
    const imageUrl = text(record["Image URL"]);
    const imageType = text(record["Image Type"]) || "Product";
    const sortOrder = numberOrNull(record["Sort Order"]) ?? downloaded + 1;
    const fileId = driveFileId(imageUrl);
    if (!sku || !fileId) {
      skipped += 1;
      continue;
    }

    let metadata;
    try {
      metadata = await drive.files.get({
        fileId,
        fields: "id,name,mimeType",
        supportsAllDrives: true
      });
    } catch (error) {
      if (isDriveNotFoundError(error)) {
        throw new Error([
          `Google Drive file is not visible to the service account for ${sku} image ${sortOrder}.`,
          `File ID: ${fileId}`,
          `Service account: ${redactedEmail(email)}`,
          "Share the source Drive image file or its parent folder with this service-account email as Viewer, then run npm run images:download again."
        ].join("\n"));
      }
      throw error;
    }
    const extension = extensionForMimeType(metadata.data.mimeType ?? "");
    const skuSegment = safeFileSegment(sku);
    const fileName = `${skuSegment}-${String(sortOrder).padStart(2, "0")}-${safeFileSegment(imageType)}${extension}`;
    const outputDir = path.join(PUBLIC_PRODUCTS, skuSegment);
    const outputPath = path.join(outputDir, fileName);
    if (existsSync(outputPath)) {
      skipped += 1;
      continue;
    }

    await mkdir(outputDir, { recursive: true });
    const response = await drive.files.get(
      { fileId, alt: "media", supportsAllDrives: true },
      { responseType: "stream" }
    );
    await pipeline(response.data, createWriteStream(outputPath));
    downloaded += 1;
    console.log(`Downloaded ${path.relative(ROOT, outputPath)}`);
  }

  console.log(`Drive image download complete: ${downloaded} downloaded, ${skipped} skipped.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
