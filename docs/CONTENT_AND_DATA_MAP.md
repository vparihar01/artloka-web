# ArtLoka Content And Data Map

## Catalogue Field Destinations

| Source field | Destination | Rule |
|---|---|---|
| SKU (ArtLoka) | Visible product context, analytics, enquiries, structured data | Show near product title; include in Etsy click analytics. |
| Original Etsy Title | Internal traceability | Do not use as visible H1 when SEO Website Title exists. |
| SEO Website Title | Product card title, product H1, metadata title | Primary public name. |
| Meta Description | Page metadata and Open Graph description | Do not repeat mechanically as visible body copy. |
| Website Description | Product narrative | Use as main product story and decision copy. |
| Etsy URL | Purchase CTA and outbound analytics | Open safely in a new tab; no on-site checkout. |
| Price USD | Visible decision information and structured data | Display as USD estimate; final price confirmed on Etsy. |
| Materials | Product confidence, filters, metadata | Show prominently; never overstate material certainty beyond source. |
| Width / Height / Depth | Technical specifications | Format as W x H x D in inches. |
| Canopy/Backplate Size | Lighting technical specs | Show when present; do not hide “confirm” notes in preview mode. |
| Finish Options | Product options | Present as finishes, not live inventory. |
| Bulb / Socket US | Lighting technical specs | Show for lighting products. |
| Bulb / Socket UK/EU | Lighting technical specs | Show for lighting products. |
| Style / Category | Taxonomy, breadcrumbs, filters, related products | Use for discovery and product context. |
| Room Suitability | Placement guidance and filters | Show as room context, not guaranteed suitability. |
| Special Features | Product-specific value details | Show as concise decision points. |
| Handmade Note | Craft/provenance block | Use only as provided. |
| Etsy Tags | Internal search synonyms | Never render as visible keyword list. |
| Website SEO Keywords | Metadata/search/content planning | Never render as visible keyword list. |
| Image Status | Internal/QA status | Document as launch risk; do not expose as final customer copy. |
| QA Notes / Flags | Internal QA | Keep out of final strict customer experience; may be visible in preview/admin-style notices only. |
| Images worksheet | Product gallery and alt text | Use approved local image derivatives under `public/assets/products`. |

## Current Catalogue Coverage
- Products: 8
- Product type coverage: Lighting only
- Approved local images: 89
- Generated product image references: local assets only
- Decor/sculpture representative: blocked until the catalogue contains a real SKU

## Customer-Facing Copy Boundaries
- Use “designed and made in India” and “handmade/hand-finished” only where supported by provided source content.
- Do not claim live inventory, shipping timelines, reviews, scarcity, certifications or sustainability unless explicitly verified.
- Avoid discount-led language and marketplace phrasing.
- Keep Etsy as the final transaction authority for price, taxes, shipping and policies.

## Analytics And Integration
- Etsy click events should include SKU, title and CTA location.
- Product enquiry links should preserve SKU when available.
- Search can use title, description, materials, styles, rooms, Etsy tags and SEO keywords internally, but keyword lists remain hidden.
