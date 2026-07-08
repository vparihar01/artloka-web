import type { Product } from "./schema";

export type ProductFilters = {
  query?: string;
  category?: string;
  room?: string;
  style?: string;
  material?: string;
};

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const query = filters.query?.trim().toLowerCase();
  return products.filter((product) => {
    if (filters.category && product.primaryCategory !== filters.category) return false;
    if (filters.room && !product.rooms.includes(filters.room)) return false;
    if (filters.style && !product.styles.includes(filters.style)) return false;
    if (filters.material && !product.materials.some((item) => item.toLowerCase().includes(filters.material!.toLowerCase()))) return false;
    if (!query) return true;
    const haystack = [product.title, product.description, product.primaryCategory, ...product.materials, ...product.styles, ...product.rooms]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });
}

export function uniqueValues(products: Product[], selector: (product: Product) => string[]): string[] {
  return [...new Set(products.flatMap(selector))].sort((a, b) => a.localeCompare(b));
}
