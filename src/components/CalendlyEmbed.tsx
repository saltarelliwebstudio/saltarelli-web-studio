import React, { useEffect } from "react";
import { trackEvent } from "@/components/PageTracker";
import { trackButtonClick } from "@/lib/analytics";

export const CALENDLY_URL =
  "https://calendly.com/saltarelliwebstudio/free-15-minute-online-presence-review";

/**
 * Inline Calendly booking widget.
 *
 * Deliberately a plain iframe rather than Calendly's widget.js: no third-party
 * script in the bundle, nothing for an ad blocker to strip, and no dependency on
 * their CDN being up. Calendly's iframe posts the same events either way, so we
 * still get booking tracking (widget.js is only a listener around these).
 *
 * Deferral is the iframe's own loading="lazy", NOT an IntersectionObserver. An
 * observer-gated mount was tried and removed: when the observer did not fire the
 * calendar silently never appeared, which on this page means the primary
 * conversion quietly vanishes. Native lazy loading gives the same "don't fetch
 * until near the viewport" benefit with no JS and no failure mode.
 */
export const CalendlyEmbed = ({
  trackingLabel = "calendly_inline",
}: {
  trackingLabel?: string;
}) => {
  // Calendly reports progress from inside the iframe. The one that matters is
  // event_scheduled — that is a booked call, not a click.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      const name = (e.data as { event?: string })?.event;
      if (typeof name !== "string" || !name.startsWith("calendly.")) return;

      if (name === "calendly.event_scheduled") {
        window.gtag?.("event", "generate_lead", {
          method: "calendly_inline",
          page_location: window.location.pathname,
        });
        trackEvent("calendly_booked", { from: trackingLabel });
      } else if (name === "calendly.date_and_time_selected") {
        trackEvent("calendly_time_selected", { from: trackingLabel });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [trackingLabel]);

  // embed_domain + embed_type are NOT optional. Calendly's page loads fine without
  // them (200, x-frame-options ALLOWALL) but its own script refuses to paint when it
  // cannot verify the framing domain, so you get a silent blank iframe. localhost is
  // exempt, which is exactly how this passed local testing and failed in production.
  const host =
    typeof window !== "undefined" ? window.location.hostname : "saltarelliwebstudio.ca";
  const src =
    `${CALENDLY_URL}?embed_domain=${encodeURIComponent(host)}&embed_type=Inline` +
    `&hide_gdpr_banner=1&background_color=0d0d12&text_color=f5f3ef&primary_color=ea7b2d`;

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5">
        <iframe
          src={src}
          title="Book a free 15-minute call with Adam"
          className="w-full border-0 h-[1080px] sm:h-[760px]"
          loading="lazy"
        />
      </div>

      {/* Always reachable, even if the iframe is blocked or fails to render. */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        Calendar not loading?{" "}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackButtonClick(
              `${trackingLabel}_fallback`,
              "Open it in a new tab",
              CALENDLY_URL
            )
          }
          className="text-primary font-medium hover:underline"
        >
          Open it in a new tab
        </a>
        .
      </p>
    </div>
  );
};
