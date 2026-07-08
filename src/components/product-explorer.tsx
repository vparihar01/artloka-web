"use client";

import { useMemo, useState } from "react";
import { filterProducts, uniqueValues } from "@/lib/catalog/filters";
import type { Product } from "@/lib/catalog/schema";
import { ProductCard } from "./product-card";

export function ProductExplorer({ products, initialQuery = "" }: { products: Product[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("");
  const [room, setRoom] = useState("");
  const [style, setStyle] = useState("");
  const [material, setMaterial] = useState("");

  const categories = useMemo(() => [...new Set(products.map((p) => p.primaryCategory))].sort(), [products]);
  const rooms = useMemo(() => uniqueValues(products, (p) => p.rooms), [products]);
  const styles = useMemo(() => uniqueValues(products, (p) => p.styles), [products]);
  const materials = useMemo(() => uniqueValues(products, (p) => p.materials), [products]);
  const visible = useMemo(() => filterProducts(products, { query, category, room, style, material }), [products, query, category, room, style, material]);

  return (
    <div>
      <div className="border-y border-[var(--border)] py-5">
        <div className="grid gap-3 md:grid-cols-5">
        <input aria-label="Search products" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title, room or material" className="border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm md:col-span-2" />
        <select aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)} className="border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm">
          <option value="">All product types</option>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select aria-label="Filter by room" value={room} onChange={(e) => setRoom(e.target.value)} className="border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm">
          <option value="">All rooms</option>
          {rooms.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select aria-label="Filter by style" value={style} onChange={(e) => setStyle(e.target.value)} className="border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm">
          <option value="">All styles</option>
          {styles.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select aria-label="Filter by material" value={material} onChange={(e) => setMaterial(e.target.value)} className="border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm md:col-span-2">
          <option value="">All materials</option>
          {materials.map((item) => <option key={item}>{item}</option>)}
        </select>
        </div>
      </div>
      <p className="mt-5 text-sm text-[var(--muted)]">Showing {visible.length} of {products.length} products</p>
      <div className="mt-8 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product, index) => <ProductCard key={product.sku} product={product} priority={index < 3} />)}
      </div>
    </div>
  );
}
