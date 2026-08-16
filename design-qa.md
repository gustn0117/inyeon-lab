# Design QA

## Scope

- Routes: `/`, `/women`, `/men`
- Reference: user-provided mobile screenshots and the gender-first, photo-led entry pattern
- Viewports checked: 390 × 844 at DPR 2 and 1440 × 1000
- States checked: home gender choice, detail hero, member-pool gallery, matching journey, promise cards, eligibility gate, and application entry

## Visual checks

- Home stays within one viewport and contains only the brand, a short instruction, the split photo, and two clear gender choices.
- Mobile and desktop use separate high-resolution, art-directed images. Male and female click areas align with their respective subjects.
- `/women` and `/men` share the same responsive layout while preserving gender-specific eligibility, price, pool copy, and CTA labels.
- Member-pool images use a horizontal snap gallery on mobile and a three-card editorial composition on desktop.
- The matching section maintains readable white text over the dark photographic treatment.
- Korean headings use deliberate line breaks and `word-break: keep-all` where necessary; no syllable-level break remains in the key “카톡” and application copy.
- The live-chat tooltip is hidden on small screens so it does not obscure primary content; the launcher remains available.
- The fixed application CTA leaves room for the chat launcher on mobile.

## Responsive and interaction checks

- Measured document width at 390px: `scrollWidth = 390px` on `/` and `/women`; no horizontal page overflow.
- Home links point to `/men` and `/women` and occupy the full corresponding half of the visual.
- Detail CTAs point to `#apply`; `#member-pool`, `#matching`, and `#apply` land on the intended sections.
- Eligibility confirmation remains the required first step before form fields are shown.
- Focus-visible outlines and reduced-motion overrides remain active.

## Build checks

- TypeScript: pass
- `git diff --check`: pass
- Next.js production build: pass

final result: pass
