# Design QA

## Scope

- Routes: `/`, `/women`, `/men`
- Reference: user-provided mobile screenshots plus the live `jusunking.com` gender-first entry at the same mobile viewport
- Viewports checked: 390 × 844 and 1440 × 1000
- States checked: home gender choice, both detail heroes, member-pool gallery, human-curation comparison, five-step journey, FAQ, eligibility gate, form entry, fixed CTA, and live-chat launcher

## Visual checks

- The home now uses the original split-scene artwork: the two subjects look toward each other instead of posing directly at the camera, the height difference is restrained, and the center divider still keeps both choices visually distinct.
- Mobile gender labels are exactly the same smaller size (`22px`) and desktop labels resolve to the same `34px`; the brand lockup is also rebalanced to `16px` + `11px` on mobile so neither line overpowers the other.
- The active home artwork is art-directed by viewport: mobile loads the 941 × 1672 portrait WebP and desktop loads the 3344 × 1882 landscape source through Next Image.
- Both viewport variants use a top-aligned focal point so wide or short screens preserve comfortable space above both subjects' heads. The former 4px lemon divider between the header and photograph has been removed.
- Home stays within one viewport and contains only the brand, a short instruction, the split photo, and two clear gender choices. The first headline now names `소개팅` directly.
- Mobile and desktop use separate high-resolution, art-directed images. Male and female click areas align with their respective subjects.
- The male page hero and all three female member-pool cards use newly generated adult Korean women who read clearly as being in their twenties; no older female member image remains in the active page.
- The female page leads with a male member image and the male page leads with a female member image, so each visitor sees the people they may be introduced to.
- `/women` and `/men` preserve gender-specific eligibility, price, pool copy, FAQ answers, journey payment step, and fixed CTA labels.
- The photo-led member-pool gallery is followed by a distinct consultant image and a readable comparison panel; generated images are explicitly labeled as service imagery rather than real members.
- The matching section uses a high-resolution photographic background and keeps white copy readable over a dark scrim.
- The source/prototype comparison at 390 × 844 confirms that the home keeps the reference's immediate two-way choice while making price, age conditions, and the service category clearer.
- Korean headings use deliberate line breaks and `word-break: keep-all` where necessary; no syllable-level break remains in the key “카톡” and application copy.
- The live-chat launcher remains available without overlapping the fixed application CTA.

## Responsive and interaction checks

- Measured document width at 390px: `scrollWidth = 390px` on `/`, `/women`, and `/men`; no horizontal page overflow.
- At 390px, the home links point to `/men` and `/women`, each measure exactly 195px wide, and occupy the full corresponding half of the 390px visual. At 1440px, each half measures 720px.
- Detail pages render eight intentional sections. Mobile process cards scroll horizontally at a readable type size instead of shrinking into a dense two-column grid.
- The fixed CTA hides when the application or footer enters the viewport, so it does not cover the eligibility control, form fields, consent copy, or legal information.
- Eligibility confirmation remains the required first step. After confirmation, the expected `연락처`, `지역`, `출생연도`, `키`, `직업`, and privacy-consent fields appear on both routes.
- The form repeats `지금 결제 0원` and the gender-specific success price before input, and the submit label states `가입비 없이 신청서 제출`.
- Native FAQ details open and close without script-only controls; the first answer is visible by default.
- Focus-visible outlines and reduced-motion overrides remain active.

## Build checks

- TypeScript: pass
- `git diff --check`: pass
- Next.js production build: pass
- Standalone image runtime: `sharp` present in `.next/standalone/node_modules`
- Priority and lazy image requests: loaded successfully with non-zero natural dimensions

final result: passed
