import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/catalog/load";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const products = getAllProducts();
  const collectionRoutes = [
    ...new Set(products.flatMap((product) => [
      product.primaryCategory,
      ...product.styles,
      ...product.rooms
    ]).map((value) => `/collections/${value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`))
  ];
  const staticRoutes = ["", "/shop", "/about", "/craftsmanship", "/trade", "/contact", ...collectionRoutes];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "/shop" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : .7 })),
    ...products.map((product) => ({ url: `${base}/shop/${product.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: .8 }))
  ];
}
