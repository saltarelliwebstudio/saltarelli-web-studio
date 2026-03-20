import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SUPABASE_URL = "https://veyhxazlqekiweynjxhf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleWh4YXpscWVraXdleW5qeGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MDU2MDUsImV4cCI6MjA4NjE4MTYwNX0.h5EyoyPZzP2yBVtDir9Ko4A2I_C_v_7qYxkR2MFL9fc";

// Generate a daily session ID (privacy-friendly, no cookies)
function getSessionId(): string {
  const today = new Date().toISOString().split("T")[0];
  const raw = `${navigator.userAgent}-${today}-${screen.width}x${screen.height}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) - hash + raw.charCodeAt(i)) | 0;
  }
  return `s_${Math.abs(hash).toString(36)}`;
}

function trackPageView(path: string) {
  try {
    const body = JSON.stringify({
      path,
      referrer: document.referrer || null,
      sessionId: getSessionId(),
    });

    // Use sendBeacon for reliability (non-blocking, survives page unload)
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(
        `${SUPABASE_URL}/functions/v1/track-pageview`,
        blob
      );
    } else {
      fetch(`${SUPABASE_URL}/functions/v1/track-pageview`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Silent fail — never block the user
  }
}

export function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
}
