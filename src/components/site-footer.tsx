import Link from "next/link";
import { BrandLogo } from "./brand-logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--color-ink)] text-[#f8efe3]">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.35fr_.8fr_.8fr_1fr]">
        <div>
          <BrandLogo className="brightness-[1.35]" />
          <p className="mt-5 max-w-md text-sm leading-7 text-[#cfc4b7]">
            Heritage craftsmanship, styled for modern living. Artisan-made décor and lighting, designed and made in India.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-bold text-white">Discover</p>
          <div className="mt-4 grid gap-3 text-[#cfc4b7]">
            <Link href="/shop">Shop all</Link>
            <Link href="/craftsmanship">Craftsmanship</Link>
            <Link href="/about">Founder story</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="font-bold text-white">Projects</p>
          <div className="mt-4 grid gap-3 text-[#cfc4b7]">
            <Link href="/trade">Trade and hospitality</Link>
            <Link href="/contact">Bulk and custom enquiries</Link>
          </div>
        </div>
        <div className="border-l border-white/10 pl-6 text-sm text-[#cfc4b7] md:pl-8">
          <p className="font-bold text-white">Purchase journey</p>
          <p className="mt-4 leading-7">Explore and evaluate on ArtLoka. Complete standard purchases through the corresponding official Etsy listing.</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-[#b7aa9b]">
        © {new Date().getFullYear()} ArtLoka. Standard checkout is completed on Etsy.
      </div>
    </footer>
  );
}
