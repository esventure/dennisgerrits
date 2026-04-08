

# Updated Color Palette + Visual Texture Between Sections

## 1. New Color Palette

Mapping the uploaded colors to CSS variables:

| Color | Hex | Role | Replaces |
|-------|-----|------|----------|
| #2D0036 | Deep purple | `--primary` | Current purple (same family, stays) |
| #7B1828 | Bordeaux | `--secondary` | Current bordeaux (very close, stays) |
| #1B4332 | Forest green | `--heritage-green` | Current green (richer, darker) |
| #E65100 | Burnt orange | `--accent` | Current gold (warmer, bolder) |
| #BCAAA4 | Warm taupe | `--muted` | Current muted (warmer tone) |
| #FAFAFA | Off-white | `--background` | Current cream (slightly cooler) |

## 2. Section Texture — Breaking the Cream Monotony

Current problem: Hero, Blockquote, Reviews, Stories, Contact all sit on the same cream. Only the About split and the "More" section break out.

Proposed section backgrounds:

```text
Hero            → cream (default)
Blockquote      → warm taupe bg (#BCAAA4 at ~15% opacity)
About split     → purple / cream (keep as-is)
Day in the Life → soft green tint (#1B4332 at ~8% opacity)
Reviews         → cream (default)
More            → deep purple (keep as-is)
Stories         → warm taupe bg (same as blockquote, creates rhythm)
Contact/FAQ     → cream (default)
```

This creates an alternating warm/neutral rhythm without any drastic changes. The green and taupe tints are very subtle — just enough to signal "new section" as you scroll.

## File Changes

1. **`src/index.css`** — Update CSS custom property values to match the new hex palette
2. **`tailwind.config.ts`** — Add `heritage.orange` color, rename `heritage.gold` to `heritage.orange`
3. **`src/pages/Index.tsx`** — Update background classes on Blockquote, Day in the Life, and Stories sections to use tinted backgrounds via inline styles or new utility classes

