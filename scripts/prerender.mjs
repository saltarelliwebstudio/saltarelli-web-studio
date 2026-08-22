/**
 * Build-time prerenderer.
 *
 * Runs AFTER `vite build`. Serves dist/ locally, drives a headless Chrome over
 * every public route, and writes the fully-rendered HTML back into dist/ so
 * crawlers get real content instead of an empty <div id="root">.
 *
 * Why a headless browser instead of renderToString():
 *   5 of 6 routes are React.lazy behind a <Suspense> fallback (src/App.tsx).
 *   renderToString would emit the empty fallback for all of them. A real
 *   browser resolves the lazy chunks for free, and also runs react-helmet-async
 *   so per-route <title>/<meta> land in the static HTML.
 *
 * This script NEVER fails the build. If anything goes wrong it logs loudly and
 * exits 0, leaving the normal SPA output in place.
 */

import http from "node:http";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES, EXTRA_PRERENDER } from "./routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");

/**
 * Third-party hosts blocked during prerender.
 *
 * Without this, EVERY build fires real GA4 pageviews for every route (polluting
 * the analytics that this whole exercise is meant to improve) and bakes
 * third-party markup into the static HTML.
 */
const BLOCKED_HOSTS = [
  "googletagmanager.com",
  "google-analytics.com",
  "analytics.google.com",
  "doubleclick.net",
  "vercel-insights.com",
  "vitals.vercel-insights.com",
  "calendly.com",
  "supabase.co",
  "youtube.com",
  "ytimg.com",
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
};

/**
 * Static file server for dist/ with SPA fallback, so client routes boot.
 *
 * `shell` is the PRISTINE dist/index.html, read once before any route is
 * written. It is deliberately not re-read from disk: route "/" overwrites
 * dist/index.html with its own snapshot, and every later route falls back to
 * that same file — so a re-reading server feeds each route the previous
 * route's rendered DOM. That is how a single stray portal node ends up baked
 * into all ten pages. (Shipped exactly that way 2026-08-20.)
 */
function createServer(shell) {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    const filePath = path.join(DIST, urlPath);

    // Serve a real file when one exists and is inside dist/.
    if (
      filePath.startsWith(DIST) &&
      fs.existsSync(filePath) &&
      fs.statSync(filePath).isFile()
    ) {
      res.writeHead(200, {
        "Content-Type": MIME[path.extname(filePath)] || "application/octet-stream",
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // Otherwise fall back to the SPA shell so react-router can take over.
    res.writeHead(200, { "Content-Type": MIME[".html"] });
    res.end(shell);
  });
}

/**
 * Trigger every framer-motion `whileInView` animation, then wait for them to
 * settle.
 *
 * Nearly all page content is wrapped in FadeIn/StaggerItem/ScaleIn, which start
 * at `opacity: 0` and only animate to `opacity: 1` once scrolled into view. A
 * naive snapshot bakes `opacity:0` into everything below the fold — that is
 * hidden text to Google, and a genuine cloaking risk.
 *
 * The viewports are `once: true`, so a single full-page scroll latches them on
 * permanently. We then scroll back to the top so the snapshot matches a fresh
 * page load.
 */
async function settleAnimations(page) {
  await page.evaluate(async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.max(200, Math.floor(window.innerHeight * 0.7));

    // Snapshot the height once and cap the iterations. Re-reading scrollHeight
    // inside the condition loops forever, because the page keeps growing as
    // elements animate in from their translated start positions.
    const height = document.body.scrollHeight;
    const maxSteps = Math.min(Math.ceil(height / step) + 2, 120);

    for (let i = 0; i <= maxSteps; i++) {
      window.scrollTo(0, i * step);
      await wait(70);
    }
    window.scrollTo(0, document.body.scrollHeight);
    await wait(300);
    window.scrollTo(0, 0);

    // Fixed settle rather than awaiting document.getAnimations().finished:
    // this site runs several INFINITE css animations (animate-float,
    // animate-pulse-glow, animate-twinkle) whose finished promise never
    // resolves, which would hang the build forever.
    await wait(600);
  });

  // Belt-and-braces: anything still transparent that holds real text gets
  // forced to its settled state. Returns a count so a silent regression in the
  // scroll pass is visible in the build log rather than shipping hidden text.
  return page.evaluate(() => {
    let fixed = 0;
    for (const el of document.querySelectorAll("[style]")) {
      const style = el.getAttribute("style") || "";
      if (!/opacity:\s*0(\.\d+)?\s*(;|$)/.test(style)) continue;
      if (!el.textContent?.trim()) continue; // ignore decorative nodes
      el.style.opacity = "1";
      if (/transform:\s*translate/.test(style)) el.style.transform = "none";
      fixed++;
    }
    return fixed;
  });
}

/**
 * Remove React portals from the snapshot.
 *
 * Radix (Dialog, Toast, Tooltip, Popover, Sheet) portals its content to
 * `document.body`, OUTSIDE `<div id="root">`. React only hydrates #root, so
 * anything baked in beside it is dead markup forever: no fiber, no handlers,
 * no way to close it. On 2026-08-20 the DemoPopup's new desktop scroll trigger
 * fired during settleAnimations()'s scroll pass and shipped a permanently-open,
 * unclosable modal over every page on the site.
 *
 * Nothing React injects at runtime belongs in a static snapshot — hydration
 * recreates it — so the rule is simply: `body > *` that isn't #root or a
 * script/template goes. Returns what was removed so the build log shows it.
 */
async function stripPortals(page) {
  return page.evaluate(() => {
    const removed = [];
    for (const el of [...document.body.children]) {
      if (el.id === "root") continue;
      if (el.tagName === "SCRIPT" || el.tagName === "TEMPLATE" || el.tagName === "NOSCRIPT") continue;
      removed.push(el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (el.getAttribute("role") ? "[role=" + el.getAttribute("role") + "]" : ""));
      el.remove();
    }
    // Radix locks scroll + hides the page from AT while a modal is open. Both
    // get written into the static HTML and neither is ever undone.
    document.body.removeAttribute("style");
    document.body.removeAttribute("data-scroll-locked");
    for (const el of document.querySelectorAll("#root [aria-hidden=\"true\"][data-aria-hidden]")) {
      el.removeAttribute("aria-hidden");
      el.removeAttribute("data-aria-hidden");
    }
    return removed;
  });
}

/**
 * Strip only the analytics tags the SPA INJECTED at runtime, so they aren't
 * shipped statically and then injected a second time on hydration.
 *
 * Deliberately does NOT touch the Google Tag in index.html. That tag is part of
 * the source template and must ship in the static HTML — stripping it silently
 * disables GA4 across the whole site.
 */
function cleanHtml(html) {
  return (
    html
      .replace(
        /<script[^>]*src="[^"]*_vercel\/(?:insights|speed-insights)[^"]*"[^>]*><\/script>/g,
        ""
      )
      // CalendlyEmbed builds embed_domain from window.location.hostname, which
      // during prerender is the local snapshot server. Calendly refuses to paint
      // when it can't verify the framing domain, so a baked 127.0.0.1 would ship
      // a silently blank calendar to anyone who sees the static HTML before
      // React re-renders. Rewrite it to the real domain.
      .replace(
        /embed_domain=(?:127\.0\.0\.1|localhost)(?:%3A|:)?\d*/g,
        "embed_domain=saltarelliwebstudio.ca"
      )
  );
}

async function main() {
  if (!fs.existsSync(path.join(DIST, "index.html"))) {
    console.warn("[prerender] no dist/index.html — run `vite build` first. Skipping.");
    return;
  }

  const { default: puppeteer } = await import("puppeteer");

  const shell = await fsp.readFile(path.join(DIST, "index.html"));
  const server = createServer(shell);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  const origin = `http://127.0.0.1:${port}`;

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
    // Guard against a single wedged evaluate taking the whole build hostage.
    protocolTimeout: 90000,
  });

  // Skip routes whose page component doesn't exist yet. Without this guard a
  // not-yet-built route would render the 404 page and get written to disk as
  // that URL's "real" content — worse than serving nothing.
  const ROOT = path.resolve(__dirname, "..");
  const targets = [
    ...ROUTES.filter((r) => {
      if (!r.source || fs.existsSync(path.join(ROOT, r.source))) return true;
      console.warn(`[prerender] – skipping ${r.path} (${r.source} not found)`);
      return false;
    }).map((r) => ({ path: r.path, outFile: null })),
    ...EXTRA_PRERENDER,
  ];

  let ok = 0;
  let failed = 0;

  for (const target of targets) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    // Let the app know it is being snapshotted. Anything that interrupts a
    // visitor (popups, toasts) must not render into static HTML.
    await page.evaluateOnNewDocument(() => {
      window.__PRERENDER__ = true;
    });

    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const url = req.url();
      // Media/images never affect the HTML we extract, and the 7MB case-study
      // video holds a connection open forever, which stalls page load.
      if (["image", "media", "font"].includes(req.resourceType())) {
        req.abort().catch(() => {});
      } else if (BLOCKED_HOSTS.some((h) => url.includes(h))) {
        req.abort().catch(() => {});
      } else {
        req.continue().catch(() => {});
      }
    });

    try {
      await page.goto(`${origin}${target.path}`, {
        waitUntil: "domcontentloaded",
        timeout: 45000,
      });

      // Wait for the page's real content, not the Suspense fallback.
      //
      // The fallback IS a child of #root, so checking childElementCount would
      // pass on an empty shell. Every page renders exactly one <h1>, so an h1
      // with text is the signal that the lazy chunk resolved and rendered.
      await page.waitForFunction(
        () => (document.querySelector("h1")?.textContent?.trim().length ?? 0) > 0,
        { timeout: 30000 }
      );

      const forced = await settleAnimations(page);
      if (forced > 0) {
        console.log(`[prerender]   forced ${forced} lingering hidden element(s) visible`);
      }

      const stripped = await stripPortals(page);
      if (stripped.length > 0) {
        console.log(`[prerender]   stripped ${stripped.length} portal node(s): ${stripped.join(", ")}`);
      }

      const html = cleanHtml(
        "<!DOCTYPE html>\n" + (await page.content()).replace(/^<!DOCTYPE html>/i, "")
      );

      const outFile =
        target.outFile ??
        (target.path === "/"
          ? "index.html"
          : path.join(target.path.replace(/^\//, ""), "index.html"));
      const outPath = path.join(DIST, outFile);

      await fsp.mkdir(path.dirname(outPath), { recursive: true });
      await fsp.writeFile(outPath, html, "utf8");

      const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
      console.log(`[prerender] ✓ ${target.path.padEnd(30)} → ${outFile} (${kb} KB)`);
      ok++;
    } catch (err) {
      failed++;
      console.error(`[prerender] ✗ ${target.path} — ${err.message}`);
    } finally {
      await page.close().catch(() => {});
    }
  }

  await browser.close();
  server.close();

  console.log(`[prerender] done — ${ok} rendered, ${failed} failed`);
}

main().catch((err) => {
  // Never fail the deploy: degrade to the normal client-rendered SPA.
  console.error("[prerender] FAILED, shipping un-prerendered SPA instead:", err);
  process.exit(0);
});
