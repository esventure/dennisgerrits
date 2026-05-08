## Goal

Surface three secondary offers without distracting from the main guest journey, respecting that they serve two different audiences:

- **Group A (audience-building):** Speaking engagements + the "Two Stories, One City" podcast.
- **Group B (B2B utility):** Travel agents & concierges.

These get treated separately: A as an editorial strip on the homepage, B as a quiet header link only.

## Changes

### 1. New homepage section: "Also" strip (before Contact)

Insert a new section in `src/pages/Index.tsx`, placed directly above the existing `#contact` section.

- Background: off-white (`bg-background`) so it sits quietly between the previous section and the contact block. Generous vertical padding (`py-20 lg:py-28`).
- Small kicker (Bebas Neue, uppercase, secondary color): "Also".
- Two editorial cards side-by-side on desktop, stacked on mobile. No buttons, no shadows, no hover lifts. Just a thin divider line under each, a Bebas Neue title, one Outfit sentence, and a subtle text link with an arrow.

**Card 1 — Two Stories, One City (podcast)**
- Title: "Two Stories, One City"
- Body: "My podcast. Two Amsterdammers, one place, one conversation at a time."
- Link: "Listen" (placeholder href `#`, can be wired to the real podcast URL later).

**Card 2 — Speaking**
- Title: "Invite me to speak"
- Body: "I talk to groups, schools and conferences about Amsterdam, storytelling, and the way we travel."
- Link: "Get in touch" → `/#contact`.

No imagery in this strip. The point is calm, not visual weight.

### 2. Header: add a discreet "For Professionals" link

In `src/components/Header.tsx`, add a single nav link "For Professionals" pointing to `/travel-agents`. Style it visually lighter than the primary nav items (smaller, muted color, or right-aligned with a thin divider) so it reads as secondary, not part of the main journey.

If the header has a mobile menu, include it there as well.

### 3. Footer cleanup

In `src/components/Footer.tsx`, restructure the right-hand area so the two audiences stay visually separated:

- Keep the existing "For Professionals" column (Travel Agents, Universities, Speaking & Podcast links) but split "Speaking & Podcast" into two distinct links: "Speaking" and "Two Stories, One City".
- Or: introduce a fourth small column "More" for Speaking + Podcast, leaving "For Professionals" for B2B only. Choose whichever fits the existing 3-column grid without crowding.

### 4. Out of scope

- No new routes or pages. Speaking does not get its own page yet — it links to the contact form.
- No real podcast URL wired up (placeholder until provided).
- No changes to copy elsewhere on the site.
- No changes to the Travel Agents page itself.

## Acceptance criteria

- A reader scrolling the homepage encounters the "Also" strip naturally just before the contact form. It feels like a quiet PS, not a sales pitch.
- A travel agent landing cold on the homepage can find their entry point in one click via the header.
- Podcast and speaking are discoverable but never compete with the guest-booking flow.
- No new pop-ups, floating CTAs, or visual noise.

## Technical notes

- Files touched: `src/pages/Index.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`.
- Reuse existing tokens: `font-heading`, `font-body`, `text-primary`, `text-secondary`, `text-muted-foreground`, `bg-background`. No new colors.
- Wrap new homepage section in `FadeIn` to match site-wide animation pattern.
- Add the new copy to the CMS schema (`src/lib/siteContentSchema.ts`) under a new `also` section so Dennis can edit it later, with sensible fallbacks.
