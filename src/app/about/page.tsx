import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About ArtLoka",
  description: "Learn how ArtLoka bridges Indian heritage craftsmanship with clean, contemporary design for homes around the world."
};

export default function AboutPage() {
  return (
    <div className="container-shell py-16">
      <p className="eyebrow">Our story</p>
      <h1 className="display-font mt-3 max-w-4xl text-5xl leading-tight md:text-6xl">A bridge between traditional craftsmanship and contemporary living.</h1>
      <div className="mt-12 grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
        <div className="card min-h-[420px] bg-[linear-gradient(145deg,#d9c3a4,#f7f1e8)] p-8">
          <p className="display-font text-3xl">Founder-led, artisan-made, globally styled.</p>
        </div>
        <div className="prose-copy space-y-6 text-lg">
          <p>ArtLoka began with a simple question: what if a modern home could celebrate ancient artistry without feeling visually dated?</p>
          <p>Our collection is designed to carry the character of human craft into spaces shaped by clean lines, warm materials and global design sensibilities. We work with artisans and production partners in India to create pieces that feel authentic, expressive and relevant.</p>
          <p>We believe décor is more than an object. It can hold memory, signal personal taste, become a meaningful gift and connect a space to a deeper story.</p>
          <p>Our mission is to make heritage-meets-modern décor accessible to homeowners, gift buyers, designers and hospitality projects across the world.</p>
          <Link href="/shop" className="button-primary !text-white">Explore the collection</Link>
        </div>
      </div>
    </div>
  );
}
