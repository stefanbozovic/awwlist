# Design QA

## Latest revision: Keeby-inspired download flow

This revision supersedes the screenshots and layout findings below, which document the earlier design.

- Reference inspected live: https://getkeeby.com/. Product beside the headline, black Apple download controls, platform and price immediately below, compact product details.
- Current implementation inspected in the in-app browser at desktop size, 390 × 844 and 320 × 740. The supplied screenshot remains unmodified and proportional.
- Mobile document and scroll widths match at both 390px and 320px. No horizontal overflow detected.
- All three download anchors retain the supplied App Store destination. Launch disclosure was expanded and visually inspected. Console errors: none observed.
- Desktop pairs product and conversion copy; mobile places the download above the product screen. Persistent header keeps download accessible while scrolling.
- Scope: visual refinement and existing link verification. App Store installation, real-world conversion rates and embedded-browser behavior were not newly tested in this revision.
- The earlier captured screenshots below are historical, not evidence for this revision.


## Comparison target

- Source visual truth: `/Users/stefanbozovic/Library/Containers/com.apple.dt.Devices/Data/Documents/Screenshot Birdseye iPhone 09-05-2026 at 11.20.05.png`
- Source pixels: 1206 × 2622 PNG. The original iPhone screenshot is the product-proof asset, not a landing-page layout to reproduce.
- Implementation: `output/playwright/landing-mobile.png` and `output/playwright/story-mobile.png`
- Implementation viewport: 390 × 844 CSS pixels, device scale factor 1; screenshots are 390 × 844 pixels.
- State: initial landing state and the scrolled story state, light theme.

## Full-view comparison evidence

The implementation deliberately does not recreate the supplied iPhone screen as HTML. It places the exact user-provided screenshot as the proof point after the landing message. The 390px capture shows a concise hero with one CTA; the second capture shows the story text immediately above the supplied screen. There is no crop or replacement artwork in the embedded product image. The bottom of the phone screenshot continues below the browser viewport as expected from its portrait aspect ratio.

## Focused-region comparison evidence

The source note reads “Chocolate cookies. Our favorite.” and is visible within the embedded application image. The page introduces that same note as the lead-in copy, then shows its original AwwList context: people, the saved note, and the composer. This preserves the app's authentic typography, logo, controls, colors, and asset detail rather than approximating them with web elements.

## Required fidelity surfaces

- Fonts and typography: The landing page uses Sunghyun Sans, matching the friendly rounded character of the supplied UI. Display text has a clear hierarchy without faux eyebrow labels or excessive weights. The screenshot itself retains its native iOS typography.
- Spacing and layout rhythm: At 390px, the hero has one clear reading path and a full-width CTA. The story stacks copy then the product image, with sufficient separation and no horizontal overflow.
- Colors and visual tokens: The soft pink page background and coral CTA support the screenshot’s AwwList palette without competing with it.
- Image quality and asset fidelity: The supplied PNG is used directly as `awwlist-interface.png`, rendered proportionally with no CSS crop, replacement illustration, or compression artifact.
- Copy and content: Copy is reduced to one short narrative: notice, save, remember. The former ticker, feature cards, testimonials, stats, FAQ, and decorative emoji content were removed.

## Findings

No actionable P0, P1, or P2 issues found.

## Follow-up polish

- [P3] When newer app screenshots are available, replace `awwlist-interface.png` with a focused capture that starts at the People view and ends just below the composer, so more of the note interaction is visible before the next page scroll.

## Primary interactions tested

- All three AwwList CTAs expose the App Store URL.
- The in-app browser fallback remains wired to the same CTAs.
- Browser console: 0 errors and 0 warnings in the local preview.

## Final result

passed
