import type { MetadataRoute } from "next";
import {
  getAllServices,
  getAllNeighborhoods,
  getCategories,
  categoryToSlug,
  getRegions,
} from "@/lib/data";
import { SITE_URL, serviceToIndustrySlug } from "@/lib/seo";

const URLS_PER_SITEMAP = 19000;
const LAST_MODIFIED = new Date("2026-03-28");

function buildAllUrls(): MetadataRoute.Sitemap {
  const services = getAllServices();
  const neighborhoods = getAllNeighborhoods();
  const categories = getCategories();
  const regions = getRegions();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/areas`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/businesses`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/industries`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/${s.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const businessPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/businesses/${categoryToSlug(c)}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const neighborhoodPages: MetadataRoute.Sitemap = neighborhoods.map((n) => ({
    url: `${SITE_URL}/areas/${n.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const industryPages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/industries/${serviceToIndustrySlug(s)}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const industryRegionPages: MetadataRoute.Sitemap = services.flatMap((s) =>
    regions.map((r) => ({
      url: `${SITE_URL}/industries/${serviceToIndustrySlug(s)}/${r.toLowerCase().replace(/\s+/g, "-")}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const moneyPages: MetadataRoute.Sitemap = services.flatMap((s) =>
    neighborhoods.map((n) => ({
      url: `${SITE_URL}/${s.slug}/${n.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [
    ...staticPages,
    ...servicePages,
    ...businessPages,
    ...neighborhoodPages,
    ...industryPages,
    ...industryRegionPages,
    ...moneyPages,
  ];
}

export async function generateSitemaps() {
  const allUrls = buildAllUrls();
  const count = Math.ceil(allUrls.length / URLS_PER_SITEMAP);
  return Array.from({ length: count }, (_, i) => ({ id: i }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const allUrls = buildAllUrls();
  const start = id * URLS_PER_SITEMAP;
  return allUrls.slice(start, start + URLS_PER_SITEMAP);
}
