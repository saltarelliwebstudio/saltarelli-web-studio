import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Star, Calendar, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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

// Nothing interrupts anyone in their first twenty seconds. Sixty percent of a
// short page is two flicks on a phone, which made the popup the first thing a
// new visitor met — before they had read a line of the page it interrupts.
const MIN_DWELL_MS = 20_000;
// Exit intent is the one trigger that isn't an interruption: the cursor is
// already travelling toward the tab bar. It gets a shorter floor rather than
// none, because a sweep out the top at two seconds is a misfire, not a exit.
const EXIT_INTENT_MIN_MS = 8_000;

// Calendly's mobile layout needs ~1080px of height. Inside a 92vh modal that is
// roughly four screens of internal scrolling, which reads as a frozen page — so
// phones get proof and a button instead, and book on /get-started where the same
// calendar already lives full-width.
const WIDE_QUERY = "(min-width: 640px) and (min-height: 600px)";

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

  // Stamped once, on first mount — deliberately NOT per route. Someone reading
  // three pages for fifteen seconds each has been here forty-five seconds, and
  // restarting the clock on every navigation would mean they never see it.
  const startedAtRef = useRef<number | null>(null);

  const [isWide, setIsWide] = useState(true);

  const suppressed = SUPPRESSED_PATHS.includes(pathname);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(WIDE_QUERY);
    const sync = () => setIsWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const markSeen = () => {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* non-fatal — worst case they see it again next visit */
    }
  };

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

    startedAtRef.current ??= Date.now();

    const fire = (trigger: string) => {
      if (hasFiredRef.current) return;
      // Someone mid-conversation in the chat is already engaged. Leave them alone.
      if (isChatOpenRef.current) return;
      // Same for someone who just opened the mobile nav — they are going
      // somewhere. Header owns this class; see index.css.
      if (document.documentElement.classList.contains("nav-open")) return;

      const elapsed = Date.now() - (startedAtRef.current ?? Date.now());
      const floor = trigger === "exit_intent" ? EXIT_INTENT_MIN_MS : MIN_DWELL_MS;
      // Return rather than defer: scroll keeps firing and the dwell timer is the
      // backstop, so someone who blows past 60% at three seconds still gets the
      // popup — just at twenty, via dwell, instead of on arrival.
      if (elapsed < floor) return;

      hasFiredRef.current = true;
      markSeen();
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

    // Counted from first arrival, not from this page. This effect re-runs on
    // every navigation and its cleanup clears the timer, so a full-duration
    // timer would restart on each page and never finish: someone reading three
    // pages for twenty-five seconds each has been here seventy-five seconds and
    // would never once reach thirty on a single page. On touch there is no exit
    // intent to rescue that, and scroll_depth does not re-fire on a page they
    // have already scrolled to the bottom of — so they would see nothing, ever.
    const dwellTotal = isTouch ? DWELL_TRIGGER_MS : DESKTOP_DWELL_MS;
    const dwellRemaining = Math.max(0, dwellTotal - (Date.now() - startedAtRef.current));
    const dwellTimer = window.setTimeout(() => fire("dwell"), dwellRemaining);

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

  // Dismissal — the visitor said no. Tracked.
  const close = () => handleOpenChange(false);

  // Conversion — they took the CTA. Deliberately NOT close(): routing a booking
  // through the dismiss path logged every mobile conversion as a rejection too,
  // inflating the dismissal rate by exactly the number of people who converted.
  const closeAfterCta = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/*
        `block` overrides DialogContent's `grid`: a position:sticky child of a
        grid container sticks only within its own grid row, so the close bar
        below would scroll away — the exact bug it exists to fix.

        `w-[calc(100%-2rem)]` leaves a strip of backdrop on a phone. Edge to
        edge there was nothing left to tap to dismiss, and the X sat in the
        corner under the browser's own gesture zone.

        `[&>button:last-child]:hidden` kills DialogContent's own close button.
        It always renders last, and it sits 4px off the bigger one below — two
        overlapping Xs that read as one smudged icon.
      */}
      <DialogContent className="block w-[calc(100%-2rem)] max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl p-0 gap-0 sm:w-full sm:rounded-2xl [&>button:last-child]:hidden">
        {/* Sticky, not absolute. Absolute positions against the scrolling content
            box, so on a phone the X was gone after the first swipe and there was
            no way left to close the thing. h-11 is the 44px minimum tap target;
            the old h-8 was 32. */}
        <div className="sticky top-0 z-20 flex justify-end bg-background/95 px-3 pt-3 backdrop-blur">
          <button
            onClick={close}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-background/80 text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Kept deliberately short: every line here pushes the calendar down, and
            the calendar is the thing this popup exists to show. */}
        <div className="px-6 pb-4">
          <DialogTitle className="font-heading text-2xl font-bold leading-tight text-foreground">
            Before you go — grab a free demo
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-muted-foreground">
            Fifteen minutes, no pitch deck. Adam shows you what your site could look
            like and where you're losing customers on Google right now.
          </DialogDescription>

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

        <div className="px-6 pb-6">
          {isWide ? (
            // Booking happens here, in the modal. Sending them to a new tab at the
            // moment they were already leaving loses most of them.
            <CalendlyEmbed trackingLabel="demo_popup" />
          ) : (
            // /get-started is in SUPPRESSED_PATHS, so this popup won't chase them
            // once they land, and CalendlySection is already the page.
            <Button variant="hero" size="lg" className="w-full" asChild>
              <Link
                to="/get-started"
                onClick={() => {
                  trackEvent("demo_popup_cta", { path: pathname });
                  closeAfterCta();
                }}
              >
                <Calendar size={20} />
                Pick a time
              </Link>
            </Button>
          )}

          {/* A second way out that doesn't depend on hitting a 44px circle. */}
          <button
            onClick={close}
            className="mt-4 block w-full text-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            No thanks
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
