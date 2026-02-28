import Link from "next/link";
import type { Metadata } from "next";
import { getNeighborhoodsByRegion } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Service Areas | NYC, NJ, Long Island & Westchester",
  description:
    "Browse all service areas we cover across NYC boroughs, New Jersey, Long Island & Westchester County. Find local service providers in your neighborhood.",
};

export default function AreasPage() {
  const neighborhoodsByRegion = getNeighborhoodsByRegion();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Service Areas", url: "/areas" }]} />

        <div className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Service Areas
          </h1>
          <p className="mt-2 text-lg text-zinc-500">
            NYC, New Jersey, Long Island & Westchester County
          </p>
        </div>

        {Object.entries(neighborhoodsByRegion).map(
          ([region, neighborhoods]) => (
            <section
              key={region}
              id={region.toLowerCase().replace(/\s+/g, "-")}
              className="mt-10"
            >
              <h2 className="text-xl font-semibold text-zinc-900">{region}</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {neighborhoods.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/plumber/${n.slug}`}
                    className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-sm hover:border-blue-300 hover:text-blue-600 hover:shadow-md"
                  >
                    {n.name}
                    <span className="ml-1 text-xs text-zinc-400">
                      ({n.type})
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )
        )}
      </div>

      <CTABanner />
    </>
  );
}
