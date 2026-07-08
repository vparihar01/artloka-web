# Deployment and Release Process

## Branching
- `main`: production branch
- `feature/<milestone>`: Codex or developer work
- Pull request: review and Vercel preview

## First import to Codex
1. Create a private GitHub repository.
2. Push this starter to `main`.
3. Connect GitHub to Codex for cloud/review workflows, or open the cloned folder locally in the Codex app.
4. Confirm Codex loaded `AGENTS.md` by asking it to summarize active repository instructions.
5. Start Milestone 0 from `docs/CODEX_EXECUTION_PLAN.md`.

## First Vercel deployment
1. Import the GitHub repository into Vercel.
2. Framework preset: Next.js.
3. Add environment variables for Preview and Production.
4. Keep `CATALOG_MODE=preview` during content QA.
5. Deploy and review the generated preview URL.
6. Configure the verified sending domain for Resend.
7. Add the production domain only after launch criteria pass.
8. Set `CATALOG_MODE=strict` for Production.

## Catalogue updates
1. Update the approved Google Drive Excel file.
2. Run a preview deployment or trigger the configured deploy hook.
3. Review catalogue sync warnings and the Vercel preview.
4. Merge/approve only when claims, images and links are correct.
5. Roll back from Vercel if a bad catalogue reaches production.

## Environment separation
Use different values for Preview and Production where appropriate, especially:
- `CATALOG_MODE`
- `NEXT_PUBLIC_SITE_URL`
- `ENQUIRY_TO_EMAIL`
- analytics identifiers
- deploy hooks

## Domain cutover
- Add the domain to Vercel.
- Configure DNS.
- Verify HTTPS and canonical URLs.
- Submit the sitemap to Search Console.
- Test Etsy links and enquiries from the live domain.
