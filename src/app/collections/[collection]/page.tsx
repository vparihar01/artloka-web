import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getAllProducts } from "@/lib/catalog/load";

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const label = decodeURIComponent(collection).replace(/-/g, " ");
  const products = getAllProducts().filter((product) => product.primaryCategory.toLowerCase() === label.toLowerCase() || product.styles.some((style) => style.toLowerCase() === label.toLowerCase()) || product.rooms.some((room) => room.toLowerCase() === label.toLowerCase()));
  if (!products.length) notFound();
  return <div className="container-shell py-16"><p className="eyebrow">Curated collection</p><h1 className="display-font mt-3 capitalize text-5xl">{label}</h1><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.sku} product={product} />)}</div></div>;
}
