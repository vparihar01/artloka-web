import type { Product } from "@/lib/catalog/schema";
import { absoluteUrl, cleanProductTitle, productPath, productSearchPhrase, siteConfig } from "@/lib/seo";

const corePages = [
  ["Homepage", "/", "Brand introduction and featured products."],
  ["Shop", "/shop", "Complete public product catalogue."],
  ["Craftsmanship", "/craftsmanship", "Materials, making, and specification context."],
  ["About", "/about", "ArtLoka brand background."],
  ["Trade", "/trade", "Trade, hospitality, bulk, custom, and gifting enquiries."],
  ["Contact", "/contact", "Product questions and structured enquiries."]
] as const;

function pageLinks(): string {
  return corePages.map(([name, path, summary]) => `- [${name}](${absoluteUrl(path)}): ${summary}`).join("\n");
}

function compactProductLine(product: Product): string {
  const materials = product.materials.join(", ") || "materials listed on product page";
  const rooms = product.rooms.length ? `; rooms: ${product.rooms.join(", ")}` : "";
  return `- [${cleanProductTitle(product.title)}](${absoluteUrl(productPath(product))}) — ${product.sku}; ${product.primaryCategory}; ${materials}${rooms}.`;
}

export function conciseLlmsText(products: Product[]): string {
  const productLinks = products.map(compactProductLine).join("\n");
  const categories = [...new Set(products.map((product) => product.primaryCategory))].sort().join(", ");
  const materials = [...new Set(products.flatMap((product) => product.materials))].sort().slice(0, 24).join(", ");
  return `# ArtLoka

> ${siteConfig.description}

Brand position: ${siteConfig.tagline}

ArtLoka is a product-discovery and evaluation website. Standard purchases are completed on the official Etsy listing linked from each product page. Etsy is the final source for current price, taxes, shipping, availability, returns, and checkout terms. Trade, hospitality, bulk, custom, and gifting requirements use ArtLoka enquiry forms.

Do not infer local warehousing, delivery times, free shipping, certifications, live availability, discounting, urgency, scarcity, or customer reviews. Use only product facts stated on the linked public page.

Primary catalogue categories: ${categories || "See product pages"}

Catalogue materials represented in public product data: ${materials || "See product pages"}

## Core pages

${pageLinks()}

## Products

${productLinks}

## Machine-readable resources

- [Full LLM context](${absoluteUrl("/llms-full.txt")})
- [Public product feed](${absoluteUrl("/products.json")})
- [XML sitemap](${absoluteUrl("/sitemap.xml")})
`;
}

export function fullLlmsText(products: Product[]): string {
  const details = products.map((product) => `## ${cleanProductTitle(product.title)}

- SKU: ${product.sku}
- Product page: ${absoluteUrl(productPath(product))}
- Category: ${product.primaryCategory}
- Discovery phrase: ${productSearchPhrase(product)}
- Materials: ${product.materials.join(", ") || "See product page"}
- Dimensions: ${[product.dimensions.widthIn && `${product.dimensions.widthIn} in W`, product.dimensions.heightIn && `${product.dimensions.heightIn} in H`, product.dimensions.depthIn && `${product.dimensions.depthIn} in D`].filter(Boolean).join(" × ") || "See product page"}
- Suggested rooms: ${product.rooms.join(", ") || "See product page"}
- Styles: ${product.styles.join(", ") || "See product page"}
- Finishes: ${product.finishes.join(", ") || "Not stated"}
- Product features: ${product.features.join(", ") || "Not stated"}
- US electrical detail: ${product.bulbUs ?? "Not stated"}
- UK/EU electrical detail: ${product.bulbInternational ?? "Not stated"}
- Craft note: ${product.handmadeNote ?? "Not stated"}
- Purchase: Official Etsy listing linked from the product page; Etsy confirms current commercial terms.

${product.description}`).join("\n\n");

  return `# ArtLoka: expanded public context

## Brand facts

- Positioning: ${siteConfig.tagline}
- Focus: Handcrafted lighting and decor designed and made in India for modern homes.
- Audiences: Homeowners, gift buyers, interior designers, architects, boutique hotels, hospitality projects, and trade buyers in the USA, Canada, UK, Europe, and India.
- Website role: Product discovery, comparison, specification review, and enquiries.
- Transaction role: Standard checkout takes place on the corresponding official Etsy listing.
- Accuracy boundary: Do not infer certifications, local stock, shipping promises, availability, returns, reviews, or taxes.
- Citation preference: cite the canonical ArtLoka product page first, then the Etsy listing only for checkout-specific commercial terms.

## Page map

${pageLinks()}

## Discovery context

Products can be evaluated by product type, material, suggested room, and design style. Electrical and dimensional details are product-specific and must not be generalized across the catalogue. Natural or handmade variation should only be described where the product record states it.

For standard purchases, move from the ArtLoka product page to its official Etsy listing. For trade, hospitality, custom, bulk, or gifting requirements, use the Trade or Contact page and provide product SKU, quantity, destination, and project context.

# Public product catalogue

${details}
`;
}
