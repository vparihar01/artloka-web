# Execution Plan: Technical SEO Foundation

## Goal
Ship the first Mountain Loop PR: reliable App Router metadata, crawl controls, machine-readable schema helpers, product metadata, and public LLM/catalogue feeds without changing the site structure or inventing product claims.

## Constraints
- Use only normalized, publishable catalogue data.
- Keep Etsy as the transaction authority and do not imply availability, shipping, certification, or local stock.
- Preserve existing routes and visual design.
- Keep canonical URLs on `https://www.artloka.shop` unless explicitly configured.

## Work breakdown
- [x] Audit routes, metadata, sitemap, robots, schema, catalogue model, and current LLM file
- [x] Centralize metadata and JSON-LD helpers
- [x] Harden product and collection metadata/schema
- [x] Add App Router sitemap, robots, and manifest foundations
- [x] Add generated `/llms.txt`, `/llms-full.txt`, and safe `/products.json`
- [x] Add targeted SEO tests and run full verification

## Acceptance criteria
- Every publishable product URL is represented in the sitemap.
- Product pages have unique canonical, Open Graph, Twitter, Product, Offer (when price exists), and BreadcrumbList data.
- Homepage Organization and WebSite data remains valid.
- `/robots.txt` allows major crawlers and points to the canonical sitemap.
- `/manifest.webmanifest`, `/llms.txt`, `/llms-full.txt`, and `/products.json` build successfully.
- Public product feed excludes internal QA, tags, SEO keyword lists, and source metadata.
- `npm run verify` passes.

## Risks
- Catalogue dates currently have only a generated timestamp, so sitemap `lastModified` reflects the normalized catalogue snapshot rather than per-product editorial dates.
- Offer availability is intentionally omitted because the catalogue does not verify live Etsy availability.

## Verification record
- `npm run verify` passed.
- Catalogue sync generated 13 products with 0 warnings.
- ESLint and TypeScript passed.
- 7 tests passed, including canonical/UTM and Product/Offer schema coverage.
- Next.js production build generated 29 routes/pages, including all 13 product routes and every new machine-readable endpoint.
