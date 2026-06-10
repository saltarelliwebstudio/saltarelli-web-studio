// Recurring weekly live session — single source of truth.
// "Live AI Q&A + Tutorials" runs every Thursday at 12:00 PM ET (DST-aware).
// Used by AnnouncementBanner + the /workshop route so the schedule lives in one place.

const TZ = "America/Toronto"; // ET, DST-aware (matches Adam's Calendly: America/New_York)
const SESSION_WEEKDAY = 4; // 0=Sun, 1=Mon ... 4=Thu
const SESSION_HOUR = 12; // 12 PM
const SESSION_MINUTE = 0;
const SESSION_DURATION_MIN = 60;

export const SESSION_NAME = "Live AI Q&A + Tutorials";

// Internal route the banner points to (the signup landing page).
export const SIGNUP_PATH = "/workshop";

// Permanent recurring Google Meet room — same link every Thursday.
export const LIVE_SESSION_MEET_URL = "https://meet.google.com/qrm-vhfn-zpb";

export interface NextSession {
  start: Date;
  end: Date;
  isLive: boolean;
}

// Offset (ms) of `tz` at a given instant: (wall-clock read as UTC) - actual UTC.
function tzOffsetMs(date: Date, tz: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const p = dtf.formatToParts(date).reduce<Record<string, string>>((acc, part) => {
    if (part.type !== "literal") acc[part.type] = part.value;
    return acc;
  }, {});
  const asUTC = Date.UTC(
    +p.year,
    +p.month - 1,
    +p.day,
    +p.hour,
    +p.minute,
    +p.second
  );
  return asUTC - date.getTime();
}

// Convert a wall-clock time in `tz` to the correct UTC Date, handling DST boundaries.
function zonedWallToUtc(
  year: number,
  month: number, // 0-indexed
  day: number,
  hour: number,
  minute: number,
  tz: string
): Date {
  const naiveUTC = Date.UTC(year, month, day, hour, minute, 0);
  const offset = tzOffsetMs(new Date(naiveUTC), tz);
  let utc = naiveUTC - offset;
  // Refine once in case the first guess straddled a DST transition.
  const offset2 = tzOffsetMs(new Date(utc), tz);
  if (offset2 !== offset) utc = naiveUTC - offset2;
  return new Date(utc);
}

// Current wall-clock year/month/day + weekday in `tz`.
function zonedDateParts(date: Date, tz: string) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const p = dtf.formatToParts(date).reduce<Record<string, string>>((acc, part) => {
    if (part.type !== "literal") acc[part.type] = part.value;
    return acc;
  }, {});
  const weekdayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  return {
    year: +p.year,
    month: +p.month - 1, // 0-indexed
    day: +p.day,
    weekday: weekdayMap[p.weekday],
  };
}

// The next (or currently-live) Thursday-noon-ET session.
export function getNextSession(now: Date = new Date()): NextSession {
  const { year, month, day, weekday } = zonedDateParts(now, TZ);
  const daysUntil = (SESSION_WEEKDAY - weekday + 7) % 7;

  let start = zonedWallToUtc(year, month, day + daysUntil, SESSION_HOUR, SESSION_MINUTE, TZ);
  let end = new Date(start.getTime() + SESSION_DURATION_MIN * 60_000);

  // If this week's session has already ended, roll forward to next Thursday.
  if (now.getTime() >= end.getTime()) {
    start = zonedWallToUtc(year, month, day + daysUntil + 7, SESSION_HOUR, SESSION_MINUTE, TZ);
    end = new Date(start.getTime() + SESSION_DURATION_MIN * 60_000);
  }

  const isLive = now.getTime() >= start.getTime() && now.getTime() < end.getTime();
  return { start, end, isLive };
}

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export function getCountdownParts(ms: number): CountdownParts {
  const total = Math.max(0, ms);
  const seconds = Math.floor(total / 1000) % 60;
  const minutes = Math.floor(total / 60_000) % 60;
  const hours = Math.floor(total / 3_600_000) % 24;
  const days = Math.floor(total / 86_400_000);
  return { days, hours, minutes, seconds, total };
}

// "2d 14h 23m" — drops the day segment under 24h, always shows minutes.
export function formatCountdown(ms: number): string {
  const { days, hours, minutes } = getCountdownParts(ms);
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (days > 0 || hours > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  return parts.join(" ");
}

// "Thu, Jun 11 · 12 PM ET"
export function formatSessionDate(date: Date): string {
  const datePart = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
  const timePart = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .replace(":00", ""); // "12:00 PM" -> "12 PM"
  return `${datePart} · ${timePart} ET`;
}

// "2026-06-11T16:00:00.000Z" -> "20260611T160000Z" (Google Calendar template format)
function gcalStamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

// A "click to add to Google Calendar" link for the recurring weekly session.
export function getAddToCalendarUrl(session: NextSession): string {
  const text = encodeURIComponent(SESSION_NAME);
  const dates = `${gcalStamp(session.start)}/${gcalStamp(session.end)}`;
  const details = encodeURIComponent(
    `Join the live session here: ${LIVE_SESSION_MEET_URL}\n\nWeekly AI Q&A + tutorials with Adam. Bring your questions.`
  );
  const location = encodeURIComponent(LIVE_SESSION_MEET_URL);
  const recur = encodeURIComponent("RRULE:FREQ=WEEKLY;BYDAY=TH");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}&recur=${recur}`;
}
