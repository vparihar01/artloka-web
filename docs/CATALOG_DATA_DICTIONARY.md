# Catalogue Data Dictionary

## Current source worksheet
`Website Catalog`

| Excel column | Website field | Rule |
|---|---|---|
| SKU (ArtLoka) | `sku` | Required and unique |
| Original Etsy Title | `originalTitle` | Preserve for source comparison |
| SEO Website Title | `title` | Preferred public title |
| Meta Description (~160 char) | `metaDescription` | Use for SEO; do not fabricate |
| Website Description (Full) | `description` | Required |
| Etsy URL | `etsyUrl` | Required valid URL |
| Price (USD) | `priceUsd` | Informational; Etsy remains final source |
| Materials | `materials[]` | Split and normalize carefully |
| Width/Height/Depth | `dimensions` | Numeric inches or null |
| Canopy/Backplate Size | `dimensions.canopy` | Lighting-specific |
| Finish Options | `finishes[]` | Do not imply stock availability |
| Bulb / Socket (US) | `bulbUs` | Requires claims QA |
| Bulb / Socket (UK/EU) | `bulbInternational` | Requires claims QA |
| Style / Category | `styles[]` | Primary category also inferred initially |
| Room Suitability | `rooms[]` | Secondary discovery |
| Special Features | `features[]` | Claims must be verified |
| Handmade Note | `handmadeNote` | Trust content |
| Etsy Tags | `tags[]` | Discovery support |
| Website SEO Keywords | `seoKeywords[]` | Editorial input, not keyword stuffing |
| Image Status | `imageStatus` | Blocks final launch when unresolved |
| QA Notes / Flags | `qaNotes` | Internal review signal |

## Fields to add to the workbook
- Publish Status: Draft / Review / Approved / Published / Archived
- Publish on Website: Yes / No
- Product Slug
- Primary Category
- Secondary Categories
- Room Tags
- Style Tags
- Material Tags
- Gift Occasions
- Hero Image URL
- Featured
- Bestseller
- Sort Order
- Availability
- QA Status
- Last Reviewed
- Approved By

## Recommended Images worksheet
| SKU | Image URL | Image Type | Alt Text | Sort Order | Approved |
|---|---|---|---|---:|---|

Do not put multiple image records into one unstructured cell once the image workflow begins.
