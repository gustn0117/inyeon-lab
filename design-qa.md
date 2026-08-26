# Design QA

## Scope

- Routes: `/`, `/women`, `/men`
- Viewports: 1440 × 900, 768 × 1024, 390 × 844, 375 × 667
- States: home first fold and full page, gender detail pages, eligibility gate, application form, fixed chat launcher, reduced motion

## Homepage

- The first fold identifies the service as a capital-area relationship information company rather than an app
- Membership fee, payment timing, public prices, no paid stand-in members, and in-person meeting support are visible before scrolling
- Men and women have distinct full-card links with their eligibility and post-match prices
- Desktop and mobile use separate art-directed hero images while preserving both subjects and the two selection cards
- The hero, in-person meeting, and final CTA scenes are newly generated for this project; none of the previous homepage photographs remain on the active route
- The moving policy ticker supplements static copy and is hidden from assistive technology; an equivalent screen-reader sentence remains available
- The page continues into service identity, operating principles, transparent prices, the four-step process, FAQ, and final gender CTAs
- The homepage and shared active accents use white, warm gray, and muted wine; the brand and major headings use the same Korean serif treatment
- Short mobile screens use a compressed first-fold layout so both gender cards and both CTA labels remain visible
- The mobile chat launcher does not intersect either CTA
- Portrait tablets use the wide hero composition and keep both people, both cards, and both CTAs inside the first fold

## Detail pages and eligibility

- `/women` and `/men` share one detail-page component while preserving their respective prices and eligibility copy
- Both routes repeat the key operating principles: no membership fee, payment after a match, no paid stand-in members, and in-person meeting support
- Service imagery used around the member-pool explanation is explicitly disclosed as staged imagery
- Four newly generated male portraits and four newly generated female portraits replace the previous member-pool imagery
- A newly generated matching-consultant scene and a newly generated in-person meeting scene replace the previous shared service photographs
- Men are eligible from birth year 1984 onward under the stated Korean-age operating rule
- The male form renders `min="1984"`; client validation and server validation reject earlier birth years with the same message
- The women’s existing age rule remains unchanged
- Eligibility confirmation is required before form fields are shown

## Responsive and accessibility checks

- No horizontal overflow at 1440, 768, 390, or 375 pixels
- At 390 × 844 and 375 × 667, both home cards and CTA labels are fully inside the first fold
- At 768 × 1024, portrait artwork preserves both subjects and the chat launcher does not intersect the women’s CTA
- Home FAQ uses native `details` controls and retains visible keyboard focus styles
- `prefers-reduced-motion` disables the hero drift, ticker motion, and transitions
- The fixed chat launcher remains available without covering the home gender CTAs or detail-page fixed application CTA
- Informative generated photographs use Korean alt text that describes them as staged imagery; decorative homepage hero and final CTA art remain hidden from assistive technology

## Image production and QA

- Active generated assets: 14 WebP files under `public/inyeon-2026`
- Desktop and mobile homepage hero pairs preserve the same people, wardrobe, and setting while using independent wide and portrait compositions
- Desktop and mobile final CTA pairs preserve the same people, wardrobe, and setting while using independent wide and portrait compositions
- Every original was inspected for adult appearance, face and hand integrity, composition, and the absence of embedded text, logos, and watermarks
- The male and female portrait sets use distinct people, styling, poses, and settings while keeping one warm-white editorial art direction
- Images were converted to sRGB WebP at quality 86 with metadata removed; the complete active set is approximately 1.1 MB
- The 390 × 844 and 375 × 667 mobile hero crops show both people above the gender cards; the 768 × 1024 hero uses the wide composition without clipping either person
- The mobile in-person journey crop keeps both participants readable while reserving the darker left side for text

## Verification

- Next.js production build: pass
- TypeScript: pass through the production build
- `git diff --check`: pass
- Home and `/men` local HTTP responses: 200
- Browser console errors: none
- Male form DOM: `min="1984"`, `max="2007"` when checked in 2026
- Mobile hero network: one high-priority portrait request and no duplicate desktop-image request

Final result: passed
