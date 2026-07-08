import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const EnquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().email(),
  customerType: z.string().trim().min(2).max(100),
  enquiryType: z.string().trim().min(2).max(100),
  quantity: z.string().trim().max(100).optional().default(""),
  budget: z.string().trim().max(100).optional().default(""),
  location: z.string().trim().max(150).optional().default(""),
  details: z.string().trim().min(10).max(5000)
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = EnquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: "Please check the form and complete all required fields." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("ArtLoka enquiry (development only)", parsed.data);
      return NextResponse.json({ message: "Enquiry captured in development mode." });
    }
    return NextResponse.json({ message: "Enquiry delivery is not configured yet. Please use the Etsy contact option for now." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: parsed.data.email,
    subject: `[ArtLoka ${parsed.data.enquiryType}] ${parsed.data.name}`,
    text: [
      `Name: ${parsed.data.name}`,
      `Email: ${parsed.data.email}`,
      `Customer type: ${parsed.data.customerType}`,
      `Enquiry type: ${parsed.data.enquiryType}`,
      `Quantity: ${parsed.data.quantity || "Not specified"}`,
      `Budget: ${parsed.data.budget || "Not specified"}`,
      `Location: ${parsed.data.location || "Not specified"}`,
      "",
      parsed.data.details
    ].join("\n")
  });

  if (error) return NextResponse.json({ message: "We could not send the enquiry. Please try again." }, { status: 502 });
  return NextResponse.json({ message: "Thank you. The ArtLoka team will review your requirement and respond by email." });
}
