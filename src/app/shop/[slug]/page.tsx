import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EtsyButton } from "@/components/etsy-button";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { getAllProducts, getProductBySlug } from "@/lib/catalog/load";
import type { Product } from "@/lib/catalog/schema";
import { etsyUrlWithTracking, productMetadata } from "@/lib/seo";
import { breadcrumbSchema, graphSchema, organizationSchema, productSchema, serializeJsonLd, webPageSchema, websiteSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getAllProducts({ includeReview: true }).map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return productMetadata(product);
}

function formatPrice(value: number | null): string | null {
  if (value === null) return null;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function formatDimensions(product: Product): string {
  const { widthIn, heightIn, depthIn } = product.dimensions;
  const values = [
    widthIn !== null ? `${widthIn}" W` : null,
    heightIn !== null ? `${heightIn}" H` : null,
    depthIn !== null ? `${depthIn}" D` : null
  ].filter(Boolean);
  return values.length ? values.join(" x ") : "Please enquire";
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getAllProducts().filter((item) => item.primaryCategory === product.primaryCategory && item.sku !== product.sku).slice(0, 3);
  const price = formatPrice(product.priceUsd);
  const gallery = product.galleryImages.length ? product.galleryImages : [{ url: product.heroImage, alt: product.heroImageAlt ?? product.title, type: "Hero", sortOrder: 1, aspectRatio: "4 / 5" }];
  const productJsonLd = graphSchema([
    organizationSchema(),
    websiteSchema(),
    webPageSchema({
      path: `/shop/${product.slug}`,
      name: product.title,
      description: product.metaDescription ?? product.description
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Shop", path: "/shop" },
      { name: product.title, path: `/shop/${product.slug}` }
    ]),
    productSchema(product)
  ]);

  return (
    <div className="container-shell py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--muted)]">
        <Link href="/shop" className="hover:text-[var(--foreground)]">Shop</Link>
        <span aria-hidden="true"> / </span>
        <Link href={`/collections/${product.primaryCategory.toLowerCase()}`} className="hover:text-[var(--foreground)]">{product.primaryCategory}</Link>
        <span aria-hidden="true"> / </span>
        <span>{product.sku}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,.85fr)] lg:items-start">
        <div className="order-2 lg:order-1">
          <ProductGallery images={gallery} />
        </div>

        <aside className="order-1 lg:sticky lg:top-28 lg:order-2">
          <p className="eyebrow">{product.primaryCategory} · {product.sku}</p>
          <h1 className="display-font mt-4 text-4xl leading-[1.05] md:text-6xl">{product.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-[var(--border)] py-4">
            {price ? <p className="text-xl font-semibold">{price} USD</p> : null}
            <p className="text-sm text-[var(--muted)]">Final price and delivery terms are confirmed on Etsy.</p>
          </div>
          <p className="mt-6 text-sm uppercase tracking-[.12em] text-[var(--muted)]">{product.materials.slice(0, 2).join(" · ")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <EtsyButton href={etsyUrlWithTracking(product.etsyUrl, product.sku)} sku={product.sku} title={product.title} label="Purchase on Etsy" />
            <Link className="button-secondary" href={`/contact?product=${encodeURIComponent(product.sku)}`}>Ask about this piece</Link>
          </div>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">The Etsy listing opens in a new tab for checkout, current pricing, shipping, taxes and listing policies.</p>
        </aside>
      </div>

      <section className="mt-16 grid gap-8 border-t border-[var(--border)] pt-12 lg:grid-cols-[.55fr_1.45fr]">
        <div>
          <p className="eyebrow">Product story</p>
          <h2 className="display-font mt-3 text-4xl leading-tight">Material presence, made for modern rooms.</h2>
        </div>
        <p className="prose-copy max-w-4xl text-lg">{product.description}</p>
      </section>

      <section className="mt-20 grid gap-10 border-t border-[var(--border)] pt-12 lg:grid-cols-[.55fr_1.45fr]">
        <div>
          <p className="eyebrow">Product details</p>
          <h2 className="display-font mt-3 text-4xl leading-tight">Specification for a considered decision.</h2>
        </div>
        <dl className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <div><dt className="text-sm font-bold">Materials</dt><dd className="prose-copy mt-2">{product.materials.join(", ") || "Please enquire"}</dd></div>
          <div><dt className="text-sm font-bold">Dimensions</dt><dd className="prose-copy mt-2">{formatDimensions(product)}</dd></div>
          {product.dimensions.canopy ? <div><dt className="text-sm font-bold">Canopy / backplate</dt><dd className="prose-copy mt-2">{product.dimensions.canopy}</dd></div> : null}
          <div><dt className="text-sm font-bold">Finishes</dt><dd className="prose-copy mt-2">{product.finishes.join(", ") || "Please enquire"}</dd></div>
          {product.bulbUs ? <div><dt className="text-sm font-bold">US electrical detail</dt><dd className="prose-copy mt-2">{product.bulbUs}</dd></div> : null}
          {product.bulbInternational ? <div><dt className="text-sm font-bold">UK/EU electrical detail</dt><dd className="prose-copy mt-2">{product.bulbInternational}</dd></div> : null}
        </dl>
      </section>

      <section className="mt-16 grid gap-8 border-t border-[var(--border)] pt-12 lg:grid-cols-3">
        <div>
          <p className="eyebrow">Placement</p>
          <h2 className="display-font mt-3 text-3xl">Rooms and design language</h2>
          <p className="prose-copy mt-4">{product.rooms.join(", ")}</p>
        </div>
        <div>
          <p className="eyebrow">Features</p>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted)]">
            {product.features.map((feature) => <li key={feature} className="border-t border-[var(--border)] pt-3">{feature}</li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Craft note</p>
          <p className="prose-copy mt-4">{product.handmadeNote ?? "Please enquire for craftsmanship details."}</p>
          <p className="prose-copy mt-4 text-sm">Styles: {product.styles.join(", ")}</p>
        </div>
      </section>

      {related.length ? (
        <section className="mt-20 border-t border-[var(--border)] pt-12">
          <p className="eyebrow">Related lighting</p>
          <h2 className="display-font mt-3 text-4xl">Pieces with similar context</h2>
          <div className="mt-8 grid gap-x-7 gap-y-12 md:grid-cols-3">{related.map((item) => <ProductCard key={item.sku} product={item} />)}</div>
        </section>
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(productJsonLd) }} />
    </div>
  );
}
