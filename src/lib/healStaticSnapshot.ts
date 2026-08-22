/**
 * Undo a poisoned prerender snapshot before React mounts.
 *
 * The build prerenders every route in headless Chrome. If anything portals to
 * <body> during that pass — Radix Dialog, Toast, Tooltip, Popover — it gets
 * written into the static HTML *outside* #root, where React never hydrates it.
 * Dead markup, no fiber, no handlers, nothing to close it. On 2026-08-20 the
 * DemoPopup's scroll trigger fired during the build and shipped exactly that:
 * a permanently-open modal plus `pointer-events: none` on <body>, so every
 * click on every page of the site was dead before the visitor did anything.
 *
 * scripts/prerender.mjs now strips portals at build time and DemoPopup checks
 * __PRERENDER__, so new builds are clean. This is the third line of defence,
 * and the only one that helps someone holding a cached copy of a bad page.
 *
 * It also has to run for a subtler reason. Radix's dismissable-layer captures
 * `body.style.pointerEvents` when a layer mounts and RESTORES it on unmount.
 * On a poisoned page that captured value is "none" — so opening and closing
 * any dialog restores the freeze. Clearing the attribute before React mounts
 * is what stops that.
 */
export function healStaticSnapshot() {
  if (typeof document === "undefined") return;

  const body = document.body;
  if (!body) return;

  // Radix's scroll lock and pointer-events kill, neither of which is ever
  // undone because the layer that set them was never mounted in this document.
  if (body.style.pointerEvents === "none") body.style.pointerEvents = "";
  body.removeAttribute("data-scroll-locked");

  // Deliberately selector-matched rather than a blanket `body > *` sweep:
  // GTM's noscript iframe and other third-party injected nodes are legitimate
  // siblings of #root and must survive.
  const orphans = body.querySelectorAll<HTMLElement>(
    ":scope > [role='dialog'], :scope > [data-radix-focus-guard], :scope > [data-radix-popper-content-wrapper], :scope > div[aria-hidden='true'][data-aria-hidden]",
  );
  orphans.forEach((el) => el.remove());

  // Radix hides the rest of the page from assistive tech while a modal is open.
  // Baked into the snapshot, that hides the entire site from screen readers.
  document
    .querySelectorAll("[data-aria-hidden]")
    .forEach((el) => {
      el.removeAttribute("aria-hidden");
      el.removeAttribute("data-aria-hidden");
    });
}
