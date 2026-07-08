# ArtLoka — Codex-Ready Vercel Website

A Next.js starter repository for ArtLoka's product-discovery, brand-storytelling and enquiry website.

## Business model
- ArtLoka website: discovery, SEO, product education, trust and qualified enquiries.
- Etsy: standard product checkout and purchase completion.
- Website forms: custom, bulk, gifting, trade and hospitality opportunities.

## Start locally
```bash
cp .env.example .env.local
npm install
npm run catalog:sync
npm run dev
```
Open `http://localhost:3000`.

The local catalogue sync uses `data/source/ArtLoka_Product_Catalog_Full_ALK006-032.xlsx`. When Google Drive credentials are present, the same script downloads the latest Excel file from Drive instead.

## Put the project into Codex
1. Unzip this folder and create a private Git repository.
2. Commit the initial files to `main`.
3. Open the repository folder in the Codex app, IDE extension or CLI.
4. Ask Codex to read `AGENTS.md`, `docs/PRODUCT_REQUIREMENTS.md`, `docs/ARCHITECTURE.md` and `docs/CODEX_EXECUTION_PLAN.md`.
5. Use one Codex thread per milestone or pull request.
6. Require `npm run verify` before accepting a milestone.

Suggested first Codex prompt:

> Work in Plan mode. Read AGENTS.md and all files in docs/. Audit the current starter against Milestone 1 in docs/CODEX_EXECUTION_PLAN.md. Create an execution plan, identify unsupported catalogue claims, then implement only Milestone 1. Do not add on-site checkout. Run npm run verify and report changed files, test results and remaining risks.

## Catalogue modes
- `CATALOG_MODE=preview`: displays products still marked for review. Use for staging.
- `CATALOG_MODE=strict`: displays only approved or published products. Use for the public production domain after QA fields are added to the workbook.

## Google Drive catalogue sync
The source is an Excel Office file stored in Google Drive, not a native Google Sheet. The build uses Google Drive API download access and parses the workbook with ExcelJS.

Required environment variables:
- `GOOGLE_DRIVE_FILE_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

Share the Drive file with the service-account email as Viewer. Never commit the private key.

## Enquiry forms
Configure:
- `FORMSPREE_ENQUIRY_ENDPOINT`

The default endpoint is `https://formspree.io/f/xdarvrqq`. Set the environment variable when using a different Formspree form for preview or production.

## Analytics and SEO
Configure:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

The default Google Analytics measurement ID is `G-KCB532YQ7Q`. Set `NEXT_PUBLIC_SITE_URL` to the final public domain before launch so canonical URLs, sitemap entries, structured data and LLM discovery files do not point at a preview URL.

## Deploy to Vercel
1. Push the repository to GitHub.
2. Import it into Vercel.
3. Add the environment variables from `.env.example`.
4. Deploy first with `CATALOG_MODE=preview` to a preview/staging URL.
5. Run content, image, electrical-specification and claims QA.
6. Change to `CATALOG_MODE=strict` before attaching the public domain.
7. Create a Vercel Deploy Hook and save it as `VERCEL_DEPLOY_HOOK_URL` if daily catalogue refresh deployments are required.

Vercel will create a preview deployment for pull requests and a production deployment when approved changes reach the production branch.

## Verification
```bash
npm run verify
```
This runs lint, TypeScript checking, tests, catalogue sync and the production build.

## Documentation map
- `docs/PRODUCT_REQUIREMENTS.md` — business, audience and site requirements
- `docs/ARCHITECTURE.md` — system and data-flow decisions
- `docs/CATALOG_DATA_DICTIONARY.md` — workbook-to-site field mapping
- `docs/DESIGN_SYSTEM.md` — brand and interface direction
- `docs/CODEX_EXECUTION_PLAN.md` — milestone-by-milestone prompts
- `docs/DEPLOYMENT.md` — GitHub, Codex and Vercel release process
- `docs/ACCEPTANCE_CRITERIA.md` — launch gate
