## Problem

The "Invite me" and "Travel agents" call-outs currently live as two large stacked banners with `p-8 lg:p-10` padding, full-width CTA buttons, and big `text-3xl md:text-4xl` headings. Together they consume roughly 700px of vertical space, read as corporate banners, and break the editorial / hand-drawn vibe of the rest of the page.

## Goal

Make these two propositions feel like a small, charming aside instead of two prominent CTAs. They should still be discoverable, but visually quieter and more "scrapbook" in spirit.

## Approach: a pair of tilted postcards

Replace the two stacked banners with a single subhead ("Other ways to work with me") followed by a 2-column row of compact postcard cards. Each card:

- Slightly rotated (one ~-1.2°, the other +1°) so they feel pinned to the page rather than placed in a grid
- Hand-drawn icon on the left (microphone for "Invite me", suitcase for "Travel agents") rendered with the same `feTurbulence` sketch filter used in the day-map and timeline
- Small corner "stamp" badge ("GUEST" / "TRADE") rotated 6° for a passport-stamp feel
- Compact text: small kicker, `text-xl md:text-2xl` heading (down from 3xl/4xl), short body copy, and a discreet inline "Get in touch →" link instead of a full bulky button
- Heritage Orange for the speaking card, Heritage Bordeaux for the agents card — preserving the existing colour coding
- Subtle hover: lift 2px, arrow shifts right, stamp opacity increases

```text
       Other ways to work with me

  ┌─ tilt -1° ──────────┐   ┌─ tilt +1° ──────────┐
  │ 🎙  INVITE ME       │   │ 🧳  TRAVEL AGENTS   │
  │ Lectures, podcasts  │   │ A partner for your  │
  │ & radio             │   │ Amsterdam clients   │
  │                     │   │                     │
  │ Get in touch →      │   │ Partner with me →   │
  └─────────────────────┘   └─────────────────────┘
```

Result: roughly 1/3 the vertical space, more visual personality, and consistent with the hand-drawn icons already used in the "How It Works" timeline and the "A Day in My Life" map.

## Technical changes

- **`src/pages/Index.tsx`** — replace the two `<FadeIn>` banner blocks (lines ~589–649, just below the Rick Steves grid in the Rick Steves section) with the new postcard pair. No new components or assets needed; both icons are inline SVG using the existing `feTurbulence` sketch filter pattern.
- Mobile: cards stack to a single column at `<md`. The slight rotation reads fine on phone since each card is full-width.
- Constraint compliance: no em dashes in copy, uses semantic Heritage tokens via inline `style` (matching existing pattern on this page), Bebas Neue heading + Outfit body.

## Out of scope

- Copy rewrite beyond tightening to fit the smaller card. Happy to do a separate copy pass if wanted.
- Routing change for the "Travel agents" card (currently `#contact?subject=...` which doesn't actually pre-fill the form). Can wire that up later if useful.
