import { PHONE } from "@/lib/seo";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
}

export default function CTABanner({
  title = "Ready to Find the Right Pro?",
  subtitle = "Get connected with top-rated local service providers today. Free quotes, no obligation.",
}: CTABannerProps) {
  return (
    <section className="bg-blue-600 py-12">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        <p className="mt-3 text-lg text-blue-100">{subtitle}</p>
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={`tel:${PHONE.replace(/-/g, "")}`}
            className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-lg font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
          >
            Call {PHONE}
          </a>
          <a
            href="https://www.consortiumnyc.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border-2 border-white px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700"
          >
            Get a Free Quote
          </a>
        </div>
      </div>
    </section>
  );
}
