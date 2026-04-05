

# Amsterdam Skyline — Scroll-Reveal Background Effect

## Concept
The skyline image becomes a fixed background layer behind the entire homepage. As the user scrolls down, the skyline is progressively revealed from left to right (or top to bottom), as if the act of scrolling "uncovers" the illustration. The skyline stays in place while content scrolls over it.

## How it works
- The skyline image is placed as a **fixed-position background** spanning the full viewport width, anchored to the bottom of the screen
- A **CSS clip-path or mask** is driven by scroll position via a small `useEffect` + `scroll` listener
- As `scrollY` increases, the visible portion of the skyline grows — e.g., `clip-path: inset(0 Xpx 0 0)` where X shrinks as you scroll, revealing more from left to right
- At the bottom of the page, the full skyline is visible

## Visual result
- Top of page: skyline is mostly hidden (only a sliver visible on the left)
- Mid-scroll: half the skyline revealed
- Bottom of page: full skyline visible
- Content sections sit on top with their cream backgrounds, but the skyline peeks through in gaps/margins between sections

## What I need from you
Nothing extra — the uploaded skyline image is sufficient. I have everything needed to build this.

## Files to change
1. **`src/components/AmsterdamSkyline.tsx`** — Convert from inline image to a fixed-position scroll-driven reveal layer using `clip-path` animated by scroll progress
2. **`src/pages/Index.tsx`** — Move the skyline component outside the section flow (render it once at the top level as a background layer, not between sections)

## Technical details
- `position: fixed; bottom: 0; left: 0; width: 100%; z-index: 0` for the skyline container
- Scroll listener calculates progress as `scrollY / (documentHeight - viewportHeight)`
- `clip-path: inset(0 ${(1 - progress) * 100}% 0 0)` reveals left-to-right
- Content sections get `position: relative; z-index: 1` with semi-transparent or solid cream backgrounds so the skyline peeks through at transitions
- Lightweight: single scroll listener with `requestAnimationFrame` throttling

