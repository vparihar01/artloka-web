import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EtsyButton } from "@/components/etsy-button";
import { ProductCard } from "@/components/product-card";
import { getAllProducts, getProductBySlug } from "@/lib/catalog/load";

export function generateStaticParams() {
  return getAllProducts({ includeReview: true }).map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.metaDescription ?? product.description.slice(0, 155),
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: { title: product.title, description: product.metaDescription ?? product.description.slice(0, 155), images: [product.heroImage] }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getAllProducts().filter((item) => item.primaryCategory === product.primaryCategory && item.sku !== product.sku).slice(0, 3);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    sku: product.sku,
    image: [product.heroImage, ...product.galleryImages.map((image) => image.url)],
    material: product.materials.join(", "),
    offers: product.priceUsd === null ? undefined : {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.priceUsd,
      availability: "https://schema.org/InStock",
      url: product.etsyUrl
    }
  };

  return (
    <div className="container-shell py-12">
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--muted)]"><Link href="/shop">Shop</Link> / <span>{product.primaryCategory}</span></nav>
      <div className="mt-7 grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div className="card relative aspect-[6/7] overflow-hidden bg-[#eee8de]"><Image src={product.heroImage} alt={product.heroImageAlt ?? product.title} fill className="object-cover" priority /></div>
        <div className="lg:py-4">
          <p className="eyebrow">{product.primaryCategory} · {product.sku}</p>
          <h1 className="display-font mt-4 text-4xl leading-tight md:text-5xl">{product.title}</h1>
          {product.priceUsd !== null ? <p className="mt-5 text-xl font-bold">${product.priceUsd.toFixed(2)} USD</p> : null}
          <p className="prose-copy mt-6 text-lg">{product.description}</p>
          <div className="mt-8 flex flex-wrap gap-3"><EtsyButton href={product.etsyUrl} sku={product.sku} title={product.title} /><Link className="button-secondary" href={`/contact?product=${encodeURIComponent(product.sku)}`}>Ask about customisation</Link></div>
          <p className="mt-4 text-sm text-[var(--muted)]">The Etsy listing opens in a new tab. Confirm current price, production timeline, shipping and taxes on Etsy before purchase.</p>
          <dl className="mt-9 grid gap-5 border-t border-[var(--border)] pt-7 sm:grid-cols-2">
            <div><dt className="text-sm font-bold">Materials</dt><dd className="prose-copy mt-1">{product.materials.join(", ") || "Please enquire"}</dd></div>
            <div><dt className="text-sm font-bold">Dimensions</dt><dd className="prose-copy mt-1">{[product.dimensions.widthIn && `${product.dimensions.widthIn}” W`, product.dimensions.heightIn && `${product.dimensions.heightIn}” H`, product.dimensions.depthIn && `${product.dimensions.depthIn}” D`].filter(Boolean).join(" × ") || "Please enquire"}</dd></div>
            <div><dt className="text-sm font-bold">Finishes</dt><dd className="prose-copy mt-1">{product.finishes.join(", ") || "Please enquire"}</dd></div>
            <div><dt className="text-sm font-bold">Suitable for</dt><dd className="prose-copy mt-1">{product.rooms.join(", ") || "Multiple interiors"}</dd></div>
            {product.bulbUs ? <div><dt className="text-sm font-bold">US electrical specification</dt><dd className="prose-copy mt-1">{product.bulbUs}</dd></div> : null}
            {product.bulbInternational ? <div><dt className="text-sm font-bold">UK/EU electrical specification</dt><dd className="prose-copy mt-1">{product.bulbInternational}</dd></div> : null}
          </dl>
          {product.status === "review" ? <div className="mt-7 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"><strong>Catalogue review notice:</strong> this product record still contains source-data items requiring confirmation before the strict production catalogue is enabled.</div> : null}
        </div>
      </div>
      {related.length ? <section className="mt-20"><p className="eyebrow">You may also like</p><h2 className="display-font mt-3 text-4xl">Related pieces</h2><div className="mt-8 grid gap-6 md:grid-cols-3">{related.map((item) => <ProductCard key={item.sku} product={item} />)}</div></section> : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
    </div>
  );
}
