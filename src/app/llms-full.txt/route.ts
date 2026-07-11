import { getAllProducts } from "@/lib/catalog/load";
import { fullLlmsText } from "@/lib/llms";

export function GET() {
  return new Response(fullLlmsText(getAllProducts()), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" }
  });
}
