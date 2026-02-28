import Link from "next/link";
import {
  getServicesByCategory,
  getNeighborhoodsByRegion,
  getAllServices,
  getAllNeighborhoods,
} from "@/lib/data";
import { PHONE } from "@/lib/seo";
import CTABanner from "@/components/CTABanner";

export default function HomePage() {
  const servicesByCategory = getServicesByCategory();
  const neighborhoodsByRegion = getNeighborhoodsByRegion();
  const totalServices = getAllServices().length;
  const totalNeighborhoods = getAllNeighborhoods().length;
  const totalPages = totalServices * totalNeighborhoods;

  const featuredCategories = Object.entries(servicesByCategory).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Find the Best
              <span className="text-blue-400"> Local Services</span> in NYC
            </h1>
            <p className="mt-6 text-xl leading-8 text-zinc-300">
              Your trusted source for top-rated service providers across all five
              boroughs, New Jersey, Long Island & Westchester.{" "}
              {totalServices.toLocaleString()} service categories.{" "}
              {totalNeighborhoods.toLocaleString()} neighborhoods.{" "}
              {totalPages.toLocaleString()}+ local connections.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Browse Services
              </Link>
              <a
                href={`tel:${PHONE.replace(/-/g, "")}`}
                className="inline-flex items-center justify-center rounded-lg border-2 border-zinc-500 px-6 py-3 text-lg font-semibold text-white hover:border-white hover:bg-white/10"
              >
                Call {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-zinc-200 bg-white py-6">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-900">
              {totalServices}+
            </div>
            <div className="text-sm text-zinc-500">Service Types</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-900">
              {totalNeighborhoods}+
            </div>
            <div className="text-sm text-zinc-500">Neighborhoods</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-900">
              {totalPages.toLocaleString()}+
            </div>
            <div className="text-sm text-zinc-500">Local Pages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-zinc-900">8</div>
            <div className="text-sm text-zinc-500">Regions Covered</div>
          </div>
        </div>
      </section>

      {/* Featured Service Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
            Popular Service Categories
          </h2>
          <p className="mt-2 text-lg text-zinc-500">
            Browse by category to find exactly what you need
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredCategories.map(([category, services]) => (
              <div
                key={category}
                className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-zinc-900">
                  {category}
                </h3>
                <ul className="mt-4 space-y-2">
                  {services.slice(0, 6).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/${s.slug}`}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                {services.length > 6 && (
                  <Link
                    href={`/services#${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    View all {services.length} services &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/services"
              className="inline-flex items-center rounded-lg border border-zinc-300 px-6 py-3 font-semibold text-zinc-700 hover:bg-zinc-50"
            >
              View All Service Categories &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="border-t border-zinc-200 bg-zinc-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
            Service Areas
          </h2>
          <p className="mt-2 text-lg text-zinc-500">
            We cover every neighborhood across the tri-state area
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(neighborhoodsByRegion).map(
              ([region, neighborhoods]) => (
                <div
                  key={region}
                  className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="font-semibold text-zinc-900">{region}</h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    {neighborhoods.length} areas
                  </p>
                  <ul className="mt-3 space-y-1">
                    {neighborhoods.slice(0, 5).map((n) => (
                      <li key={n.slug}>
                        <Link
                          href={`/plumber/${n.slug}`}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          {n.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/areas#${region.toLowerCase().replace(/\s+/g, "-")}`}
                    className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    See all {region} areas &rarr;
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* About / Trust Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
              Powered by{" "}
              <a
                href="https://www.consortiumnyc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Consortium NYC
              </a>
            </h2>
            <p className="mt-4 text-lg leading-7 text-zinc-600">
              The NYC SEO is backed by Consortium NYC, a leading digital
              marketing and SEO agency with over a decade of experience helping
              local businesses dominate search results in the New York metro
              area. Our network spans thousands of verified local service
              providers across every borough, neighborhood, and surrounding
              area.
            </p>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
