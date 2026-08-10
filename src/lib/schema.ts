import type { Product } from "@/lib/catalog/schema";
import { absoluteUrl, cleanProductTitle, etsyUrlWithTracking, priorityMarkets, productPath, siteConfig } from "@/lib/seo";

export type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logo) },
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    areaServed: [...priorityMarkets, "India"].map((name) => ({ "@type": name === "Europe" ? "Continent" : "Country", name })),
    knowsAbout: [
      "Indian craftsmanship",
      "handcrafted lighting",
      "alabaster wall sconces",
      "brass lighting",
      "artisan-made decor",
      "interior design lighting",
      "corporate gifting",
      "hospitality decor"
    ]
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteConfig.url}/shop?q={search_term_string}` },
      "query-input": "required name=search_term_string"
    }
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function itemListSchema(items: Array<{ name: string; path: string }>, name?: string): JsonLd {
  return {
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path)
    }))
  };
}

function dimensions(product: Product): string | undefined {
  const values = [
    product.dimensions.widthIn === null ? null : `${product.dimensions.widthIn} in W`,
    product.dimensions.heightIn === null ? null : `${product.dimensions.heightIn} in H`,
    product.dimensions.depthIn === null ? null : `${product.dimensions.depthIn} in D`
  ].filter(Boolean);
  return values.length ? values.join(" × ") : undefined;
}

export function productSchema(product: Product): JsonLd {
  const url = absoluteUrl(productPath(product));
  const additionalProperty = [
    product.finishes.length ? { "@type": "PropertyValue", name: "Finishes", value: product.finishes.join(", ") } : null,
    product.rooms.length ? { "@type": "PropertyValue", name: "Suggested rooms", value: product.rooms.join(", ") } : null,
    product.styles.length ? { "@type": "PropertyValue", name: "Design styles", value: product.styles.join(", ") } : null,
    product.features.length ? { "@type": "PropertyValue", name: "Product features", value: product.features.join(", ") } : null,
    product.handmadeNote ? { "@type": "PropertyValue", name: "Craft note", value: product.handmadeNote } : null,
    product.bulbUs ? { "@type": "PropertyValue", name: "US electrical detail", value: product.bulbUs } : null,
    product.bulbInternational ? { "@type": "PropertyValue", name: "UK/EU electrical detail", value: product.bulbInternational } : null,
    product.dimensions.canopy ? { "@type": "PropertyValue", name: "Canopy or backplate", value: product.dimensions.canopy } : null,
    dimensions(product) ? { "@type": "PropertyValue", name: "Dimensions", value: dimensions(product) } : null
  ].filter(Boolean);

  return {
    "@type": "Product",
    "@id": `${url}#product`,
    name: cleanProductTitle(product.title),
    alternateName: product.originalTitle,
    description: product.description,
    sku: product.sku,
    url,
    sameAs: product.etsyUrl,
    image: product.galleryImages.length
      ? product.galleryImages.map((image) => absoluteUrl(image.url))
      : [absoluteUrl(product.heroImage)],
    brand: { "@type": "Brand", name: siteConfig.name },
    category: product.primaryCategory,
    material: product.materials.length ? product.materials.join(", ") : undefined,
    additionalProperty,
    offers: product.priceUsd === null ? undefined : {
      "@type": "Offer",
      price: product.priceUsd.toFixed(2),
      priceCurrency: "USD",
      url: etsyUrlWithTracking(product.etsyUrl, product.sku),
      seller: { "@id": `${siteConfig.url}/#organization` }
    }
  };
}

export function webPageSchema({ path, name, description }: { path: string; name: string; description: string }): JsonLd {
  const url = absoluteUrl(path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en"
  };
}

export function graphSchema(nodes: JsonLd[]): JsonLd {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function serializeJsonLd(value: JsonLd): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
