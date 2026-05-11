## Goal

Transform the Stories section from cool grey-paper to a sun-lit, scrapbook-warm spread that feels alive instead of "funereal".

## Changes (all in `src/pages/Index.tsx`, Stories section only)

### 1. Warm cream background
- Swap `backgroundColor: hsl(var(--heritage-taupe-tint))` for a warm ivory (`hsl(40 38% 95%)`), with a soft top-to-bottom gradient that adds a faint peach glow at the top.
- Bump the orange `section-light` skyline opacity slightly so it reads more clearly against the warmer base (still subtle, no neon).
- Lighten the paper-grain noise overlay so it adds texture without muddying the cream.

### 2. Playful polaroids
- Give each of the three story cards a slight, varied rotation (`-1.5deg`, `+1deg`, `-0.8deg`) so they feel pinned by hand instead of grid-aligned.
- Add a small washi-tape strip at the top of each card in alternating heritage colours (orange, green, bordeaux) at low opacity, replacing the lone paperclip on two of the three cards (keep the clip on one for variety).
- Slightly warm the photo treatment (`saturate(1.05) contrast(1.02)`) so the images themselves feel sunnier.

### 3. Warmer typography
- Add a handwritten Caveat sub-line above "Notes From the City" (e.g. "from my notebook"), rotated `-2deg`, in heritage-orange — matches the sketchbook voice already used elsewhere.
- Shift the "STORIES" kicker from `text-secondary` (purple) to `heritage-bordeaux` for warmth.
- Keep the main headline in heritage-purple (it's the brand anchor) but add a thin orange underline accent on the word "City" via a hand-drawn SVG squiggle, echoing the divider already below the intro.

## Out of scope
- No copy changes to the three story titles or intros.
- No layout changes to the 3-column grid.
- No changes outside the Stories section.
- No changes to the StoryBook on `/get-inspired`.

## Technical notes
- All colours stay within the existing Heritage Palette tokens (`--heritage-orange`, `--heritage-bordeaux`, `--heritage-green`, `--heritage-purple`).
- Card rotations use inline `transform` so they don't fight the existing hover scale.
- Washi-tape strips are pure CSS divs (no new assets needed).
