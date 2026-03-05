import type { MetadataRoute } from "next";
import {
  getAllServices,
  getAllNeighborhoods,
  getCategories,
  categoryToSlug,
  getRegions,
} from "@/lib/data";
import { SITE_URL, serviceToIndustrySlug } from "@/lib/seo";

const URLS_PER_SITEMAP = 45000;

function getAllUrls(): MetadataRoute.Sitemap {
  const services = getAllServices();
  const neighborhoods = getAllNeighborhoods();
  const categories = getCategories();
  const regions = getRegions();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/areas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/businesses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/industries`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const businessPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/businesses/${categoryToSlug(c)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const neighborhoodPages: MetadataRoute.Sitemap = neighborhoods.map((n) => ({
    url: `${SITE_URL}/areas/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const industryPages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/industries/${serviceToIndustrySlug(s)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const industryRegionPages: MetadataRoute.Sitemap = services.flatMap((s) =>
    regions.map((r) => ({
      url: `${SITE_URL}/industries/${serviceToIndustrySlug(s)}/${r.toLowerCase().replace(/\s+/g, "-")}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const moneyPages: MetadataRoute.Sitemap = services.flatMap((s) =>
    neighborhoods.map((n) => ({
      url: `${SITE_URL}/${s.slug}/${n.slug}`,
      lastModified: new Date(),
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
  const totalUrls = getAllUrls().length;
  const count = Math.ceil(totalUrls / URLS_PER_SITEMAP);
  return Array.from({ length: count }, (_, i) => ({ id: i }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const allUrls = getAllUrls();
  const start = id * URLS_PER_SITEMAP;
  return allUrls.slice(start, start + URLS_PER_SITEMAP);
}
