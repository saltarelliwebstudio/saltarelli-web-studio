// Recurring monthly live session — single source of truth.
// "Live AI Q&A + Tutorials" runs the FIRST SATURDAY of each month at 10:00 AM ET (DST-aware).
// Used by AnnouncementBanner + the /workshop route so the schedule lives in one place.

const TZ = "America/Toronto"; // ET, DST-aware (matches Adam's Calendly: America/New_York)
const SESSION_WEEKDAY = 6; // 0=Sun, 1=Mon ... 6=Sat
const SESSION_HOUR = 10; // 10 AM
const SESSION_MINUTE = 0;
const SESSION_DURATION_MIN = 60;

export const SESSION_NAME = "Live AI Q&A + Tutorials";

// Internal route the banner points to (the signup landing page).
export const SIGNUP_PATH = "/workshop";

// Permanent recurring Google Meet room — same link every session.
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

// Day-of-month (1-based) of the first Saturday of the given month, in TZ.
function firstSessionDayOfMonth(year: number, month: number): number {
  // Noon anchor avoids DST edges when reading the weekday of the 1st.
  const firstUtc = zonedWallToUtc(year, month, 1, 12, 0, TZ);
  const { weekday } = zonedDateParts(firstUtc, TZ);
  return 1 + ((SESSION_WEEKDAY - weekday + 7) % 7);
}

// The next (or currently-live) first-Saturday-of-month 10 AM ET session.
export function getNextSession(now: Date = new Date()): NextSession {
  const { year, month } = zonedDateParts(now, TZ);

  // Build the session for a given year/month, normalizing month overflow.
  const buildFor = (y: number, m: number): NextSession => {
    const yy = y + Math.floor(m / 12);
    const mm = ((m % 12) + 12) % 12;
    const sessionDay = firstSessionDayOfMonth(yy, mm);
    const start = zonedWallToUtc(yy, mm, sessionDay, SESSION_HOUR, SESSION_MINUTE, TZ);
    const end = new Date(start.getTime() + SESSION_DURATION_MIN * 60_000);
    return { start, end, isLive: false };
  };

  let session = buildFor(year, month);

  // If this month's session has already ended, roll forward to next month's first Saturday.
  if (now.getTime() >= session.end.getTime()) {
    session = buildFor(year, month + 1);
  }

  const isLive =
    now.getTime() >= session.start.getTime() && now.getTime() < session.end.getTime();
  return { ...session, isLive };
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

// "Sat, Aug 1 · 10 AM ET"
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

// A "click to add to Google Calendar" link for the recurring monthly session.
export function getAddToCalendarUrl(session: NextSession): string {
  const text = encodeURIComponent(SESSION_NAME);
  const dates = `${gcalStamp(session.start)}/${gcalStamp(session.end)}`;
  const details = encodeURIComponent(
    `Join the live session here: ${LIVE_SESSION_MEET_URL}\n\nMonthly AI Q&A + tutorials with Adam. Bring your questions.`
  );
  const location = encodeURIComponent(LIVE_SESSION_MEET_URL);
  const recur = encodeURIComponent("RRULE:FREQ=MONTHLY;BYDAY=1SA");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}&recur=${recur}`;
}
