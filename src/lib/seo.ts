import type { Metadata } from "next";

const fallbackSiteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://www.artloka.shop";

export const siteConfig = {
  name: "ArtLoka",
  url: (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/$/, ""),
  gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-KCB532YQ7Q",
  tagline: "Heritage Craftsmanship. Styled for Modern Living.",
  description: "Discover ArtLoka handcrafted lighting and decor, designed and made in India for thoughtful contemporary homes in the USA, UK and worldwide.",
  logo: "/images/artloka-logo-bg-sq.png",
  socialImage: "/images/artloka-logo-bg-w.png"
};

export function absoluteUrl(path = ""): string {
  if (path.startsWith("http")) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  image = siteConfig.socialImage
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: absoluteUrl(path),
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: `${siteConfig.name} handcrafted decor and lighting` }],
      locale: "en_US",
      alternateLocale: ["en_GB"]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)]
    }
  };
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
      { "@type": "Country", name: "United Kingdom" }
    ],
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
