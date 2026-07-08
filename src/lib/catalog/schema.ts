import { z } from "zod";

export const ProductStatusSchema = z.enum(["draft", "review", "approved", "published", "archived"]);

export const ProductSchema = z.object({
  sku: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  originalTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  description: z.string().min(1),
  etsyUrl: z.string().url(),
  priceUsd: z.number().nonnegative().nullable(),
  materials: z.array(z.string()),
  dimensions: z.object({
    widthIn: z.number().nullable(),
    heightIn: z.number().nullable(),
    depthIn: z.number().nullable(),
    canopy: z.string().optional()
  }),
  finishes: z.array(z.string()),
  bulbUs: z.string().optional(),
  bulbInternational: z.string().optional(),
  primaryCategory: z.string(),
  styles: z.array(z.string()),
  rooms: z.array(z.string()),
  features: z.array(z.string()),
  handmadeNote: z.string().optional(),
  tags: z.array(z.string()),
  seoKeywords: z.array(z.string()),
  imageStatus: z.string().optional(),
  heroImage: z.string().default("/images/product-placeholder.svg"),
  heroImageAlt: z.string().optional(),
  galleryImages: z.array(z.object({
    url: z.string().min(1),
    type: z.string().min(1),
    alt: z.string().min(1),
    sortOrder: z.number().int().nonnegative()
  })).default([]),
  qaNotes: z.string().optional(),
  status: ProductStatusSchema,
  featured: z.boolean().default(false),
  bestseller: z.boolean().default(false),
  sortOrder: z.number().int().nonnegative().default(999)
});

export type Product = z.infer<typeof ProductSchema>;

export const CatalogSchema = z.object({
  generatedAt: z.string(),
  source: z.string(),
  products: z.array(ProductSchema),
  warnings: z.array(z.string())
});

export type Catalog = z.infer<typeof CatalogSchema>;
