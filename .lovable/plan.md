
## Redesign the Services Section — Clean 3-Column Layout

### What the Reference Shows
The reference image has a simple, airy 3-column card layout:
- Soft icon in a light rounded container at the top-left of each card
- Bold service title
- Short 1-2 sentence description
- Clean checkmark bullet list of features
- No buttons inside the cards — just content
- Cards are uniform, no "NEW" badges, no colored gradient backgrounds — just clean white/light cards

### Current Problem
The homepage services section currently has two separate rows with mismatched layouts:
- Row 1: 3-column website cards (each with a Learn More button)
- Row 2: 2-column AI/Automations cards (colored gradient backgrounds, NEW badge, tag pills, Learn More buttons)

This creates visual noise and inconsistency.

### New Layout Plan
Consolidate into **one clean 3-column row** matching the reference:

| Column 1 | Column 2 | Column 3 |
|---|---|---|
| Website Creation & Redesign | AI Agents & Chat Widgets | Automations |

Each card will have:
- Icon in a small soft rounded container (using existing lucide icons)
- Bold title
- Short paragraph description
- Checkmark bullet list (using a check icon instead of bullet dots)
- No buttons inside the cards — the section heading area will have a single CTA

### Content Mapping
**Website Creation & Redesign** (combine the two website cards):
- Full domain setup & ongoing management
- Ongoing updates as your business evolves
- Hosting and continuous SEO optimization
- Seamless migration with zero downtime

**AI Agents & Chat Widgets** (combines AI Agents + Chat Widget):
- Trained on your specific business knowledge
- Voice and text agent capabilities
- 24/7 call & text lead capture
- Seamlessly integrated into your website

**Automations** (keep existing):
- Make.com powered workflows
- AI-powered processing
- SMS & email notifications
- Google Sheets integrations

### Styling
- Cards: `glass` class with subtle border — consistent across all 3
- No gradient backgrounds, no colored borders, no NEW badges
- Icon container: small `w-12 h-12` rounded-xl with muted background and primary-colored icon
- Checkmark bullets: `Check` icon from lucide in primary color, small size
- Keep the existing section heading ("Your Systems, Always Running") and subheading

### Files Changed
| File | Change |
|---|---|
| `src/pages/Index.tsx` | Replace the two-row services grid (lines 298–406) with a single clean 3-column card layout |
