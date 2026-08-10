import type { Metadata } from "next";
import { ProductExplorer } from "@/components/product-explorer";
import { getAllProducts } from "@/lib/catalog/load";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { graphSchema, organizationSchema, serializeJsonLd, webPageSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Shop Handcrafted Lighting and Decor",
  description: "Explore ArtLoka handcrafted Indian lighting by product type, room, material and style for homes, designers, gifting and boutique hospitality across the USA, Canada, UK and Europe.",
  path: "/shop",
  keywords: [
    "shop handcrafted lighting",
    "Indian wall sconces",
    "alabaster brass wall lights",
    "luxury lighting USA",
    "designer lighting Canada",
    "handmade lighting Europe"
  ]
});

export default async function ShopPage({ searchParams }: { searchParams?: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const products = getAllProducts();
  const initialQuery = params?.q ?? "";
  const shopJsonLd = graphSchema([
    organizationSchema(),
    websiteSchema(),
    webPageSchema({
      path: "/shop",
      name: "Shop ArtLoka handcrafted lighting and decor",
      description: "Explore ArtLoka handcrafted Indian lighting by product type, room, material and style."
    }),
    {
      "@type": "ItemList",
      "@id": absoluteUrl("/shop#catalogue"),
      name: "ArtLoka handcrafted lighting and decor catalogue",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/shop/${product.slug}`),
        name: product.title
      }))
    }
  ]);

  return (
    <div className="container-shell py-14 md:py-20">
      <p className="eyebrow">Complete collection</p>
      <h1 className="display-font mt-3 max-w-4xl text-5xl leading-tight md:text-7xl">Discover ArtLoka lighting.</h1>
      <p className="prose-copy mt-5 max-w-3xl text-lg">Browse by product type, room, material and design language. Every product page includes specifications, styling context and a direct link to the official Etsy listing.</p>
      <div className="mt-12"><ProductExplorer products={products} initialQuery={initialQuery} /></div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(shopJsonLd) }} />
    </div>
  );
}
