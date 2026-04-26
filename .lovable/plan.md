# Infinite Mosaic Wall — "A Day With Dennis"

## Goal
A new homepage section that *feels* like the abundance of happy guests Dennis has hosted, without ever zooming in on a face. Constant gentle motion, ~50 small thumbnails in full color, edge vignette to keep the eye on the whole, not the parts.

## Where it goes
Insert as a new section **between "Real Words From Real People" (reviews) and the next section** on `src/pages/Index.tsx`. Reviews tell us *what* guests felt; this wall shows us *how many*.

Section heading: **"Faces of the Road"** (kept short, editorial). Subhead: a single line like *"Five years. Hundreds of mornings. Real people, real moments."*

## The mechanic
- **A grid of ~50 photo tiles** (10 cols × 5 rows on desktop, denser packing on mobile via responsive cols).
- The entire grid is wrapped in a container that **slowly drifts diagonally** (translateX + translateY) on a continuous loop using a single CSS keyframe animation. Drift is gentle — roughly 60-90 seconds per full cycle — so it reads as ambient motion, not a slideshow.
- The grid is built **larger than the viewport** (e.g., 140% width, 140% height) so the drift never reveals an edge.
- **Soft radial vignette** overlay (cream/off-white fading from transparent center to opaque edges) keeps focus on the middle mass of the grid and softly fades photos at the perimeter.
- **No hover-zoom on individual tiles.** Hover (or no hover) — tiles stay the same size. Optional: hovering the whole section *slows* the drift slightly (animation-play-state or duration shift) for a subtle "lean in" feel without revealing any one photo.
- **Tile size**: ~110-140px square on desktop, ~80-100px on mobile. Small enough that faces read as silhouettes, large enough to feel real.
- **Tile treatment**: full color, slight rounded corners (4px), tiny gap between tiles (4-6px) so the grid reads as a mosaic, not a single image.
- **Reduced motion**: respect `prefers-reduced-motion` — fall back to a static grid with the vignette.

## Placeholder photos (until Dennis sends his)
Since he'll provide real photos later, I'll use **50 royalty-free travel/lifestyle stock photos** (Unsplash) covering: walking groups, café scenes, canal views, hands holding coffee, market moments, smiling backs of heads, two friends laughing, etc. Curated to feel like "a day in Amsterdam with a guide" without using identifiable faces. They live in `src/assets/guests/` so swapping is a one-folder replacement later.

I'll add a brief code comment at the top of the photo array: `// Placeholder stock photos. Replace with Dennis's 50 guest photos in src/assets/guests/`

## Implementation details

### New file: `src/components/MosaicWall.tsx`
- Accepts a `photos: string[]` prop (array of imported image paths).
- Renders a fixed-aspect outer frame (e.g., `aspect-[16/9]` or fixed `h-[520px]` desktop / `h-[420px]` mobile) with `overflow-hidden` and the vignette overlay.
- Inside: a single drifting `<div>` containing a CSS grid of all 50 tiles, sized to ~140% of the frame.
- Animation defined inline via Tailwind `style` + a small `<style>` block with `@keyframes drift`. Loop is seamless (start position = end position in a way that's imperceptible — drift returns to origin smoothly over 75s with `ease-in-out`).
- Vignette is a sibling absolutely-positioned div with `background: radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 95%)`.
- `prefers-reduced-motion` media query disables the keyframe animation.

### `src/pages/Index.tsx`
- Import `MosaicWall` and the 50 placeholder images.
- Add new `<section id="guests">` with the heading + subhead + the `MosaicWall` component, wrapped in `FadeIn`.
- Section background: alternating tint per the existing visual rhythm (probably the cream/off-white so the vignette blends).

### `src/assets/guests/`
- 50 small JPGs (~150-200KB each, ~600px wide source so retina-crisp at 140px display). Total payload roughly 7-10 MB — acceptable for a hero-feel section, and lazy-loaded via `loading="lazy"` on each `<img>` since they're below the fold.

## Edge cases & polish
- **Performance**: 50 small images with `loading="lazy"` + `decoding="async"`. The drift uses `transform` only (GPU-accelerated). No layout thrash.
- **Tablet (iPad, primary audience)**: tested at the 1050px viewport — grid stays ~8 cols, tile size scales down, drift still reads.
- **Mobile**: 6 cols, smaller tiles, shorter section height. Drift speed unchanged.
- **Privacy guard**: confirmed — no hover state enlarges any tile, no lightbox, no click target on tiles.

## Files changed
1. **`src/components/MosaicWall.tsx`** (new) — the drifting mosaic component
2. **`src/pages/Index.tsx`** — add the new section
3. **`src/assets/guests/`** (new folder) — 50 placeholder JPGs + an `index.ts` barrel that exports the array

## Future swap
When Dennis sends his 50 photos, I just drop them into `src/assets/guests/` (same filenames or update the barrel) and the section is real. No code logic changes.
