

# Button Click Tracking for Google Analytics

## Overview
This plan implements event tracking for all key conversion buttons across your website. Clicks will be sent to your existing Google Analytics (G-VF4HSVCFN7) and viewable under **Reports > Engagement > Events**.

## What Gets Tracked

| Page | Button | Event Label |
|------|--------|-------------|
| **Homepage** | "Book a Discovery Call" (hero) | `hero_book_discovery_call` |
| **Homepage** | "View Services" (hero) | `hero_view_services` |
| **Homepage** | "Learn More About Me" | `about_learn_more` |
| **Homepage** | Service card "Learn More" buttons | `services_learn_more_[service]` |
| **Homepage** | "View All Projects" | `portfolio_view_all` |
| **Homepage** | "View More!" (reviews) | `reviews_view_more` |
| **Homepage** | "Write A Review!" | `reviews_write_review` |
| **Homepage** | "Book Your Discovery Call" (CTA) | `homepage_cta_book_call` |
| **Header** | "Book a Call" (desktop) | `header_book_call` |
| **Header** | "Book a Call" (mobile) | `header_mobile_book_call` |
| **Footer** | "Book a Call" | `footer_book_call` |
| **Get Started** | Calendly link | `calendly_schedule_click` |
| **Services** | "Book a Discovery Call" | `services_book_call` |
| **AI Agents** | "Book a Discovery Call" (hero) | `ai_agents_hero_book_call` |
| **AI Agents** | "Book Your Discovery Call" (CTA) | `ai_agents_cta_book_call` |
| **Automations** | "Book a Demo Call" (hero) | `automations_hero_book_call` |
| **Automations** | "Book Your Demo Call" (CTA) | `automations_cta_book_call` |
| **About** | "Book a Discovery Call" | `about_book_call` |
| **About** | "View My Work" | `about_view_portfolio` |
| **Portfolio** | "Book a Discovery Call" | `portfolio_book_call` |
| **Portfolio** | "View Live" (project links) | `portfolio_view_[project]` |
| **Pricing Cards** | "Choose [Plan]" buttons | `pricing_choose_[plan]` |
| **Sticky Button** | Floating "Book a Call" | `sticky_book_call` |

## Implementation Steps

### Step 1: Create Analytics Utility
Create a new file `src/lib/analytics.ts` with a `trackButtonClick` function that safely calls `window.gtag` with the event data.

### Step 2: Create TrackedLink Component
Create `src/components/TrackedLink.tsx` - a wrapper around React Router's `Link` that fires a tracking event on click before navigating.

### Step 3: Create TrackedExternalLink Component
Create `src/components/TrackedExternalLink.tsx` - same concept for external links (`<a>` tags) like Calendly, Google Reviews, and live portfolio sites.

### Step 4: Update All Pages and Components
Replace standard `Link` and `<a>` elements with tracked versions in:
- Homepage (`src/pages/Index.tsx`)
- Header (`src/components/Header.tsx`)
- Footer (`src/components/Footer.tsx`)
- Get Started page (`src/pages/GetStarted.tsx`)
- Services page (`src/pages/Services.tsx`)
- AI Agents page (`src/pages/AIAgents.tsx`)
- Automations page (`src/pages/Automations.tsx`)
- About page (`src/pages/About.tsx`)
- Portfolio page (`src/pages/Portfolio.tsx`)
- Pricing Card component (`src/components/PricingCard.tsx`)
- Portfolio Card component (`src/components/PortfolioCard.tsx`)
- Sticky Book Button (`src/components/StickyBookButton.tsx`)

## How to View Your Data
After implementation, in Google Analytics:
1. Go to **Reports > Engagement > Events**
2. Click on `cta_click` event
3. See breakdowns by `button_label` to identify which buttons get the most clicks
4. Track your conversion funnel from hero click → get-started page → Calendly click

---

## Technical Details

### Analytics Utility Structure
```text
src/lib/analytics.ts
├── trackButtonClick(label, buttonText, destination)
│   ├── Check if window.gtag exists
│   └── Send: gtag('event', 'cta_click', {
│         button_label: label,
│         button_text: buttonText,
│         destination: destination,
│         page_location: window.location.pathname
│       })
```

### TrackedLink Component API
```text
<TrackedLink
  to="/get-started"                    // React Router path
  trackingLabel="hero_book_discovery_call"  // GA event label
  className="..."                      // Standard className
>
  Book a Discovery Call
</TrackedLink>
```
- Wraps React Router's `Link` component
- Fires tracking event on click
- Extracts button text from children automatically

### TrackedExternalLink Component API
```text
<TrackedExternalLink
  href="https://calendly.com/..."      // External URL
  trackingLabel="calendly_schedule_click"
  target="_blank"
  rel="noopener noreferrer"
  className="..."
>
  Schedule Your Free Discovery Call
</TrackedExternalLink>
```
- Wraps standard `<a>` element
- Supports all standard anchor attributes
- Fires tracking before navigation

### Event Data Structure
Each click sends to Google Analytics:
```text
Event Name: cta_click
Parameters:
  - button_label: Unique identifier (e.g., "hero_book_discovery_call")
  - button_text: Visible text (e.g., "Book a Discovery Call")
  - destination: Target URL or path
  - page_location: Current page path (e.g., "/", "/services")
```

## Files Summary

### New Files (3)
| File | Purpose |
|------|---------|
| `src/lib/analytics.ts` | Tracking utility function |
| `src/components/TrackedLink.tsx` | Internal link with tracking |
| `src/components/TrackedExternalLink.tsx` | External link with tracking |

### Files to Update (12)
| File | Changes |
|------|---------|
| `src/pages/Index.tsx` | Hero CTAs, service links, review buttons, CTA section |
| `src/components/Header.tsx` | Desktop and mobile "Book a Call" buttons |
| `src/components/Footer.tsx` | Footer "Book a Call" button |
| `src/pages/GetStarted.tsx` | Calendly link (most important conversion!) |
| `src/pages/Services.tsx` | "Book a Discovery Call" CTA |
| `src/pages/AIAgents.tsx` | Hero and CTA section buttons |
| `src/pages/Automations.tsx` | Hero and CTA section buttons |
| `src/pages/About.tsx` | "Book a Discovery Call" and "View My Work" |
| `src/pages/Portfolio.tsx` | "Book a Discovery Call" CTA |
| `src/components/PricingCard.tsx` | "Choose [Plan]" buttons |
| `src/components/PortfolioCard.tsx` | "View Live" project links |
| `src/components/StickyBookButton.tsx` | Floating book button |

