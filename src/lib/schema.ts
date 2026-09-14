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

/**
 * The custom URL, claimed 2026-08-06. The old auto-generated
 * `/in/adam-saltarelli-a7a8bb339/` still redirects here, but a `sameAs` should
 * name the canonical profile, not a redirect. Also rendered by Footer.tsx.
 */
export const LINKEDIN_URL = "https://www.linkedin.com/in/adamsaltarelli";

/** Must match the links rendered in src/components/Footer.tsx. */
export const SAME_AS = [
  "https://www.instagram.com/saltarelliwebstudio/",
  "https://www.facebook.com/profile.php?id=61585437915197",
  "https://www.youtube.com/@saltarelliwebstudio",
  LINKEDIN_URL,
  "https://x.com/SaltarelliWeb",
  "https://open.spotify.com/show/4Ifud59mNiYzwigcWg7lV0",
];

/**
 * Adam's own entity, kept deliberately separate from the business entity.
 *
 * This exists because his name is accumulating authority OUTSIDE this site — a
 * NOW Toronto feature, a yourTV Niagara segment, Niagara Daily News, a podcast
 * episode. Google and the AI search engines build an entity record out of those
 * mentions. Until this file gave them an `@id` to resolve to, that authority
 * landed on a person with no machine-readable connection to Saltarelli Web
 * Studio: `founder` was the bare string "Adam Saltarelli", which cannot be
 * linked to anything. `PERSON_ID` is the anchor and `worksFor` is the wire.
 */
export const PERSON_ID = `${SITE_URL}/about#adam`;
export const PERSON_NAME = "Adam Saltarelli";

/**
 * Copied to public/ rather than imported from src/assets/, where Vite would
 * content-hash the filename. Google caches entity images, so this URL is worth
 * keeping stable across rebuilds.
 */
export const PERSON_IMAGE = `${SITE_URL}/adam-saltarelli.png`;

/**
 * Profiles that ARE Adam — as opposed to press written ABOUT him, which is
 * PRESS_MENTIONS below. LinkedIn appears here AND in the business's SAME_AS on
 * purpose: there is no separate company page, so that one profile genuinely
 * serves as both, and the footer links it as the business's.
 */
export const PERSON_SAME_AS = [
  LINKEDIN_URL,
  "https://www.instagram.com/adamsaltarelli/",
  "https://lo550.com",
];

/**
 * Coverage of Adam, emitted as `subjectOf` on the Person node. When a new piece
 * lands, add a row here — this array is the only place it needs to go.
 *
 * Every URL and date below was read off the live page, not recalled. The NOW
 * Toronto entry carries no `headline` on purpose: that article sits behind a
 * Cloudflare bot challenge that blocks automated reads, and an invented
 * headline is worse than an absent one. `subjectOf` does not require it.
 */
export const PRESS_MENTIONS = [
  {
    "@type": "NewsArticle",
    url: "https://nowtoronto.com/lifestyle/charity-marathon-run-lake-ontario-550-miles-for-kids/",
    datePublished: "2026-07-23",
    publisher: { "@type": "Organization", name: "NOW Toronto" },
  },
  {
    "@type": "NewsArticle",
    headline:
      "What's Good in Niagara? Port Colborne teen takes on 550-mile run around Lake Ontario for charity",
    url: "https://www.niagaradailynews.ca/news/local-news-niagara/whats-good-in-niagara-port-colborne-teen-takes-on-550-mile-run-around-lake-ontario-for-charity1/",
    datePublished: "2026-08-04",
    publisher: { "@type": "Organization", name: "Niagara Daily News" },
  },
  {
    "@type": "VideoObject",
    name: "550 Miles on Foot",
    description:
      "yourTV Niagara segment on Adam Saltarelli's 550-mile run around the Canadian shore of Lake Ontario for Canadian Tire Jumpstart.",
    url: "https://www.youtube.com/watch?v=eKE3n7rr4-0",
    uploadDate: "2026-07-14",
    thumbnailUrl: "https://i.ytimg.com/vi/eKE3n7rr4-0/hqdefault.jpg",
    publisher: { "@type": "Organization", name: "yourTV Niagara" },
  },
  {
    "@type": "PodcastEpisode",
    name: "EP 235 - Adam Saltarelli: The 550-Mile Summer, Running Around Lake Ontario for Jumpstart",
    url: "https://athleticsontariorunning.libsyn.com/ep-235-adam-saltarelli-the-550-mile-summer-running-around-lake-ontario-for-jumpstart",
    datePublished: "2026-07-30",
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "Athletics Ontario Running Podcast",
    },
  },
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

/**
 * Cities with a dedicated landing page. Lives here rather than in
 * CityPageLayout because the Footer links to these too, and importing them from
 * CityPageLayout would create a Footer -> CityPageLayout -> Footer cycle.
 *
 * Keep in sync with ROUTES in scripts/routes.mjs and the routes in App.tsx.
 */
export const CITY_PAGES = [
  { city: "Port Colborne", slug: "web-design-port-colborne" },
  { city: "Welland", slug: "web-design-welland" },
  { city: "St. Catharines", slug: "web-design-st-catharines" },
  { city: "Fort Erie", slug: "web-design-fort-erie" },
  { city: "Crystal Beach", slug: "web-design-crystal-beach" },
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
  founder: { "@type": "Person", "@id": PERSON_ID, name: PERSON_NAME },
  serviceType: SERVICE_TYPES,
  priceRange: "$$",
  knowsLanguage: "en",
};

/**
 * Adam as a first-class entity, not a name nested inside the business.
 *
 * `worksFor` points at the business `@id` and the business's `founder` points
 * back here, so the two nodes are joined in both directions. `subjectOf`
 * carries the press, which is what makes this worth emitting at all: it gives
 * every news mention of the name a place on this site to resolve to.
 */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: PERSON_NAME,
  givenName: "Adam",
  familyName: "Saltarelli",
  url: `${SITE_URL}/about`,
  image: PERSON_IMAGE,
  jobTitle: "Founder",
  worksFor: { "@id": `${SITE_URL}/#business` },
  workLocation: { "@type": "Place", address: POSTAL_ADDRESS },
  knowsAbout: SERVICE_TYPES,
  knowsLanguage: "en",
  email: EMAIL,
  telephone: TELEPHONE,
  sameAs: PERSON_SAME_AS,
  subjectOf: PRESS_MENTIONS,
};

/**
 * Declares /about as THE page for the person entity. Without this, the Person
 * node is emitted site-wide with no single canonical home, and Google has to
 * guess which URL the entity belongs to.
 */
export const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/about#profilepage`,
  url: `${SITE_URL}/about`,
  name: "About Adam Saltarelli",
  mainEntity: { "@id": PERSON_ID },
  publisher: { "@id": `${SITE_URL}/#business` },
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

/**
 * FAQPage schema from question/answer pairs already rendered on the page.
 *
 * Google requires the marked-up Q&A to be visible on the page, which is why
 * this takes the same array the accordion renders rather than a separate copy.
 */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
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
