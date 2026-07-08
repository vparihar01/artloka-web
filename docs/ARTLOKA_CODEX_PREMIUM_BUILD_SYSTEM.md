# ArtLoka — Codex Premium Website Build System

## 1. First prompt to give Codex

Paste the following into Codex in **Plan mode** from the root of the ArtLoka repository.

```text
Act as a senior luxury-brand creative director, premium home-interiors ecommerce UX lead, conversion strategist, content editor, accessibility specialist, and principal Next.js engineer.

Read before doing any work:
- AGENTS.md
- PLANS.md
- START_HERE.md
- every file in docs/
- the current application under src/
- the product catalogue under data/source/
- all files under public/ and the uploaded ArtLoka brand-assets folder

Do not start by redesigning everything. First understand the brand, catalogue, customer journey, technical constraints, and current implementation.

MISSION
Transform the current ArtLoka starter into a highly premium, internationally credible, design-led product-discovery website for high-consideration handcrafted décor and lighting.

The desired feeling is:
- quiet confidence rather than loud luxury
- editorial and gallery-like rather than marketplace-like
- tactile, warm and human rather than glossy or synthetic
- authentically Indian through provenance, material, craftsmanship and story—not through ornamental clichés
- modern enough for premium global homes, interior designers, boutique hospitality and gifting buyers

BUSINESS MODEL
- ArtLoka is the official brand, storytelling, product-evaluation and enquiry website.
- Standard purchases are completed on the corresponding official Etsy listing.
- The website must not add an on-site cart or checkout.
- Bulk, custom, gifting, trade, hospitality and designer requirements use structured enquiries.
- Primary audience in year one: individual homeowners and décor collectors.
- Secondary audience: gift buyers.
- High-value audience: interior designers, architects, hospitality and corporate buyers.

BRAND POSITIONING
Primary line: “Heritage Craftsmanship. Styled for Modern Living.”

Core narrative:
ArtLoka brings authentic Indian artistry into contemporary spaces through artisan-made and hand-finished décor and lighting. The brand bridges cultural memory, material intelligence and clean global design. Products are designed and made in India and presented for discerning homes around the world.

Founder narrative:
Vivek founded ArtLoka to bridge traditional Indian craftsmanship with modern, globally relevant interiors. The founder story should add authenticity and intent, but the product and craft must remain the heroes.

CONTENT-TONE RULES
- Write with restraint, specificity and confidence.
- Use short, considered sentences and strong editorial hierarchy.
- Avoid emojis, checkmark lists, sales hype, generic “elevate your space” repetition, fake urgency, unsupported superlatives and marketplace language.
- Do not use “affordable premium look”, “accessible to all”, “cheap”, “best price” or discount-led positioning.
- Replace mass-market language with material, provenance, process, placement and emotional longevity.
- Never invent artisan biographies, heritage age, certifications, production methods, scarcity, delivery timelines, reviews, guarantees or sustainability claims.
- Use “own workshop”, “master artisans”, “ethical”, “heirloom”, “collectible” or similar claims only when explicitly supported by approved source content.

PREMIUM VISUAL DIRECTION
Create a restrained, editorial, high-end interiors experience:
- warm ivory, parchment, stone, charcoal, deep oxblood/burgundy, antique brass and muted botanical accents
- large, carefully cropped product imagery
- generous whitespace and deliberate pacing
- an editorial serif for display typography paired with a clean modern sans-serif for body text
- subtle lines, fine borders and disciplined spacing
- selective motion only where it improves storytelling
- no generic gradients
- no glassmorphism
- no excessive rounded cards or pill buttons
- no SaaS/dashboard visual language
- no decorative Indian clichés, stock mandalas, paisley patterns or temple motifs unless directly related to a specific product
- no auto-playing carousel
- no animation that delays product understanding or harms reduced-motion users

LOGO AND ASSET RULES
- Inventory every supplied logo and asset.
- Do not redesign, distort, recolour or redraw the ArtLoka mark without approval.
- Select one primary transparent wide logo for the header, one square asset for social/favicons, and only the minimum additional variants required.
- Generate optimized web derivatives while preserving the approved original files.
- The current uploaded asset pack appears to contain brand-logo variants, not a complete premium product-photography library. Treat missing product, detail, scale and lifestyle photography as a launch blocker, not as permission to invent images.
- Never use AI-generated substitutes as factual product images.

CATALOGUE AS SOURCE OF TRUTH
Use every useful catalogue field intentionally, but do not dump raw spreadsheet data onto the page.

Fields and required use:
1. Original Etsy Title
   - preserve internally for traceability and Etsy mapping
   - do not use as the main website heading when SEO Website Title exists
2. SEO Website Title
   - primary product-page H1, product-card title and canonical naming source
3. Meta Description (~160 char)
   - metadata and search snippets; do not repeat mechanically in visible body copy
4. Website Description (Full)
   - main editorial product narrative
5. Etsy URL
   - official purchase CTA; validate URL and track outbound click
6. Price (USD)
   - display clearly as USD; do not invent tax, duty, shipping or discount claims
7. Materials
   - prominent confidence signal and filter
8. Width / Height / Depth
   - format consistently as W × H × D; show units and handle missing values honestly
9. Canopy/Backplate Size
   - show within technical specifications for relevant lighting products
10. Finish Options
    - show as available finishes; do not imply live inventory unless supported
11. Bulb / Socket (US)
    - regional electrical specification
12. Bulb / Socket (UK/EU)
    - regional electrical specification
13. Style / Category
    - primary taxonomy, breadcrumbs, collection membership and filters
14. Room Suitability
    - room discovery, placement guidance and filters
15. Special Features
    - concise value and design details
16. Handmade Note
    - craftsmanship/provenance block
17. Etsy Tags
    - internal search synonyms and Etsy traceability; never expose as a keyword-stuffed visible list
18. Website SEO Keywords
    - internal search, collection discovery and content planning; never render as raw keyword spam

For each product, also support approved hero image, gallery images, image alt text, publication status, QA status, availability, featured/bestseller flags, sort order and stable slug.

PRODUCT-PAGE EXPERIENCE
Design product pages as the central high-consideration sales experience:
- breadcrumb and category context
- large image gallery with hero, detail, scale and lifestyle views when available
- sticky or persistent product summary on desktop without obstructing content
- SEO title, concise positioning line, USD price and material summary
- clear “Purchase securely on Etsy” CTA
- secondary “Ask about this piece” or custom/trade enquiry CTA
- dimensions and scale information near the purchase decision
- materials, finish and special features
- lighting-specific canopy/backplate and regional socket details where relevant
- full product story
- handmade/craftsmanship note
- room and styling suitability derived only from catalogue data
- shipping/returns language that clearly hands final transaction terms to Etsy unless ArtLoka has approved policies
- related products based on category, room, material and style
- Product, BreadcrumbList and Organization structured data
- outbound analytics containing SKU, slug, source collection, CTA position and destination

Do not show Etsy tags or SEO keyword lists to customers. Do not overuse accordions: essential decision information must be visible without hunting.

HOMEPAGE EXPERIENCE
The homepage should be approximately 70% product discovery and 30% trust/story.
Recommended narrative order:
1. A cinematic but fast hero that makes the product and brand position immediately clear
2. Curated signature pieces
3. Shop by product type
4. A material/craftsmanship story with real workshop or detail photography
5. Shop by room or design mood
6. A focused brand/founder passage
7. Gifting, trade and hospitality invitation
8. Confidence signals and worldwide purchase journey
9. Journal/inspiration entry points only when meaningful content exists

Avoid a generic grid of marketing feature cards. Make the page feel composed like a premium interiors publication.

HIGH-TICKET TRUST REQUIREMENTS
- exceptional product detail and image quality
- precise dimensions and technical information
- provenance and handmade context
- transparent Etsy purchase handoff
- direct product enquiry route
- trade, gifting and hospitality routes
- clear contact and response expectations
- no unsupported trust badges
- no fake testimonials or reviews
- no false scarcity or countdown timers

ENGINEERING AND QUALITY
- Preserve the current Next.js App Router, TypeScript and Tailwind architecture unless a documented change is justified.
- Use Server Components by default.
- Use next/image or an approved image pipeline.
- Keep the site accessible and keyboard operable.
- Respect prefers-reduced-motion.
- Prevent layout shift and optimize above-the-fold imagery.
- Protect all secrets server-side.
- Keep product URLs canonical and stable.
- Maintain the Google Drive Excel → validation → normalized catalogue → static/ISR website flow.
- Never parse Google Drive or Excel during a customer page request.
- Run lint, typecheck, tests and production build.

FIRST DELIVERABLE: PREMIUM VERTICAL SLICE
Do not build every page in one uncontrolled change.

First:
1. Audit the current site, brand assets and catalogue.
2. Create docs/PREMIUM_EXPERIENCE_PLAN.md containing:
   - brand experience principles
   - one final recommended art direction
   - typography system
   - color tokens
   - spacing and grid
   - image art direction
   - motion rules
   - component inventory
   - page architecture
   - risk and missing-asset register
3. Create docs/CONTENT_AND_DATA_MAP.md mapping each catalogue field to visible UI, metadata, filtering, analytics or internal-only use.
4. Create docs/PREMIUM_QA_RUBRIC.md with objective review criteria.
5. Then implement only this vertical slice:
   - global design tokens
   - header and mobile navigation
   - footer
   - homepage
   - collection/product-card language
   - one representative product-detail template populated from real catalogue data
6. Use supplied ArtLoka logos and only approved real product images. Where a required image is missing, show a deliberate neutral placeholder labelled internally for QA; do not present it as final.
7. Render and inspect the vertical slice at 390px, 768px, 1280px and 1440px.
8. Critique it against the premium QA rubric.
9. Fix the highest-impact issues before stopping.
10. Run npm run verify.

DONE WHEN
- The vertical slice feels like one coherent premium brand, not a styled marketplace template.
- Product imagery and information dominate the experience.
- Typography, spacing, composition and microcopy are consistent.
- The homepage is product-led and the product page supports a high-consideration decision.
- Every visible claim comes from approved content or catalogue data.
- All relevant catalogue fields have a documented destination.
- Mobile is treated as a first-class premium experience.
- No horizontal scrolling exists at target widths.
- npm run verify passes.
- You provide a concise completion report: files changed, visual decisions, data mapping, tests run, screenshots reviewed, known risks and the next recommended milestone.

Before coding, present the plan, identify missing inputs and ask only questions that materially block the vertical slice.
```

---

## 2. Premium build loop

Use this loop for every milestone or page. Do not let Codex build the whole website in one pass.

### Loop 1 — Frame
Give Codex one page or one connected user journey at a time. State:
- goal
- source files
- customer decision the page must support
- constraints
- completion criteria

### Loop 2 — Plan
Start in Plan mode. Codex must:
- inspect the existing implementation
- identify reusable components
- map required catalogue fields
- identify missing assets and unsupported claims
- propose a bounded implementation plan

### Loop 3 — Build
Implement one coherent slice only. Examples:
- homepage + header/footer
- collection page + filters
- product page + Etsy handoff
- craftsmanship + founder story
- enquiry flow

### Loop 4 — Render
Review at:
- 390px
- 768px
- 1280px
- 1440px

Capture screenshots for:
- top of page
- one mid-page transition
- conversion area
- mobile navigation or filters

### Loop 5 — Critique
Ask Codex to review its own output as a creative director, customer, accessibility reviewer and senior engineer.

The page must be evaluated on:
- premium brand distinction
- product elevation
- typography
- composition and whitespace
- photography treatment
- clarity of product information
- trust and purchase confidence
- content restraint and accuracy
- mobile quality
- accessibility
- performance
- conversion clarity

### Loop 6 — Refine
Fix only the most consequential issues first:
1. weak art direction
2. poor imagery/crops
3. hierarchy and spacing
4. vague or mass-market copy
5. missing product facts
6. mobile issues
7. accessibility and performance

Repeat Render → Critique → Refine until the page reaches the acceptance threshold.

### Loop 7 — Verify
Require:
- lint
- typecheck
- automated tests
- catalogue validation
- production build
- broken-link and Etsy-link check
- metadata and structured-data check
- diff review

### Loop 8 — Approve
Do not merge because tests pass alone. Approve only when:
- the page feels unmistakably ArtLoka
- no final placeholder is visible
- content is supported
- product information is complete
- mobile and desktop are both premium
- the conversion path is obvious but not aggressive

### Loop 9 — Learn
At the end of each milestone ask Codex:
- What mistake or ambiguity appeared more than once?
- What rule should be added to AGENTS.md?
- What reusable component or test should be created?
- What remains dependent on new photography or verified content?

Add only useful, repeated lessons to AGENTS.md.

---

## 3. Reusable page-build prompt

```text
Work in Plan mode.

Build/refine: [PAGE OR JOURNEY]

Read AGENTS.md, docs/PREMIUM_EXPERIENCE_PLAN.md, docs/CONTENT_AND_DATA_MAP.md and docs/PREMIUM_QA_RUBRIC.md first.

Customer decision this page must support:
[DECISION]

Required source content and data:
[FILES / CATALOGUE FIELDS]

Constraints:
- preserve the approved ArtLoka premium design system
- do not invent claims or product facts
- do not add on-site checkout
- keep Etsy as the standard purchase destination
- use only approved real product imagery
- avoid generic cards, gradients, excessive pills and marketplace styling
- make mobile a first-class experience

Before coding:
1. audit the current page
2. identify gaps and reusable components
3. present a concise plan

Then implement, render at 390/768/1280/1440, critique against the premium rubric, fix the highest-impact issues and run npm run verify.

Done when:
[PAGE-SPECIFIC ACCEPTANCE CRITERIA]

Report files changed, screenshots reviewed, catalogue fields used, tests run, unresolved content/image risks and the next recommended task.
```

---

## 4. Visual-review prompt

```text
Do not add features in this task.

Act as an independent premium-brand creative director and UX reviewer. Inspect the current implementation in the browser at 390px, 768px, 1280px and 1440px.

Review:
- homepage
- one collection page
- one lighting product page
- one décor/sculpture product page
- craftsmanship/about experience
- enquiry journey

Compare the implementation against docs/PREMIUM_EXPERIENCE_PLAN.md and docs/PREMIUM_QA_RUBRIC.md.

Identify:
1. anything that feels template-like, inexpensive, crowded or generic
2. inconsistent typography, spacing, alignment or image treatment
3. weak hierarchy or excessive copy
4. places where the product is not the hero
5. missing high-ticket trust information
6. unclear Etsy handoff
7. mobile compromises
8. accessibility or performance defects
9. unsupported claims or exposed SEO keyword spam

Create docs/VISUAL_AUDIT.md with severity, screenshot/page reference, reason and recommended fix.

Then fix only Critical and High issues. Re-render affected pages, run npm run verify and summarize the before/after changes.
```

---

## 5. Catalogue-completeness prompt

```text
Audit the entire product catalogue and website data usage.

For every published SKU, verify that these fields are mapped and used correctly:
- Original Etsy Title
- SEO Website Title
- Meta Description
- Website Description
- Etsy URL
- Price USD
- Materials
- Width, Height and Depth
- Canopy/Backplate Size
- Finish Options
- US socket details
- UK/EU socket details
- Style/Category
- Room Suitability
- Special Features
- Handmade Note
- Etsy Tags
- Website SEO Keywords

Classify each field as:
- visible decision information
- metadata
- taxonomy/filter/search
- analytics/integration
- internal-only

Do not render raw Etsy tags or SEO keywords visibly.
Do not invent missing values.
Do not publish products with invalid Etsy URLs, contradictory critical specifications, blocked QA or missing required final imagery.

Generate:
- docs/CATALOGUE_COVERAGE_REPORT.md
- a machine-readable QA report
- tests for required-field and mapping coverage

Fix high-confidence mapping defects, run npm run verify and report every blocked SKU with the exact reason.
```

---

## 6. Launch-audit prompt

```text
Perform a final independent launch review of ArtLoka as a premium, high-consideration global décor and lighting brand.

Do not assume the site is ready because it builds.

Audit:
- brand consistency and visual polish
- every public page at 390/768/1280/1440
- final product imagery and image quality
- product-data completeness
- all Etsy destinations
- enquiry delivery and spam protection
- copy accuracy and unsupported claims
- metadata, canonical URLs, sitemap and structured data
- accessibility
- Core Web Vitals risks
- broken links
- security headers and secret exposure
- analytics events
- strict catalogue publishing mode
- privacy and consent copy

Create docs/LAUNCH_REPORT.md with:
- launch blockers
- high-priority issues
- approved exceptions
- evidence and affected routes
- final sign-off checklist

Fix only issues that are high-confidence and within the approved architecture. Run npm run verify. Do not recommend production launch while any blocker remains.
```
