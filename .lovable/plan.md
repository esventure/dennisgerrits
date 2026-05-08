## Goal

Replace the two watercolor Dennis illustrations on the "Person / Guide" split section with **pure line-art** versions — same poses, recognizable as Dennis (glasses, beard, hair shape), but stripped down to thin ink lines on transparent backgrounds. This unifies them with the existing hand-drawn header logo and the orange Amsterdam skyline line-art running through the page.

## Why

The current watercolor portraits read almost photo-real and pull a lot of attention. Switching to line-art makes them feel like *signature marks* rather than *portraits* — quieter, more editorial, and visually consistent with the rest of the hand-drawn identity (header logo, skyline, sketchy DayMap icons).

## What changes

### 1. Generate two new line-art illustrations

- **`src/assets/dennis-person-line.png`** — same relaxed standing pose as today (hands in pockets, sweater, jeans). Thin ink lines, no fill, no shading, no color. Transparent background. Recognizable Dennis: glasses, short beard, tousled hair.
- **`src/assets/dennis-guide-line.png`** — same mid-stride walking pose, open hand gesturing, scarf, jacket with notebook. Same line-art treatment. Transparent background.

Both rendered in a single ink color so they can be tinted via CSS if needed. Style reference: the existing hand-drawn header portrait logo.

### 2. Swap the imports in `src/pages/Index.tsx`

Replace the two `dennisPerson` / `dennisGuide` imports with the new line-art assets. Keep the layout, sizing, and surrounding copy untouched.

### 3. Light styling tweaks

- On **The Person** panel (light background): render the line-art in `heritage-purple` (matches the headline color) so the ink reads clearly.
- On **The Guide** panel (dark purple background): render the line-art in off-white / `background` so it reads against the dark.
- Keep the current responsive sizes (`w-[200px] md:w-[240px] lg:w-[280px]`).
- Drop the `drop-shadow` — line-art doesn't need it and shadows would feel wrong against the flat style.

### 4. Keep the old watercolor files in place

Do not delete `dennis-person.png` / `dennis-guide.png` — leaving them in `src/assets` keeps a fallback in case you want to revisit the warmer style later.

## Out of scope

- No copy changes ("The Person" / "The Guide" headlines and body text stay as-is).
- No layout changes to the split section.
- No changes to the header logo, skyline, or other illustrations.
