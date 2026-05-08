# Two Dennises for the About split

The "Person vs Guide" split is currently typography-only on a flat color block. It reads as informational, not personal. Adding two hand-drawn illustrations — one for each side of Dennis — gives the section a face, a story, and the same crafted/editorial feel the rest of the site has.

## The two illustrations

Both rendered as transparent PNGs in the same hand-drawn ink-line + light watercolor wash style as the existing `dennis_illustration.png` portrait, so they read as a family with the header logo. Loose, confident lines. No corporate gloss.

**1. Dennis the Person** — `src/assets/dennis-person.png`
- Casual Amsterdammer, off duty.
- Standing or leaning relaxed, hands in pockets or holding a coffee, soft smile.
- Wearing everyday clothes (sweater, jeans), maybe a bike just visible behind him as a hint of the canals.
- Palette accent: a touch of heritage purple or taupe in the wash.

**2. Dennis the Guide** — `src/assets/dennis-guide.png`
- Same Dennis, same face, in "guiding" mode.
- Mid-gesture, walking pose, turning slightly to talk to someone off-frame. One hand pointing or open in explanation.
- Light jacket, small notebook or map peeking from a pocket.
- Palette accent: a touch of heritage orange/bordeaux in the wash so it sits well on the dark green/primary panel.

Both at roughly 3:4 portrait ratio, full-figure (not head-only), transparent background, drawn so they "stand" on the panel without a baseline shadow.

## Layout changes

File: `src/pages/Index.tsx`, the `#about` split (lines 162–206).

Each panel becomes a two-column micro-layout on desktop, single-column on mobile:

```text
┌──────────────────────────┬──────────────────────────┐
│  [illustration]   text   │  text   [illustration]   │
│   The Person             │            The Guide     │
└──────────────────────────┴──────────────────────────┘
```

- Left panel (Person, light bg): illustration on the left, text on the right.
- Right panel (Guide, dark primary bg): text on the left, illustration on the right.
- This makes the two Dennises face each other across the seam, which gives the section a quiet narrative ("same person, two roles").
- Mobile: illustration sits above the text in each panel.
- Illustration sizing: roughly `max-w-[260px] lg:max-w-[300px]`, with a very subtle hand-drawn "ground line" SVG underneath (single wobbly pencil stroke) instead of a hard shadow.
- Subtle entrance: keep the existing `FadeIn`. No floating, no bobbing animations (per the subtle-fade-in-only rule).

No copy changes. Existing CMS fields (`about.person.*` / `about.guide.*`) stay as-is.

## Out of scope

- No new CMS fields for the illustration paths; they're imported assets.
- No changes to the hero portrait or header logo.
- No animation beyond the existing FadeIn.
- No copy edits.

## Technical notes

- Generate both PNGs via `imagegen--generate_image` with `transparent_background: true`, `premium` quality (the existing portrait is the visual anchor for the brand, so quality matters), and prompts that explicitly reference: hand-drawn ink line, soft watercolor wash, off-white paper feel, full-figure standing/walking, no background, in the spirit of `dennis_illustration.png`.
- Save to `src/assets/dennis-person.png` and `src/assets/dennis-guide.png`, import as ES6 modules in `Index.tsx`.
- Use Tailwind's `grid grid-cols-1 md:grid-cols-[auto_1fr]` (left panel) and `md:grid-cols-[1fr_auto]` (right panel) with `gap-8 lg:gap-10` to keep alignment clean.
- Add `loading="lazy"` and explicit `width` / `height` on the `<img>` tags to avoid layout shift.
