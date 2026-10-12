# Design QA

## Comparison target

- User-supplied layout inspiration: `/tmp/inyeon-captures/reference-desktop.png`
- Inspiration process crop: `/tmp/inyeon-qa-extension/source-process.png`
- Inspiration Full Care crop: `/tmp/inyeon-qa-extension/source-care.png`
- Live `/serviceprocess` reference capture: `/tmp/inyeon-serviceprocess/reference-full.png`
- Live reference detail crop: `/tmp/inyeon-serviceprocess/crops/top.png`
- Final desktop implementation: `/tmp/inyeon-qa-layout-style/desktop-final.png`
- Final mobile implementation: `/tmp/inyeon-qa-layout-style/mobile-final.png`
- Focused implementation crop: `/tmp/inyeon-qa-layout-style/implementation-process-care-final.png`
- Side-by-side layout comparison: `/tmp/inyeon-qa-layout-style/compare-layout-style-final.png`
- Extended desktop implementation: `/tmp/inyeon-serviceprocess/desktop-implementation.png`
- Extended 390 px mobile implementation: `/tmp/inyeon-serviceprocess/mobile-implementation.png`
- New manager-process crop: `/tmp/inyeon-serviceprocess/crops/implementation-manager.png`
- New manager-process mobile crop: `/tmp/inyeon-serviceprocess/crops/implementation-manager-mobile.png`
- Live reference vs. new section comparison: `/tmp/inyeon-serviceprocess/compare-serviceprocess.png`
- Before-change manager-region baseline: `/tmp/inyeon-effects/before-manager-region.png`
- Final wide desktop implementation: `/tmp/inyeon-effects/desktop-wide-effects-final.png`
- Final wide manager-region crop: `/tmp/inyeon-effects/manager-wide-final.png`
- Final mobile implementation with effects initialized: `/tmp/inyeon-effects/mobile-effects-final.png`
- Final mobile manager-region crop: `/tmp/inyeon-effects/manager-mobile-final.png`
- Before/after wide-background comparison: `/tmp/inyeon-effects/compare-before-wide.png`
- Hover-state evidence: `/tmp/inyeon-effects/process-hover.png`
- Route and state: `/`, default state, white theme, FAQ collapsed, chat closed

## Design intent

The supplied screenshots define the layout style rather than an exact design to copy. The implementation should visibly borrow the connected process-card layout and modular Full Care/Bento layout while changing proportions, content order, photography, brand colors, and component composition for 인연연구소. The live `/serviceprocess` page adds a second process language: a long pale-mint editorial rail that repeats number, headline, explanation, and a large rounded service preview.

The latest revision must make the mint manager-story background visibly wider and add a richer motion layer throughout the homepage without reducing readability, breaking navigation, or causing horizontal overflow. Motion must remain restrained on touch screens and be disabled when the user requests reduced motion.

## Viewport and normalization

- Inspiration desktop capture: 1440 × 7000 px at device scale factor 1.
- Final desktop implementation: 1440 × 7400 px at device scale factor 1.
- Final mobile implementation: 390 × 10451 px at a real 390 px emulated CSS viewport and device scale factor 1.
- Live `/serviceprocess` capture: 1440 × 9548 px at device scale factor 1.
- Extended homepage capture: 1440 × 8742 px at device scale factor 1.
- Extended mobile capture: 390 × 13378 px at a real 390 px emulated CSS viewport and device scale factor 1.
- Final effects desktop capture: 1440 × 8742 px at CSS viewport 1440 × 900 and device scale factor 1.
- Final effects mobile capture: 390 × 13344 px at CSS viewport 390 × 844 and device scale factor 1.
- Focus comparison: reference process and Full Care crops were stacked at 1440 px width. The implementation's corresponding region was cropped at 1440 px and height-normalized for side-by-side layout inspection.
- Wide-background comparison: both before and after manager regions were cropped from 1440 px desktop captures at device scale factor 1 and placed in one 2882 × 2502 px comparison image. Different vertical start points normalize the manager-story headings while retaining enough neighboring content to show the section transition.

## Findings

No actionable P0, P1, or P2 issues remain.

- Process layout style: the final section preserves the reference's two-row, connected, image-card journey. It avoids direct replication through asymmetric 4:5:3 and 3:5:4 column spans, image-first cards, left-positioned step markers, different copy proportions, and original generated photography.
- `/serviceprocess` extension: the added “보이지 않는 과정까지” section borrows the live page's long mint field, numbered editorial chapters, generous vertical pacing, and large white service previews. It is reduced from four source steps to three original manager moments: profile curation, date coordination, and private feedback.
- Distinction from the live page: desktop chapters alternate copy and preview left-to-right instead of using the source's single vertical phone/chat stack. Step markers are circular, preview chrome is original, copy is rewritten, and the visuals use existing 인연연구소-generated photography. On mobile, the alternating grid intentionally collapses to the reference's readable one-step-at-a-time rhythm.
- Full Care layout style: the final section uses the reference's mixed photo/text modular rhythm but changes it into a five-block Bento: one tall manager tile, one cost tile, two split service tiles, and one feedback image tile. The 5:3:4 composition and navy/sage balance are specific to 인연연구소.
- Typography: Pretendard display weights, compact English eyebrows, tight Korean heading tracking, and restrained body copy match the established site rather than the reference typography.
- Spacing and rhythm: both sections use generous white space and soft radii from the inspiration, while asymmetric widths and the image-first process cards establish a distinct page silhouette.
- Colors and tokens: white and deep navy remain dominant. Sage is limited to connector lines, markers, icons, and pale mint surfaces, keeping the reference influence secondary to the brand.
- Image fidelity: original Korean lifestyle images are used throughout with consistent bright daylight grading. All images loaded with positive natural widths; no source-site photographs, embedded text, logos, watermarks, or placeholders are present.
- Copy and service logic: the six real stages and supported advantages remain: 가입비·성혼비 0원, person-led review, mutual acceptance before payment, manager-led scheduling, and post-date feedback. Unsupported reference metrics and system claims are excluded.
- Responsive behavior: the desktop route grid becomes one image card per row at 390 px. The Bento becomes a vertical mixed-media stack while retaining card hierarchy. Document width measured 390 px and the pricing table ended at x=366.
- New responsive rail: at 390 px the manager panel is 342 px wide from x=24 to x=366, with all three chapters and previews stacked inside it. No horizontal overflow is present.
- Wide background: the manager panel now measures x=`0` to `1440` on desktop and x=`0` to `390` on mobile. Its content remains aligned to the 1288 px desktop grid (x=`76` to `1364`) and to 18 px mobile content gutters, so the background is full-bleed without making the text difficult to scan.
- Motion system: 30 reveal targets use IntersectionObserver with directional, vertical, or scale variants. Process connectors draw from left to right, route cards stagger in, and hero/final photography has a slow breathing crop. Hover states add lift, image zoom, shadow depth, pricing-row movement, FAQ affordance, and button sheen.
- Motion accessibility: `prefers-reduced-motion: reduce` disables animations and forces reveal targets visible. Motion does not gate content or navigation.
- Accessibility and interaction: semantic sections/articles, descriptive alt text, library icons, native FAQ disclosure, and existing CTA/chat affordances remain. No runtime exceptions or non-aborted network failures were observed.

## Comparison history

- Earlier P1: the first implementation copied the equal 3 × 2 card grid and Full Care mosaic too literally.
- Earlier P1: the following revision moved too far away by replacing the reference layout language with three wide editorial chapters and a flat proof row.
- Final fix: restored the connected two-row card system and modular Bento layout, then differentiated them using asymmetric spans, image-first flow, five-block composition, navy brand emphasis, original copy, and original imagery.
- Post-fix evidence: `/tmp/inyeon-qa-layout-style/compare-layout-style-final.png` shows recognizable layout inspiration without an identical arrangement.
- `/serviceprocess` extension: added a separate three-chapter manager-story rail after directly capturing the live page. The comparison at `/tmp/inyeon-serviceprocess/compare-serviceprocess.png` confirms shared editorial rhythm while showing different composition, content, imagery, and interface previews.
- Latest P2 found during the effects pass: when the manager heading's explicit line break was hidden on mobile, Korean wrapping placed `매` at the end of the first line and weakened the headline rhythm.
- Latest fix: restored the intentional mobile line break so “보이지 않는 과정까지,” and “매니저가 이어갑니다” form two balanced lines. Post-fix evidence is `/tmp/inyeon-effects/manager-mobile-final.png`.
- Wide-background result: `/tmp/inyeon-effects/compare-before-wide.png` visibly shows the former centered mint rectangle beside the new edge-to-edge mint field with the same aligned content hierarchy.

## Browser verification

- Real mobile emulation after the effects revision: `innerWidth=390`, document width `390`, total height `13344`.
- Six process cards and five Full Care blocks render at both breakpoints.
- Three manager-story chapters render; the mobile background spans x=`0` to `390` and its content grid spans x=`18` to `372`.
- All homepage images loaded after scrolling through the final document (`badImages=[]`).
- FAQ disclosure opens with its answer, and the primary CTA still resolves to `/apply`; the shared live-chat component was not altered by this extension.
- Runtime exceptions: none.
- Non-aborted failed network responses: none.
- Reveal verification: all `30/30` reveal targets reached the visible state after a complete scroll pass; all images reported positive natural widths.
- Hover verification: the first process card reached `transform: matrix(1, 0, 0, 1, 0, -9)` with the intended elevated shadow. Evidence is `/tmp/inyeon-effects/process-hover.png`.
- Next.js production build: passed, including type checking and static generation for 21 pages.

## Implementation checklist

- [x] Borrow the connected card and modular Bento layout language.
- [x] Avoid exact card proportions, content order, images, colors, and composition.
- [x] Preserve all six matching stages and real service advantages.
- [x] Borrow the live `/serviceprocess` vertical editorial rhythm without copying its assets or exact arrangement.
- [x] Add original profile, scheduling, and feedback service previews.
- [x] Expand the manager-story background to the full viewport width while preserving readable inner gutters.
- [x] Add scroll reveals, connector drawing, image motion, staggered cards, hover lift, button sheen, and interactive row feedback.
- [x] Respect reduced-motion preferences and prevent hidden content when motion is disabled.
- [x] Preserve existing application, pricing, FAQ, and chat behavior.
- [x] Verify desktop, real 390 px mobile, image loading, overflow, and production build.

final result: passed
