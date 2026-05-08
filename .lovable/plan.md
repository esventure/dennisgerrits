## Goal

Make the Amsterdam map feel like a hand-sketched journal page rather than a rich AI illustration. Looser line work, only two heritage tones, and visually integrated with the surrounding off-white section.

## Changes

### 1. Regenerate the map illustration

Replace `src/assets/amsterdam-map.jpg` with a new image generated in **premium** quality at 1536×1024:

- Style: loose, hand-drawn ink sketch on off-white paper. Think travel journal, not tourist map.
- Palette strictly duotone: heritage taupe (#C9B8B0) for the base linework, heritage bordeaux (#7A1F33) for accents (a few key labels, the IJ water hatching, Centraal). No oranges, no greens, no blues.
- Content: simplified canal horseshoe (4 nested arcs), IJ band at top with light hatching, Amstel meander, tiny Centraal rectangle, small Vondelpark blob, 4-5 sketchy radial streets. Sparse hand-lettered labels: IJ, CENTRAAL, AMSTEL, JORDAAN, VONDELPARK.
- No photorealism, no watercolor wash, no shading, no compass rose, no decorative borders. Just confident loose pen lines with occasional wobble.
- Off-white background matching `--background` so it bleeds into the page.
- Save as `src/assets/amsterdam-map.jpg` (overwrite).

### 2. Integrate the map into the page (`src/components/DayMap.tsx`)

- Remove the `shadow-[0_18px_40px_...]` and `rounded-sm` framing on the `<img>` so it has no card edges.
- Apply `mix-blend-multiply` and `opacity-80` so the paper texture of the page shows through and the lines feel printed onto the section.
- Keep the existing route, numbered checkpoints, floating icons, and "start here" note unchanged: those are the colored layer that pops on top of the now-quiet base map.
- Verify route + stop coordinates still land sensibly on the new simpler geometry; nudge if needed (Jordaan west of rings, Canal Walk on Prinsengracht arc, Local Lunch in Centrum, Hidden Garden east, Waterfront Bar on the IJ).

## Out of scope

- No layout changes around the map.
- No copy changes.
- No changes to StoryBook or other components.

## Acceptance

- The map reads as a loose hand-drawn sketch in two heritage tones.
- It visually melts into the off-white section instead of looking like a pasted-in hero image.
- Route, numbered stops, and active-stop icons remain the most colorful elements and clearly guide the eye.
