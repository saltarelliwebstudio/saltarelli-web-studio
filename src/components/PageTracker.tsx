import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const SUPABASE_URL = "https://veyhxazlqekiweynjxhf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleWh4YXpscWVraXdleW5qeGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MDU2MDUsImV4cCI6MjA4NjE4MTYwNX0.h5EyoyPZzP2yBVtDir9Ko4A2I_C_v_7qYxkR2MFL9fc";
const ENDPOINT = `${SUPABASE_URL}/functions/v1/track-pageview`;

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

function send(payload: Record<string, unknown>) {
  try {
    const body = JSON.stringify({ ...payload, sessionId: getSessionId() });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
    } else {
      fetch(ENDPOINT, {
        method: "POST",
        headers: { Authorization: `Bearer ${SUPABASE_ANON_KEY}`, "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Silent fail
  }
}

// Track a page view
function trackPageView(path: string) {
  send({ path, referrer: document.referrer || null });
}

// Track a custom event — exported so other components can call it
export function trackEvent(event: string, metadata?: Record<string, unknown>) {
  send({ type: "event", event, path: window.location.pathname, metadata });
}

// Sections to track scroll visibility
const TRACKED_SECTIONS = ["audit", "smart-stack"];

export function PageTracker() {
  const location = useLocation();
  const pageLoadTime = useRef(Date.now());
  const trackedSections = useRef(new Set<string>());
  const heartbeatSent = useRef(new Set<number>());

  // Track page view on route change
  useEffect(() => {
    trackPageView(location.pathname);
    pageLoadTime.current = Date.now();
    trackedSections.current.clear();
    heartbeatSent.current.clear();
  }, [location.pathname]);

  // Time-on-site heartbeat (30s, 60s, 120s, 300s)
  useEffect(() => {
    const MILESTONES = [30, 60, 120, 300];
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - pageLoadTime.current) / 1000);
      for (const m of MILESTONES) {
        if (seconds >= m && !heartbeatSent.current.has(m)) {
          heartbeatSent.current.add(m);
          trackEvent("time_on_page", { seconds: m });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [location.pathname]);

  // Scroll section visibility tracking
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !trackedSections.current.has(entry.target.id)) {
            trackedSections.current.add(entry.target.id);
            trackEvent("scroll_section", { section: entry.target.id });
          }
        }
      },
      { threshold: 0.3 }
    );

    // Small delay to let DOM render
    const timer = setTimeout(() => {
      for (const id of TRACKED_SECTIONS) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
}
