import Link from "next/link";

const nav = [
  ["Shop", "/shop"],
  ["Craftsmanship", "/craftsmanship"],
  ["About", "/about"],
  ["Trade & Gifting", "/trade"],
  ["Contact", "/contact"]
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color:var(--background)]/95 backdrop-blur">
      <div className="container-shell flex min-h-20 items-center justify-between gap-6">
        <Link href="/" className="display-font text-2xl font-bold tracking-wide">ArtLoka</Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm font-semibold text-[var(--muted)] hover:text-[var(--foreground)]">{label}</Link>
          ))}
        </nav>
        <Link href="/shop" className="button-primary text-sm">Explore Collection</Link>
      </div>
    </header>
  );
}
