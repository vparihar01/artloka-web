import catalogJson from "@/data/generated/products.json";
import { CatalogSchema, type Product } from "./schema";

const catalog = CatalogSchema.parse(catalogJson);

export function getAllProducts(options?: { includeReview?: boolean }): Product[] {
  const includeReview = options?.includeReview ?? process.env.CATALOG_MODE !== "strict";
  return catalog.products.filter((product) => {
    if (product.status === "archived" || product.status === "draft") return false;
    if (includeReview) return true;
    return product.status === "approved" || product.status === "published";
  });
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((product) => product.slug === slug);
}

export function getFeaturedProducts(limit = 6): Product[] {
  return getAllProducts().filter((product) => product.featured).slice(0, limit);
}

export function getProductsByCategory(category: string): Product[] {
  return getAllProducts().filter((product) => product.primaryCategory.toLowerCase() === category.toLowerCase());
}

export function getCatalogueMeta() {
  return {
    generatedAt: catalog.generatedAt,
    source: catalog.source,
    warnings: catalog.warnings
  };
}
