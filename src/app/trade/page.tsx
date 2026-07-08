import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";

export const metadata: Metadata = {
  title: "Trade, Hospitality and Bulk Gifting",
  description: "Contact ArtLoka for interior design, hospitality, corporate gifting, bulk orders and custom product requirements."
};

export default function TradePage() {
  return (
    <div className="container-shell py-16">
      <p className="eyebrow">Project enquiries</p>
      <h1 className="display-font mt-3 max-w-4xl text-5xl leading-tight md:text-6xl">Artisan-made pieces for spaces, teams and meaningful occasions.</h1>
      <p className="prose-copy mt-6 max-w-3xl text-lg">We welcome structured enquiries from interior designers, architects, boutique hospitality projects, corporate gifting teams and buyers seeking larger quantities or custom finishes.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          ["Interior and hospitality", "Share room context, visual direction, quantities, destination and timeline."],
          ["Corporate and occasion gifting", "Tell us the occasion, recipient profile, budget range and personalisation needs."],
          ["Custom and bulk orders", "Reference a current product or share a design brief for feasibility review."]
        ].map(([title, copy]) => <div key={title} className="card p-6"><h2 className="display-font text-2xl">{title}</h2><p className="prose-copy mt-3">{copy}</p></div>)}
      </div>
      <div className="mt-12"><EnquiryForm defaultType="Bulk order" /></div>
    </div>
  );
}
