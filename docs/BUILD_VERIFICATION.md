# Build Verification

Verified on 2026-07-08 with Node.js 22.

- Catalogue sync: passed, 32 products generated
- ESLint: passed
- TypeScript: passed
- Node test suite: 4 tests passed
- Dependency audit: 0 known vulnerabilities at moderate severity or higher
- Next.js production build: passed, 44 static/generated pages including 32 product routes
- Local HTTP smoke test: homepage, shop and representative product page passed

The first production deployment must still complete content, claims, image, form-delivery and live-domain QA described in `ACCEPTANCE_CRITERIA.md`.
