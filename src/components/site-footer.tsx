import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[#eee6da]">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="display-font text-2xl font-bold">ArtLoka</div>
          <p className="mt-3 max-w-md text-sm leading-7 text-[var(--muted)]">
            Heritage craftsmanship, styled for modern living. Artisan-made décor and lighting, designed and made in India.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-bold">Discover</p>
          <div className="mt-4 grid gap-3 text-[var(--muted)]">
            <Link href="/shop">Shop all</Link>
            <Link href="/craftsmanship">Craftsmanship</Link>
            <Link href="/about">Founder story</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="font-bold">Projects</p>
          <div className="mt-4 grid gap-3 text-[var(--muted)]">
            <Link href="/trade">Trade and hospitality</Link>
            <Link href="/contact">Bulk and custom enquiries</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--border)] py-5 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} ArtLoka. Purchases are completed securely on Etsy.
      </div>
    </footer>
  );
}
