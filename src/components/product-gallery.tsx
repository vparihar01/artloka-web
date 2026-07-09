"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/catalog/schema";

type GalleryImage = Product["galleryImages"][number];

export function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images[selectedIndex] ?? images[0];

  if (!selected) return null;

  const thumbnails = images.map((image, index) => (
    <button
      key={`${image.url}-${image.sortOrder}`}
      type="button"
      aria-label={`View image ${index + 1}: ${image.type}`}
      aria-pressed={index === selectedIndex}
      onClick={() => setSelectedIndex(index)}
      className={`relative h-20 w-16 shrink-0 snap-start overflow-hidden rounded-[6px] border bg-[var(--color-stone)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-dark)] md:h-20 md:w-20 ${
        index === selectedIndex
          ? "border-[var(--accent-dark)] ring-1 ring-[var(--accent-dark)]"
          : "border-[var(--border)] hover:border-[var(--accent-dark)]"
      }`}
    >
      <Image src={image.url} alt="" fill className="object-cover" sizes="80px" />
    </button>
  ));

  return (
    <div className="grid gap-4 md:grid-cols-[5rem_minmax(0,1fr)] md:items-start">
      {images.length > 1 ? (
        <div
          className="hidden max-h-[min(760px,calc(100vh-8rem))] snap-y grid-cols-1 gap-3 overflow-y-auto pr-1 md:grid"
          aria-label="Product image thumbnails"
        >
          {thumbnails}
        </div>
      ) : null}

      <div
        className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[var(--color-stone)] md:aspect-square"
      >
        <Image
          src={selected.url}
          alt={selected.alt}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
        />
      </div>

      {images.length > 1 ? (
        <div
          className="flex snap-x gap-3 overflow-x-auto border-y border-[var(--border)] py-3 md:hidden"
          aria-label="Product image thumbnails"
        >
          {thumbnails}
        </div>
      ) : null}
    </div>
  );
}
