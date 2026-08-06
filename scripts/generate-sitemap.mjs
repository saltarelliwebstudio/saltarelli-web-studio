/**
 * Generates public/sitemap.xml from the shared route manifest.
 *
 * The sitemap used to be hand-maintained, which is how /get-started ended up
 * live but unlisted. Now it is derived from scripts/routes.mjs, so adding a
 * route is the only step required.
 *
 * <lastmod> comes from each page component's last commit date, so it reflects
 * when the page actually changed. Uncommitted/new pages fall back to today.
 *
 * Run: npm run sitemap
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { ROUTES, SITE_URL } from "./routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "public", "sitemap.xml");

const today = new Date().toISOString().slice(0, 10);

function lastModified(sourceFile) {
  const abs = path.join(ROOT, sourceFile);
  if (!fs.existsSync(abs)) return today;
  try {
    const date = execFileSync(
      "git",
      ["log", "-1", "--format=%cs", "--", sourceFile],
      { cwd: ROOT, encoding: "utf8" }
    ).trim();
    // Empty for files that exist but were never committed.
    return date || today;
  } catch {
    return today;
  }
}

// Never advertise a URL whose page doesn't exist — it would resolve to the 404.
const live = ROUTES.filter((route) => {
  if (fs.existsSync(path.join(ROOT, route.source))) return true;
  console.warn(`[sitemap] – skipping ${route.path} (${route.source} not found)`);
  return false;
});

const body = live.map((route) => {
  const loc = route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`;
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastModified(route.source)}</lastmod>`,
    `    <changefreq>${route.changefreq}</changefreq>`,
    `    <priority>${route.priority}</priority>`,
    "  </url>",
  ].join("\n");
}).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

fs.writeFileSync(OUT, xml, "utf8");
console.log(`[sitemap] wrote ${live.length} URLs → public/sitemap.xml`);
