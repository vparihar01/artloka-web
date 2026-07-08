# Architecture

## System context
```text
ArtLoka Excel catalogue in Google Drive
              ↓ build-time download
       Catalogue sync and validation
              ↓ normalized JSON
        Next.js website on Vercel
        ↙                     ↘
 Etsy outbound purchase       Enquiry API → email
```

## Core decision
The Excel workbook is the product-information source, not the live serving database. The site must never fetch or parse the workbook during an ordinary customer request.

## Catalogue pipeline
1. `npm run catalog:sync` checks for Google Drive credentials.
2. When configured, it downloads the Office file by Drive file ID.
3. Otherwise, it uses the local development snapshot under `data/source/`.
4. ExcelJS reads the `Website Catalog` worksheet.
5. The adapter maps human headers into the typed product schema.
6. Zod validates every product.
7. Invalid rows are skipped with SKU-specific warnings.
8. Normalized data is written to `src/data/generated/products.json`.
9. Next.js builds static and server-rendered pages from this normalized catalogue.

## Why build-time sync
- Customer requests do not depend on Google Drive uptime or latency.
- Broken rows cannot corrupt the public experience.
- Product pages remain fast and cacheable.
- Every catalogue revision creates a traceable deployment.
- Rollback means selecting an earlier Vercel deployment or Git commit.

## Publication model
Phase one supports `preview` and `strict` catalogue modes. The workbook should later add explicit fields for status, approval, slug, hero image and merchandising. Until those fields exist, source rows with QA notes are mapped to `review`; rows without QA notes are mapped to `approved`.

## Security boundaries
- Service-account credentials are server/build secrets only.
- The Drive file is shared read-only with the service account.
- Enquiry inputs are server-validated.
- Email and deploy-hook credentials never use a `NEXT_PUBLIC_` prefix.
- Etsy external links use `noopener noreferrer`.
- Production errors must not reveal secrets or internal workbook data.

## Future evolution
Move from generated JSON to managed storage only when one of these becomes true:
- Catalogue changes must appear without a deployment.
- Multiple editors need row-level workflow and audit history.
- Regional pricing or availability becomes dynamic.
- The collection grows enough to require server-side faceted search.
- Resellers or authenticated trade users need private content.
