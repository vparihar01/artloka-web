import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getAllProducts } from "@/lib/catalog/load";
import { absoluteUrl, collectionMetadataText, pageMetadata, siteConfig, slugifySegment } from "@/lib/seo";
import { breadcrumbSchema, graphSchema, serializeJsonLd, webPageSchema } from "@/lib/schema";

function collectionLabel(collection: string): string {
  return decodeURIComponent(collection).replace(/-/g, " ");
}

function collectionProducts(collection: string) {
  return getAllProducts().filter((product) => {
    const segments = [product.primaryCategory, ...product.styles, ...product.rooms];
    return segments.some((segment) => slugifySegment(segment) === collection);
  });
}

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> {
  const { collection } = await params;
  const label = collectionLabel(collection);
  const products = collectionProducts(collection);
  if (!products.length) return {};
  const shareImage = products.find((product) => product.galleryImages.length)?.heroImage ?? siteConfig.socialImage;
  const seo = collectionMetadataText(label, products);
  return pageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/collections/${collection}`,
    image: shareImage,
    keywords: seo.keywords
  });
}

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const label = collectionLabel(collection);
  const products = collectionProducts(collection);
  if (!products.length) notFound();
  const seo = collectionMetadataText(label, products);
  const collectionJsonLd = graphSchema([
    webPageSchema({ path: `/collections/${collection}`, name: seo.title, description: seo.description }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Shop", path: "/shop" },
      { name: label, path: `/collections/${collection}` }
    ]),
    {
      "@type": "CollectionPage",
      "@id": absoluteUrl(`/collections/${collection}#collection`),
      name: seo.title,
      description: seo.description,
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
    }
  ]);

  return (
    <div className="container-shell py-16">
      <p className="eyebrow">Curated collection</p>
      <h1 className="display-font mt-3 capitalize text-5xl">{label}</h1>
      <p className="prose-copy mt-5 max-w-3xl text-lg">{seo.description}</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.sku} product={product} />)}</div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionJsonLd) }} />
    </div>
  );
}
