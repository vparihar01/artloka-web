import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/catalog/load";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const staticRoutes = ["", "/shop", "/about", "/craftsmanship", "/trade", "/contact"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "/shop" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : .7 })),
    ...getAllProducts().map((product) => ({ url: `${base}/shop/${product.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: .8 }))
  ];
}
