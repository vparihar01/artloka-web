import { readSheet } from "read-excel-file/node";

type SheetCell = string | number | boolean | Date | null;
import { google } from "googleapis";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { CatalogSchema, ProductSchema, type Product } from "../src/lib/catalog/schema";

const ROOT = process.cwd();
const LOCAL_SOURCE = path.join(ROOT, "data/source/ArtLoka_Product_Catalog_Full_ALK006-032.xlsx");
const OUTPUT = path.join(ROOT, "src/data/generated/products.json");
const SHEET_NAME = "Website Catalog";

function text(value: SheetCell | undefined): string {
  if (value === null || value === undefined) return "";
  return value instanceof Date ? value.toISOString() : String(value).trim();
}

function list(value: unknown): string[] {
  return String(value ?? "")
    .split(/[,;|]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function numberOrNull(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const cleaned = String(value ?? "").replace(/[^0-9.-]/g, "");
  if (!cleaned) return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function primaryCategory(title: string, style: string): string {
  const value = `${title} ${style}`.toLowerCase();
  if (/sconce|lamp|light|lighting|chandelier|pendant/.test(value)) return "Lighting";
  if (/wall decor|wall art|wall hanging|mirror/.test(value)) return "Wall Décor";
  if (/sculpture|figurine|statue|idol/.test(value)) return "Sculptures & Figurines";
  if (/gift|set|combo/.test(value)) return "Gifts & Sets";
  return "Decorative Objects";
}

function rowToRecord(header: string[], row: SheetCell[]): Record<string, string | number | boolean | Date | null> {
  const record: Record<string, string | number | boolean | Date | null> = {};
  header.forEach((name, index) => { record[name] = row[index] ?? null; });
  return record;
}

async function loadRows(): Promise<{ rows: SheetCell[][]; source: string }> {
  const fileId = process.env.GOOGLE_DRIVE_FILE_ID;
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (fileId && email && privateKey) {
    const auth = new google.auth.JWT({
      email,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"]
    });
    const drive = google.drive({ version: "v3", auth });
    const response = await drive.files.get({ fileId, alt: "media" }, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data as ArrayBuffer);
    return { rows: await readSheet(buffer, SHEET_NAME) as unknown as SheetCell[][], source: `google-drive:${fileId}` };
  }

  return { rows: await readSheet(LOCAL_SOURCE, SHEET_NAME) as unknown as SheetCell[][], source: path.relative(ROOT, LOCAL_SOURCE) };
}

async function main(): Promise<void> {
  const { rows, source } = await loadRows();
  if (!rows.length) throw new Error(`Worksheet ${SHEET_NAME} is empty.`);

  const header = rows[0].map((value) => text(value));
  const products: Product[] = [];
  const warnings: string[] = [];
  const seenSlugs = new Set<string>();
  const seenSkus = new Set<string>();

  rows.slice(1).forEach((row, index) => {
    const rowNumber = index + 2;
    const record = rowToRecord(header, row);
    const sku = text(record["SKU (ArtLoka)"] as SheetCell);
    if (!sku) return;

    const title = text((record["SEO Website Title"] || record["Original Etsy Title"] || sku) as SheetCell);
    let slug = slugify(`${title.replace(/\s*[–—|-]\s*ArtLoka\s*$/i, "")} ${sku}`);
    if (seenSlugs.has(slug)) slug = `${slug}-${rowNumber}`;

    const qaNotes = text(record["QA Notes / Flags"] as SheetCell);
    const status: Product["status"] = qaNotes ? "review" : "approved";
    const styleText = text(record["Style / Category"] as SheetCell);

    const candidate = {
      sku,
      slug,
      title,
      originalTitle: text(record["Original Etsy Title"] as SheetCell) || undefined,
      metaDescription: text(record["Meta Description (~160 char)"] as SheetCell) || undefined,
      description: text(record["Website Description (Full)"] as SheetCell),
      etsyUrl: text(record["Etsy URL"] as SheetCell),
      priceUsd: numberOrNull(record["Price (USD)"]),
      materials: list(record["Materials"]),
      dimensions: {
        widthIn: numberOrNull(record["Width (in)"]),
        heightIn: numberOrNull(record["Height (in)"]),
        depthIn: numberOrNull(record["Depth (in)"]),
        canopy: text(record["Canopy/Backplate Size"] as SheetCell) || undefined
      },
      finishes: list(record["Finish Options"]),
      bulbUs: text(record["Bulb / Socket (US)"] as SheetCell) || undefined,
      bulbInternational: text(record["Bulb / Socket (UK/EU)"] as SheetCell) || undefined,
      primaryCategory: primaryCategory(title, styleText),
      styles: list(styleText),
      rooms: list(record["Room Suitability"]),
      features: list(record["Special Features"]),
      handmadeNote: text(record["Handmade Note"] as SheetCell) || undefined,
      tags: list(record["Etsy Tags (comma-separated)"]),
      seoKeywords: list(record["Website SEO Keywords (comma-separated)"]),
      imageStatus: text(record["Image Status"] as SheetCell) || undefined,
      heroImage: "/images/product-placeholder.svg",
      galleryImages: [],
      qaNotes: qaNotes || undefined,
      status,
      featured: rowNumber <= 7,
      bestseller: false,
      sortOrder: rowNumber - 1
    };

    const parsed = ProductSchema.safeParse(candidate);
    if (!parsed.success) {
      warnings.push(`${sku}: ${parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ")}`);
      return;
    }
    if (seenSkus.has(parsed.data.sku)) {
      warnings.push(`${sku}: duplicate SKU skipped`);
      return;
    }
    seenSkus.add(parsed.data.sku);
    seenSlugs.add(parsed.data.slug);
    products.push(parsed.data);
  });

  const catalog = CatalogSchema.parse({ generatedAt: new Date().toISOString(), source, products, warnings });
  await mkdir(path.dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  console.log(`Catalogue generated: ${products.length} products, ${warnings.length} warnings`);
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
