# Inner Insight Renewal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish an editorial Japanese introduction that leads visitors to the existing Google Form.

**Architecture:** Keep the React/Vinext single page and official links. Replace fragmented home sections with an ordered letter, reuse the untouched I art and atmospheric images, and keep form state with Google.

**Tech Stack:** React 19, Vinext, CSS, Vitest, existing Sites hosting.

**Spec:** `docs/superpowers/specs/2026-10-27-inner-insight-renewal-design.md`

## Global Constraints
- Original I image bytes and full composition remain unchanged.
- Supplied Japanese paragraphs appear verbatim and in original order.
- Preserve Google Form URL, official social URLs, Site ID, public audience, and origin.
- No new product dependencies or invented claims.

## Review Focus
- All original paragraphs must survive section boundaries without punctuation edits.
- No JavaScript, blocked iframe, or reduced motion must still allow reading and direct application.
- Long Japanese copy and full I art must fit narrow viewports without clipping.
- Sticky navigation must not cover anchors, keyboard focus, or the embedded form.
- Form URLs must remain equivalent and no test may submit a response.

### Task 1: Narrative and conversion contract
Files: `lib/introduction.ts`, `app/page.tsx`, `components/home-sections.tsx`, `components/site-header.tsx`, `components/application-embed.tsx`, `lib/content.ts`, relevant tests and a verbatim independent fixture.
- [ ] Write rendered-page tests for complete ordered copy, intact I image, valid anchors and form destinations. Confirm failures against the original page.
- [ ] Implement the three-chapter letter, accessible navigation, application guidance, direct form link and embed.
- [ ] Update superseded editorial tests to the new user-authorized contract and run the suite.

### Task 2: Visual system and motion
Files: `app/globals.css`, `app/refined.css`, `components/experience-client.tsx`, relevant interaction tests.
- [ ] Replace video scrubbing with progressive, optional reveal animation and a mobile form shortcut that hides near the application.
- [ ] Implement the paper/aubergine editorial system and responsive layouts, preserving readable default content.
- [ ] Verify desktop/mobile, focus, reduced motion and no-JavaScript behavior; run suite and production build.

### Task 3: Review and delivery
- [ ] Request a fresh review against the spec, fix material issues and verify changes.
- [ ] Synchronize the final source to GitHub on a reviewable branch/PR and to the existing Sites source repository.
- [ ] Package and publish to the existing public Site, verify deployment result, open the live result and deliver the link.
