## Plan — Visually upgrade the For Professionals page

The page currently reads as a long stack of full-width text sections in alternating tints. The copy is great but visually flat: lots of `py-24/32` text walls, little hierarchy, no imagery, no editorial rhythm. The plan keeps every word and every section, but rebuilds the visual treatment to match the editorial, magazine-like vibe used on the homepage.

### 1. Hero — give it presence
- Two-column editorial split (1.2fr / 1fr).
- Left: existing kicker, headline, intro, CTA. Add a small handwritten Caveat note above the kicker ("a quiet word for advisors") in heritage-green, rotated like elsewhere on the site.
- Right: a portrait of Dennis (reuse the existing portrait from the homepage hero) inside a polaroid-style frame with a tape strip, slightly rotated.
- Background: faint Amsterdam skyline line-art bottom-right at low opacity (reuse the existing `AmsterdamSkyline` motif used elsewhere) so the section has texture instead of pure white.
- Replace the bordered button with the same primary style used on the homepage (filled bordeaux on hover) for consistency.

### 2. The Promise — quote treatment
- Keep both paragraphs.
- Render the first paragraph as a large pull-quote with an oversized open-quote glyph in heritage-orange (same treatment as the homepage testimonials).
- Render "That's where I come in." on its own line, underlined with a hand-drawn SVG squiggle (same squiggle component used in `AboutLetter`).
- Soften the taupe band with a subtle paper-grain noise overlay (the same SVG noise pattern used on the green podcast band) so it doesn't look like a flat beige rectangle.

### 3. Two ways to work together — numbered editorial cards
- Keep both option cards and all bullets.
- Replace the small "Option One / Option Two" kickers with oversized Bebas Neue numerals "01" and "02" in heritage-orange (same treatment as the About "Editorial Split" variation).
- Add a small hand-drawn icon per card (handover icon for option 1, handshake/compass icon for option 2) drawn as inline SVG strokes in the heritage palette. No corporate icon library look.
- Replace the `·` bullets with a thin orange dash drawn as a 12px SVG line, vertically aligned to the first line of text.
- Cards get a 4px top border in their accent color (purple / green) instead of the full thin border, matching the concierge card pattern on the homepage.
- Equalize card heights and add a soft drop shadow on hover.

### 4. Always on call — magazine column
- Keep the headline and three paragraphs.
- Replace the lucide `Phone` icon with the existing hand-drawn `iconMessage` asset (same one used in the concierge grid) so the iconography matches the homepage.
- Add a small handwritten margin note in Caveat ("evenings included") next to the second paragraph, rotated slightly, in heritage-orange.
- Right column gets a drop-cap on the first paragraph (large Bebas Neue first letter in heritage-bordeaux) for editorial flavor.
- Background: switch from flat bordeaux tint to a vertical gradient (bordeaux 6% at top fading to background) so the section feels lighter at the bottom and flows into the next section.

### 5. Deeply local — map motif
- Keep the heading and both paragraphs.
- Replace the lucide `Map` icon with a small inline SVG sketch of a canal/bridge in heritage-orange line-art (same drawing style as the StoryBook/treasure map elsewhere on the site).
- Behind the section, add a very faint Amsterdam canal SVG (low opacity, off to one side) so the section reads as "place" without competing with the text.
- "A true extension of your service" sub-card: keep the orange left border and the Sparkles cue, but restyle it as a postcard with a subtle paper texture and a light rotation (-0.5deg). Replace `Sparkles` with the same hand-drawn star/heart sketch style used for the Interests cards.

### 6. Testimonials — quieter, more editorial
- Keep both quotes verbatim.
- Switch from green left-border blocks to a centered editorial layout: oversized open quote in heritage-green, the quote in Bebas Neue style serif weight via Outfit at a larger size, and the attribution as a small caps line beneath a thin orange divider.
- Soften the taupe background to match the rhythm and add the paper-grain overlay used elsewhere.
- Add a small handwritten "in their words" Caveat note above the section as an eyebrow.

### 7. Let's connect — warmer, less form-like
- Keep all copy and every form field.
- Left column: add a small portrait crop of Dennis above the kicker, plus a Caveat handwritten note ("write me, I read every one") angled in heritage-green.
- Right column form: replace the plain bordered box with the same off-white card treatment used for the homepage Contact section (rounded-sm, soft shadow, top border in heritage-orange). Inputs get a slightly warmer border color and focus ring in heritage-orange. The submit button picks up the homepage's filled primary style on hover.
- Add a thin hand-drawn divider SVG between the two columns on desktop so the section reads as a spread, not two boxes.

### Cross-section polish
- Reduce vertical rhythm slightly: most sections drop from `py-24 lg:py-32` to `py-20 lg:py-28` so the page feels less like a tall column of equal slabs.
- Add slim hand-drawn SVG section dividers (the same wavy line used in About) between sections 2-3, 4-5, and 6-7 to give the page editorial breathing points.
- Standardize all icons to either the existing hand-drawn PNG icons or inline orange line-art SVGs. No more lucide icons on this page so it matches the rest of the site's hand-drawn identity.
- Standardize all CTAs to one style (filled hover, heritage-bordeaux), matching the homepage.

### Out of scope
- No copy changes. Every headline, paragraph, bullet, quote, label, kicker, and CTA stays exactly as written.
- No structural reorder. Sections stay in the same order with the same anchors.
- No new content sections. No new testimonials, no new bullets, no new pricing block.
- Form behavior unchanged (still the local toast handler).
- No backend or data changes.

### Files touched
- `src/pages/TravelAgents.tsx` — all visual changes above.
- Possibly one new tiny inline SVG component file for the shared squiggle/divider if it isn't already exported (otherwise inlined).
- Reuse existing assets: portrait, hand-drawn icons in `src/assets/icon-*.png`, `AmsterdamSkyline`, Caveat font already loaded site-wide.
