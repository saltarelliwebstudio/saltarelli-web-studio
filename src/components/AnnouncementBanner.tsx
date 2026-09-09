import { useEffect, useState } from "react";
import {
  WORKSHOP_START,
  WORKSHOP_END,
  WORKSHOP_URL,
  getCountdownParts,
} from "@/lib/liveSession";

const BANNER_HEIGHT_PX = 44;

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

  const now = new Date();
  const isOver = now.getTime() > WORKSHOP_END.getTime();
  const isLive =
    now.getTime() >= WORKSHOP_START.getTime() && !isOver;

  // Reserve the banner's height only while it is actually on screen, so the
  // page reflows correctly the moment the workshop is over.
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--banner-height", isOver ? "0px" : `${BANNER_HEIGHT_PX}px`);
    return () => {
      root.style.setProperty("--banner-height", "0px");
    };
  }, [isOver]);

  // Self-retiring: once the session has ended the banner disappears on its own
  // rather than counting down to a date that has already passed.
  if (isOver) return null;

  const cp = getCountdownParts(WORKSHOP_START.getTime() - now.getTime());

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
          <a
            href={WORKSHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium min-w-0 text-foreground"
          >
            {isLive ? (
              <span className="flex items-center gap-2 font-heading font-bold min-w-0">
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
                <span className="text-red-400 whitespace-nowrap">HAPPENING NOW</span>
                <span className="hidden sm:inline truncate">
                  · Niagara Falls Innovation Hub
                </span>
              </span>
            ) : (
              <span className="flex items-center gap-2 min-w-0">
                <span className="hidden sm:inline flex-shrink-0">📍</span>
                <span className="hidden md:inline font-heading font-bold text-primary whitespace-nowrap">
                  FRI OCT 16
                </span>
                <span className="font-heading font-semibold truncate">
                  Free workshop · Niagara Falls Innovation Hub
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
              </span>
            )}
            <span className="font-heading font-bold text-primary glow-text whitespace-nowrap group-hover:underline flex-shrink-0">
              {isLive ? "Details →" : "Reserve a seat →"}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
