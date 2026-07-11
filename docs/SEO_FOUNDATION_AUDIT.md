# ArtLoka Technical SEO Audit and Implementation Map

Audited against the normalized catalogue and App Router codebase on 2026-07-11. This document separates the completed foundation PR from later Mountain Loop work.

## Technical audit

| Issue | Current state before this PR | Why it matters | File/path | Priority | Fix |
|---|---|---|---|---|---|
| Product SEO logic duplicated | Metadata and schema were assembled directly in the product page | Duplication causes canonical, title, image, and schema drift | `src/app/shop/[slug]/page.tsx` | P0 | Centralized in `src/lib/seo.ts` and `src/lib/schema.ts` |
| Product title could repeat brand | Catalogue titles ending in “ArtLoka” also inherited the root title template | Repeated brands reduce clarity in search snippets | `src/lib/seo.ts` | P0 | Strip only a terminal ArtLoka suffix before applying the template |
| Product breadcrumbs used a fragile collection URL | Category was lowercased without shared slug logic | Breadcrumb URLs could differ from real collection paths | Product JSON-LD | P0 | Use Home → Shop → Product until a canonical taxonomy registry exists |
| Offer link lacked campaign attribution | Visible Etsy CTA and Offer URL used the source link directly | SKU-level handoff measurement was incomplete | Product page and schema | P0 | Add stable UTM parameters while preserving the Etsy destination |
| Sitemap dates changed on every request/build invocation | `new Date()` was used for every entry | False freshness signals make change detection less useful | `src/app/sitemap.ts` | P0 | Use normalized catalogue generation time |
| Robots policy did not protect operational APIs | All paths were allowed | Public APIs unrelated to discovery need not be crawled | `src/app/robots.ts` | P1 | Allow the site, disallow `/api/`, declare host and sitemap |
| Manifest was a hand-maintained public file | Valid but separate from App Router metadata | Framework-owned metadata is easier to type-check and maintain | `public/site.webmanifest` | P1 | Replace with `src/app/manifest.ts` |
| LLM guide was static | Product links could become stale after catalogue sync | AI-facing product facts should match public catalogue state | `public/llms.txt` | P0 | Generate `/llms.txt` and `/llms-full.txt` from publishable products |
| No public structured catalogue feed | Product data was available only in rendered pages | A safe feed improves machine access and reuse | `/products.json` | P1 | Add read-only feed excluding QA notes, source tags, and SEO keywords |
| Collection coverage is taxonomy-derived only | Routes exist for current category/style/room values | Requested demand collections need editorial definitions and non-thin copy | `src/app/collections/[collection]/page.tsx` | P1, next PR | Add an explicit collection registry mapped to existing products |
| Country-intent pages are absent | No `/global/*` routes | Useful global buying guidance is missing | `src/app/global/*` | P1, later PR | Add factual USA/UK/India pages without localization or stock claims |
| Image filenames are SKU-based | Names are stable but not descriptive | Context relies mostly on alt text | `public/assets/products` | P2 | Rename only through a controlled manifest migration to avoid broken URLs |
| Product cards/filter events are incomplete | Etsy and enquiry events exist; card/filter events need review | Discovery funnel measurement is partial | `src/components` and `src/lib/analytics.ts` | P1, next PR | Add product-card and filter events with bounded parameters |

## Metadata strategy

| Page type | Title pattern | Description focus | Canonical and social image |
|---|---|---|---|
| Homepage | `Handcrafted Indian Lighting and Decor for Modern Homes | ArtLoka` | Brand position, India provenance, product discovery | `/`; brand social image |
| Shop | `Shop Handcrafted Lighting and Decor | ArtLoka` | Browse by product type, room, material, and style; Etsy handoff | `/shop`; brand or signature product image |
| Product | `{clean product name} | ArtLoka` | Catalogue meta description, otherwise a bounded product-description excerpt | `/shop/{slug}`; first approved product image |
| Collection | `{Editorial collection name} | ArtLoka` | Product set, material/room/style intent, and evaluation value | `/collections/{slug}`; first suitable product image |
| Craftsmanship | `Indian Craftsmanship and Materials | ArtLoka` | Materials, hand-finishing, production, and specification review | `/craftsmanship`; future editorial craft image |
| About | `About ArtLoka | ArtLoka` | Brand bridge between Indian heritage craft and contemporary living | `/about`; brand image |
| Trade & Gifting | `Trade, Hospitality and Bulk Gifting | ArtLoka` | Designers, hospitality, bulk, custom, and gifting enquiries | `/trade`; future project image |
| Contact | `Contact ArtLoka | ArtLoka` | Product questions and structured enquiries | `/contact`; brand image |

Every public page uses a unique title, description, self-referencing canonical, Open Graph data, and Twitter summary card. Product claims come only from normalized catalogue fields.

## File-by-file roadmap

- `src/lib/seo.ts`: site configuration, absolute URLs, page/product metadata, and Etsy attribution.
- `src/lib/schema.ts`: Organization, WebSite/SearchAction, Product/Offer, BreadcrumbList, graph composition, and safe serialization.
- `src/app/layout.tsx`: global metadata base, title template, icons, robots defaults, and manifest reference.
- `src/app/sitemap.ts`: static, collection, and publishable product discovery URLs.
- `src/app/robots.ts`: crawler access and canonical sitemap declaration.
- `src/app/manifest.ts`: typed web-app identity and icons.
- `src/app/shop/[slug]/page.tsx`: product `generateMetadata`, Product/Offer, breadcrumbs, and attributed Etsy handoff.
- `src/app/collections/[collection]/page.tsx`: collection metadata, CollectionPage, ItemList, and breadcrumbs.
- `src/app/llms.txt/route.ts`: concise brand and page map.
- `src/app/llms-full.txt/route.ts`: expanded public product and purchasing context.
- `src/app/products.json/route.ts`: safe public machine-readable catalogue.
- Next PR: add an editorial collection registry for the eight requested demand collections, then use it for routing, copy, metadata, sitemap entries, and internal links.
- Later PR: add `/global/usa`, `/global/uk`, and `/global/india` with compatibility caveats grounded in individual product records and Etsy as the authority for commercial terms.
