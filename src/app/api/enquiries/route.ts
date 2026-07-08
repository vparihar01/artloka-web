import { NextResponse } from "next/server";
import { z } from "zod";

const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENQUIRY_ENDPOINT || "https://formspree.io/f/xdarvrqq";

const EnquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().email(),
  customerType: z.string().trim().min(2).max(100),
  enquiryType: z.string().trim().min(2).max(100),
  quantity: z.string().trim().max(100).optional().default(""),
  budget: z.string().trim().max(100).optional().default(""),
  location: z.string().trim().max(150).optional().default(""),
  details: z.string().trim().min(10).max(5000),
  sourcePath: z.string().trim().max(500).optional().default("")
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = EnquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: "Please check the form and complete all required fields." }, { status: 400 });

  const formspreeBody = new URLSearchParams({
    name: parsed.data.name,
    email: parsed.data.email,
    customerType: parsed.data.customerType,
    enquiryType: parsed.data.enquiryType,
    quantity: parsed.data.quantity || "Not specified",
    budget: parsed.data.budget || "Not specified",
    location: parsed.data.location || "Not specified",
    sourcePath: parsed.data.sourcePath || "Not specified",
    details: parsed.data.details,
    _subject: `[ArtLoka ${parsed.data.enquiryType}] ${parsed.data.name}`
  });

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/x-www-form-urlencoded"
    },
    body: formspreeBody,
    cache: "no-store"
  }).catch(() => null);

  if (!response?.ok) return NextResponse.json({ message: "We could not send the enquiry. Please try again." }, { status: 502 });

  return NextResponse.json({ message: "Thank you. The ArtLoka team will review your requirement and respond by email." });
}
