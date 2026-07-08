import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getAllProducts } from "@/lib/catalog/load";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

function collectionLabel(collection: string): string {
  return decodeURIComponent(collection).replace(/-/g, " ");
}

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> {
  const { collection } = await params;
  const label = collectionLabel(collection);
  const products = getAllProducts().filter((product) => product.primaryCategory.toLowerCase() === label.toLowerCase() || product.styles.some((style) => style.toLowerCase() === label.toLowerCase()) || product.rooms.some((room) => room.toLowerCase() === label.toLowerCase()));
  if (!products.length) return {};
  return pageMetadata({
    title: `${label.replace(/\b\w/g, (letter) => letter.toUpperCase())} Collection`,
    description: `Explore ArtLoka ${label} pieces with handcrafted materials, product specifications, styling context and official Etsy purchase links.`,
    path: `/collections/${collection}`,
    image: products[0].heroImage
  });
}

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const label = collectionLabel(collection);
  const products = getAllProducts().filter((product) => product.primaryCategory.toLowerCase() === label.toLowerCase() || product.styles.some((style) => style.toLowerCase() === label.toLowerCase()) || product.rooms.some((room) => room.toLowerCase() === label.toLowerCase()));
  if (!products.length) notFound();
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${label} ArtLoka collection`,
    url: absoluteUrl(`/collections/${collection}`),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/shop/${product.slug}`),
        name: product.title
      }))
    }
  };

  return (
    <div className="container-shell py-16">
      <p className="eyebrow">Curated collection</p>
      <h1 className="display-font mt-3 capitalize text-5xl">{label}</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.sku} product={product} />)}</div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
    </div>
  );
}
