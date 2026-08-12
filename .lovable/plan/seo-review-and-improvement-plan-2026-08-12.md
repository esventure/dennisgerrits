# SEO review and improvement plan

Reviewed the whole site: head metadata per page, robots.txt, sitemap, routes, structured data, headings and images. The foundation is strong (static pre-rendered pages, per-page titles/descriptions/canonicals, breadcrumb and review structured data, clean robots.txt). Below are the gaps worth fixing, ordered by impact.

## What is already good

- Every public page has its own title, description and self-referencing canonical, baked into static HTML.
- Sitemap covers home, experiences hub, all 20 experience permalinks, notebook and all stories.
- robots.txt allows everything except /admin, and points at the sitemap.
- JSON-LD in place: Organization/Service, reviews with aggregate rating, breadcrumbs on all main routes.

## Issues found

1. **Google Search Console is not connected.** No performance data, no sitemap submission, no indexing feedback. This is the single biggest gap.
2. **Duplicate route `/interests`** renders the exact same Experiences page as `/get-inspired`. It is not in the sitemap and it canonicalizes to `/get-inspired`, so it is mostly harmless, but the safest fix is to redirect it instead of rendering a duplicate.
3. **Admin and 404 pages have no `noindex`.** They are blocked in robots.txt, but a blocked URL can still be indexed without content. A `robots noindex` meta on admin routes and the 404 page closes that.
4. **No `lastmod` in the sitemap.** Notebook stories and experiences have real update timestamps that can be used; pages without a trustworthy date stay without `lastmod`.
5. **No `/llms.txt`.** AI assistants have no summary of the site or map of the main pages.
6. **Image alt text and lazy loading are inconsistent.** Several decorative and content images across the hero, about carousel, experiences and travel-agents pages either lack descriptive alt text or eager-load below the fold.
7. **Thin metadata on the unused `Interests` page component** (no title/description) — resolved by removing or redirecting it.
8. **Home page description and titles can be sharpened around real search intent** ("private tour guide Amsterdam", "personal Amsterdam guide", "local Amsterdam experience"). Worth validating with keyword data before rewriting.

## Proposed work

**Phase 1 — technical fixes**
- Connect Google Search Console, verify `https://dennisgerrits.com/` with the meta-tag flow, and submit the sitemap.
- Redirect `/interests` to `/get-inspired` and delete the unused `Interests` page component.
- Add `<meta name="robots" content="noindex, nofollow">` to admin routes and the 404 page.
- Add `lastmod` to sitemap entries that have a real content timestamp (notebook stories from the database, experiences from their data file); leave it off elsewhere.
- Audit every `<img>`: descriptive alt for content images, `alt=""` for purely decorative ones, `loading="lazy"` below the fold, explicit width/height where it prevents layout shift.

**Phase 2 — content and keywords**
- Run keyword research (Semrush) on Amsterdam private-guide terms to check what the home page, experiences hub and travel-agents page should actually target.
- Rewrite the home and hub titles/descriptions based on that, keeping the personal tone and American spelling.
- Add an `/llms.txt` listing the public pages with one-line descriptions.
- Add FAQPage structured data if we introduce a short FAQ block (pricing, duration, languages, group size) — this is content that visitors ask for anyway and can win rich results.

**Phase 3 — verification**
- Run a fresh SEO scan after the changes and confirm the findings clear.

## Technical notes

- Head tags stay in the per-page `<Head>` components (vite-react-ssg), so all changes land in the generated static HTML.
- Sitemap changes go in `scripts/generate-sitemap.ts`, which already runs on predev/prebuild.
- The `/interests` redirect is a route-level change in `src/routes.tsx`.
- Search Console verification needs one publish after the meta tag is added before Google can see it.

Tell me if you want all three phases, or only the technical fixes for now.
