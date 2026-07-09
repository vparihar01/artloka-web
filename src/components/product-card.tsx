import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalog/schema";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="group border-t border-[var(--border)] pt-4">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-stone)]">
          <Image src={product.heroImage} alt={product.heroImageAlt ?? product.title} fill priority={priority} className="object-contain transition duration-500 group-hover:scale-[1.025]" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
        <div className="pt-4">
          <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[.12em] text-[var(--muted)]">
            <span>{product.primaryCategory}</span>
            <span>{product.sku}</span>
          </div>
          <h2 className="display-font mt-2 text-[1.35rem] leading-tight">{product.title}</h2>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{product.materials.slice(0, 2).join(" · ") || "Handcrafted"}</p>
          {product.priceUsd !== null ? <p className="mt-3 text-sm font-semibold text-[var(--foreground)]">${product.priceUsd.toFixed(2)} USD</p> : null}
        </div>
      </Link>
    </article>
  );
}
