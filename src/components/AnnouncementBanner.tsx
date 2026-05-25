import { useEffect } from "react";
import { Link } from "react-router-dom";

const BANNER_HEIGHT_PX = 40;

export const AnnouncementBanner = () => {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--banner-height", `${BANNER_HEIGHT_PX}px`);
    return () => {
      root.style.setProperty("--banner-height", "0px");
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] bg-primary/15 border-b border-primary/30 backdrop-blur-sm"
      style={{ height: BANNER_HEIGHT_PX }}
    >
      <div className="h-full container mx-auto px-5 md:px-6 flex items-center justify-center">
        <Link
          to="/workshop"
          className="text-center text-xs sm:text-sm font-medium text-foreground truncate hover:text-primary transition-colors"
        >
          <span className="mr-2">🎓</span>
          <span className="font-heading font-semibold">Free Live Workshop:</span>{" "}
          AI Systems for Business Owners · Thursday, May 7 · 12:00 PM EDT ·{" "}
          <span className="text-primary font-semibold">Save Your Spot →</span>
        </Link>
      </div>
    </div>
  );
};
