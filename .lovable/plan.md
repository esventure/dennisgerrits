## Goal
Add a confident taupe rhythm (#BCAAA4) to the homepage backgrounds and frame the Booking section in a panel, while keeping the editorial, calm feel.

## Color tokens (src/index.css)
Retune and add:
- `--heritage-taupe: 15 15% 69%` (≈ #BCAAA4 — already very close, exact match)
- `--heritage-taupe-tint: 15 15% 88%` (light wash for section backgrounds, ~confident strength)
- `--heritage-taupe-soft: 15 15% 82%` (slightly stronger, used for the contact panel border/inner fill)

## Section background rhythm (src/pages/Index.tsx)

```text
hero          → off-white (unchanged)
about         → off-white (unchanged)
how-i-work    → taupe-tint  (was 10% taupe → bump to confident tint)
day map       → off-white (revert green tint — skyline reads better on light)
my-service    → taupe-tint
proof         → off-white
podcast       → taupe-tint  (was green tint)
stories       → off-white   (was taupe — flip to keep alternation)
contact       → off-white   (panel inside, see below)
```

Result: clear off-white ↔ taupe-tint alternation top to bottom. No two adjacent tinted sections.

## Booking / Contact panel
Wrap the contents of `#contact` in a centered rounded card:
- Background: `heritage-taupe-soft`
- Border: 1px solid `heritage-taupe`
- Subtle shadow (`shadow-lg` with low opacity)
- Generous padding (px 8/12, py 16/20)
- Max width ~3xl, centered, with breathing room on all sides
- Section background stays off-white so the panel reads as a framed moment

## Out of scope
- No changes to typography, copy, animations, or layout structure.
- No new framed panels elsewhere (per your choice).
- Get Inspired and other standalone pages untouched for now (can add same rhythm later if you like).

## Files touched
- `src/index.css` — taupe token retune + 2 new tint tokens
- `src/pages/Index.tsx` — section bg classes + contact panel wrapper
