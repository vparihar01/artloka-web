import type { Metadata } from "next";
import { ProductExplorer } from "@/components/product-explorer";
import { getAllProducts } from "@/lib/catalog/load";

export const metadata: Metadata = {
  title: "Shop Handcrafted Décor and Lighting",
  description: "Explore ArtLoka lighting, wall décor, sculptures, decorative objects and artisan-made gifts. Complete your purchase through our official Etsy shop."
};

export default function ShopPage() {
  const products = getAllProducts();
  return (
    <div className="container-shell py-14 md:py-20">
      <p className="eyebrow">Complete collection</p>
      <h1 className="display-font mt-3 max-w-4xl text-5xl leading-tight md:text-7xl">Discover ArtLoka lighting.</h1>
      <p className="prose-copy mt-5 max-w-3xl text-lg">Browse by product type, room, material and design language. Every product page includes specifications, styling context and a direct link to the official Etsy listing.</p>
      <div className="mt-12"><ProductExplorer products={products} /></div>
    </div>
  );
}
