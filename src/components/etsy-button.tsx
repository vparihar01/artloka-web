"use client";

import { trackEtsyClick } from "@/lib/analytics";

export function EtsyButton({ href, sku, title, location = "product-page", label = "Buy on Etsy" }: {
  href: string;
  sku: string;
  title: string;
  location?: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="button-primary"
      onClick={() => trackEtsyClick({ sku, title, location })}
    >
      {label}
    </a>
  );
}
