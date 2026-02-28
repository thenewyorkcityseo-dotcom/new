import Link from "next/link";
import type { Metadata } from "next";
import { getServicesByCategory } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "All Services | Browse Local Service Categories",
  description:
    "Browse all local service categories across NYC, New Jersey, Long Island & Westchester. Find plumbers, electricians, lawyers, dentists, and hundreds more.",
};

export default function ServicesPage() {
  const servicesByCategory = getServicesByCategory();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Services", url: "/services" }]} />

        <div className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            All Service Categories
          </h1>
          <p className="mt-2 text-lg text-zinc-500">
            Find top-rated local professionals in every category
          </p>
        </div>

        {Object.entries(servicesByCategory).map(([category, services]) => (
          <section
            key={category}
            id={category.toLowerCase().replace(/\s+/g, "-")}
            className="mt-10"
          >
            <h2 className="text-xl font-semibold text-zinc-900">{category}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm hover:border-blue-300 hover:shadow-md"
                >
                  <h3 className="font-medium text-zinc-900">{s.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-zinc-500">
                    {s.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <CTABanner />
    </>
  );
}
