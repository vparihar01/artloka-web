declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEtsyClick(payload: { sku: string; title: string; location: string }): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "etsy_outbound_click", {
    product_sku: payload.sku,
    product_title: payload.title,
    cta_location: payload.location
  });
}
