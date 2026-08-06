/**
 * Click handler for the sitewide "book" CTAs in the Header and Footer.
 *
 * Those CTAs used to be hardcoded to `/#apply`, the homepage's booking section.
 * On a city page that meant the most prominent button on screen navigated the
 * visitor AWAY from the page that had just sold them — past a calendar sitting
 * a few hundred pixels below.
 *
 * Every page that sells now renders its booking section with id="apply", so if
 * one exists on the current page we scroll to it and stay put. Otherwise the
 * anchor's href (`/#apply`) takes over and sends them to the homepage, which is
 * the correct fallback for pages with no calendar of their own (e.g. /workshop).
 *
 * Kept as a plain href + onClick rather than a router link on purpose: the href
 * still works with JS disabled and in the prerendered HTML.
 */
export function scrollToBooking(event: React.MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById("apply");
  if (!target) return; // no calendar here — let the href navigate to /#apply

  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });

  // Keep the URL shareable without triggering a second jump.
  if (window.history?.replaceState) {
    window.history.replaceState(null, "", "#apply");
  }
}
