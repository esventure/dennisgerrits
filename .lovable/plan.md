## Goal

Replace the abstract sketch in `src/components/DayMap.tsx` with a clearly recognizable hand-drawn Amsterdam map. Keep the existing hand-drawn icons (shoes, boat, food, nature, dining) above each active stop — those work well — and the existing scroll-driven progression and right-side story card untouched.

## What changes (only `src/components/DayMap.tsx`)

### 1. Geography people will actually recognize

Draw the iconic Amsterdam shapes inside the 600×500 viewBox:

- **The IJ waterfront** as a wide curved band across the top (~y=60–95), tinted heritage-taupe at very low opacity to read as water.
- **Centraal Station** as a small labeled rectangle on the IJ, top-center.
- **Four concentric canal rings** (Singel, Herengracht, Keizersgracht, Prinsengracht) drawn as nested half-moon arcs anchored to the IJ, the signature horseshoe shape that makes Amsterdam instantly readable. Wobbly stroke via the existing `sketch` filter, taupe ink, varied opacities so the inner rings recede.
- **Radial spoke streets** (3–4 thin lines) running from Centraal outward through the rings.
- **Amstel river** as a meandering line cutting south-east from the rings down to the bottom edge.
- **Vondelpark** as a small sketched green blob with a tiny "VONDELPARK" label, bottom-left of the rings.
- Tiny labels in Bebas Neue at low opacity on key features: `IJ`, `CENTRAAL`, `AMSTEL`, `JORDAAN`, `VONDELPARK`. Replace the current `AMSTERDAM` mega-label and `TO THE HARBOUR` strip with these in-context labels.
- Keep the wobbly paper border, folded corner, paper grain, and compass — they reinforce the sketchbook feel.
- Drop the generic top/bottom canal-house silhouette clusters; the canal rings now do the work.

### 2. Stops repositioned along the canal belt

Stops follow a west → east → north arc that traces a believable day:

```text
01 Jordaan Café       (west of rings)        ~ (95, 245)
02 Canal Walk         (Prinsengracht ring)   ~ (200, 200)
03 Local Lunch        (Centrum)              ~ (320, 230)
04 Hidden Garden      (Plantage)             ~ (430, 285)
05 Waterfront Bar     (IJ / NDSM side)       ~ (515, 160)
```

Route segments redrawn as smooth Béziers that hug the canal arc and then cut up to the waterfront. `PATH_LEN` updated to roughly match the new segment lengths.

### 3. Keep what already works

- Hand-drawn icons (shoes/boat/food/nature/dining) floating above the active stop — unchanged.
- Numbered checkpoint pucks with sketch wobble — unchanged.
- Compass, "start here" handwritten note (re-anchored to new stop 01).
- "X marks the spot" near the final stop — unchanged.
- Scroll-driven progression, prev/next buttons, dots, story card — untouched.

## Out of scope

- No new dependencies, no real map tiles. The map stays a stylized sketch — just a recognizable Amsterdam one.
- No copy changes in `Index.tsx`.
- No layout/spacing changes outside `DayMap.tsx`.

## Acceptance

- The map reads as Amsterdam at a glance (canal horseshoe + IJ + Centraal label).
- The 5 stops sit on the canal belt and form a coherent west-to-east-to-IJ route.
- Existing icon style above active stops is preserved.
- No regressions in the scroll progression or the right-hand story card.
