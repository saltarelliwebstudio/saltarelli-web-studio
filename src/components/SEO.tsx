import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: "website" | "article" | "profile";
  image?: string;
  schema?: object;
}

const siteUrl = "https://saltarelliwebstudio.ca";
const defaultImage = `${siteUrl}/sws-logo.png`;
const siteName = "Saltarelli Web Studio";

export const SEO = ({
  title = "AI Admin Systems for Small Business",
  description = "We build AI admin systems for businesses that save 10+ hours a week, delivered in 14 days. Websites, AI agents, and automations in one managed plan.",
  canonical,
  type = "website",
  image = defaultImage,
  schema,
}: SEOProps) => {
  const fullTitle = title.includes(siteName)
    ? title
    : `${title} | ${siteName}`;

  const fullCanonical = canonical
    ? canonical.startsWith("http") ? canonical : `${siteUrl}${canonical}`
    : siteUrl;

  const pageUrl = fullCanonical;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteName,
    description:
      "AI admin systems for small businesses. Save 10+ hours a week on estimates, follow-ups, scheduling, and invoicing. Delivered in 14 days.",
    url: siteUrl,
    logo: defaultImage,
    image: defaultImage,
    telephone: "+1-226-340-5015",
    email: "saltarelliwebstudio@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Ontario",
      addressCountry: "CA",
    },
    areaServed: {
      "@type": "Place",
      name: "Ontario, Canada",
    },
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-17:00",
    sameAs: [
      "https://www.instagram.com/saltarelliwebstudio",
      "https://www.facebook.com/profile.php?id=61576197754247",
    ],
    founder: {
      "@type": "Person",
      name: "Adam Saltarelli",
    },
    serviceType: [
      "AI Admin Systems",
      "Business Automation",
      "AI Agents",
      "Web Design",
      "CRM",
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="author" content="Adam Saltarelli" />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_CA" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta
        name="keywords"
        content="AI admin systems, AI for small business, business automation, small business AI, save 10 hours a week, 14 day delivery, AI agents Ontario, web design Ontario, automation Canada"
      />
      <meta name="geo.region" content="CA-ON" />
      <meta name="geo.placename" content="Ontario" />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
};
