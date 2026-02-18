
## Move 30-Day Guarantee Card Directly Under the Hero

### Current Page Order
1. Hero — "Turn your dreams into reality" + CTAs
2. About Snapshot — "Hi, I'm Adam"
3. Features — Fast Setup, Proven Value, Simple Pricing
4. Services & Pricing
5. **30-Day Guarantee** ← currently here
6. Workflow
7. Portfolio
8. Testimonials
9. CTA

### Target Page Order
1. Hero — "Turn your dreams into reality" + CTAs
2. **30-Day Guarantee** ← moved here
3. About Snapshot — "Hi, I'm Adam"
4. Features
5. Services & Pricing
6. Workflow
7. Portfolio
8. Testimonials
9. CTA

### What Changes

One file, one surgical move: `src/pages/Index.tsx`

- Cut the entire `{/* 30-Day Money-Back Guarantee */}` section block (lines 387–409)
- Paste it immediately after the closing `</section>` tag of the Hero section (after line 213)
- The section's styling, animation, and content stay completely untouched — just repositioned

### Why This Works Well

Placing the guarantee immediately after the bold hero claim ("Turn your dreams into reality") removes the risk objection right at the moment a visitor might feel skeptical. It acts as a trust anchor before they scroll into any sales content — the "Hi, I'm Adam" intro then lands on a warmed-up, lower-resistance reader.

### Files Changed
| File | Change |
|---|---|
| `src/pages/Index.tsx` | Move the 30-Day Guarantee `<section>` block from after the Services section to immediately after the Hero `<section>` closing tag |
