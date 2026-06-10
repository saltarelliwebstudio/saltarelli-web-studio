import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import {
  getNextSession,
  getCountdownParts,
  SIGNUP_PATH,
} from "@/lib/liveSession";

const BANNER_HEIGHT_PX = 44;

const storageKeyFor = (start: Date) =>
  `sws-live-banner-${start.toISOString().slice(0, 10)}`;

const CountdownPill = ({ value, unit }: { value: number; unit: string }) => (
  <span className="inline-flex items-baseline rounded-md bg-background/50 border border-primary/40 px-1.5 py-0.5 font-mono font-bold tabular-nums text-primary text-xs leading-none shadow-[0_0_12px_hsl(var(--primary)/0.25)]">
    {String(value).padStart(2, "0")}
    <span className="ml-0.5 text-[0.65em] text-primary/70">{unit}</span>
  </span>
);

export const AnnouncementBanner = () => {
  // Re-render every second so the countdown visibly ticks.
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const [hidden, setHidden] = useState(false);

  const now = new Date();
  const session = getNextSession(now);
  const key = storageKeyFor(session.start);

  // Dismissal is scoped to the current week's session key, so the banner
  // reappears automatically once the countdown rolls to next Thursday.
  const dismissed =
    typeof window !== "undefined" &&
    window.localStorage.getItem(key) === "dismissed";
  const visible = !hidden && !dismissed;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--banner-height",
      visible ? `${BANNER_HEIGHT_PX}px` : "0px"
    );
    return () => {
      root.style.setProperty("--banner-height", "0px");
    };
  }, [visible]);

  if (!visible) return null;

  const handleDismiss = () => {
    window.localStorage.setItem(key, "dismissed");
    setHidden(true);
  };

  const cp = getCountdownParts(session.start.getTime() - now.getTime());

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] border-b border-primary/40 backdrop-blur-sm animate-gradient"
      style={{
        height: BANNER_HEIGHT_PX,
        backgroundImage:
          "linear-gradient(90deg, hsl(var(--primary) / 0.30), hsl(var(--accent) / 0.30), hsl(var(--secondary) / 0.28), hsl(var(--primary) / 0.30))",
      }}
    >
      <div className="h-full container mx-auto px-4 md:px-6 flex items-center justify-between gap-3">
        <div className="flex-1 flex justify-center min-w-0">
          <Link
            to={SIGNUP_PATH}
            className="group flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium min-w-0 text-foreground"
          >
            {session.isLive ? (
              <span className="flex items-center gap-2 font-heading font-bold min-w-0">
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
                <span className="text-red-400 whitespace-nowrap">WE'RE LIVE NOW</span>
                <span className="hidden sm:inline truncate">
                  · Live AI Q&amp;A + Tutorials
                </span>
              </span>
            ) : (
              <span className="flex items-center gap-2 min-w-0">
                <span className="hidden sm:inline flex-shrink-0">🚀</span>
                <span className="hidden md:inline font-heading font-bold text-primary whitespace-nowrap">
                  THIS THURSDAY
                </span>
                <span className="font-heading font-semibold truncate">
                  Live AI Q&amp;A + Tutorials
                </span>
                <span className="hidden sm:inline text-muted-foreground whitespace-nowrap">
                  · starts in
                </span>
                <span className="flex items-center gap-1 flex-shrink-0">
                  {cp.days > 0 && <CountdownPill value={cp.days} unit="d" />}
                  <CountdownPill value={cp.hours} unit="h" />
                  <CountdownPill value={cp.minutes} unit="m" />
                  <CountdownPill value={cp.seconds} unit="s" />
                </span>
                <span className="hidden sm:inline flex-shrink-0">🔥</span>
              </span>
            )}
            <span className="font-heading font-bold text-primary glow-text whitespace-nowrap group-hover:underline flex-shrink-0">
              {session.isLive ? "Jump in →" : "Grab your spot →"}
            </span>
          </Link>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss banner"
          className="flex-shrink-0 text-foreground/70 hover:text-foreground p-1 rounded transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
