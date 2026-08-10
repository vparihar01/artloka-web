import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/shop", "/collections", "/products.json", "/llms.txt", "/llms-full.txt", "/ai.txt"],
        disallow: ["/api/"]
      },
      {
        userAgent: ["Googlebot", "Bingbot", "DuckDuckBot", "Applebot", "GPTBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot"],
        allow: ["/", "/shop", "/collections", "/products.json", "/llms.txt", "/llms-full.txt", "/ai.txt"],
        disallow: ["/api/"]
      }
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base
  };
}
