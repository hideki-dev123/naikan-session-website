# Renewal verification — 2026-10-27

- Automated suite: 14 tests in 6 files pass (`pnpm test`).
- TypeScript: `pnpm exec tsc --noEmit` exits 0.
- Production: Sites `build-site.mjs` exits 0.
- Original I image SHA-256 matches the GitHub baseline: `6f81f07e1ae85f3f9df324aaec1b0f862b365e29faacb4e546452ea33ddf7d4e`.
- Rendered introduction equals all 14 blocks (heading plus paragraphs) in the independent verbatim fixture, in order.
- Browser viewport checks: 375, 641, 700, 768, 1024, 1440 pixels. No horizontal page or content overflow after the tablet fix.
- Fresh read-only reviewer found tablet hero overflow; reproduced at 641/700, fixed with bounded grid tracks and proportional art width, and rechecked at the same widths. No other blocking or minor source findings.
- Lighthouse snapshot: Accessibility / Best Practices / SEO / Agentic Browsing scores 100; 29 audits passed and 0 failed. This was a local-page snapshot, not a performance audit or full WCAG certification.
- Reduced-motion browser check: hero animation `none`, scroll behavior `auto`, all original copy visible.
- Keyboard check: mobile summary has a visible focus ring, Enter opens it, choosing an anchor closes it. Application begins at 98px below a 74px sticky header at a 375px viewport.
- Mobile shortcut is hidden while the hero or application is visible.
- Google Form URL and embedded/direct destinations agree. Logged-out form displays a Google login requirement; this was verified without entering or submitting data. The site explains that requirement and provides a direct external link.
- No-JavaScript availability verified in server-rendered markup: original text and form links are present without client handlers. No form response, login, or submit operation was performed.

GitHub branch/PR and the production deployment result are reported in the delivery chat. Existing public audience, Site ID, and live origin are preserved.
