# ArtLoka Premium Experience Plan

## Experience Principles
- Product imagery, specifications and material confidence lead every major page.
- The site should feel like a quiet interiors gallery, not a marketplace, discount catalogue or software dashboard.
- Indian heritage is expressed through provenance, materials, hand-finishing, product story and founder intent rather than decorative motifs.
- Purchase intent is supported by clear Etsy handoff and structured enquiry routes; ArtLoka does not process checkout.
- Current catalogue products are business-approved for this design slice. Existing QA notes remain documented content risks until the catalogue is cleaned.

## Recommended Art Direction
Quiet editorial interiors gallery: warm ivory foundations, charcoal text, antique brass accents, oxblood details, stone surfaces, fine borders and restrained spacing. Pages should have the calm of a design publication with the utility of a high-consideration product evaluation tool.

## Typography System
- Display: editorial serif stack for hero headlines, product titles and section titles.
- Body: modern system sans stack for readable specifications, forms and navigation.
- Small caps/eyebrow text: restrained uppercase with modest tracking.
- Product and specification text must stay compact enough for mobile without feeling dense.

## Color Tokens
- `--color-ivory`: primary warm background.
- `--color-parchment`: secondary surface.
- `--color-stone`: quiet band and image matte.
- `--color-charcoal`: primary text.
- `--color-ink`: deep contrast text and footer surfaces.
- `--color-brass`: primary accent.
- `--color-brass-dark`: action and hover accent.
- `--color-oxblood`: editorial emphasis.
- `--color-sage`: secondary craft accent.
- `--color-line`: fine borders.

## Spacing And Grid
- Use a 12-column editorial grid on desktop and a single-column mobile flow.
- Use generous vertical rhythm for homepage and product pages, but keep product decision content close together.
- Avoid cards inside cards. Product cards are permitted as repeated product objects; page sections should be full-width bands or unframed layouts.
- Keep border radii subtle, normally 0 to 8px.

## Image Art Direction
- Use approved local product images from `public/assets/products`.
- Favor large editorial crops, visible object scale and a mix of lifestyle, detail and hero imagery.
- Do not use AI-generated substitutes as factual product images.
- Do not show the SVG product placeholder as final content.
- Current images are locally available and visually strong, but workbook image status still says pending; treat final image approval as a launch risk.

## Motion Rules
- Motion should be minimal: opacity, color and small transform states only.
- No autoplay carousel.
- Respect `prefers-reduced-motion`.
- Do not delay product understanding behind animation.

## Component Inventory
- Global shell: header, mobile navigation, footer, skip link and focus states.
- Product discovery: product card, product grid, filters/search.
- Product decision: gallery, summary, Etsy CTA, enquiry CTA, specifications, finish list, room/style guidance, handmade note, related products.
- Editorial support: craft/founder bands and trade/gifting enquiry entry points.

## Page Architecture
- Homepage: 70% product discovery through hero, signature pieces, shop by room/material, product-led editorial moments; 30% craft, founder and trust content.
- Shop: searchable catalogue with product-led cards and restrained filters.
- Product page: large gallery and persistent decision summary on desktop; specifications and story remain visible without overusing accordions.
- Brand pages: support trust and provenance without overpowering products.

## Risk And Missing-Asset Register
- No decor or sculpture products exist in the current catalogue; do not invent a decor/sculpture page.
- All current products are Lighting.
- Existing source QA notes mention material, socket, dimension, duplicate-listing and price conflicts. User has approved products for design progress, but strict launch should still clean these notes.
- Logo assets are raster files only; use supplied transparent variants and optimize presentation without distorting the mark.
- Some brand-image filenames are generic `transparent-Photoroom`; keep a future task to rename and document approved brand assets.
