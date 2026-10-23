// Get Found Score: a 10-question self-check for local trades businesses.
// Every question is worth 10 points, so the total is out of 100 and the
// weakest answers are simply the lowest-scoring questions. Change the
// questions or points here; the /score page renders whatever is in this file.

export type Area = "Get found" | "Get called" | "Get chosen";

export interface Option {
  label: string;
  points: number;
}

export interface Question {
  id: string;
  area: Area;
  topic: string;
  question: string;
  options: Option[];
  /** One-line fix shown when this is one of the lowest answers. */
  fix: string;
}

export const QUESTIONS: Question[] = [
  {
    id: "gbp",
    area: "Get found",
    topic: "Google Business Profile",
    question: "Do you have a Google Business Profile you can log into?",
    options: [
      { label: "Yes, fully filled out with photos, hours and services", points: 10 },
      { label: "Yes, but I haven't touched it in months", points: 5 },
      { label: "No, or I'm not sure", points: 0 },
    ],
    fix: "Claim your Google profile and fill in every field: services, hours, service area and real job photos.",
  },
  {
    id: "review_count",
    area: "Get found",
    topic: "Review count",
    question: "How many Google reviews does your business have?",
    options: [
      { label: "50 or more", points: 10 },
      { label: "20 to 49", points: 7 },
      { label: "5 to 19", points: 4 },
      { label: "Fewer than 5", points: 0 },
    ],
    fix: "Reviews are the biggest local ranking lever you control. Ask every happy customer, every job.",
  },
  {
    id: "review_recency",
    area: "Get found",
    topic: "Recent reviews",
    question: "When did you get your most recent Google review?",
    options: [
      { label: "In the last 2 weeks", points: 10 },
      { label: "In the last 2 months", points: 6 },
      { label: "Longer ago, or never", points: 0 },
    ],
    fix: "Google and customers both notice when reviews go quiet. Aim for a new one every week or two.",
  },
  {
    id: "review_ask",
    area: "Get found",
    topic: "Asking for reviews",
    question: "How do you ask customers for a review?",
    options: [
      { label: "Every job, with a text link or QR code", points: 10 },
      { label: "When I remember", points: 4 },
      { label: "I don't really ask", points: 0 },
    ],
    fix: "Send a review link by text the same day the job finishes, while they're still happy.",
  },
  {
    id: "website",
    area: "Get found",
    topic: "Website",
    question: "What happens when someone finds your website on their phone?",
    options: [
      { label: "It loads fast and they can tap to call", points: 10 },
      { label: "It works, but it's old or I'm not sure", points: 5 },
      { label: "I don't have one, or it's just Facebook", points: 0 },
    ],
    fix: "Most of your customers are on a phone. The site needs to load fast with a tap-to-call button up top.",
  },
  {
    id: "missed_calls",
    area: "Get called",
    topic: "Missed calls",
    question: "When you miss a call because you're on a job, what happens?",
    options: [
      { label: "They get a text back automatically within a minute", points: 10 },
      { label: "I call back the same day", points: 5 },
      { label: "I get to it when I can, sometimes the next day", points: 0 },
    ],
    fix: "A missed call usually becomes a call to the next company. An instant text back holds the lead while you finish the job.",
  },
  {
    id: "response_time",
    area: "Get called",
    topic: "Speed to lead",
    question: "When a quote request comes in from your website or Google, how fast do you reply?",
    options: [
      { label: "Within 5 minutes", points: 10 },
      { label: "Same day", points: 5 },
      { label: "Next day or later", points: 0 },
    ],
    fix: "The first business to reply usually wins the job. Get an instant reply going out, then follow up yourself.",
  },
  {
    id: "quote_followup",
    area: "Get chosen",
    topic: "Quote follow-up",
    question: "After you send a quote and hear nothing back, what do you do?",
    options: [
      { label: "A follow-up goes out automatically", points: 10 },
      { label: "I follow up when I remember", points: 4 },
      { label: "I wait for them to call", points: 0 },
    ],
    fix: "Quiet quotes are money on the table. One or two friendly follow-ups win back a real share of them.",
  },
  {
    id: "review_replies",
    area: "Get chosen",
    topic: "Replying to reviews",
    question: "Do you reply to your Google reviews?",
    options: [
      { label: "Every one", points: 10 },
      { label: "Some of them", points: 5 },
      { label: "Never", points: 0 },
    ],
    fix: "Replying to every review shows new customers someone is paying attention, and it takes a minute each.",
  },
  {
    id: "lead_source",
    area: "Get chosen",
    topic: "Knowing where jobs come from",
    question: "Do you know where your new customers are finding you?",
    options: [
      { label: "Yes, I track it", points: 10 },
      { label: "I have a rough idea", points: 5 },
      { label: "No idea", points: 0 },
    ],
    fix: "Ask every new customer how they found you and write it down. You can't grow what you can't see.",
  },
];

export const MAX_SCORE = QUESTIONS.reduce(
  (sum, q) => sum + Math.max(...q.options.map((o) => o.points)),
  0,
);

/** answers maps question id -> chosen option index. */
export type Answers = Record<string, number>;

export interface ScoreResult {
  total: number;
  byArea: Record<Area, { points: number; max: number }>;
  /** The three weakest questions, lowest points first, ties in question order. */
  weakest: Question[];
  band: { label: string; summary: string };
}

export function scoreAnswers(answers: Answers): ScoreResult {
  const byArea = {} as ScoreResult["byArea"];
  const scored = QUESTIONS.map((q, i) => {
    const option = q.options[answers[q.id]];
    const points = option ? option.points : 0;
    const max = Math.max(...q.options.map((o) => o.points));
    byArea[q.area] ??= { points: 0, max: 0 };
    byArea[q.area].points += points;
    byArea[q.area].max += max;
    return { q, i, points, gap: max - points };
  });

  const total = scored.reduce((sum, s) => sum + s.points, 0);

  const weakest = scored
    .filter((s) => s.gap > 0)
    .sort((a, b) => b.gap - a.gap || a.i - b.i)
    .slice(0, 3)
    .map((s) => s.q);

  return { total, byArea, weakest, band: bandFor(total) };
}

function bandFor(total: number) {
  if (total >= 80)
    return {
      label: "Easy to find, easy to hire",
      summary: "You're ahead of most local businesses. The job now is keeping it that way and closing the last gaps.",
    };
  if (total >= 50)
    return {
      label: "Found, but leaking jobs",
      summary: "Customers can find you, but some are slipping away before they ever book. The gaps below are where.",
    };
  return {
    label: "Hard to find",
    summary: "Right now most people searching for what you do are finding someone else first. The good news: these are fixable.",
  };
}

/** Plain-text summary for the lead notification Adam receives. */
export function summarizeForLead(answers: Answers, result: ScoreResult, source: string | null): string {
  const lines = [
    `GET FOUND SCORE: ${result.total}/${MAX_SCORE} (${result.band.label})`,
    source ? `Source: ${source}` : null,
    `Weakest: ${result.weakest.map((q) => q.topic).join(", ") || "none"}`,
    "",
    ...QUESTIONS.map((q) => {
      const option = q.options[answers[q.id]];
      return `${q.topic}: ${option ? `${option.label} (${option.points})` : "skipped"}`;
    }),
  ];
  return lines.filter((l) => l !== null).join("\n");
}
