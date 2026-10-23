// First-touch attribution, carried into every Calendly link as utm_* params.
//
// Calendly stores utm params on the booking (invitee "tracking"), so each booked
// call shows where the visitor originally came from: google, instagram, direct...
// Without this every booking looked the same and Google traffic couldn't be told
// apart from a referral. GA can't see bookings made in a new Calendly tab at all,
// so the booking record is the only place this can live.

const KEY = "sws_first_touch";

type FirstTouch = { source: string; landing: string };

const sourceFromReferrer = (ref: string): string => {
  if (!ref) return "direct";
  try {
    const host = new URL(ref).hostname.replace(/^www\./, "");
    if (host === window.location.hostname.replace(/^www\./, "")) return "direct";
    if (/(^|\.)google\./.test(host)) return "google";
    if (/(^|\.)bing\.com$/.test(host)) return "bing";
    if (/instagram\.com$/.test(host)) return "instagram";
    if (/(facebook\.com|fb\.com)$/.test(host)) return "facebook";
    if (/linkedin\.com$|lnkd\.in$/.test(host)) return "linkedin";
    if (/chatgpt\.com$|openai\.com$/.test(host)) return "chatgpt";
    return host;
  } catch {
    return "direct";
  }
};

let cached: FirstTouch | null = null;

/** Call once on boot. Keeps the FIRST source a visitor arrived from. */
export const captureFirstTouch = (): void => {
  if (typeof window === "undefined") return;
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) {
      cached = JSON.parse(saved) as FirstTouch;
      return;
    }
  } catch {
    // storage blocked: fall through and keep it for this page view only
  }
  const params = new URLSearchParams(window.location.search);
  cached = {
    source: params.get("utm_source") || params.get("src") || sourceFromReferrer(document.referrer),
    landing: window.location.pathname,
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(cached));
  } catch {
    // ignore
  }
};

/** Calendly URL tagged with where this visitor came from and which page they booked from. */
export const withAttribution = (url: string): string => {
  if (typeof window === "undefined") return url;
  if (!cached) captureFirstTouch();
  const u = new URL(url);
  u.searchParams.set("utm_source", cached?.source || "direct");
  u.searchParams.set("utm_medium", "website");
  u.searchParams.set("utm_campaign", cached?.landing || "/");
  u.searchParams.set("utm_content", window.location.pathname);
  return u.toString();
};
