# Codex Execution Plan

Use one thread and one pull request per milestone. Begin each milestone in Plan mode. Do not ask Codex to “build the entire website” in one task.

## Milestone 0 — Repository audit
**Prompt**
> Read AGENTS.md and all files in docs/. Run the current verification commands. Audit the implementation against the requirements and create a prioritized gap report. Do not change production code except to fix setup blockers. Record findings in docs/AUDIT.md.

Done when the repo installs, the catalogue sync runs and the current build status is documented.

## Milestone 1 — Catalogue contract and quality gates
**Prompt**
> Implement the full catalogue publication contract. Add explicit support for workbook fields Publish Status, Publish on Website, Product Slug, Primary Category, Featured, Bestseller, Sort Order, Hero Image URL, QA Status, Last Reviewed and Approved By while preserving backward compatibility with the current workbook. Generate a human-readable QA report during sync. Fail strict production builds when an intended published product lacks a valid Etsy URL, hero image, title, description, dimensions required by category, or has blocked QA. Add tests for duplicate SKUs, duplicate slugs, malformed URLs, missing images and review status.

## Milestone 2 — Brand design and global shell
**Prompt**
> Build the production ArtLoka design system from docs/DESIGN_SYSTEM.md. Improve header, mobile navigation, footer, typography, spacing, buttons, cards, focus states and responsive behavior. Create reusable section primitives. Do not add generic gradients or dashboard styling. Verify 390, 768, 1280 and 1440 widths.

## Milestone 3 — Product discovery
**Prompt**
> Implement product-type navigation, collection landing pages, filters for room/style/material/occasion, URL-synchronized filter state, search, clear filters, empty states and accessible mobile filtering. Each product must have one canonical product URL even when it appears in many collections. Add tests for filter combinations and canonical routing.

## Milestone 4 — Product detail and conversion
**Prompt**
> Complete the product page: approved image gallery, dimensions, finishes, regional electrical details, craftsmanship note, room/style context, related products, Etsy outbound CTA and custom enquiry CTA. Add Product, BreadcrumbList and Organization structured data. Track Etsy clicks with SKU, page, collection/referrer context and CTA position. Do not imply that the website processes payment.

## Milestone 5 — Brand and editorial pages
**Prompt**
> Build and refine Home, Craftsmanship, About/Founder Story, Made in India, Gifting, Trade/Designers and Hospitality pages using the approved ArtLoka narrative. Keep the homepage product-led. Add internal links from editorial pages into relevant collections and products.

## Milestone 6 — Enquiries
**Prompt**
> Build separate structured flows for general, custom, bulk, corporate gifting, trade and hospitality enquiries. Add spam protection, server validation, useful confirmation, email routing and a privacy/consent statement. Preserve product SKU and referring page in the submission. Add success and failure analytics events.

## Milestone 7 — SEO and analytics
**Prompt**
> Complete metadata, canonical URLs, sitemap, robots, Open Graph assets, image alt text, structured data validation, Search Console readiness, Google Analytics events and a documented measurement plan. Add reports for Etsy outbound clicks and enquiry conversions by landing page and product.

## Milestone 8 — Google Drive publishing workflow
**Prompt**
> Productionize the Google Drive Excel workflow. Improve credential errors, file revision logging, deterministic output, change summary, QA report artifact and deploy-hook refresh. Ensure the site can roll back to the last valid generated catalogue when the new workbook is invalid. Document how the catalogue owner updates, reviews and publishes products.

## Milestone 9 — Launch hardening
**Prompt**
> Perform a release audit covering accessibility, Core Web Vitals, broken links, external Etsy links, security headers, secret exposure, form abuse, responsive design, metadata, structured data and strict catalogue mode. Fix high-confidence issues, run npm run verify and produce docs/LAUNCH_REPORT.md with blockers and sign-off items.
