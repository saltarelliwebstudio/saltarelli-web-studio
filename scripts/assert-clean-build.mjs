/**
 * Fail the build if a prerendered page shipped a React portal.
 *
 * Radix portals to <body>, outside #root. React only hydrates #root, so a
 * portal caught in a static snapshot is dead markup that no click can close —
 * and if it is a Dialog it also carries `pointer-events: none` on <body> and
 * a scroll lock, which kills every interaction on the page.
 *
 * That shipped site-wide on 2026-08-20 and nothing caught it: prerender.mjs
 * exits 0 on failure by design (degrade to a plain SPA rather than block a
 * deploy), the build log looked healthy, and the pages rendered fine to a
 * crawler. It took a human clicking the live site to notice.
 *
 * So this check exits NON-ZERO on purpose. A poisoned snapshot is worse than
 * no snapshot — refuse to ship it.
 */
import fs from "node:fs";
import path from "node:path";

const DIST = path.join(process.cwd(), "dist");

/** Things that only ever appear in HTML because a portal was open mid-render. */
const POISON = [
  { pattern: /<body(?![>\s])|<body\s[^>]+>/, label: "<body> carries attributes (scroll lock / pointer-events)" },
  { pattern: /data-scroll-locked/, label: "Radix scroll lock baked in" },
  { pattern: /role="dialog"/, label: "open dialog baked in" },
  { pattern: /data-radix-focus-guard/, label: "Radix focus guard baked in" },
  { pattern: /data-radix-popper-content-wrapper/, label: "Radix popper baked in" },
  // The mobile nav's own lock. Prerender runs at 1280px and the menu button is
  // lg:hidden, so it cannot open today — but this file exists to catch a lock
  // that leaked into static HTML, and that is one of them.
  { pattern: /<html[^>]*\bnav-open\b/, label: "mobile nav scroll lock baked in" },
];

function htmlFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(full));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

if (!fs.existsSync(DIST)) {
  console.error("[assert-build] no dist/ — nothing to check");
  process.exit(1);
}

const failures = [];
const files = htmlFiles(DIST);

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  for (const { pattern, label } of POISON) {
    if (pattern.test(html)) {
      failures.push(`${path.relative(DIST, file)} — ${label}`);
    }
  }
}

if (failures.length > 0) {
  console.error("\n[assert-build] ✗ REFUSING TO SHIP — prerender baked a live portal into static HTML:\n");
  for (const f of failures) console.error("  " + f);
  console.error(
    "\n  A portal outside #root is never hydrated, so it cannot be closed, and a\n" +
      "  Dialog also freezes the whole page via body{pointer-events:none}.\n" +
      "  Check scripts/prerender.mjs stripPortals() and the __PRERENDER__ guards.\n",
  );
  process.exit(1);
}

console.log(`[assert-build] ✓ ${files.length} page(s) clean — bare <body>, no orphaned portals`);
