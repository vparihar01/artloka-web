"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  ["Shop", "/shop"],
  ["Craftsmanship", "/craftsmanship"],
  ["About", "/about"],
  ["Trade & Gifting", "/trade"],
  ["Contact", "/contact"]
] as const;

export function MobileNav() {
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const pathname = usePathname();
  const open = openPathname === pathname;

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        className="border border-[var(--border)] px-3 py-2 text-xs font-semibold uppercase tracking-[.12em] text-[var(--foreground)]"
        onClick={() => setOpenPathname((value) => value === pathname ? null : pathname)}
      >
        Menu
      </button>
      {open ? (
        <div id="mobile-navigation" className="absolute right-0 top-[calc(100%+12px)] w-[min(82vw,320px)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl">
          <nav aria-label="Mobile navigation" className="grid gap-1">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} className="border-b border-[var(--border)] px-1 py-3 text-sm font-semibold text-[var(--foreground)] last:border-b-0">{label}</Link>
            ))}
          </nav>
          <Link href="/shop" className="button-primary mt-4 w-full">Explore collection</Link>
        </div>
      ) : null}
    </div>
  );
}
