

# Add Real Photos Throughout the Site

## Photos available (10 uploaded)
The user provided 10 photos showing Dennis with guests in various Amsterdam locations — canals, pubs, parks, boats, museums, windmills, streets. These are perfect for replacing the placeholder areas.

## Where photos will go

### 1. Photo collage in Reviews section (Index.tsx, lines 306-319)
Replace the 8 grey "Guest photo" placeholder boxes with 8 of the 10 uploaded photos. These show Dennis with happy guests — exactly what belongs next to reviews. Keep the existing grid layout and aspect ratios.

### 2. Stories section on Index.tsx (lines 414-432)
Replace the 3 "Atmospheric image" placeholder boxes in story cards with 3 of the photos that feel most atmospheric (canal bridge shot, park/statue shot, café terrace shot).

### 3. Stories section on GetInspired.tsx (lines 133-151)
Replace the 4 "Atmospheric image" placeholder boxes with the remaining photos that suit the story topics.

## File changes

1. **Copy 10 photos** to `src/assets/guests/` with descriptive filenames
2. **`src/pages/Index.tsx`** — Import guest photos, replace the placeholder collage grid (lines 306-319) with real images, and replace story card placeholders (lines 414-432) with photos
3. **`src/pages/GetInspired.tsx`** — Import photos and replace the 4 story card image placeholders with real photos

## Photo assignments

**Collage (8 photos):**
- Canal bridge couple → aspect-[3/4]
- Boat with wine glasses → aspect-square
- Group at canal houses → aspect-square
- Pub group → aspect-square
- Colorful wall group → aspect-[3/4]
- Park with friends → aspect-square
- Windmill ladies → aspect-square
- Statue couple → aspect-square

**Index stories (3):**
- "The Bookshop That Refused to Close" → café terrace photo
- "Why the Canal Houses Lean Forward" → canal bridge photo (reuse import)
- "A Bench With the Best View" → park statue photo (reuse import)

**GetInspired stories (4):**
- "The Bookshop..." → pub group
- "Canal Houses..." → canal houses group
- "A Bench..." → park with friends
- "The Café..." → boat with wine

