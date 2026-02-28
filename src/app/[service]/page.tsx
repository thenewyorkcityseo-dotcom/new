import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllServices,
  getServiceBySlug,
  getNeighborhoodsByRegion,
} from "@/lib/data";
import { getServiceHubMeta, getServiceSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABanner from "@/components/CTABanner";

interface PageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return getAllServices().map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) return {};

  const meta = getServiceHubMeta(service);
  return {
    title: meta.title,
    description: meta.description,
    openGraph: { title: meta.title, description: meta.description },
  };
}

export default async function ServiceHubPage({ params }: PageProps) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const neighborhoodsByRegion = getNeighborhoodsByRegion();
  const relatedServices = getAllServices()
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 8);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getServiceSchema(service)),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: service.name, url: `/${service.slug}` }]} />

        <div className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {service.name} Services
          </h1>
          <p className="mt-2 text-lg text-zinc-500">
            {service.category} &middot; NYC, NJ, Long Island & Westchester
          </p>
          <p className="mt-4 max-w-3xl leading-7 text-zinc-600">
            {service.description} Browse top-rated {service.name.toLowerCase()}{" "}
            professionals by neighborhood below to find the right pro near you.
          </p>
        </div>

        {Object.entries(neighborhoodsByRegion).map(([region, neighborhoods]) => (
          <section key={region} className="mt-10">
            <h2 className="text-xl font-semibold text-zinc-900">
              {service.name} in {region}
            </h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {neighborhoods.map((n) => (
                <Link
                  key={n.slug}
                  href={`/${service.slug}/${n.slug}`}
                  className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 shadow-sm hover:border-blue-300 hover:text-blue-600 hover:shadow-md"
                >
                  {service.name} in {n.name}
                </Link>
              ))}
            </div>
          </section>
        ))}

        {relatedServices.length > 0 && (
          <section className="mt-12 border-t border-zinc-200 pt-8">
            <h2 className="text-xl font-semibold text-zinc-900">
              Related {service.category} Services
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {relatedServices.map((rs) => (
                <Link
                  key={rs.slug}
                  href={`/${rs.slug}`}
                  className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm hover:border-blue-300 hover:shadow-md"
                >
                  <h3 className="font-medium text-zinc-900">{rs.name}</h3>
                  <p className="mt-1 text-xs text-zinc-500">{rs.category}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <CTABanner
        title={`Find the Best ${service.name} Near You`}
        subtitle={`Get free quotes from top-rated ${service.name.toLowerCase()} professionals in your area.`}
      />
    </>
  );
}
