/**
 * Single source of truth for every public route.
 *
 * Consumed by:
 *   - scripts/prerender.mjs       (which routes to snapshot)
 *   - scripts/generate-sitemap.mjs (which URLs go in sitemap.xml)
 *
 * Adding a route here is the ONLY step needed to get it prerendered AND
 * into the sitemap. Previously the sitemap was hand-maintained, which is
 * why /get-started was live but missing from it for months.
 */

export const SITE_URL = "https://saltarelliwebstudio.ca";

/**
 * `source` is the page component backing the route. generate-sitemap.mjs reads
 * its last commit date for <lastmod>, so the sitemap reports when a page really
 * changed rather than stamping every URL with the build date.
 *
 * @type {{ path: string, source: string, changefreq: string, priority: string }[]}
 */
export const ROUTES = [
  { path: "/", source: "src/pages/Index.tsx", changefreq: "weekly", priority: "1.0" },
  { path: "/portfolio", source: "src/pages/Portfolio.tsx", changefreq: "weekly", priority: "0.8" },
  { path: "/web-design-port-colborne", source: "src/pages/WebDesignPortColborne.tsx", changefreq: "monthly", priority: "0.8" },
  { path: "/web-design-welland", source: "src/pages/WebDesignWelland.tsx", changefreq: "monthly", priority: "0.8" },
  { path: "/web-design-st-catharines", source: "src/pages/WebDesignStCatharines.tsx", changefreq: "monthly", priority: "0.8" },
  { path: "/get-started", source: "src/pages/GetStarted.tsx", changefreq: "monthly", priority: "0.7" },
  { path: "/ai-operator-kit", source: "src/pages/AiOperatorKit.tsx", changefreq: "monthly", priority: "0.7" },
  { path: "/workshop", source: "src/pages/Workshop.tsx", changefreq: "weekly", priority: "0.6" },
  { path: "/about", source: "src/pages/About.tsx", changefreq: "monthly", priority: "0.5" },
];

/**
 * Routes to snapshot but NOT list in the sitemap.
 * `outFile` overrides the default `<path>/index.html` placement.
 */
export const EXTRA_PRERENDER = [
  // Vercel's error phase serves /404.html; it currently doesn't exist.
  { path: "/__not-found", outFile: "404.html" },
];
