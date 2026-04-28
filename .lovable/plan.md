## Make the Day Map feel like a hand-drawn treasure map

Right now the map reads as a clean infographic: crisp lines, geometric markers, and small Outfit labels. Let's push it firmly into hand-drawn cartographer territory so it feels personal and storybook-like, matching the rest of the site's editorial vibe.

### What changes (visual layer only — no behavior changes)

**1. Parchment background**
Add a soft taupe radial-gradient panel behind the SVG with a dashed border, so the map sits on "paper" instead of floating on the page background.

**2. Hand-drawn jitter on every line**
Apply an SVG `feTurbulence` + `feDisplacementMap` filter (`#rough`) to canals, landmarks, route, and marker rings. This gives every stroke a subtle wobble — the single biggest "drawn by hand" cue.

**3. Cartographer's grid**
Faint dashed graticule lines (every 100 units) behind the content, like an old chart.

**4. Compass rose**
Small compass in the top-right with N/S/E/W in a handwritten font (Caveat) and an orange needle pointing north.

**5. Wobblier route**
Replace the smooth Bézier route segments with curvier `q ... t ...` paths and add a soft, wider under-stroke for an ink-bleed effect underneath the dashed line.

**6. Handwritten labels**
Switch the active stop label from Outfit 11px to Caveat (cursive) 16px. Add an "Amsterdam" label tilted -4° in the upper-left and a "~ to the harbour ~" note in the lower-right.

**7. More sketchy landmarks**
Convert filled landmark silhouettes to outlined strokes (more drawing-like). Add: a tulip cluster, a small lantern, an anchor near the waterfront, and convert the windmill to outlined sails.

**8. Marker badges feel stamped**
Add a dashed outer ring around each checkpoint marker so they look like circled spots on a map, not UI buttons.

**9. "X marks the spot"**
When the user reaches the final stop, a small bordeaux X fades in next to the last marker.

### What stays exactly the same
- 5 stops, same positions/icons/labels
- Scroll-driven progression, dot navigation, prev/next arrows
- Right-side story card and its animation
- Layout grid, aspect ratio, responsive behavior
- Heritage palette colors (just used in more places)

### Files
- `src/components/DayMap.tsx` — full rewrite of the SVG layer; the React component shell, props, state, and scroll logic are unchanged.

No new dependencies. Caveat font is already loaded site-wide for the signature; if not, I'll fall back to `'Brush Script MT', cursive` automatically via the font stack.

### Performance
The two `feTurbulence` filters are lightweight (one-time bake) and applied to grouped paths, not per-element. No animation hits the filter, so no runtime cost.
