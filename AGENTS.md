# ArtLoka Repository Instructions

## Mission
Build a premium, fast, accessible product-discovery website for ArtLoka. The site is not the transaction system. Visitors discover and evaluate products here, then complete standard purchases on the official Etsy listing. Bulk, trade, hospitality, gifting and custom requirements use structured enquiry forms.

## Product rules
- Never add an on-site cart or checkout unless the owner explicitly changes the business model.
- Every purchasable product must have a visible external Etsy CTA.
- Keep the homepage product-led: roughly 70% collection discovery and 30% trust/storytelling.
- Organize primarily by product type; rooms, styles, materials and occasions are secondary discovery paths.
- Primary first-year audience: individual homeowners, then gift buyers. Trade and hospitality are high-value secondary audiences.
- Brand position: “Heritage Craftsmanship. Styled for Modern Living.”
- Tone: premium, warm, elegant, artistic, minimal, globally understandable and authentically Indian.

## Catalogue rules
- `data/source/ArtLoka_Product_Catalog_Full_ALK006-032.xlsx` is the local development snapshot.
- In deployed builds, prefer the Google Drive file configured through environment variables.
- Never read the workbook during a customer page request. Generate normalized JSON before the build.
- Do not publish rows marked draft, archived or blocked in strict catalogue mode.
- Do not silently discard malformed rows. Add a clear warning with SKU and reason.
- Never invent materials, electrical specifications, dimensions, certifications, availability or shipping claims.
- Keep QA notes internal in strict production mode.
- Product slugs must be stable and unique.

## Engineering stack
- Next.js App Router, TypeScript, React and Tailwind CSS.
- Server Components by default. Use Client Components only for interactivity.
- Validate external inputs and catalogue records with Zod.
- Keep secrets server-side. Never expose service-account keys, Resend keys, deploy hooks or cron secrets to the browser.
- Prefer small composable components over page-sized monoliths.
- Preserve semantic HTML, keyboard access, visible focus and useful alt text.

## Commands
- Install: `npm install`
- Sync catalogue: `npm run catalog:sync`
- Development: `npm run dev`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Tests: `npm test`
- Production build: `npm run build`
- Full verification: `npm run verify`

## Workflow
1. Read the relevant files in `docs/` before coding.
2. For multi-step tasks, update or create an execution plan from `PLANS.md`.
3. Make the smallest coherent change that satisfies the task.
4. Run lint, typecheck and targeted tests.
5. Run a production build before declaring a milestone complete.
6. Summarize files changed, decisions made, tests run and remaining risks.

## Definition of done
- The requested behavior works on 390px, 768px, 1280px and 1440px widths.
- No horizontal scrolling.
- No secret values in source, logs or client bundles.
- SEO metadata is present for public pages.
- Etsy links open safely in a new tab and emit the outbound analytics event.
- Forms validate on both client and server and fail safely.
- `npm run verify` passes.
