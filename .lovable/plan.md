# Hand-drawn route for "How I Work"

Borrow the visual language from `DayMap.tsx` — sketchy circles with wobble filter, Bebas Neue numbers in heritage-orange, pencil under-drawing with ink stroke on top, hand-drawn squiggle routes — and apply it to the four steps in How I Work. No actual map, just the same hand-drawn route feeling as a quiet backdrop tying the numbers together.

## What changes

Only the four numbered step markers and the line between them, in `src/pages/Index.tsx` (How I Work section, ~lines 211–267). Heading, intro, body copy, and the concierge block below stay untouched.

## The new treatment

**Step markers** — replace each oversized orange numeral with a small sketchy circle marker (same look as the map's checkpoints):
- Wobbly hand-drawn circle outline using a `feTurbulence` + `feDisplacementMap` filter (the `#sketch` filter pattern from DayMap)
- Filled with heritage-orange
- Number "01"–"04" centered inside in Bebas Neue, cream/off-white text
- A faint taupe pencil shadow offset behind the circle
- A subtle dashed "compass" ring around each marker on hover (also from DayMap)

**Connecting route** — replace the dashed straight line between numerals with a single hand-drawn sketchy curve threading through all four markers:
- One continuous Bézier path with gentle ups and downs (not a straight rule)
- Pencil under-drawing in heritage-taupe, slightly offset
- Heritage-orange ink wobble on top via the `#sketch` filter
- A small hand-drawn "X marks the spot" / tiny flag at the end of step 04 (echoing the map's destination marker)
- On mobile (single column), the curve becomes a vertical sketchy line down the left side connecting the markers

**Headline + body** — unchanged structure, but drop the small straight squiggle SVG that currently sits under each headline (the route below the markers replaces that motif).

## Technical details

- Reuse the same SVG `<defs><filter id="sketch">` pattern from `DayMap.tsx` (feTurbulence baseFrequency ~0.04, feDisplacementMap scale ~2.6) — define it once inside a single full-width SVG layered behind the four step columns
- The full-width SVG sits absolutely positioned at the top of the steps grid (around marker height), `pointer-events: none`, so the existing grid markup for labels and copy stays the same
- Marker coordinates computed from the column count (4 evenly spaced points across the SVG viewBox)
- Use existing CSS tokens only: `hsl(var(--heritage-orange))`, `hsl(var(--heritage-taupe))`, `hsl(var(--heritage-bordeaux))`, `hsl(var(--background))`
- Wrap the SVG in `FadeIn` so the route fades in on scroll (consistent with the rest of the site's motion rules)
- Mobile: hide the horizontal route SVG below `md`, render a thin vertical sketchy line + smaller markers stacked vertically

## Out of scope

- Section heading, intro copy, step labels, step body text
- The concierge "What I take care of" block below
- Section background color
- No new images or icons

Once you approve, I'll switch to build mode and implement it in `src/pages/Index.tsx`.
