import assert from "node:assert/strict";
import test from "node:test";
import catalogJson from "../src/data/generated/products.json";
import { CatalogSchema } from "../src/lib/catalog/schema";
import { filterProducts } from "../src/lib/catalog/filters";

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
