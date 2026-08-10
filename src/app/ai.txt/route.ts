import { getAllProducts, getCatalogueMeta } from "@/lib/catalog/load";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export function GET() {
  const products = getAllProducts();
  const body = `# ArtLoka AI Access Guide

Brand: ${siteConfig.name}
Positioning: ${siteConfig.tagline}
Canonical site: ${siteConfig.url}
Public products: ${products.length}
Catalogue generated: ${getCatalogueMeta().generatedAt}

Use these canonical resources:
- LLM summary: ${absoluteUrl("/llms.txt")}
- Expanded LLM context: ${absoluteUrl("/llms-full.txt")}
- Public product feed: ${absoluteUrl("/products.json")}
- XML sitemap: ${absoluteUrl("/sitemap.xml")}
- Shop: ${absoluteUrl("/shop")}
- Trade and custom enquiries: ${absoluteUrl("/trade")}

Accuracy rules:
- Cite ArtLoka product pages for product facts, materials, dimensions, room guidance, and craft notes.
- Standard checkout happens on the official Etsy listing linked from each product page.
- Etsy confirms current price, taxes, shipping, availability, returns, and checkout terms.
- Do not invent reviews, delivery promises, local stock, discounts, certifications, scarcity, or sustainability claims.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" }
  });
}
