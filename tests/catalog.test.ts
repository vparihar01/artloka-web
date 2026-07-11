import assert from "node:assert/strict";
import test from "node:test";
import catalogJson from "../src/data/generated/products.json";
import { CatalogSchema } from "../src/lib/catalog/schema";
import { filterProducts } from "../src/lib/catalog/filters";
import { etsyUrlWithTracking, productMetadata } from "../src/lib/seo";
import { itemListSchema, productSchema } from "../src/lib/schema";

const catalog = CatalogSchema.parse(catalogJson);

test("catalog contains valid unique products", () => {
  assert.ok(catalog.products.length > 0);
  assert.equal(new Set(catalog.products.map((product) => product.sku)).size, catalog.products.length);
  assert.equal(new Set(catalog.products.map((product) => product.slug)).size, catalog.products.length);
});

test("all products link to Etsy over HTTPS", () => {
  for (const product of catalog.products) {
    const url = new URL(product.etsyUrl);
    assert.equal(url.protocol, "https:");
    assert.match(url.hostname, /(^|\.)etsy\.com$/);
  }
});

test("category filter returns only matching products", () => {
  const category = catalog.products[0]?.primaryCategory;
  assert.ok(category);
  const filtered = filterProducts(catalog.products, { category });
  assert.ok(filtered.length > 0);
  assert.ok(filtered.every((product) => product.primaryCategory === category));
});

test("query filter searches title and materials", () => {
  const first = catalog.products[0];
  assert.ok(first);
  const term = first.materials[0]?.split(" ")[0] ?? first.title.split(" ")[0];
  const filtered = filterProducts(catalog.products, { query: term });
  assert.ok(filtered.some((product) => product.sku === first.sku));
});

test("gallery image aspect ratios are valid CSS ratios", () => {
  const images = catalog.products.flatMap((product) => product.galleryImages);
  assert.ok(images.some((image) => image.aspectRatio));
  for (const image of images) {
    if (image.aspectRatio) assert.match(image.aspectRatio, /^\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?$/);
  }
});

test("product SEO uses a canonical URL and SKU-level Etsy attribution", () => {
  const product = catalog.products[0];
  assert.ok(product);
  const metadata = productMetadata(product);
  assert.equal(metadata.alternates?.canonical, `/shop/${product.slug}`);
  assert.ok(!String(metadata.title).match(/ArtLoka.*ArtLoka/i));

  const tracked = new URL(etsyUrlWithTracking(product.etsyUrl, product.sku));
  assert.equal(tracked.searchParams.get("utm_source"), "artloka.shop");
  assert.equal(tracked.searchParams.get("utm_medium"), "website");
  assert.equal(tracked.searchParams.get("utm_campaign"), "product_discovery");
  assert.equal(tracked.searchParams.get("utm_content"), product.sku.toLowerCase());
});

test("every public product can produce Product and Offer schema", () => {
  for (const product of catalog.products) {
    const schema = productSchema(product);
    assert.equal(schema["@type"], "Product");
    assert.equal(schema.sku, product.sku);
    assert.ok(Array.isArray(schema.image));
    if (product.priceUsd !== null) assert.equal((schema.offers as { "@type": string })["@type"], "Offer");
  }
});

test("product discovery lists do not create incomplete Product rich-result entities", () => {
  const list = itemListSchema(catalog.products.slice(0, 3).map((product) => ({
    name: product.title,
    path: `/shop/${product.slug}`
  })));
  assert.equal(list["@type"], "ItemList");
  const items = list.itemListElement as Array<{ "@type": string }>;
  assert.ok(items.every((item) => item["@type"] === "ListItem"));
});
