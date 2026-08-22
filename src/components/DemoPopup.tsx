import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Star, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { trackEvent } from "@/components/PageTracker";
import { useChatOpen } from "@/lib/chatOpenStore";

/**
 * Exit-intent booking popup for the Free Website Demo.
 *
 * The site already has plenty of places to click (sticky button, inline Calendly on
 * every sales page, header, footer). This is not another CTA — it is the one place a
 * leaving visitor is given a *reason*: proof, a face, and the calendar in one frame.
 *
 * Shown at most once per visitor, ever.
 */

// TODO (Adam): a VSL of him talking is the intended centrepiece of this popup —
// the Aug 6 "website audit pop-up" note's whole idea. Not recorded yet, so the
// slot is removed rather than left dead. To restore: render a <YouTubeFacade
// videoId={...} /> between the subhead and the testimonial below.

const SEEN_KEY = "sws_demo_popup_seen";

// Pages where the visitor is already being asked to book. Don't interrupt them.
const SUPPRESSED_PATHS = ["/get-started"];

const SCROLL_TRIGGER_RATIO = 0.6; // fallback: 60% down the page
const DWELL_TRIGGER_MS = 30_000; // touch fallback: or 30s on the page
const DESKTOP_DWELL_MS = 45_000; // desktop gets longer — exit intent usually lands first

export const DemoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const isChatOpen = useChatOpen();

  // Ref, not state: the trigger listeners read this without needing to re-bind.
  const hasFiredRef = useRef(false);

  // Chat state is read through a ref too, so opening the chat doesn't tear down
  // and rebuild every listener below.
  const isChatOpenRef = useRef(isChatOpen);
  isChatOpenRef.current = isChatOpen;

  const suppressed = SUPPRESSED_PATHS.includes(pathname);

  useEffect(() => {
    if (suppressed) return;
    if (typeof window === "undefined") return;

    // The build-time prerenderer drives a headless Chrome over every route and
    // scrolls the whole page to latch framer-motion's whileInView animations.
    // That scroll trips the trigger below, and Radix portals the modal to
    // <body> — OUTSIDE #root, where React never hydrates it — so the snapshot
    // ships a permanently-open popup that no click can close. Shipped that way
    // site-wide on 2026-08-20. scripts/prerender.mjs also strips stray portals
    // as a backstop; this is the front door.
    if ((window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__) return;

    // localStorage throws in Safari private mode. A popup is not worth an
    // exception, and failing closed (never showing) is the polite direction.
    try {
      if (localStorage.getItem(SEEN_KEY)) return;
    } catch {
      return;
    }

    const fire = (trigger: string) => {
      if (hasFiredRef.current) return;
      // Someone mid-conversation in the chat is already engaged. Leave them alone.
      if (isChatOpenRef.current) return;

      hasFiredRef.current = true;
      try {
        localStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* non-fatal — worst case they see it again next visit */
      }
      trackEvent("demo_popup_shown", { trigger, path: pathname });
      setIsOpen(true);
    };

    // Desktop: cursor leaves through the top of the viewport, toward the tabs/URL bar.
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) fire("exit_intent");
    };

    // Touch has no exit intent — there is no cursor to leave. Use engagement instead.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= SCROLL_TRIGGER_RATIO) fire("scroll_depth");
    };

    // Exit intent is desktop-only and hangs on a single finicky event: a mouseout
    // whose relatedTarget is null. A sticky header, a cursor leaving sideways or
    // out the bottom, and tabbing away with the keyboard all miss it — so a
    // desktop visitor who never sweeps out through the top used to see nothing at
    // all. Scroll and dwell now run everywhere as a backstop; fire() already
    // guards on hasFiredRef, so whichever lands first wins and the rest are no-ops.
    if (!isTouch) document.addEventListener("mouseout", onMouseOut);

    window.addEventListener("scroll", onScroll, { passive: true });
    const dwellTimer = window.setTimeout(
      () => fire("dwell"),
      isTouch ? DWELL_TRIGGER_MS : DESKTOP_DWELL_MS,
    );

    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(dwellTimer);
    };
  }, [pathname, suppressed]);

  const handleOpenChange = (open: boolean) => {
    if (!open) trackEvent("demo_popup_dismissed");
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* Wide enough for Calendly's two-column layout — it needs ~1000px, and the
          narrow fallback is much taller, which buries the calendar in a modal. */}
      {/* `[&>button:last-child]:hidden` kills DialogContent's own close button.
          It always renders last, and it sits 4px off the bigger one below —
          two overlapping Xs that read as one smudged icon. */}
      <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto p-0 gap-0 [&>button:last-child]:hidden">
        {/* The stock DialogContent close button is small and grey; this modal
            interrupts someone, so the way out should be obvious. */}
        <button
          onClick={() => handleOpenChange(false)}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:bg-background hover:text-foreground"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Kept deliberately short: every line here pushes the calendar down, and
            the calendar is the thing this popup exists to show. */}
        <div className="px-6 pt-6 pb-4">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Before you go — grab a free demo
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fifteen minutes, no pitch deck. Adam shows you what your site could look
            like and where you're losing customers on Google right now.
          </p>

          {/* Proof, so the ask has something standing behind it. One line. */}
          <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-primary text-primary" />
                ))}
              </span>
              <span className="text-xs font-semibold text-foreground">5.0</span>
              <span className="text-xs text-muted-foreground">· 25 Google reviews</span>
            </span>
            <span className="text-muted-foreground">
              <span className="text-foreground/90">
                "Easy to work with, amazing pricing, and even better workmanship."
              </span>{" "}
              <span className="text-xs">Joseph Ruscica · Website Client</span>
            </span>
          </div>
        </div>

        {/* Booking happens here, in the modal. Sending them to a new tab at the
            moment they were already leaving loses most of them. */}
        <div className="px-6 pb-6">
          <CalendlyEmbed trackingLabel="demo_popup" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
