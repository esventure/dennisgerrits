

# Skyline: Lower Opacity + Gradient Fade

## Changes to `src/components/AmsterdamSkyline.tsx`

1. **Reduce opacity** from `0.12` to `0.06`
2. **Add a CSS mask** using a radial or linear gradient that fades the skyline to transparent at the top and sides, so only the center-bottom portion is gently visible
   - `mask-image: linear-gradient(to bottom, transparent 0%, black 40%, black 80%, transparent 100%)` combined with a horizontal fade
   - This creates soft feathered edges that blend into the cream background

No other files change.

