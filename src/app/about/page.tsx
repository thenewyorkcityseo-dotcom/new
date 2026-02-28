import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTABanner from "@/components/CTABanner";
import { getAllServices, getAllNeighborhoods } from "@/lib/data";

export const metadata: Metadata = {
  title: "About The NYC SEO | Powered by Consortium NYC",
  description:
    "The NYC SEO is the tri-state area's most comprehensive local services directory. Powered by Consortium NYC, a leading digital marketing agency.",
};

export default function AboutPage() {
  const totalServices = getAllServices().length;
  const totalNeighborhoods = getAllNeighborhoods().length;

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "About", url: "/about" }]} />

        <div className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            About The NYC SEO
          </h1>
        </div>

        <div className="prose prose-zinc mt-8 max-w-none">
          <p className="text-lg leading-8 text-zinc-600">
            The NYC SEO is the most comprehensive local services directory
            covering the entire New York City metropolitan area. With{" "}
            {totalServices}+ service categories across {totalNeighborhoods}+
            neighborhoods, we connect residents and businesses with top-rated
            local professionals every day.
          </p>

          <h2 className="mt-10 text-2xl font-semibold text-zinc-900">
            Powered by Consortium NYC
          </h2>
          <p className="mt-4 leading-7 text-zinc-600">
            The NYC SEO is proudly built and maintained by{" "}
            <a
              href="https://www.consortiumnyc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Consortium NYC
            </a>
            , one of New York&apos;s leading digital marketing and SEO agencies.
            With a domain authority of 55 and years of experience in local search
            optimization, Consortium NYC brings unmatched expertise to helping
            businesses get found online.
          </p>

          <h2 className="mt-10 text-2xl font-semibold text-zinc-900">
            Our Coverage Area
          </h2>
          <p className="mt-4 leading-7 text-zinc-600">
            We cover every corner of the NYC metro area:
          </p>
          <ul className="mt-4 space-y-2 text-zinc-600">
            <li>
              <strong>Manhattan</strong> &mdash; Every neighborhood from Inwood
              to the Financial District
            </li>
            <li>
              <strong>Brooklyn</strong> &mdash; Williamsburg to Bay Ridge,
              DUMBO to Canarsie
            </li>
            <li>
              <strong>Queens</strong> &mdash; Astoria to Far Rockaway, Flushing
              to Forest Hills
            </li>
            <li>
              <strong>Bronx</strong> &mdash; Riverdale to City Island, Mott
              Haven to Co-op City
            </li>
            <li>
              <strong>Staten Island</strong> &mdash; St. George to Tottenville
            </li>
            <li>
              <strong>New Jersey</strong> &mdash; Jersey City, Hoboken, Newark,
              and 40+ more cities
            </li>
            <li>
              <strong>Long Island</strong> &mdash; Nassau and Suffolk County
              from Great Neck to Montauk
            </li>
            <li>
              <strong>Westchester</strong> &mdash; Yonkers to Peekskill,
              Scarsdale to Port Chester
            </li>
          </ul>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
