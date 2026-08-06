import { Helmet } from "react-helmet-async";
import { businessSchema, SITE_URL, LOGO_URL, BUSINESS_NAME } from "@/lib/schema";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: "website" | "article" | "profile";
  image?: string;
  /** One schema object, or several to emit as separate JSON-LD blocks. */
  schema?: object | object[];
}

const siteUrl = SITE_URL;
const defaultImage = LOGO_URL;
const siteName = BUSINESS_NAME;

export const SEO = ({
  title = "Get Found on Google, Win More Customers",
  description = "Managed websites, Google review engines, and local SEO that get Niagara businesses found on Google. Backed by a 60-day guarantee.",
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

  // Business identity lives in src/lib/schema.ts so the site, the footer, and
  // the Google Business Profile all state the same name, address, and phone.
  const schemas = schema
    ? Array.isArray(schema) ? schema : [schema]
    : [businessSchema];

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

      {/* Additional SEO. No keywords meta — Google has ignored it since 2009
          and it reads as amateur to anyone who views source. */}
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="CA-ON" />
      <meta name="geo.placename" content="Ontario" />

      {/* JSON-LD Schema */}
      {schemas.map((s, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};
