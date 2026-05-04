## Goal

Make the "A day in the life of" map feel like a page torn from Dennis's sketchbook — same family as the green hand-drawn service icons and the orange Amsterdam skyline line-art — instead of the current clean vector look.

## What changes (all in `src/components/DayMap.tsx`)

### 1. Paper feel
- Swap the flat `paper` gradient for a warmer, slightly mottled off-white using two layered `<rect>`s with low-opacity taupe + a faint `<filter>` (`feTurbulence` + `feColorMatrix`) to give a subtle paper grain.
- Add a thin, slightly wobbly hand-drawn border just inside the canvas (single rough `<path>`, not a perfect rect) in heritage-taupe.
- Optional torn/folded corner mark in the top-right (small triangular crease line).

### 2. Hand-drawn route
- Replace the clean Bézier `pathSegments` with the same sketch treatment we use elsewhere: each segment rendered **twice**:
  - A soft underdrawn pencil line (taupe, opacity ~0.25, slightly offset by 1–2px).
  - The main orange ink line on top, with `stroke-linecap="round"`, `stroke-linejoin="round"`, and a SVG `<filter>` using `feTurbulence` + `feDisplacementMap` (scale ~1.2) to give it a wobble.
- Keep the existing scroll-driven `strokeDashoffset` reveal — the filter doesn't interfere.
- Add tiny dash ticks along the route (3–4 short perpendicular marks per segment) the way travel journals mark distance.

### 3. Sketchy checkpoints
- Replace the perfect `<circle>` markers with a hand-drawn look:
  - Two concentric rough circles (slightly irregular `<path>` arcs, not `<circle>`) for each stop, drawn with the wobble filter.
  - Numbers stay in Bebas Neue, but inactive stops use an outline-only sketch (no fill), and active/visited stops fill with heritage-orange.
  - Active pulse ring becomes a hand-sketched dashed circle that slowly rotates instead of expanding (feels more like a journal annotation).
- Active stop label gets a small hand-drawn underline swoosh beneath it.

### 4. Map ornaments in the same icon family
- **Compass**: redraw as a sketchy compass rose — rough outer circle, four wobbly cardinal spokes, hand-lettered N. Same orange/purple palette, same wobble filter.
- **Canal-house silhouettes**: thicken slightly, give them the wobble filter, and scatter 2–3 more in a second cluster near the bottom so they read as little doodled landmarks rather than one stiff row.
- **Canals**: redraw as 2 (not 3) loose, hand-drawn squiggles in taupe with the wobble filter — less geometric, more "ink on paper."
- **Final destination cross**: keep the X but render it as two short rough strokes instead of perfect lines, and add a tiny hand-drawn "X marks the spot" circle around it.

### 5. Typography touches
- "AMSTERDAM" and "TO THE HARBOUR" labels: keep Bebas Neue but add a thin hand-drawn underline beneath each (single wobbly `<path>`), as if annotated by hand.
- Add one small handwritten-style note on the map (e.g. "↑ start here" near stop 01) using a lighter weight and the orange accent, to reinforce the journal vibe. Outfit italic at small size works without adding a new font.

### 6. Right-side story card — minor matching tweaks
- Replace the solid `border-l-2 border-l-accent` with a hand-drawn vertical squiggle SVG in the same orange (matches the route ink).
- Dot-nav under the controls: active dot becomes a small hand-drawn ring instead of a filled circle, to echo the checkpoint style.

## Technical notes

- All "wobble" comes from a single reusable SVG `<filter id="sketch">` with `feTurbulence baseFrequency="0.02" numOctaves="2"` + `feDisplacementMap scale="1.2"`. Applied via `filter="url(#sketch)"` on the relevant groups. Cheap, no extra deps.
- No new packages, no new fonts. Pure SVG + existing Tailwind tokens (`heritage-orange`, `heritage-taupe`, `heritage-bordeaux`, `primary`).
- Scroll/keyboard/click interaction logic, `moments` data, and the `DayMapProps` API all stay identical — this is a visual-only refactor of the SVG layer.
- `prefers-reduced-motion`: disable the rotating active ring and any subtle idle animations, keep the static sketch styling.

## Out of scope

- No copy changes to the moment cards.
- No layout changes to the surrounding section in `Index.tsx`.
- No new assets — everything stays inline SVG so it scales and recolors cleanly.
