## What feels off today

The Building Blocks section uses tape strips, rotated cards, three different paper tints, hidden click-to-expand captions and tiny truncated titles. Compared to the rest of the site (editorial split panels, big Bebas headlines, generous whitespace, restrained hand-drawn accents, documentary photography), it reads as a craft scrapbook dropped into a magazine.

It also doesn't make the visitor feel Dennis's depth. Twelve near-identical tiles with two-word notes ("ask me about the cat") show breadth, not passion. The personal stories are hidden one click away.

## What "alive" should mean here

Not more rotation and tape. Alive on this site is:
- Bebas headline + Caveat margin note in his own voice
- Specific proper nouns (the baker, the friend who paints in Noord, Multatuli's cafe)
- Documentary photo cropped editorially
- One small hand-drawn accent per block, not five

## Proposed direction

### 1. Get Inspired page: photo-essay index

Replace the 12-card polaroid grid with a vertical list of editorial rows, paced like the Day in My Life section:

```text
┌────────────────────────────────────────────────────────────┐
│  01    HIDDEN HISTORY                                      │
│  ─────                                  [ photo, 4:5 ]      │
│  "There's a stone above a doorway in                       │
│   the Jordaan with a cat carved into                       │
│   it. Almost no one knows the story."                      │
│                                                            │
│   ↳ ask me about the cat   ←caveat margin note            │
└────────────────────────────────────────────────────────────┘
```

For each of the 12 themes:
- Big Bebas number (01..12) + uppercase title, like "A Day in My Life" beats
- One short personal paragraph in Outfit (2-3 lines, full sentences, with proper nouns: a name, a street, a time of day)
- One Caveat margin note in bordeaux or green, rotated lightly
- One documentary photo, alternating left/right side per row
- Subtle accent only: a thin orange vertical bar before the title (matching the Day map cards)

Even-row backgrounds slightly tinted (taupe-tint), odd rows on off-white — same alternation already used elsewhere on the site.

Removes: tape strips, three paper colours, card rotation, hidden captions, polaroid frames.
Keeps: orange squiggle under the page H1, the green Caveat eyebrow ("a few ideas to start with"), the closing "when you're ready..." link.

### 2. Homepage preview (4 cards)

Reskin the 4-card preview to match. Two options:

- **Option A — Mini index**: 4 editorial rows, same pattern as the Get Inspired page but compressed. Reads as a teaser of the full magazine spread.
- **Option B — Editorial photo grid**: 4 full-bleed photos in a clean 2x2 or 1x4, no tape, no rotation. Bebas title + tiny Caveat note in the bottom margin (under the photo, not floating tape on top). Hover: image zooms slightly, Caveat note slides up. CTA stays "See all building blocks".

Recommend Option B for the homepage so the preview is visually distinct from the day map and stays scannable, while the Get Inspired page does the long-form storytelling.

### 3. Show that he actually knows this stuff

The single biggest "wow" lever isn't visual, it's content. With the new layout I'd rewrite each of the 12 entries from a 5-word note into a 2-3 sentence paragraph with at least one of:
- a real first name (the baker, the boatman, the painter)
- a real place (Westerstraat, Noorderkerk, a specific brown cafe)
- a real time or ritual ("at six, before the queue")
- a sensory detail ("the smell of fresh bread on the corner")

Copy is out of scope for the visual restyle, but I'll leave clear placeholders with one example written out, and flag the rest for Dennis to fill in his own words. He can edit them in the admin or send them to me.

## Out of scope

- The StoryBook section below Contact
- The Day in My Life map
- Any colour token changes (using existing heritage tokens only)

## Files touched

- `src/pages/GetInspired.tsx` — replace the `themes.map(...)` polaroid grid with the editorial row layout; keep the existing page H1, eyebrows, and footer link.
- `src/pages/Index.tsx` — replace the 4-card "Building Blocks" block with the chosen homepage preview pattern (Option B by default).
- No new assets, no new dependencies. Reuses the 12 interest images already imported.
