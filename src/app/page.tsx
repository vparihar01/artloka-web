import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/lib/catalog/load";

export default function HomePage() {
  const products = getFeaturedProducts(6);
  return (
    <>
      <section className="border-b border-[var(--border)] bg-[linear-gradient(135deg,#f8f3ea_0%,#e7dac7_100%)]">
        <div className="container-shell grid min-h-[650px] items-center gap-12 py-20 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="eyebrow">Designed and made in India</p>
            <h1 className="display-font mt-5 max-w-4xl text-5xl leading-[1.04] md:text-7xl">Heritage craftsmanship. Styled for modern living.</h1>
            <p className="prose-copy mt-7 max-w-2xl text-lg">Artisan-made décor and lighting that bring the warmth of Indian craft into thoughtful contemporary spaces.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link className="button-primary" href="/shop">Explore the collection</Link>
              <Link className="button-secondary" href="/craftsmanship">Meet the makers</Link>
            </div>
            <p className="mt-5 text-sm text-[var(--muted)]">Discover on ArtLoka. Purchase securely through our official Etsy shop.</p>
          </div>
          <div className="card relative min-h-[480px] overflow-hidden bg-[#d9c7ae] p-10">
            <div className="absolute inset-8 rounded-[45%_55%_50%_50%] bg-[#f4eee5] shadow-2xl" />
            <div className="absolute left-1/2 top-1/2 h-72 w-40 -translate-x-1/2 -translate-y-1/2 rounded-t-full bg-[#8c6a43] shadow-xl" />
            <div className="absolute left-1/2 top-[36%] h-36 w-36 -translate-x-1/2 rounded-full bg-[#f7f0df] shadow-[0_0_70px_#fff5cc]" />
            <p className="absolute bottom-8 left-8 right-8 text-center text-sm font-semibold text-[#5c4128]">Product photography placeholder — replace after image QA</p>
          </div>
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="eyebrow">Featured pieces</p><h2 className="display-font mt-3 text-4xl md:text-5xl">Crafted to become part of your story</h2></div>
          <Link href="/shop" className="button-secondary">View all products</Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => <ProductCard key={product.sku} product={product} />)}
        </div>
      </section>

      <section className="bg-[#e9dfd1] py-20">
        <div className="container-shell grid gap-8 md:grid-cols-3">
          {[
            ["Human touch", "Every piece is artisan-made or hand-finished rather than produced as anonymous mass décor."],
            ["Heritage, reinterpreted", "Traditional material intelligence meets clean lines and globally relevant interiors."],
            ["Made for meaningful spaces", "Choose a personal statement piece, a memorable gift, or a collection for a larger project."]
          ].map(([title, copy]) => <div key={title} className="card p-7"><h3 className="display-font text-2xl">{title}</h3><p className="prose-copy mt-3">{copy}</p></div>)}
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="card grid gap-8 bg-[#3f352c] p-8 text-white md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div><p className="eyebrow !text-[#d9bc8f]">For designers, gifting teams and hospitality projects</p><h2 className="display-font mt-3 text-4xl">Need quantity, customisation or project support?</h2><p className="mt-4 max-w-3xl leading-7 text-[#ded4ca]">Share your product interests, quantities, destination and timeline. ArtLoka will review the requirement before beginning a focused conversation.</p></div>
          <Link className="button-primary !bg-[#f0dfc7] !text-[#3f352c]" href="/trade">Start an enquiry</Link>
        </div>
      </section>
    </>
  );
}
