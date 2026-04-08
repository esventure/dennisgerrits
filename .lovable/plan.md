

# Interactive Amsterdam Route Map — "A Day in the Life"

## Concept
Replace the vertical timeline with an illustrated treasure-map-style experience. A stylized map of Amsterdam sits center stage. Five numbered checkpoint markers are placed on it. Clicking a checkpoint "reveals" that leg of the route (a dotted path animates between stops) and opens the story card for that moment. The route progressively fills in as users click through, like unrolling a treasure map.

## Layout

```text
┌─────────────────────────────────────────────────┐
│  A Day Together                                 │
│  A DAY IN THE LIFE OF DENNIS                    │
│  "No fixed tours..." intro text                 │
│                                                 │
│  ┌──────────────────────┬──────────────────────┐ │
│  │                      │                      │ │
│  │   [Stylized Map]     │  ┌────────────────┐  │ │
│  │    ①───②             │  │ MORNING        │  │ │
│  │        │             │  │ A Quiet Start  │  │ │
│  │        ③──④          │  │ We meet at...  │  │ │
│  │            │         │  └────────────────┘  │ │
│  │            ⑤         │                      │ │
│  │                      │  [prev] ● ● ● [next]│ │
│  └──────────────────────┴──────────────────────┘ │
│                                                 │
│  Mobile: map on top, card below (stacked)       │
└─────────────────────────────────────────────────┘
```

## Interaction
- All 5 checkpoint markers visible from the start (numbered circles in the accent orange)
- The **active** checkpoint pulses gently; visited ones are filled; unvisited are outlined/dimmed
- Clicking a checkpoint (or using prev/next arrows) selects it:
  - A dotted SVG path animates from the previous checkpoint to this one (stroke-dashoffset animation)
  - The story card on the right cross-fades to show that moment's content
- Progress dots below the card show which stop you're on
- On mobile: map sits above, card below; checkpoints are tap targets

## Map Approach
- **SVG illustration** — a simplified, hand-drawn-style canal map of Amsterdam (canals as curves, a few landmark silhouettes). Not a real map; stylized and warm, matching the brand
- Checkpoint positions placed at meaningful spots (Jordaan café, canal walk, local lunch spot, Vondelpark area, waterfront bar)
- The SVG lives in a new component; paths between stops use `stroke-dasharray` + `stroke-dashoffset` CSS transitions for the "drawing" reveal effect
- Color: canals in heritage taupe, paths in accent orange, landmarks in primary purple outlines

## Technical Details
- New component: `src/components/DayMap.tsx` — contains the SVG map, checkpoint markers, path animation logic, and the story card
- State: `activeStop` (0-4), `visitedStops` set. Clicking a marker sets active and adds to visited
- SVG paths: each segment has a `<path>` with `stroke-dasharray` equal to path length, `stroke-dashoffset` transitions from full length to 0 when revealed
- Story card: simple crossfade transition using opacity + translate
- `src/pages/Index.tsx` — replace the current timeline `div` (lines 253-271) with `<DayMap moments={moments} />`

## File Changes
1. **`src/components/DayMap.tsx`** — New component with SVG map, interactive checkpoints, animated route paths, and story card panel
2. **`src/pages/Index.tsx`** — Replace timeline markup with `<DayMap moments={moments} />`

