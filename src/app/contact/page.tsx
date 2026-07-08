import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact ArtLoka",
  description: "Contact ArtLoka for handcrafted lighting product questions, customisation, trade, gifting, hospitality and project enquiries.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <div className="container-shell py-16">
      <p className="eyebrow">Contact</p>
      <h1 className="display-font mt-3 text-5xl md:text-6xl">Tell us what you are creating.</h1>
      <p className="prose-copy mt-5 max-w-3xl text-lg">For a standard purchase, use the Buy on Etsy link on the relevant product page. Use this form for product questions, customisation, gifting, quantity requirements or project discussions.</p>
      <div className="mt-10"><EnquiryForm /></div>
    </div>
  );
}
