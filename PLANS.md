# Execution Plan: SEO, Favicon and Analytics

## Goal
Make ArtLoka easier to discover in Google Search and AI/LLM answer surfaces, while ensuring favicon and Google Analytics deploy reliably.

## Context
- App shell and metadata live in `src/app/layout.tsx`.
- Public page metadata exists but is minimal.
- Product pages already include Product/Breadcrumb/Organization JSON-LD.
- Existing GA code depends on `NEXT_PUBLIC_GA_MEASUREMENT_ID`, but the provided ID was not configured in source defaults.
- Logo assets exist in `public/images/`; no root favicon/icon files are present.

## Constraints
- Do not invent materials, certifications, shipping, stock, reviews or availability claims.
- Standard purchases continue on Etsy; no on-site cart or checkout.
- Structured data must match visible content.
- Keep secrets server-side. The GA measurement ID and favicon files are public.
- Optimize for USA and UK customers through honest language, metadata, electrical-context discoverability and canonical product pages.

## Work breakdown
- [x] Discovery and impact analysis
- [x] Favicon and app icon assets
- [x] Google Analytics setup
- [x] Metadata and structured-data improvements
- [x] LLM discovery file
- [x] Tests and verification
- [x] Documentation

## Acceptance criteria
- Root favicon and app icons are deployable from `public/`.
- Layout advertises favicon/icon/apple icon metadata.
- GA loads with measurement ID `G-KCB532YQ7Q`.
- Public pages have clear titles, descriptions, canonical URLs and social metadata.
- Product and collection pages expose improved server-rendered JSON-LD.
- `/llms.txt` is available for LLM-oriented discovery.
- `npm run verify` passes.

## Risks and rollback
- Search appearance and favicon display depend on Google recrawling after deployment.
- Organic visibility depends on domain authority, content depth and external signals beyond code.
- Rollback is restoring prior metadata/layout files and removing generated icon files.

## Verification record
- `npm run verify` passed.
- Catalogue sync generated 8 products with 0 warnings during the production build.
- Icon assets were generated and validated locally: `favicon.ico`, `favicon-48x48.png`, `icon.png`, `apple-icon.png`.
