"use client";

import { FormEvent, useState } from "react";
import { trackEnquirySubmit } from "@/lib/analytics";

export function EnquiryForm({ defaultType = "General enquiry" }: { defaultType?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setState("sending");
    setMessage("");
    const form = new FormData(formElement);
    const payload = {
      ...Object.fromEntries(form.entries()),
      sourcePath: window.location.pathname + window.location.search
    } as Record<string, FormDataEntryValue> & { sourcePath: string };
    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json().catch(() => ({ message: "Unable to submit enquiry." }));
    setMessage(result.message ?? "Thank you. We will respond shortly.");
    setState(response.ok ? "success" : "error");
    if (response.ok) {
      trackEnquirySubmit({
        enquiryType: String(payload.enquiryType ?? "General enquiry"),
        sourcePath: payload.sourcePath
      });
      formElement.reset();
    }
  }

  return (
    <form onSubmit={submit} className="card grid gap-4 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">Name<input name="name" required className="rounded-xl border border-[var(--border)] bg-white px-4 py-3" /></label>
        <label className="grid gap-2 text-sm font-semibold">Email<input name="email" type="email" required className="rounded-xl border border-[var(--border)] bg-white px-4 py-3" /></label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">Customer type
          <select name="customerType" required className="rounded-xl border border-[var(--border)] bg-white px-4 py-3">
            <option>Individual homeowner</option><option>Gift buyer</option><option>Interior designer</option><option>Architect</option><option>Hospitality buyer</option><option>Corporate buyer</option><option>Retailer</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">Enquiry type
          <select name="enquiryType" defaultValue={defaultType} required className="rounded-xl border border-[var(--border)] bg-white px-4 py-3">
            <option>General enquiry</option><option>Bulk order</option><option>Custom product</option><option>Corporate gifting</option><option>Hospitality project</option><option>Trade partnership</option>
          </select>
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-semibold">Approx. quantity<input name="quantity" className="rounded-xl border border-[var(--border)] bg-white px-4 py-3" /></label>
        <label className="grid gap-2 text-sm font-semibold">Budget range<input name="budget" className="rounded-xl border border-[var(--border)] bg-white px-4 py-3" /></label>
        <label className="grid gap-2 text-sm font-semibold">Delivery location<input name="location" className="rounded-xl border border-[var(--border)] bg-white px-4 py-3" /></label>
      </div>
      <label className="grid gap-2 text-sm font-semibold">Project details<textarea name="details" required rows={6} className="rounded-xl border border-[var(--border)] bg-white px-4 py-3" /></label>
      <button disabled={state === "sending"} className="button-primary justify-self-start">{state === "sending" ? "Sending…" : "Submit enquiry"}</button>
      {message ? <p role="status" className={state === "error" ? "text-red-700" : "text-[var(--sage)]"}>{message}</p> : null}
    </form>
  );
}
