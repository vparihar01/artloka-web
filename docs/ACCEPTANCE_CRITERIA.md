# Launch Acceptance Criteria

## Catalogue
- Every public product is approved and has a unique SKU and slug.
- Every product has approved imagery and alt text.
- Etsy URLs resolve to the intended listing.
- Materials, dimensions, finish and electrical claims are verified.
- Review and blocked products are absent in strict mode.

## Experience
- No horizontal scrolling at target widths.
- Navigation and filtering work by keyboard.
- Product discovery works by type, room, style and material.
- Every product page has a clear Etsy CTA and enquiry option.
- Visitors understand that checkout occurs on Etsy.

## Trust and conversion
- Craftsmanship and founder story are visible but do not block product discovery.
- Trade, gifting, hospitality and custom forms capture structured requirements.
- Form success, failure and spam handling are tested.

## SEO and measurement
- Unique title, description and canonical URL for public pages.
- Sitemap and robots are valid.
- Structured data validates without critical errors.
- Etsy clicks and enquiry conversions are measurable.

## Engineering
- No client-exposed secrets.
- `npm run verify` passes.
- Vercel preview and production deployments succeed.
- A rollback path is documented and tested.
