import type { MetadataRoute } from "next";
import { getAllProducts, getCatalogueMeta } from "@/lib/catalog/load";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const products = getAllProducts();
  const catalogueModified = new Date(getCatalogueMeta().generatedAt);
  const collectionRoutes = [
    ...new Set(products.flatMap((product) => [
      product.primaryCategory,
      ...product.styles,
      ...product.rooms
    ]).map((value) => `/collections/${value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`))
  ];
  const staticRoutes = ["", "/shop", "/about", "/craftsmanship", "/trade", "/contact", ...collectionRoutes];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: catalogueModified, changeFrequency: route === "/shop" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : .7 })),
    ...products.map((product) => ({ url: `${base}/shop/${product.slug}`, lastModified: catalogueModified, changeFrequency: "weekly" as const, priority: .8 }))
  ];
}
