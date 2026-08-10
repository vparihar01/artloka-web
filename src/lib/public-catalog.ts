import type { Product } from "@/lib/catalog/schema";
import { absoluteUrl, cleanProductTitle, etsyUrlWithTracking, productPath, productSearchPhrase } from "@/lib/seo";

export function publicProduct(product: Product) {
  return {
    sku: product.sku,
    name: cleanProductTitle(product.title),
    url: absoluteUrl(productPath(product)),
    description: product.description,
    discoveryPhrase: productSearchPhrase(product),
    category: product.primaryCategory,
    materials: product.materials,
    dimensionsInches: product.dimensions,
    finishes: product.finishes,
    electrical: {
      usa: product.bulbUs ?? null,
      ukEu: product.bulbInternational ?? null
    },
    suggestedRooms: product.rooms,
    styles: product.styles,
    features: product.features,
    craftNote: product.handmadeNote ?? null,
    priceGuide: product.priceUsd === null ? null : { amount: product.priceUsd, currency: "USD" },
    images: product.galleryImages.map((image) => ({ url: absoluteUrl(image.url), alt: image.alt, type: image.type })),
    purchaseUrl: etsyUrlWithTracking(product.etsyUrl, product.sku)
  };
}
