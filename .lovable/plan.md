
## Rename "View Services" Button on the Homepage Hero

**Current state:** The hero section has a button that reads "View Services" but actually navigates to `/funnel` — the revenue loss calculator tool. This is confusing because the label implies browsing a services page, not using an interactive calculator.

**What changes:**

Only one line changes in `src/pages/Index.tsx` — the button text inside the `<TrackedLink>` in the hero section:

- **From:** `View Services`
- **To:** `Calculate My Revenue Loss →` *(matches the CTA on the funnel's own hook page, creating a consistent message from homepage to funnel)*

Alternatives worth considering:
- `Calculate My Revenue Loss →` — action-oriented, specific to what happens
- `Free Revenue Calculator` — frames it as a free tool/value offer
- `See What You're Losing` — curiosity-driven, slightly more emotional

The icon (`<Sparkles>`) stays as-is — it works well alongside the calculator theme.

**Files changed:**
| File | Change |
|---|---|
| `src/pages/Index.tsx` | Update button text from "View Services" to chosen label |
