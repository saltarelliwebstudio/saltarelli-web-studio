import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const STORAGE_KEY = "sws-workshop-banner-may7-v2";
const BANNER_HEIGHT_PX = 40;

export const AnnouncementBanner = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(STORAGE_KEY) !== "dismissed";
  });

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
    window.localStorage.setItem(STORAGE_KEY, "dismissed");
    setVisible(false);
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] bg-primary/15 border-b border-primary/30 backdrop-blur-sm"
      style={{ height: BANNER_HEIGHT_PX }}
    >
      <div className="h-full container mx-auto px-5 md:px-6 flex items-center justify-between gap-4">
        <Link
          to="/workshop"
          className="flex-1 text-center text-xs sm:text-sm font-medium text-foreground truncate hover:text-primary transition-colors"
        >
          <span className="mr-2">🎓</span>
          <span className="font-heading font-semibold">Free Live Workshop:</span>{" "}
          AI Systems for Business Owners · Thursday, May 7 · 12:00 PM EDT ·{" "}
          <span className="text-primary font-semibold">Save Your Spot →</span>
        </Link>
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
