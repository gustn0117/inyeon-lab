# Design QA

## Scope

- Routes: `/`, `/women`, `/men`
- Viewports: 1440 × 1000, 768 × 1024, 390 × 844, 320 × 568
- States: home first fold and full page, gender detail pages, eligibility gate, application form, fixed chat launcher, reduced motion

## Homepage

- The first fold identifies the service as a capital-area relationship information company rather than an app
- Membership fee, payment timing, public prices, 100% real-member operation, and in-person meeting support are visible before scrolling
- Men and women have distinct full-card links with their eligibility and post-match prices
- Desktop and mobile use separate art-directed hero images while preserving both subjects and the two selection cards
- The hero, in-person meeting, and final CTA scenes are newly generated for this project; none of the previous homepage photographs remain on the active route
- The moving policy ticker supplements static copy and is hidden from assistive technology; an equivalent screen-reader sentence remains available
- The page continues into service identity, operating principles, a six-image 2030 mood gallery, transparent prices, a four-step image-led process, FAQ, and final gender CTAs
- The member gallery uses six staged portraits in a scan-friendly editorial rhythm; desktop shows all six, tablet uses a 3 × 2 grid, and mobile uses a clearly signposted horizontal gallery
- Each process step has its own newly generated 4:3 scene for application, consultation, mutual intent confirmation, and the in-person meeting
- Both new image-led sections disclose that the photographs are staged service imagery and keep all explanatory copy as live HTML text
- The reference site informed image density, repeated card rhythm, and CTA discoverability only; none of its metrics, reviews, awards, logos, or proprietary claims were reused
- The homepage and shared active accents use white, sky blue, aqua, and cool gray with no active pink or brown theme surfaces; major headings and UI use one modern Korean sans-serif system
- At 390 × 844 both gender cards and their CTA labels remain visible; at 320 × 568 the complete promise, four trust points, and both people remain intact while the gender cards begin immediately after the image band
- The chat launcher is hidden while the first-fold gender cards are visible, so it cannot intersect either CTA
- Portrait tablets use the wide hero composition and keep both people, both cards, and both CTAs inside the first fold

## Detail pages and eligibility

- `/women` and `/men` share one detail-page component while preserving their respective prices and eligibility copy
- Both routes repeat the key operating principles: no membership fee, payment after a match, 100% real members, and in-person meeting support
- Service imagery used around the member-pool explanation is explicitly disclosed as staged imagery
- Four newly generated male portraits and four newly generated female portraits replace the previous member-pool imagery
- A newly generated matching-consultant scene and a newly generated in-person meeting scene replace the previous shared service photographs
- Men are eligible from birth year 1984 onward under the stated Korean-age operating rule
- The male form renders `min="1984"`; client validation and server validation reject earlier birth years with the same message
- Women are eligible from birth year 1988 onward under the stated Korean-age operating rule
- The female form renders `min="1988"`; client validation and server validation reject earlier birth years with the same message
- Eligibility confirmation is required before form fields are shown

## Responsive and accessibility checks

- No global horizontal overflow at 1440, 768, 390, or 320 pixels; measured document `scrollWidth` equals `clientWidth` at all four widths
- At 390 × 844, 768 × 1024, and 1440 × 1000, both home cards and CTA labels are fully inside the first fold
- At 390 and 320 pixels, the member gallery and process story use contained horizontal scrolling with a visible next-card edge and a swipe hint; these regions do not create document-level overflow
- At 768 × 1024, detail-page member portraits use a 4:5 frame and preserve the subject’s complete head and face
- Home FAQ uses native `details` controls and retains visible keyboard focus styles
- `prefers-reduced-motion` disables the hero drift, ticker motion, and transitions
- The fixed chat launcher and sticky application CTA are suppressed across the detail hero, matching journey, application form, and footer so they cannot cover key content
- Both horizontal image regions are keyboard-focusable and have explicit region labels; informative generated photographs use Korean alt text that describes them as staged imagery
- Decorative homepage hero and final CTA art remain hidden from assistive technology

## Image production and QA

- Active generated assets: 18 versioned WebP files under `public/inyeon-2026` — 14 V3 brand assets and four V1 process scenes; prior V2 files remain only as rollback assets
- Desktop and mobile homepage hero pairs preserve the same people, wardrobe, and setting while using independent wide and portrait compositions
- Desktop and mobile final CTA pairs preserve the same people, wardrobe, and setting while using independent wide and portrait compositions
- Every original was inspected for adult appearance, face and hand integrity, composition, and the absence of embedded text, logos, and watermarks
- The male and female portrait sets use distinct 24–27-year-old adults, contemporary styling, and bright white/sky-blue/aqua settings while keeping one youthful 2030 Seoul editorial direction
- The four process scenes use distinct adults and environments, preserve a 4:3 responsive crop, and contain no readable UI text
- Images were converted to optimized WebP with metadata removed; the complete active source set is approximately 1.36 MiB, including 330 KiB for the four process scenes
- The 390 × 844 and 320 × 568 mobile hero crops show both people above the gender cards; the 768 × 1024 detail hero uses a portrait frame without clipping the subject
- The mobile in-person journey crop keeps both participants readable while reserving the darker left side for text

## Verification

- Next.js production build: pass
- TypeScript: pass through the production build
- `git diff --check`: pass
- Home, `/women`, `/men`, and the new process-image local HTTP responses: 200
- Browser console errors: none
- Male form DOM: `min="1984"`, `max="2007"` when checked in 2026
- Mobile hero network: one high-priority portrait request and no duplicate desktop-image request

Final result: passed
