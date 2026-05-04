## Goal

Drop the heavy taupe box around the "Get in Touch" section. It competes with the form-inside-a-box and makes the body copy harder to read. Replace it with an editorial, two-column layout that sits directly on the page background — same treatment as the rest of the homepage.

## Changes (all in `src/pages/Index.tsx`, lines 812–893)

**Remove**
- The outer `max-w-4xl` taupe-soft container with border + shadow-lg.
- The inner `border border-border` wrapper around the form (double-box effect).
- The little `w-12 h-0.5 bg-secondary` rule above the form heading.

**Replace with**
- A single `max-w-6xl` two-column grid: `lg:grid-cols-[1fr_1.1fr]`, `gap-12 lg:gap-20`, `items-start`.
- **Left column**: kicker + h2 + intro paragraph, no box, sitting on the page background. Body copy bumped to `text-foreground/80` for better contrast than the current muted-foreground on taupe.
- **Right column**: the form on white background (`bg-background`), `p-8 lg:p-10`, with a single `border-l-4` accent in `heritage-green` (uses the unused green from the palette, signals trust/calm). Subtle `shadow-sm` only.

**Why this fixes both complaints**
- No more square taupe slab — the section breathes like the others.
- Removes the contrast issue (muted text on taupe-soft) by putting copy on the off-white page bg.
- Keeps the form visually grounded with one clean accent line instead of two nested borders.
- Sneaks the heritage-green into the homepage (currently unused there).

## Out of scope
- No copy changes.
- No form logic changes.
- No new components or assets.
