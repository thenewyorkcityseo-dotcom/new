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

function getStaticAndHubUrls(): MetadataRoute.Sitemap {
  const services = getAllServices();
  const neighborhoods = getAllNeighborhoods();
  const categories = getCategories();
  const regions = getRegions();

  return [
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
    ...services.map((s) => ({
      url: `${SITE_URL}/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...categories.map((c) => ({
      url: `${SITE_URL}/businesses/${categoryToSlug(c)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...neighborhoods.map((n) => ({
      url: `${SITE_URL}/areas/${n.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...services.map((s) => ({
      url: `${SITE_URL}/industries/${serviceToIndustrySlug(s)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...services.flatMap((s) =>
      regions.map((r) => ({
        url: `${SITE_URL}/industries/${serviceToIndustrySlug(s)}/${r.toLowerCase().replace(/\s+/g, "-")}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    ),
  ];
}

function getMoneyPageUrls(): MetadataRoute.Sitemap {
  const services = getAllServices();
  const neighborhoods = getAllNeighborhoods();

  return services.flatMap((s) =>
    neighborhoods.map((n) => ({
      url: `${SITE_URL}/${s.slug}/${n.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );
}

export async function generateSitemaps() {
  const hubCount = getStaticAndHubUrls().length;
  const moneyCount = getMoneyPageUrls().length;
  const total = hubCount + moneyCount;
  const count = Math.ceil(total / URLS_PER_SITEMAP);
  return Array.from({ length: count }, (_, i) => ({ id: i }));
}

export default async function sitemap(props: { id: Promise<number> | number }): Promise<MetadataRoute.Sitemap> {
  const id = Number(await props.id);
  const hubUrls = getStaticAndHubUrls();
  const moneyUrls = getMoneyPageUrls();
  const allUrls = [...hubUrls, ...moneyUrls];
  const start = id * URLS_PER_SITEMAP;
  return allUrls.slice(start, start + URLS_PER_SITEMAP);
}
