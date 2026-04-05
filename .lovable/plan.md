

# Amsterdam Skyline Illustration — Serpentine Layout

## What we're building
A hand-drawn style SVG illustration of the Amsterdam skyline that flows across the full width of the page in a serpentine (boustrophedon) pattern: left-to-right on the first row, then right-to-left on the second row, then left-to-right again. Each row features recognizable Amsterdam landmarks rendered as continuous line art, similar to the uploaded reference image.

## Landmarks to include (across 3-4 rows)
- Row 1 (L→R): Centraal Station, Damrak canal houses, Royal Palace, Nieuwe Kerk
- Row 2 (R→L): Westerkerk, Anne Frank House area, canal bridges, Jordaan houses
- Row 3 (L→R): Rijksmuseum, Vondelpark gate, Concertgebouw, canal boat
- Row 4 (R→L): Magere Brug (Skinny Bridge), Muntplein tower, windmill, row of classic gabled houses

## Placement
A new full-width section on the homepage, positioned between the Philosophy and Experience sections. It acts as a visual interlude — no text overlay, just the illustration filling the width.

## Technical approach
- Create `src/components/AmsterdamSkyline.tsx` containing an inline SVG with hand-drawn style path data
- Use `stroke` only (no fill) for the line-art style, matching the uploaded reference aesthetic
- Stroke color: `currentColor` inheriting the primary dark color
- Stroke width thin (1.5-2px) for the hand-drawn feel
- Each row is a separate SVG group, with rows 2 and 4 mirrored/reversed to create the serpentine flow
- Connecting vertical lines link the end of one row to the start of the next
- Responsive: `viewBox` based, scales with container width
- Add the component to `Index.tsx` as a section between Philosophy and Experience

## Files to change
1. **Create `src/components/AmsterdamSkyline.tsx`** — Full SVG component with 3-4 rows of landmark line art in serpentine layout
2. **Edit `src/pages/Index.tsx`** — Import and place the skyline section between Philosophy and Experience

