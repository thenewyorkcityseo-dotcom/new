import servicesData from "@/data/services.json";
import neighborhoodsData from "@/data/neighborhoods.json";

export interface Service {
  slug: string;
  name: string;
  category: string;
  description: string;
}

export interface Neighborhood {
  slug: string;
  name: string;
  region: string;
  type: "borough" | "neighborhood" | "city";
}

export function getAllServices(): Service[] {
  return servicesData;
}

export function getAllNeighborhoods(): Neighborhood[] {
  return neighborhoodsData as Neighborhood[];
}

export function getServiceBySlug(slug: string): Service | undefined {
  return servicesData.find((s) => s.slug === slug);
}

export function getNeighborhoodBySlug(slug: string): Neighborhood | undefined {
  return (neighborhoodsData as Neighborhood[]).find((n) => n.slug === slug);
}

export function getServicesByCategory(): Record<string, Service[]> {
  const grouped: Record<string, Service[]> = {};
  for (const service of servicesData) {
    if (!grouped[service.category]) {
      grouped[service.category] = [];
    }
    grouped[service.category].push(service);
  }
  return grouped;
}

export function getNeighborhoodsByRegion(): Record<string, Neighborhood[]> {
  const grouped: Record<string, Neighborhood[]> = {};
  for (const n of neighborhoodsData as Neighborhood[]) {
    if (!grouped[n.region]) {
      grouped[n.region] = [];
    }
    grouped[n.region].push(n);
  }
  return grouped;
}

export function getRegions(): string[] {
  return [
    "Manhattan",
    "Brooklyn",
    "Queens",
    "Bronx",
    "Staten Island",
    "New Jersey",
    "Long Island",
    "Westchester",
  ];
}

export function getCategories(): string[] {
  const cats = new Set(servicesData.map((s) => s.category));
  return Array.from(cats).sort();
}
