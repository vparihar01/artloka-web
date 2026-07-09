import { readSheet } from "read-excel-file/node";
import { google } from "googleapis";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { CatalogSchema, ProductSchema, type Product } from "../src/lib/catalog/schema";

type SheetCell = string | number | boolean | Date | null;

const ROOT = process.cwd();
const LOCAL_SOURCE_CANDIDATES = [
  path.join(ROOT, "data/source/ArtLoka_Website_Sync.xlsx"),
  path.join(ROOT, "data/source/ArtLoka_Product_Catalog_Full_ALK006-032.xlsx")
];
const OUTPUT = path.join(ROOT, "src/data/generated/products.json");
const PUBLIC_PRODUCTS = path.join(ROOT, "public/assets/products");
const PRODUCT_SHEETS = ["Products", "Website Catalog"];
const IMAGES_SHEET = "Images";
const LOCAL_IMAGE_EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png"];

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

function normalizeStatus(value: unknown): string {
  return text(value as SheetCell).toLowerCase();
}

function shouldSkipProduct(record: Record<string, string | number | boolean | Date | null>): boolean {
  return normalizeStatus(record["Listing Status"]) === "done";
}

function shouldSkipImage(record: Record<string, string | number | boolean | Date | null>): boolean {
  return normalizeStatus(record["Listing Status"]) === "listed";
}

function parseAspectRatio(value: SheetCell | undefined): string | undefined {
  let raw = text(value);
  if (value instanceof Date) raw = `${value.getUTCHours()}:${value.getUTCMinutes()}`;
  const match = raw.match(/^(\d+(?:\.\d+)?)\s*[:/]\s*(\d+(?:\.\d+)?)$/);
  if (!match) return undefined;

  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return undefined;

  return `${width} / ${height}`;
}

async function loadExistingProducts(): Promise<Product[]> {
  if (!existsSync(OUTPUT)) return [];
  try {
    const existing = CatalogSchema.parse(JSON.parse(await readFile(OUTPUT, "utf8")));
    return existing.products;
  } catch {
    return [];
  }
}

function safeFileSegment(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "product";
}

function localImageUrl(sku: string, imageType: string, sortOrder: number): string | null {
  const skuSegment = safeFileSegment(sku);
  const typeSegment = safeFileSegment(imageType);
  const baseName = `${skuSegment}-${String(sortOrder).padStart(2, "0")}-${typeSegment}`;

  for (const extension of LOCAL_IMAGE_EXTENSIONS) {
    const absolutePath = path.join(PUBLIC_PRODUCTS, skuSegment, `${baseName}${extension}`);
    if (existsSync(absolutePath)) {
      return `/assets/products/${skuSegment}/${baseName}${extension}`;
    }
  }

  return null;
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

async function readFirstAvailableSheet(source: Buffer | string, sheetNames: string[]): Promise<{ rows: SheetCell[][]; sheetName: string }> {
  const errors: string[] = [];
  for (const sheetName of sheetNames) {
    try {
      return {
        rows: await readSheet(source, sheetName) as unknown as SheetCell[][],
        sheetName
      };
    } catch (error) {
      errors.push(`${sheetName}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  throw new Error(`Unable to read any product worksheet. Tried ${sheetNames.join(", ")}. ${errors.join(" | ")}`);
}

async function readOptionalSheet(source: Buffer | string, sheetName: string): Promise<SheetCell[][]> {
  try {
    return await readSheet(source, sheetName) as unknown as SheetCell[][];
  } catch {
    return [];
  }
}

async function loadRows(): Promise<{ rows: SheetCell[][]; imageRows: SheetCell[][]; source: string; productSheet: string }> {
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
    const productSheet = await readFirstAvailableSheet(buffer, PRODUCT_SHEETS);
    return {
      rows: productSheet.rows,
      imageRows: await readOptionalSheet(buffer, IMAGES_SHEET),
      source: `google-drive:${fileId}`,
      productSheet: productSheet.sheetName
    };
  }

  const localSource = LOCAL_SOURCE_CANDIDATES.find((candidate) => existsSync(candidate));
  if (!localSource) throw new Error(`No local catalogue source found. Tried ${LOCAL_SOURCE_CANDIDATES.map((candidate) => path.relative(ROOT, candidate)).join(", ")}.`);

  const productSheet = await readFirstAvailableSheet(localSource, PRODUCT_SHEETS);
  return {
    rows: productSheet.rows,
    imageRows: await readOptionalSheet(localSource, IMAGES_SHEET),
    source: path.relative(ROOT, localSource),
    productSheet: productSheet.sheetName
  };
}

async function main(): Promise<void> {
  const { rows, imageRows, source, productSheet } = await loadRows();
  if (!rows.length) throw new Error(`Worksheet ${productSheet} is empty.`);

  const header = rows[0].map((value) => text(value));
  const imageHeader = imageRows[0]?.map((value) => text(value)) ?? [];
  const imageWarnings: string[] = [];
  const imageAspectBySkuAndOrder = new Map<string, string>();
  const imagesBySku = new Map<string, Array<{ url: string; type: string; alt: string; sortOrder: number; aspectRatio?: string }>>();
  if (imageRows.length) {
    imageRows.slice(1).forEach((row, index) => {
      const record = rowToRecord(imageHeader, row);
      const sku = text(record["SKU"] as SheetCell);
      const sortOrder = numberOrNull(record["Sort Order"]) ?? index + 1;
      const aspectRatio = parseAspectRatio(record["Aspect Ratio"] as SheetCell);
      if (sku && aspectRatio) imageAspectBySkuAndOrder.set(`${sku}:${sortOrder}`, aspectRatio);
      if (shouldSkipImage(record)) return;
      const imageUrl = text(record["Image URL"] as SheetCell);
      const approved = text(record["Approved"] as SheetCell).toLowerCase();
      if (!sku || !imageUrl || !["yes", "true", "approved", "1"].includes(approved)) return;
      const type = text(record["Image Type"] as SheetCell) || "Product";
      const localUrl = localImageUrl(sku, type, sortOrder);
      if (!localUrl) {
        imageWarnings.push(`${sku}: approved image ${sortOrder} is not available in public/assets/products`);
        return;
      }
      const image = {
        url: localUrl,
        type,
        alt: text(record["Alt Text"] as SheetCell) || `${sku} product image`,
        sortOrder,
        aspectRatio
      };
      const images = imagesBySku.get(sku) ?? [];
      images.push(image);
      imagesBySku.set(sku, images);
    });
    for (const images of imagesBySku.values()) {
      images.sort((a, b) => a.sortOrder - b.sortOrder);
    }
  }

  const existingProducts = await loadExistingProducts();
  const existingBySku = new Map(existingProducts.map((product) => [product.sku, product]));
  const products: Product[] = [];
  const warnings: string[] = [...imageWarnings];
  const seenSlugs = new Set<string>();
  const seenSkus = new Set<string>();
  const doneSkus = new Set(
    rows.slice(1)
      .map((row) => rowToRecord(header, row))
      .filter((record) => shouldSkipProduct(record))
      .map((record) => text(record["SKU (ArtLoka)"] as SheetCell))
      .filter(Boolean)
  );

  for (const product of existingProducts) {
    if (!doneSkus.has(product.sku)) continue;
    const galleryImages = product.galleryImages.map((image) => ({
      ...image,
      aspectRatio: image.aspectRatio ?? imageAspectBySkuAndOrder.get(`${product.sku}:${image.sortOrder}`)
    }));
    const preservedProduct = {
      ...product,
      heroImageAlt: galleryImages[0]?.alt ?? product.heroImageAlt,
      galleryImages
    };
    seenSkus.add(preservedProduct.sku);
    seenSlugs.add(preservedProduct.slug);
    products.push(preservedProduct);
  }

  rows.slice(1).forEach((row, index) => {
    const rowNumber = index + 2;
    const record = rowToRecord(header, row);
    const sku = text(record["SKU (ArtLoka)"] as SheetCell);
    if (!sku) return;
    if (shouldSkipProduct(record)) {
      if (!existingBySku.has(sku)) warnings.push(`${sku}: Listing Status is Done but no existing generated product was found to preserve`);
      return;
    }

    const title = text((record["SEO Website Title"] || record["Original Etsy Title"] || sku) as SheetCell);
    let slug = slugify(`${title.replace(/\s*[–—|-]\s*ArtLoka\s*$/i, "")} ${sku}`);
    if (seenSlugs.has(slug)) slug = `${slug}-${rowNumber}`;

    const qaNotes = text(record["QA Notes / Flags"] as SheetCell);
    const status: Product["status"] = "approved";
    const styleText = text(record["Style / Category"] as SheetCell);
    const productImages = imagesBySku.get(sku) ?? [];
    if (!productImages.length) warnings.push(`${sku}: no approved images found`);

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
      heroImage: productImages[0]?.url ?? "/images/product-placeholder.svg",
      heroImageAlt: productImages[0]?.alt,
      galleryImages: productImages,
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
  console.log(`Catalogue generated from ${productSheet}: ${products.length} products, ${warnings.length} warnings`);
  warnings.forEach((warning) => console.warn(`- ${warning}`));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
