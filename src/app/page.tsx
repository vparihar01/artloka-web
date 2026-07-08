import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getAllProducts, getFeaturedProducts } from "@/lib/catalog/load";

export default function HomePage() {
  const featured = getFeaturedProducts(6);
  const products = getAllProducts();
  const hero = products.find((product) => product.sku === "ALK-028") ?? products[0];
  const rooms = [...new Set(products.flatMap((product) => product.rooms))].slice(0, 6);
  const materials = [...new Set(products.flatMap((product) => product.materials))].slice(0, 5);

  return (
    <>
      <section className="border-b border-[var(--border)]">
        <div className="container-shell grid min-h-[calc(100vh-76px)] gap-10 py-8 lg:grid-cols-[1.02fr_.98fr] lg:items-end lg:py-12">
          <div className="pb-6 lg:pb-12">
            <p className="eyebrow">Designed and made in India</p>
            <h1 className="display-font mt-5 max-w-4xl text-5xl leading-[1.02] md:text-7xl">Heritage Craftsmanship. Styled for Modern Living.</h1>
            <p className="prose-copy mt-7 max-w-2xl text-lg">ArtLoka presents handcrafted lighting and decor with the material detail, scale context and calm product information needed for considered interiors.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link className="button-primary" href="/shop">Explore products</Link>
              <Link className="button-secondary" href={`/shop/${hero.slug}`}>View signature piece</Link>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-6 text-[var(--muted)]">Discover and evaluate on ArtLoka. Standard purchases continue through the corresponding official Etsy listing.</p>
          </div>
          <div className="relative min-h-[520px] overflow-hidden bg-[var(--color-stone)] lg:min-h-[680px]">
            <Image src={hero.heroImage} alt={hero.heroImageAlt ?? hero.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(23,19,15,.82),rgba(23,19,15,0))] p-6 pt-32 text-white md:p-8">
              <p className="text-xs uppercase tracking-[.16em] text-[#d9c3a8]">{hero.sku} · {hero.primaryCategory}</p>
              <h2 className="display-font mt-2 max-w-xl text-3xl leading-tight md:text-4xl">{hero.title}</h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#f1e7d8]">{hero.materials.slice(0, 2).join(" · ")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-24">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Signature pieces</p>
            <h2 className="display-font mt-3 max-w-3xl text-4xl leading-tight md:text-5xl">Lighting with a hand-finished presence.</h2>
          </div>
          <Link href="/shop" className="button-secondary">View full catalogue</Link>
        </div>
        <div className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, index) => <ProductCard key={product.sku} product={product} priority={index < 3} />)}
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--color-stone)] py-18">
        <div className="container-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow">Material confidence</p>
            <h2 className="display-font mt-3 text-4xl leading-tight md:text-5xl">The decision starts with material, proportion and placement.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {materials.map((material) => (
              <div key={material} className="border-t border-[var(--border)] pt-4">
                <p className="text-lg font-semibold">{material}</p>
                <p className="prose-copy mt-2 text-sm">Used in current ArtLoka catalogue records.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-10 py-20 md:py-24 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Rooms and moods</p>
          <h2 className="display-font mt-3 text-4xl leading-tight md:text-5xl">Find a piece by where it will live.</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {rooms.map((room) => (
            <Link key={room} href={`/collections/${room.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="group border border-[var(--border)] bg-[var(--surface)] px-5 py-5 transition hover:border-[var(--accent-dark)]">
              <span className="text-sm uppercase tracking-[.12em] text-[var(--muted)]">Shop by room</span>
              <span className="display-font mt-2 block text-2xl capitalize group-hover:text-[var(--accent-dark)]">{room}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-ink)] py-20 text-white md:py-24">
        <div className="container-shell grid gap-10 md:grid-cols-[1fr_.85fr] md:items-center">
          <div>
            <p className="eyebrow !text-[#d9bc8f]">Craft and provenance</p>
            <h2 className="display-font mt-3 max-w-4xl text-4xl leading-tight md:text-5xl">Made in India, presented for contemporary interiors.</h2>
            <p className="mt-5 max-w-3xl leading-7 text-[#d7cbbc]">ArtLoka’s role is to give each piece the context it deserves: material language, hand-finishing notes, dimensions, placement guidance and a clear path to the official Etsy listing.</p>
          </div>
          <div className="border-l border-white/10 pl-6">
            <p className="text-sm uppercase tracking-[.14em] text-[#d9bc8f]">For designers, gifting and hospitality</p>
            <p className="mt-4 leading-7 text-[#d7cbbc]">Share product interests, quantities, destination and project context. ArtLoka reviews structured enquiries before starting a focused conversation.</p>
            <Link className="button-primary mt-6 !border-[#f0dfc7] !bg-[#f0dfc7] !text-[#2b2520]" href="/trade">Start an enquiry</Link>
          </div>
        </div>
      </section>
    </>
  );
}
