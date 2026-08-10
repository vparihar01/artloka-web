import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: "ArtLoka",
  category: "home decor",
  title: {
    default: "ArtLoka | Heritage Craftsmanship. Styled for Modern Living.",
    template: "%s | ArtLoka"
  },
  description: siteConfig.description,
  creator: "ArtLoka",
  publisher: "ArtLoka",
  authors: [{ name: "ArtLoka" }],
  keywords: [
    "ArtLoka",
    "handcrafted Indian lighting",
    "luxury Indian decor",
    "alabaster wall sconce",
    "brass wall light",
    "artisan made home decor",
    "luxury lighting USA",
    "luxury lighting Canada",
    "luxury lighting UK",
    "luxury lighting Europe",
    "handmade wall sconces",
    "boutique hospitality lighting",
    "interior designer lighting",
    "Etsy handcrafted lighting",
    "heritage craftsmanship"
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" }
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }]
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "website",
    siteName: "ArtLoka",
    title: "ArtLoka | Heritage Craftsmanship. Styled for Modern Living.",
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: absoluteUrl(siteConfig.socialImage), width: 1200, height: 630, alt: "ArtLoka handcrafted lighting and decor" }],
    locale: "en_US",
    alternateLocale: ["en_GB", "en_CA"]
  },
  twitter: {
    card: "summary_large_image",
    title: "ArtLoka | Heritage Craftsmanship. Styled for Modern Living.",
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.socialImage)]
  },
  other: {
    "p:domain_verify": "b97d8795c2b0fa0b15031fb574ef2f38"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body>
        <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${siteConfig.gaId}');
            `}</Script>
        </>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
