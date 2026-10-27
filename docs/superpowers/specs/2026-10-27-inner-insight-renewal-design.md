# Inner Insight renewal

## Intent and authority
The user requests a substantial visual redesign, delegates the design, and explicitly authorizes proceeding without further design questions. Success is a visitor reading the supplied introduction and completing the existing final Google Form.

## Binding constraints
- Preserve the original `public/images/inner-insight-mark.png` bytes and show the complete image without cropping, recoloring, filters, or replacement by video.
- Publish the supplied Japanese introduction verbatim, in its original paragraph order. Markdown heading and emphasis become semantic HTML. Do not paraphrase or omit any paragraph.
- Preserve the existing Google Form URL and official social URLs, existing Site ID, public audience, and live origin.
- Use the existing React/Vinext stack. No new product dependencies, accounts, payment flows, fabricated credentials, testimonials, or outcome guarantees.

## Direction (designer's delegated decisions)
An intimate editorial letter: ivory paper, dark aubergine ink, muted bronze details, Japanese Mincho headings, spacious readable body copy. The original I art is the first screen's central visual. Three chapters carry the full introduction: the author's experience, the session, and the guiding belief. Alternate light and deep plum surfaces to give the reading a visual rhythm. Existing atmospheric photographs support chapters without competing with the symbol.

## Approaches considered
A small restyle would retain the current fragmented marketing copy and would not give the supplied introduction enough presence. A video-led experience would compete with the explicitly protected I image. Choose a complete editorial redesign using existing components/assets and a direct application journey; the user delegates that choice.

## Journey and behavior
Hero -> full introduction in three ordered chapters -> existing three-step application guidance -> Google Form embed. Header, hero, and one contextual invitation lead to `#application`; the final section offers a prominent direct Google Form link alongside the embed. Keep an accessible compact mobile navigation and a mobile application shortcut that disappears while the form is visible. External social links remain in the footer. Never submit a form on a visitor's behalf.

## Verification
Check full rendered introduction against an independent fixture, original symbol checksum, anchor destinations, heading labels, iframe/direct-link equivalence, keyboard and narrow-screen access, reduced-motion behavior, and no-JavaScript readable content. Run the existing suite and production build. Browser QA at 375, 768, 1024, and 1440 pixels; inspect actual Google Form availability without sending a response.

## Research fit
UI/UX local design-system searches returned generic Swiss/neumorphism suggestions; these are a poor fit for the original I artwork and are not adopted as the visual system. Retain their applicable accessibility guidance (contrast, focus, touch size, reduced motion). Palette and composition are designer decisions grounded in the original image.
