import Link from "next/link";
import { BrandLogo } from "./brand-logo";
import { MobileNav } from "./mobile-nav";

const nav = [
  ["Shop", "/shop"],
  ["Craftsmanship", "/craftsmanship"],
  ["About", "/about"],
  ["Trade & Gifting", "/trade"],
  ["Contact", "/contact"]
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color:var(--background)]/95 backdrop-blur-md">
      <div className="container-shell flex min-h-[76px] items-center justify-between gap-5">
        <Link href="/" aria-label="ArtLoka home" className="flex shrink-0 items-center">
          <BrandLogo priority />
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="text-[.82rem] font-semibold text-[var(--muted)] transition hover:text-[var(--foreground)]">{label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <Link href="/shop" className="button-secondary">Explore collection</Link>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
