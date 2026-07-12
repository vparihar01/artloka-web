"use client";

import { trackEtsyClick } from "@/lib/analytics";
import { EtsyMark } from "./etsy-mark";

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
      className="button-primary gap-2"
      onClick={() => trackEtsyClick({ sku, title, location })}
    >
      <EtsyMark />
      {label}
    </a>
  );
}
