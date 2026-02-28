import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllServices,
  getAllNeighborhoods,
  getServiceBySlug,
  getNeighborhoodBySlug,
  getNeighborhoodsByRegion,
} from "@/lib/data";
import {
  getMoneyPageMeta,
  getLocalBusinessSchema,
  PHONE,
} from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABanner from "@/components/CTABanner";

interface PageProps {
  params: Promise<{ service: string; neighborhood: string }>;
}

export async function generateStaticParams() {
  const services = getAllServices();
  const neighborhoods = getAllNeighborhoods();

  return services.flatMap((s) =>
    neighborhoods.map((n) => ({
      service: s.slug,
      neighborhood: n.slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug, neighborhood: neighborhoodSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const neighborhood = getNeighborhoodBySlug(neighborhoodSlug);
  if (!service || !neighborhood) return {};

  const meta = getMoneyPageMeta(service, neighborhood);
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function MoneyPage({ params }: PageProps) {
  const { service: serviceSlug, neighborhood: neighborhoodSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const neighborhood = getNeighborhoodBySlug(neighborhoodSlug);

  if (!service || !neighborhood) notFound();

  const neighborhoodsByRegion = getNeighborhoodsByRegion();
  const nearbyNeighborhoods = (neighborhoodsByRegion[neighborhood.region] || [])
    .filter((n) => n.slug !== neighborhood.slug)
    .slice(0, 8);

  const relatedServices = getAllServices()
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getLocalBusinessSchema(service, neighborhood)),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: service.name, url: `/${service.slug}` },
            {
              name: neighborhood.name,
              url: `/${service.slug}/${neighborhood.slug}`,
            },
          ]}
        />

        <div className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {service.name} in {neighborhood.name}
          </h1>
          <p className="mt-2 text-lg text-zinc-500">
            {neighborhood.region} &middot; Trusted Local Pros
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-zinc-900">
                Best {service.name} Services in {neighborhood.name},{" "}
                {neighborhood.region}
              </h2>
              <p className="mt-4 leading-7 text-zinc-600">
                Looking for a reliable {service.name.toLowerCase()} in{" "}
                {neighborhood.name}? You&apos;re in the right place.{" "}
                {service.description}
              </p>
              <p className="mt-4 leading-7 text-zinc-600">
                Our network connects you with vetted, top-rated{" "}
                {service.name.toLowerCase()} professionals serving{" "}
                {neighborhood.name} and the surrounding {neighborhood.region}{" "}
                area. Whether you need an emergency call or a scheduled
                appointment, we&apos;ll help you find the right pro at the right
                price.
              </p>

              <h3 className="mt-8 text-lg font-semibold text-zinc-900">
                Why Choose a Local {service.name} in {neighborhood.name}?
              </h3>
              <ul className="mt-4 space-y-3 text-zinc-600">
                <li className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                    1
                  </span>
                  <span>
                    <strong>Faster Response Times</strong> &mdash; Local pros in{" "}
                    {neighborhood.name} can reach you quickly, especially for
                    emergencies.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                    2
                  </span>
                  <span>
                    <strong>Community Reputation</strong> &mdash; Local
                    businesses rely on word-of-mouth in {neighborhood.name} and
                    work hard to maintain their reputation.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                    3
                  </span>
                  <span>
                    <strong>Knowledge of Local Codes</strong> &mdash;{" "}
                    {neighborhood.region} has specific regulations and
                    requirements that local pros understand.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                    4
                  </span>
                  <span>
                    <strong>Competitive Pricing</strong> &mdash; Local{" "}
                    {service.name.toLowerCase()} providers offer fair rates
                    without the overhead of large companies.
                  </span>
                </li>
              </ul>

              <h3 className="mt-8 text-lg font-semibold text-zinc-900">
                What to Look for in a {service.name}
              </h3>
              <p className="mt-4 leading-7 text-zinc-600">
                When hiring a {service.name.toLowerCase()} in{" "}
                {neighborhood.name}, make sure to verify licensing and
                insurance, check online reviews, get multiple quotes, and ask
                about warranties. A reputable {service.name.toLowerCase()} will
                be transparent about pricing and happy to provide references
                from other {neighborhood.name} customers.
              </p>
            </section>

            {relatedServices.length > 0 && (
              <section className="mt-8">
                <h2 className="text-xl font-semibold text-zinc-900">
                  Related Services in {neighborhood.name}
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {relatedServices.map((rs) => (
                    <Link
                      key={rs.slug}
                      href={`/${rs.slug}/${neighborhood.slug}`}
                      className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm hover:border-blue-300 hover:shadow-md"
                    >
                      <h3 className="font-medium text-zinc-900">{rs.name}</h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        in {neighborhood.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside>
            <div className="sticky top-8 space-y-6">
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Get a Free Quote
                </h3>
                <p className="mt-2 text-sm text-zinc-500">
                  Connect with top {service.name.toLowerCase()} pros in{" "}
                  {neighborhood.name} today.
                </p>
                <a
                  href={`tel:${PHONE.replace(/-/g, "")}`}
                  className="mt-4 block w-full rounded-lg bg-blue-600 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Call {PHONE}
                </a>
                <a
                  href="https://www.consortiumnyc.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block w-full rounded-lg border border-zinc-300 py-3 text-center text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
                >
                  Request Online Quote
                </a>
              </div>

              {nearbyNeighborhoods.length > 0 && (
                <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {service.name} Nearby
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {nearbyNeighborhoods.map((n) => (
                      <li key={n.slug}>
                        <Link
                          href={`/${service.slug}/${n.slug}`}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          {service.name} in {n.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <CTABanner
        title={`Need a ${service.name} in ${neighborhood.name}?`}
        subtitle={`Get matched with the best local ${service.name.toLowerCase()} pros in ${neighborhood.name}, ${neighborhood.region}.`}
      />
    </>
  );
}
