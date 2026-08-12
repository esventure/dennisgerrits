# Experiences page: crawlable cards with their own URLs

Goal: the Experiences page keeps looking and behaving exactly as it does now for visitors (one page, cards that open inline), but every theme card also becomes a real, indexable URL that search engines can read on its own, in the same spirit as the notebook stories.

## What changes for visitors

- Nothing visually. Same polaroid wall, same click-to-open behavior.
- Each card title becomes a real link (`/get-inspired/<theme-slug>`), so it can be opened in a new tab, shared and bookmarked. A normal click still just expands the card in place, no page reload.
- Opening a shared link lands on the Experiences page with that card already open and scrolled into view (this already works today through `?theme=`, it moves to a clean path).

## What changes for bots

- Every card's full text (title, note, caption) is present in the static HTML of `/get-inspired` — no JavaScript needed to read it. Today the caption sits behind the open/closed state, so this gets marked up so it is always in the source, only visually hidden when the card is closed.
- Each theme gets its own prerendered page at `/get-inspired/<slug>` with a unique `<title>`, meta description, Open Graph tags and canonical, plus the theme image, its text, and links back to the full wall.
- Structured data: `ItemList` on `/get-inspired` listing all themes with their URLs, and a per-theme `WebPage`/`CreativeWork` node on each theme page.
- All theme URLs are added to `sitemap.xml`.

## Technical approach

1. **Extract the themes data** out of `src/pages/GetInspired.tsx` into `src/data/experiences.ts` (title, slug, note, caption, image, plus a longer `body` field per theme so each standalone page has real content instead of two lines). Slugs are the ones already derived today, so existing `?theme=` deep links keep working.
2. **Add a route** `get-inspired/:slug` in `src/routes.tsx` pointing at a new `src/pages/ExperienceTheme.tsx`, with `getStaticPaths` returning all theme slugs — the same pattern as `notebook/:slug`.
3. **Prerendering**: theme data is a local module, so `vite.config.ts` needs no database fetch; the routes come from `getStaticPaths` and are already picked up by `includedRoutes`.
4. **`GetInspired.tsx`**: render each card inside a `<article>` with an `id` equal to its slug, wrap the title in a `<Link to={/get-inspired/<slug>}>` intercepted by `preventDefault` for the inline expand, and keep the caption always in the DOM (`sr-only`/height-collapsed rather than unmounted). Add the `ItemList` JSON-LD.
5. **`ExperienceTheme.tsx`**: unique `Head` per theme (title, description from the caption, canonical `https://dennisgerrits.com/get-inspired/<slug>`, OG/Twitter, JSON-LD), hero image, the long body text, a link back to `/get-inspired`, prev/next themes, and the contact section for a next step.
6. **Homepage deep links** in `src/pages/Index.tsx` currently point at `/get-inspired?theme=<slug>`; they switch to `/get-inspired/<slug>` (the old query form stays supported as a redirect so nothing breaks).
7. **`scripts/generate-sitemap.ts`**: import the theme list and emit a `/get-inspired/<slug>` entry per theme.

## Content note

Each theme page needs a paragraph or two of its own text to be worth indexing (a two-line caption alone reads as thin content). I will draft a short body per theme from the existing captions and the site's voice; you can review and correct them afterwards.
