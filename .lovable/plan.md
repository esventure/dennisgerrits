## Implementation plan for Notes_6_juli_2026 feedback (revised v2)

### 1. Hero — 4 versions to compare
Trim the carousel from 6 → 4 slides. Two based on Variation 3, two based on Variation 6. Both Variation-3 slides force "HELLO." on one line and "I'M DENNIS." on one line (no wrap).
- Variation 3 met streep (with divider)
- Variation 3 zonder streep (no divider)
- Variation 6 met streep
- Variation 6 zonder streep

Copy locked to the doc:
- Headline: HELLO, I'M DENNIS. / A FRIEND WHO KNOWS THE CITY.
- Italic sub: "We slow down, follow curiosity, and discover places together, one story at a time. The best moments are rarely planned."
- Tagline: Storyteller, Host & Travel Companion

Photos: leaving existing hero images. You'll upload Lin's 5 photos in a follow-up.

### 2. How I Work — new design (3 rendered directions)
Screenshot the current section, generate 3 directions locked to the Heritage palette + Bebas/Outfit + editorial vibe. You pick one, I build it.

### 3. A Day in Amsterdam — remove scroll entirely
Strip out all scroll listeners / `useSkylineProgress` / IntersectionObserver on the day map. Interaction is click-only: the active step advances only when the user clicks a numbered marker on the map.

### 4. Radio Interview — remove "Taboe Media"
Becomes "Radio Interview about Amsterdam" with sub-line "Record live at Studio Zeedijk — Amsterdam." Body copy replaced with the new paragraph.

### 5. Bouwstenen (Building Blocks) photos
Generate fresh Amsterdam photos where the current ones feel weak; keep the strong ones.

### 5.1 Podcast — make it visually read as a podcast
Two changes to the podcast section:
- Add the tagline "A podcast by Louke and Dennis" under the logo.
- Recolor the section so it doesn't blend in with neighbouring cream/green blocks — use a distinctive Heritage tone (bordeaux or purple wash with cream type), plus a small "Podcast" eyebrow chip and a headphones/waveform hand-drawn glyph next to the logo so it's instantly clear this is a podcast, not another editorial block.

### 6. Reviews intro — single line at desktop/tablet
"These are words shared by travelers after their time with me. Click any card to read the full review on Tripadvisor." → responsive one-line scaling; wraps on mobile.

### 7. "Let's See if We're a Good Match" — single line
Same one-line treatment at desktop/tablet.

### 8. Stories from the City — SEO-friendly rebuild
Current setup renders the 10 chapters inside a 3D `StoryBook` component, which is hostile to crawlers (content is behind interaction, no per-story URL, no headings for bots).

New approach — hybrid book + real HTML:
- Keep the visual `StoryBook` on the homepage as a preview/teaser (first 3 chapters), purely as a design flourish.
- Underneath (or as the primary block on `/get-inspired` and a new `/notebook` page), render the full 10 chapters as **plain semantic HTML**: `<article>` per chapter with `<h2>` title, intro `<p>`, body `<p>`s, and an image. Visually still editorial — magazine-style two-column list, generous whitespace, Caveat handwriting for chapter numbers, hand-drawn dividers — but the DOM is fully crawlable text, not canvas/transforms.
- Each chapter also gets its own indexable page at `/notebook/[slug]` rendering the same `<article>` in a full-page layout. This gives Google 10 discrete URLs to rank.
- Add JSON-LD `BlogPosting` schema per chapter page and `Blog` schema on the index.
- Add all 10 chapter URLs to the sitemap generator so they're discovered.
- Seed the 10 chapters (Asparagus Season, Bike Exam, Rhododendron Dream, Speculaas Cookie, Book of Amsterdam, Nijntje in the City, Park Escape, Van Gogh in Bricks, Ice Cream Patrol, Bridge Jumpers) into the `stories` table via migration with slug, title, intro, body, sort_order 1–10.

Result: the delightful book stays for humans, the text is fully indexable for bots, and each story becomes a landing page.

### 9. Header + Footer menus — same items
Both menus use this exact list from the doc:
About Me · How I Work · Rick Steves · Experiences · Podcast · Reviews · Contact · Notebook

Footer additionally shows:
- Brand line: Dennis Gerrits
- Tagline: Storyteller, Host & Travel Companion
- For Professionals: Travel Agents & Concierges
- Copyright: © [year] Dennis Gerrits. All rights reserved.

The header collapses to a hamburger on mobile as today. Anchor links point to homepage sections; "Notebook" points to the new `/notebook` page.

### 9b. Floating CTA — label
Change button to "Let's connect".

### 10. Travel Advisors page — new copy
Replace intro on `/travel-agents` with the 4-paragraph text from the doc.

### 11. "We've moved" banner — Love My City Tours → dennisgerrits.com
Add a small dismissible banner near the top of the homepage (below the header, above the hero) with copy like:
"Formerly Love My City Tours — now dennisgerrits.com. Same Dennis, same Amsterdam, new home."
- Warm cream background with bordeaux type, small hand-drawn arrow icon.
- Dismissible via a close button; state stored in `localStorage` so it doesn't re-appear once closed.
- Also update remaining "Love My City" / "I Love My City" strings in radio iframe title, alt text and meta to "dennisgerrits.com".

### 12. Co-Founder Projects — AroundFriends
New section titled "Co-Founder Projects" with the AroundFriends description, the Rick Steves guidebook quote, and a link to https://www.aroundfriends.com/. Placed after Travel Advisors on the homepage.

---

### Technical notes
- **HeroCarousel**: keep 4 slides, add a `divider` prop toggling the streep; force single-line headline via `whitespace-nowrap` on Variation 3.
- **A Day in Amsterdam**: remove scroll listeners; `activeStep` driven purely by marker `onClick`.
- **StoryBook SEO**: new `/notebook` route + `/notebook/:slug` route in `App.tsx`; sitemap generator script pulls slugs from `stories` table at build time.
- **Podcast section**: swap background token + add eyebrow + glyph.
- **Banner**: new small `MovedBanner` component mounted in `App.tsx`.
- Migrations needed: seed `stories` with 10 chapters.
- Sitemap: introduce `scripts/generate-sitemap.ts` with the new notebook URLs (also fixes indexing).

### Order of execution
1. Copy-only edits (items 1 text, 4, 6, 7, 9, 9b, 10, 11 text).
2. Hero variation trim + streep toggle (item 1 structural).
3. Remove scroll on A Day in Amsterdam (item 3).
4. "We've moved" banner (item 11).
5. Bouwstenen images (item 5).
6. Podcast recolor + tagline + glyph (item 5.1).
7. Story chapters migration + `/notebook` routes + sitemap (item 8).
8. AroundFriends section (item 12).
9. How I Work redesign — pause, generate 3 directions, wait for pick, then build (item 2).

Ready to switch to build mode when you approve.
