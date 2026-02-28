import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { PHONE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us | The NYC SEO",
  description:
    "Get in touch with The NYC SEO. Call us or reach out to Consortium NYC for local SEO services and business listings.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Contact", url: "/contact" }]} />

      <div className="mt-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Have a question or want to list your business? Get in touch.
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900">Call Us</h2>
          <p className="mt-2 text-zinc-600">
            Speak directly with our team for immediate assistance.
          </p>
          <a
            href={`tel:${PHONE.replace(/-/g, "")}`}
            className="mt-4 inline-block text-2xl font-bold text-blue-600 hover:text-blue-800"
          >
            {PHONE}
          </a>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900">Online</h2>
          <p className="mt-2 text-zinc-600">
            Visit Consortium NYC for full digital marketing services.
          </p>
          <a
            href="https://www.consortiumnyc.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Contact Consortium NYC
          </a>
        </div>
      </div>
    </div>
  );
}
