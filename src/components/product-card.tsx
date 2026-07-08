import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalog/schema";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[6/7] bg-[#eee8de]">
          <Image src={product.heroImage} alt={product.heroImageAlt ?? product.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
        <div className="p-5">
          <p className="eyebrow">{product.primaryCategory}</p>
          <h2 className="display-font mt-2 text-xl leading-snug">{product.title}</h2>
          <div className="mt-3 flex items-center justify-between gap-3 text-sm text-[var(--muted)]">
            <span>{product.materials.slice(0, 2).join(" · ") || "Handcrafted"}</span>
            {product.priceUsd !== null ? <span className="font-bold text-[var(--foreground)]">${product.priceUsd.toFixed(2)}</span> : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
