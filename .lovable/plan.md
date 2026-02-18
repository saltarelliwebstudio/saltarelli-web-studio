
# Lead Funnel Landing Page — Saltarelli Web Studio

## Overview

A dedicated 3-step lead funnel page at `/funnel` (or `/revenue-calculator`) that captures contractor leads, calculates their estimated annual revenue loss from missed calls, and drives them to book a strategy call. No navbar, no footer, no distractions. Data is saved to the backend and a webhook fires to a Modal endpoint for downstream automation (Google Sheets + email notification).

The homepage "View Services" button is also updated to point to this funnel.

---

## What's Being Built

### 1. New Database Table: `funnel_leads`

A new migration will create a table to store every funnel submission:

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Auto-generated primary key |
| `created_at` | timestamptz | Auto-set |
| `name` | text | Full name |
| `email` | text | Email address |
| `phone` | text | Phone number |
| `business_name` | text | Business name |
| `industry` | text | Dropdown selection |
| `avg_job_value` | text | Dropdown selection |
| `missed_calls_per_week` | text | Dropdown selection |
| `calculated_annual_loss` | integer | Computed value stored at submit |

RLS policy: public insert allowed (no auth required — this is a public lead form). No public read/update/delete.

---

### 2. New Backend Function: `funnel-submit`

A new backend function at `supabase/functions/funnel-submit/index.ts` that:
- Receives the form payload (name, email, phone, business_name, industry, avg_job_value, missed_calls_per_week, calculated_annual_loss)
- Validates all inputs with length/type checks
- Inserts the lead into the `funnel_leads` table using the service role key
- Fires a POST webhook to a **placeholder Modal URL** (e.g. `https://placeholder-modal-webhook.example.com/lead`) — you can swap this for the real URL later
- Returns success/error JSON response

---

### 3. New Page: `src/pages/Funnel.tsx`

A self-contained, distraction-free page with 3 animated steps. It uses Framer Motion for smooth slide/fade transitions between steps.

**Step 1 — Hook**
- Full-screen dark background matching the site's cosmic theme (no header, no footer)
- Headline: "How Much Revenue Is Your Business Losing From Missed Calls?"
- Subheadline about contractors losing thousands monthly
- Single "Calculate My Revenue Loss →" CTA button
- Small SWS logo at top for brand trust (no nav links)

**Step 2 — Calculator Form**
- All 7 inputs: name, email, phone, business name, industry dropdown, avg job value dropdown, missed calls/week dropdown
- Client-side validation with Zod before submission
- "Show Me My Results" button
- On submit: calls the `funnel-submit` backend function, then advances to step 3

**Step 3 — Results + CTA**
- Animated count-up number in orange/red showing annual revenue loss
- Formula: `midpointOfMissedCalls × avgJobValue × 50`
  - Midpoints: 1-3 → 2, 4-7 → 5.5, 8-12 → 10, 12+ → 15
  - Job values: $500 → 500, $1,000 → 1000, $2,500 → 2500, $5,000 → 5000, $10,000+ → 10000
- "That's how much you could be leaving on the table..." copy
- 2–3 sentence AI voice agent pitch
- Primary CTA: "Book a Free Strategy Call with Adam" → Calendly link
- Secondary text link: "Not ready to talk? Get the free guide: 3 Ways Contractors Lose Leads Without Knowing" → triggers a subtle thank-you message (no external link, email already captured)
- Trust badge: "30-day money-back guarantee on all services" with ShieldCheck icon

---

### 4. Route Added to `src/App.tsx`

```
/funnel → <Funnel />
```

---

### 5. Homepage Update in `src/pages/Index.tsx`

The "View Services" button (currently an anchor to `#services` on the same page) is changed to a `Link` pointing to `/funnel`.

---

## Design Details

- **No navbar, no footer** — completely isolated page experience
- **Fonts**: Poppins (headings) + Inter (body) — same as the rest of the site
- **Colors**: exact same CSS variables (`--primary` orange, `--background` deep space purple, `--card`, `--border`, glassmorphism `glass` class, `glow-text`)
- **Starfield background**: reuses the existing `<Starfield />` component for visual continuity
- **Step transitions**: Framer Motion `AnimatePresence` with a slide-left + fade animation between steps
- **Count-up animation**: a custom React hook using `requestAnimationFrame` to animate the number from 0 to the calculated value over ~1.5 seconds
- **Revenue loss number**: displayed in `text-primary` (orange) with `glow-text` class for emphasis
- **Mobile-first**: all layouts stack vertically on mobile, inputs are full-width, buttons are large touch targets

---

## Files Changed / Created

| File | Action |
|---|---|
| `supabase/migrations/[timestamp]_create_funnel_leads.sql` | Created — new table + RLS policy |
| `supabase/functions/funnel-submit/index.ts` | Created — new backend function |
| `src/pages/Funnel.tsx` | Created — the full funnel page |
| `src/App.tsx` | Edited — add `/funnel` route |
| `src/pages/Index.tsx` | Edited — update "View Services" button to `/funnel` |

---

## Webhook Note

The Modal webhook URL is set as a **placeholder** (`https://placeholder-modal-webhook.example.com/lead`) in the backend function. Once you have your real Modal endpoint URL, you can update that one line in the function. The payload sent will be the full lead object (name, email, phone, business_name, industry, avg_job_value, missed_calls_per_week, calculated_annual_loss, timestamp).

