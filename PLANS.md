# Execution Plan: Catalogue Listing Status and Image Ratios

## Goal
Update the website catalogue from the new workbook while preserving previously synced listings, using image aspect ratios for less-cropped product presentation, and keeping SEO/share metadata strong.

## Context
- New workbook: `/Users/vivek.parihar/Downloads/ArtLoka_Website_Sync (1).xlsx`
- Current local development source: `data/source/ArtLoka_Product_Catalog_Full_ALK006-032.xlsx`
- `Products` now includes `Listing Status`; rows marked `Done` represent already-built listings.
- `Images` now includes `Listing Status` and `Aspect Ratio`; rows marked `Listed` represent already-built image rows.
- Current local product assets only cover earlier SKUs under `public/assets/products`.

## Constraints
- Do not remove previously built products just because the new workbook marks them `Done`.
- Do not use Google Drive image URLs directly as production product images.
- Preserve server-side catalogue generation; never read workbook during page requests.
- Do not invent product claims or silently discard malformed rows.
- Use image aspect ratios in rendering without causing layout shifts.
- Keep share metadata absolute and image-backed.

## Work breakdown
- [x] Discovery and impact analysis
- [x] Replace local workbook snapshot
- [x] Add Listing Status merge/skip behavior
- [x] Add image Aspect Ratio parsing and schema
- [x] Apply aspect ratios to product imagery UI
- [x] Recheck SEO/share metadata paths
- [x] Tests and verification
- [x] Documentation

## Acceptance criteria
- New non-done product rows are added to generated catalogue.
- Existing done products remain available from prior generated data.
- Listed image rows are not reprocessed; new image rows include aspect ratio metadata when local files exist.
- Product card, homepage hero and product gallery containers respect image aspect ratios.
- Missing local images produce SKU-specific warnings.
- Product pages retain canonical metadata, Open Graph/Twitter images and structured data.
- `npm run verify` passes.

## Risks and rollback
- New Drive image URLs require authenticated access in this environment; local product assets may need to be added separately.
- Product rows with approved image status but missing local images will publish with placeholders in preview unless strict-mode policy is later tightened.
- Rollback is restoring the previous workbook snapshot and generated catalogue.

## Verification record
- `npm run catalog:sync` passed and generated 13 products.
- `npm run lint` passed.
- `npm run typecheck` passed.
- `npm test` passed with 5 tests.
- `npm run verify` passed; production build generated 25 pages.
- Built HTML spot check confirmed product canonical, Open Graph/Twitter image tags and ratio-aware image containers.
- Remaining sync warnings: 57 new image rows for `ALK-001`, `ALK-030`, `ALK-031`, `ALK-021` and `ALK-002` do not yet have matching local files in `public/assets/products`, causing 5 `no approved images found` warnings.
- Follow-up fix: product cards now use a uniform 4:5 image frame with `object-contain` so the grid remains aligned.
- Added `npm run images:download`; current local run is blocked because `GOOGLE_SERVICE_ACCOUNT_EMAIL` is empty in `.env.local`.
- Product detail pages now show one hero image with a horizontal thumbnail selector for every gallery image instead of limiting display to the first five images.
- Product gallery follow-up: desktop now uses an Etsy-style left thumbnail scroller with a stable main image frame to prevent page jumps while switching images.
