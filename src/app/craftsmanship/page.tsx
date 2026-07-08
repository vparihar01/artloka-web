import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Craftsmanship",
  description: "Discover ArtLoka's approach to materials, hand-finishing, artisan production and quality review."
};

export default function CraftsmanshipPage() {
  const steps = [
    ["01", "Material selection", "Stone, metal, glass, wood and other materials are selected according to the intended form, finish and use."],
    ["02", "Artisan production", "Skilled hands shape, assemble and finish each piece, preserving subtle variations that distinguish craft from anonymous mass production."],
    ["03", "Specification review", "Dimensions, finishes, electrical details and product claims are checked before a product is approved for the strict website catalogue."],
    ["04", "Careful presentation", "Each listing is supported by clear specifications, styling context and photography intended to help customers make a confident decision."]
  ];
  return (
    <div className="container-shell py-16">
      <p className="eyebrow">The human mark</p>
      <h1 className="display-font mt-3 max-w-4xl text-5xl leading-tight md:text-6xl">Craftsmanship is not decoration around the product. It is the product.</h1>
      <p className="prose-copy mt-6 max-w-3xl text-lg">ArtLoka brings Indian material intelligence and hand-finishing into a contemporary product language. Natural variation is part of the character, while specifications and safety-sensitive details require disciplined review.</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {steps.map(([number, title, copy]) => <article key={number} className="card p-7"><p className="eyebrow">{number}</p><h2 className="display-font mt-3 text-3xl">{title}</h2><p className="prose-copy mt-4">{copy}</p></article>)}
      </div>
    </div>
  );
}
