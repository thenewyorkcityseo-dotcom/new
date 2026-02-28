import type { Service, Neighborhood } from "./data";

const SITE_NAME = "The NYC SEO";
const SITE_URL = "https://www.thenycseo.com";
const PHONE = "212-202-9220";

export function getMoneyPageMeta(service: Service, neighborhood: Neighborhood) {
  const title = `${service.name} in ${neighborhood.name} | Top-Rated Local ${service.name} Services`;
  const description = `Find the best ${service.name.toLowerCase()} in ${neighborhood.name}, ${neighborhood.region}. ${service.description} Get free quotes from top-rated local pros today.`;

  return { title, description };
}

export function getServiceHubMeta(service: Service) {
  const title = `${service.name} Services NYC | Best ${service.name} Near You`;
  const description = `Find top-rated ${service.name.toLowerCase()} services across NYC, New Jersey, Long Island & Westchester. ${service.description} Compare local pros and get free quotes.`;

  return { title, description };
}

export function getNeighborhoodHubMeta(neighborhood: Neighborhood) {
  const title = `Local Services in ${neighborhood.name} | Find Top-Rated Pros`;
  const description = `Browse all local service providers in ${neighborhood.name}, ${neighborhood.region}. Find plumbers, electricians, lawyers, dentists & more. Get free quotes from trusted local businesses.`;

  return { title, description };
}

export function getLocalBusinessSchema(
  service: Service,
  neighborhood: Neighborhood
) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${service.name} in ${neighborhood.name} - ${SITE_NAME}`,
    description: `${service.description} Serving ${neighborhood.name}, ${neighborhood.region}.`,
    url: `${SITE_URL}/${service.slug}/${neighborhood.slug}`,
    telephone: PHONE,
    areaServed: {
      "@type": "Place",
      name: `${neighborhood.name}, ${neighborhood.region}`,
    },
    serviceType: service.name,
  };
}

export function getServiceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} Services NYC`,
    description: service.description,
    url: `${SITE_URL}/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: "New York",
    },
  };
}

export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PHONE,
    sameAs: ["https://www.consortiumnyc.com"],
    parentOrganization: {
      "@type": "Organization",
      name: "Consortium NYC",
      url: "https://www.consortiumnyc.com",
    },
  };
}

export { SITE_NAME, SITE_URL, PHONE };
