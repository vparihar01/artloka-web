"use client";

import { useMemo, useState } from "react";
import { filterProducts, uniqueValues } from "@/lib/catalog/filters";
import type { Product } from "@/lib/catalog/schema";
import { ProductCard } from "./product-card";

export function ProductExplorer({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [room, setRoom] = useState("");
  const [style, setStyle] = useState("");

  const categories = useMemo(() => [...new Set(products.map((p) => p.primaryCategory))].sort(), [products]);
  const rooms = useMemo(() => uniqueValues(products, (p) => p.rooms), [products]);
  const styles = useMemo(() => uniqueValues(products, (p) => p.styles), [products]);
  const visible = useMemo(() => filterProducts(products, { query, category, room, style }), [products, query, category, room, style]);

  return (
    <div>
      <div className="card grid gap-3 p-4 md:grid-cols-4">
        <input aria-label="Search products" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="rounded-full border border-[var(--border)] bg-white px-4 py-3" />
        <select aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-full border border-[var(--border)] bg-white px-4 py-3">
          <option value="">All product types</option>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select aria-label="Filter by room" value={room} onChange={(e) => setRoom(e.target.value)} className="rounded-full border border-[var(--border)] bg-white px-4 py-3">
          <option value="">All rooms</option>
          {rooms.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select aria-label="Filter by style" value={style} onChange={(e) => setStyle(e.target.value)} className="rounded-full border border-[var(--border)] bg-white px-4 py-3">
          <option value="">All styles</option>
          {styles.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <p className="mt-5 text-sm text-[var(--muted)]">Showing {visible.length} of {products.length} products</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => <ProductCard key={product.sku} product={product} />)}
      </div>
    </div>
  );
}
