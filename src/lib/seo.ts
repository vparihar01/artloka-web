import type { Metadata } from "next";
import type { Product } from "@/lib/catalog/schema";

const fallbackSiteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://www.artloka.shop";

export const siteConfig = {
  name: "ArtLoka",
  url: (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/$/, ""),
  gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-KCB532YQ7Q",
  tagline: "Heritage Craftsmanship. Styled for Modern Living.",
  description: "Discover ArtLoka handcrafted Indian lighting and decor for considered homes, designers, gifting buyers and boutique hospitality projects across the USA, Canada, UK and Europe.",
  logo: "/images/artloka-logo-bg-sq.png",
  socialImage: "/images/artloka-logo-bg-w.png"
};

export const productPath = (product: Pick<Product, "slug">) => `/shop/${product.slug}`;

export function cleanProductTitle(title: string): string {
  return title.replace(/\s*[–—|-]\s*ArtLoka\s*$/i, "").trim();
}

export function absoluteUrl(path = ""): string {
  if (path.startsWith("http")) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  image = siteConfig.socialImage,
  keywords = []
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: absoluteUrl(path),
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: `${siteConfig.name} handcrafted decor and lighting` }],
      locale: "en_US",
      alternateLocale: ["en_GB", "en_CA"]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)]
    }
  };
}

export function productMetadata(product: Product): Metadata {
  const title = cleanProductTitle(product.title);
  const description = product.metaDescription?.trim() || product.description.slice(0, 157).trim();
  const path = productPath(product);
  const image = product.galleryImages[0];
  const keywords = [
    title,
    product.sku,
    product.primaryCategory,
    ...product.materials,
    ...product.styles,
    ...product.rooms,
    ...product.seoKeywords
  ].filter(Boolean).slice(0, 24);

  return {
    ...pageMetadata({ title, description, path, image: image?.url ?? product.heroImage, keywords }),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: absoluteUrl(path),
      images: [{
        url: absoluteUrl(image?.url ?? product.heroImage),
        alt: image?.alt ?? product.heroImageAlt ?? `${title} by ArtLoka`
      }],
      locale: "en_US",
      alternateLocale: ["en_GB", "en_CA"]
    }
  };
}

export function etsyUrlWithTracking(etsyUrl: string, sku: string): string {
  const url = new URL(etsyUrl);
  url.searchParams.set("utm_source", "artloka.shop");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_campaign", "product_discovery");
  url.searchParams.set("utm_content", sku.toLowerCase());
  return url.toString();
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Netherlands" },
      { "@type": "Country", name: "Italy" },
      { "@type": "Country", name: "Spain" },
      { "@type": "Continent", name: "Europe" }
    ],
    knowsAbout: [
      "Indian craftsmanship",
      "handcrafted lighting",
      "alabaster wall sconces",
      "brass lighting",
      "artisan-made decor",
      "luxury home lighting",
      "modern Indian decor",
      "interior design lighting",
      "corporate gifting",
      "hospitality decor"
    ]
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/shop?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}
