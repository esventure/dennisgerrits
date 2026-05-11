## Goal

Bring back the polaroid grid the user liked (12 themes on Get Inspired, 4 preview on Home) with tape strips, rotation, title + click-to-reveal short description. Then layer in details that make the wall feel alive — like Dennis pinned these up himself this morning — so the visitor's first reaction is "wow, he really cares about all of this."

## What we're keeping (from the previous version)

- Polaroid card frame: white photo with a thin border and soft shadow.
- Slight per-card rotation (-2.4° to +2.2°), tape strips at top corners or "gaffer" tape on the sides — exactly the four pin variants we had (`tape-tl`, `tape-tr`, `tape-gl`, `tape-gr`).
- Title visible by default under the photo. Short description (2–3 lines) and the Caveat hand-written note hidden behind a click/tap on the card.
- Same 12 themes on `/get-inspired`, same 4-card preview on the homepage with "See all building blocks" link.

## What we're changing to make it more alive

1. **A real wall, not a flat grid.**
   - Cork-board / off-white paper background with very subtle grain (already have the dotted/noise overlay).
   - Cards sit on the wall at slightly varied vertical offsets (every 2nd or 3rd card nudged 12–24 px up or down) so the row reads as "pinned by hand", not as a CSS grid.
   - Two or three cards get a second piece of tape at the bottom corner instead of the top, for variation.

2. **Dennis's handwriting all over it.**
   - One Caveat margin annotation floating between cards every few rows (e.g. "↳ this one is my favourite", "ask me first", "we'll need a boat"), rotated, in heritage green or bordeaux. These live in the gutter, not on the cards, so they read as scribbles on the wall.
   - A short Caveat eyebrow above the grid: "things I keep coming back to" — already in the current copy palette.

3. **Tactile detail on the polaroids themselves.**
   - Each polaroid gets a faint hand-written caption on the white margin (just the title, in Caveat, low contrast) in addition to the printed Bebas title below — like Dennis labelled the photo before pinning it.
   - On hover (desktop): card lifts ~6 px, rotation eases to 0°, shadow deepens. On tap (mobile): same lift, then the description and note fade in beneath.
   - Click anywhere on the card to expand the description+note inline (current behaviour). Click again to collapse. One open at a time.

4. **A few "objects" between the cards.**
   - Sparse decorative elements pinned to the wall between polaroids: a small stamp (orange "AMS"), a torn ticket stub, a paper-clipped index card with a Caveat line, a tiny pressed leaf SVG. Three to five of these total across the 12-card grid, never overlapping a card. Pure SVG/CSS, no new image assets.
   - These give the wall texture and signal "this person actually collects things", without competing with the photos.

5. **Subtle motion (not animation everywhere).**
   - On mount, cards fade/slide in with a 40–80 ms stagger (existing `FadeIn`).
   - Once visible, two or three random cards do a one-time 1° "settle" wobble, like tape relaxing. No looping animation.

6. **Homepage preview matches the wall vibe.**
   - 4 polaroids in the same style, same wall background, one Caveat scribble in the gutter, one decorative object. Hover/click behaviour identical. CTA stays "See all building blocks →".

## What we're not doing

- No editorial photo-essay rows (the version the user just rejected).
- No new colour tokens; we keep the heritage palette.
- No new image assets; we reuse the 12 interest images and the 4 peek images already imported.
- No copy rewrite in this pass — we keep the current titles, descriptions and notes. Copy is a separate task.
- No changes to the StoryBook section, the Day Map, or anything else on either page.

## Layout sketch (Get Inspired grid)

```text
   ┌──┐ tape         ┌──┐         ┌──┐ tape    "↳ ask me   ┌──┐
   │01│              │02│         │03│          first"     │04│
   └──┘   ┌──┐       └──┘ ┌──┐    └──┘   ┌──┐              └──┘
          │05│            │06│           │07│  [ticket]         ┌──┐
          └──┘            └──┘           └──┘                   │08│
   ┌──┐         ┌──┐ tape         ┌──┐         ┌──┐ tape        └──┘
   │09│ [stamp] │10│              │11│         │12│
   └──┘         └──┘              └──┘         └──┘
```

Three columns on tablet, four on desktop, one on phone. Vertical jitter only on `md+`.

## Files touched

- `src/pages/GetInspired.tsx` — replace the editorial rows with the polaroid grid (restored from the prior version) plus the wall background, gutter scribbles, and decorative SVG objects.
- `src/pages/Index.tsx` — replace the current 4-card preview with the matching polaroid preview wall (one scribble, one object).
- No new files, no new dependencies, no new assets.

## Done when

- The 12-theme polaroid wall is back on Get Inspired with click-to-expand description+note, varied tape, vertical jitter, 3–5 wall objects, and 2–3 gutter scribbles.
- The homepage preview shows 4 matching polaroids with the same behaviour and the existing CTA.
- The page feels like a wall in Dennis's office, not a product grid.
