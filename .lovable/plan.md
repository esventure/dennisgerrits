

# Make the Day Map Feel Like an Adventure

## Problem
The current map is functional but feels clinical — plain circles with numbers, thin dashed lines, and a formal card layout. It reads like a corporate infographic rather than an adventure you'd go on with a friend.

## Changes

### 1. Playful checkpoint markers (DayMap.tsx)
- Replace plain numbered circles with **small illustrated icons** per stop: a coffee cup (☕), footprints (👣), a fork/knife (🍴), a leaf/flower (🌿), a cocktail glass (🍷) — rendered as emoji text inside the SVG or as simple hand-drawn SVG shapes
- Make markers slightly larger (r=20) with a warm drop shadow
- Add a fun **bounce animation** when a checkpoint becomes active (scale up then settle)

### 2. Warmer, sketchier route lines (DayMap.tsx)
- Increase stroke width from 3 to 4-5
- Use a more irregular dash pattern (`12 4 4 4`) to feel hand-drawn
- Add a subtle **walking footsteps** pattern along revealed paths (small dots offset from the path)

### 3. More decorative map elements (DayMap.tsx)
- Add more whimsical SVG decorations: a tiny bicycle near one stop, a boat on the canal, birds in the sky, a windmill silhouette
- Increase landmark opacity from 0.1-0.12 to 0.18-0.22 so the map feels more alive
- Add small wavy lines near canals to suggest water

### 4. Story card with more personality (DayMap.tsx)
- Add a warm background tint to the card (cream/orange 5% tint instead of pure white)
- Round the corners more (`rounded-lg` instead of `rounded-sm`)
- Add a small colored accent bar on the left side of the card
- Use slightly larger, friendlier typography for the title

### 5. Fun section header (Index.tsx)
- Change subtitle from "A Day Together" to something warmer like "Let's Explore" or "Your Adventure"
- Consider adding a small compass or map pin icon next to the heading

## Technical Details
- All changes in `src/components/DayMap.tsx` (icons, paths, decorations, card styling)
- Minor copy/style tweaks in `src/pages/Index.tsx` (section header)
- No new dependencies — all SVG-based illustrations
- Emoji icons render cross-browser in SVG `<text>` elements

## File Changes
1. **`src/components/DayMap.tsx`** — Playful icons for stops, sketchier paths, more decorations, warmer card styling, bounce animation on active marker
2. **`src/pages/Index.tsx`** — Update section subtitle for a more adventurous tone

