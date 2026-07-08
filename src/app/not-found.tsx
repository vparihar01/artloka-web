import Link from "next/link";

export default function NotFound() {
  return <div className="container-shell py-24 text-center"><p className="eyebrow">Not found</p><h1 className="display-font mt-3 text-5xl">This page is not in the current collection.</h1><p className="prose-copy mx-auto mt-5 max-w-xl">The product may have moved, been archived or may still be under catalogue review.</p><Link href="/shop" className="button-primary mt-8">Return to the collection</Link></div>;
}
