/**
 * Single source of truth for schema.org structured data.
 *
 * Before this existed, the business was described in three places that had
 * drifted apart — including THREE different phone numbers (+1-226-340-5015 in
 * SEO.tsx's default, +12893029451 on the homepage, and the footer's own markup)
 * and two conflicting Facebook profile IDs. Inconsistent NAP (name / address /
 * phone) across a site and its Google Business Profile actively suppresses
 * local rankings, so this file is the only place these facts are written down.
 */

export const SITE_URL = "https://saltarelliwebstudio.ca";
export const BUSINESS_NAME = "Saltarelli Web Studio";
export const LOGO_URL = `${SITE_URL}/sws-logo.png`;

/** The one public business line. See also: src/components/Footer.tsx. */
export const TELEPHONE = "+1-289-302-9451";
export const EMAIL = "saltarelliwebstudio@gmail.com";

/** Must match the links rendered in src/components/Footer.tsx. */
export const SAME_AS = [
  "https://www.instagram.com/saltarelliwebstudio/",
  "https://www.facebook.com/profile.php?id=61585437915197",
  "https://www.youtube.com/@saltarelliwebstudio",
  "https://www.linkedin.com/in/adam-saltarelli-a7a8bb339/",
  "https://x.com/SaltarelliWeb",
  "https://open.spotify.com/show/4Ifud59mNiYzwigcWg7lV0",
];

/**
 * Service-area business: no streetAddress on purpose. This is run from a home
 * base, and a residential address does not belong in public structured data.
 * Locality + region is the correct shape for a business that travels to
 * customers rather than receiving them.
 */
export const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "Port Colborne",
  addressRegion: "ON",
  addressCountry: "CA",
} as const;

/** Every municipality in Niagara Region that Saltarelli Web Studio serves. */
export const SERVICE_AREA_CITIES = [
  "Port Colborne",
  "Welland",
  "St. Catharines",
  "Niagara Falls",
  "Fort Erie",
  "Thorold",
  "Niagara-on-the-Lake",
  "Grimsby",
  "Lincoln",
  "Pelham",
  "Wainfleet",
  "West Lincoln",
];

export const AREA_SERVED = [
  ...SERVICE_AREA_CITIES.map((name) => ({
    "@type": "City",
    name,
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: "Niagara Region, Ontario",
    },
  })),
  {
    "@type": "State",
    name: "Ontario",
    containedInPlace: { "@type": "Country", name: "Canada" },
  },
];

export const SERVICE_TYPES = [
  "Local SEO",
  "Web Design",
  "Website Management",
  "Google Business Profile Optimization",
  "Review Management",
];

/**
 * Core business identity, shared by every page's structured data.
 * Pages extend this rather than redeclaring it.
 */
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  description:
    "Managed websites, Google review engines, and local SEO that get local businesses ranking at the top of Google in 60 days. Guaranteed, or you don't pay.",
  telephone: TELEPHONE,
  email: EMAIL,
  address: POSTAL_ADDRESS,
  areaServed: AREA_SERVED,
  sameAs: SAME_AS,
  founder: { "@type": "Person", name: "Adam Saltarelli" },
  serviceType: SERVICE_TYPES,
  priceRange: "$$",
  knowsLanguage: "en",
};

/**
 * Service schema for a city landing page.
 * `areaServed` is the single city so Google can tie the offering to the place.
 */
export function cityServiceSchema(city: string, slug: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Web Design in ${city}, Ontario`,
    description,
    serviceType: "Web Design and Local SEO",
    provider: {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: BUSINESS_NAME,
      telephone: TELEPHONE,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Niagara Region, Ontario",
      },
    },
    url: `${SITE_URL}/${slug}`,
  };
}

/** Home → page breadcrumb trail. */
export function breadcrumbSchema(name: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${SITE_URL}/${slug}`,
      },
    ],
  };
}
