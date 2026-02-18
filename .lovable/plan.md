
## Clean Up the Funnel Results Page

### What's Being Removed
From the results page (Step 4), two elements are being cut entirely:

1. The **"30-day money-back guarantee on all services"** trust badge (lines 560–563) — the shield icon + text row beneath the Book a Call button
2. The **"Not ready to talk? Get the free guide..."** secondary link / guide message toggle (lines 566–581) — the entire conditional block including both the button and the confirmation message states

### What Stays
- The animated revenue loss number (count-up)
- The supporting copy ("That's how much you could be leaving on the table...")
- The AI Voice Agent pitch card
- The "Book a Free Strategy Call with Adam" CTA button

### Result
The results page ends cleanly with the CTA button — no secondary distractions pulling the visitor's eye away from the one action you want them to take (book the call).

### Files Changed
| File | Change |
|---|---|
| `src/pages/Funnel.tsx` | Remove the trust badge row and the guide link/message block from Step 4 |
