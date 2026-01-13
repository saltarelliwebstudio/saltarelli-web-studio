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
  title = "Web Design in Ontario | Turn Your Dreams Into Reality",
  description = "Professional web design services in Ontario. Fully custom websites and AI agents for small businesses. Fast turnaround, affordable pricing. Book a free discovery call today.",
  canonical,
  type = "website",
  image = defaultImage,
  schema,
}: SEOProps) => {
  const fullTitle = title.includes(siteName)
    ? title
    : `${title} | ${siteName}`;

  const pageUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteName,
    description:
      "Professional web design services in Ontario. Custom websites and AI agents for small businesses.",
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
    serviceType: ["Web Design", "Website Development", "AI Agents"],
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
        content="web design Ontario, website design, custom websites, AI agents, small business websites, web designer Canada, affordable web design, website redesign"
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
