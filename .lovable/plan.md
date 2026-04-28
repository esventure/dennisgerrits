## Plan



### 2. Calm the pull-quote

Currently the quote is set in italic Bebas Neue at 3xl–5xl in heavy Bordeaux, which reads as shouty. I'll:

- Remove `italic`
- Switch from `font-heading` (Bebas Neue display) to `font-body` (Outfit)
- Reduce size to `text-2xl md:text-3xl`
- Keep the Bordeaux left border, but soften body color to `text-foreground/85` so the border carries the accent rather than the type

Result: a quiet, magazine-style pull-quote instead of a billboard.

### 3. Reorder sections

Currently the homepage flow is:

```text
Hero → About (Person/Guide) → How I Work → Rick Steves → A Day in the Life → Reviews → ...
```

New flow:

```text
Hero → About (Person/Guide) → How I Work → A Day in the Life → Rick Steves → Reviews → ...
```

I'll move the entire `<section id="day">…</section>` block (lines 490–513) to sit directly after the How I Work section closing tag (line 304), before the Rick Steves feature.

### Files touched

- `src/pages/Index.tsx` — three localized edits (heading word, pull-quote styling, section reorder).

No new components, no design-token changes.