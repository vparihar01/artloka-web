import { getAllProducts, getCatalogueMeta } from "@/lib/catalog/load";
import { publicProduct } from "@/lib/public-catalog";
import { absoluteUrl } from "@/lib/seo";

export function GET() {
  return Response.json({
    name: "ArtLoka public product catalogue",
    url: absoluteUrl("/products.json"),
    generatedAt: getCatalogueMeta().generatedAt,
    purchaseNote: "Discover on ArtLoka; complete standard purchases on the linked official Etsy listing. Etsy confirms current price, availability, taxes, shipping, returns, and checkout terms.",
    products: getAllProducts().map(publicProduct)
  }, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" }
  });
}
