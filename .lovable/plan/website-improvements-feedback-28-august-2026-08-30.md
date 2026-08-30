# Website improvements (feedback 28 August)

Item 1 (redirect of lovemycitytours.com) is skipped as requested. It happens at the DNS/host of the old domain, not in this project.

Everything below is grouped so related work happens in one pass.

## A. Search engines and sharing

- **Day trip titles (4).** The experience template always appends "in Amsterdam", which produces "Haarlem in Amsterdam". Add an override per experience so Haarlem, Leiden, Rotterdam and Delft & The Hague become "Haarlem Day Trip from Amsterdam | Dennis Gerrits" and the same for og:title. Visible page text stays unchanged.
- **Per-page sharing image (9).** Every page now uses the same og:image. Give each experience page its own lead photo as og:image (absolute URL, ~1200x630), keep the hero photo as fallback for pages without their own image.
- **Long dashes (11).** Remove them from: schema/business name, the four "read more" aria-labels, the page title used as title/og:title/twitter:title, the radio caption ("Live at Studio Zeedijk, Amsterdam") and the footer line ("Formerly Love My City Tours, now dennisgerrits.com"). Decorative dashes around the "Get in Touch" label stay.
- **GA4 check (10).** The base tag is in the page head and a page_view already fires on every route change. Verify in Realtime by clicking through three pages; adjust only if a page is missing.

## B. Robustness

- **"Unexpected Application Error" after deploy (5).** Add a one-time automatic reload when a page-chunk fails to load (the "not valid JSON" case), instead of the error screen. This works regardless of hosting plan.

## C. Photo collage

- **Alt text (2).** Collage photos currently have empty alt attributes. Add around twelve honest descriptions (place plus activity, no names or dates) spread over the tiles.
- **Upload instructions.** Short written explanation for Dennis on where to add new collage photos and set their alt text.
- **Mobile behaviour (3).** On mobile: five photos high, slightly faster movement, horizontally scrollable by hand.

## D. Homepage

- **Experience blocks link to the overview (6).** Clicking a block goes to the Experiences overview scrolled to that experience, instead of the individual page.
- **Read more (7).** Remove the expandable text and the link line under each experience block. Each block ends with "Read more ->".
- **Handwritten notes (8).** Larger, always readable, on all sizes.
- **Consistent padding (12).** One spacing scale for section top/bottom padding across the homepage, matching example B.
- **Icons invisible (13).** Fix the missing service icons (Museum Reservations, Dining, Transportation, Private Cars & Boats) on desktop and mobile.
- **Navigation position (14).** Header stays in a fixed position regardless of the amount of text above it.
- **Remove "Guest" (15).** Delete that label.
- **Move the podcast (16).** Two Stories block sits between Rick Steves and the radio interview.
- **Counter (17).** The Tripadvisor review count animates up automatically when it comes into view.
- **Review text max four lines (18).** Clamp the review cards to four lines.
- **Spacing around Get in Touch (19)** reduced; **"Other" on the same line (20)** in the contact form.

## E. Navigation behaviour

- **Menu items scroll (21).** About Me, How I Work, Rick Steves, Podcast, Reviews and Contact already scroll. Experiences and Notebook will also scroll to their homepage sections instead of opening their own page. For Professionals keeps its own page. The standalone pages stay reachable by URL for search engines.
- **Correct alignment after a menu click (22).** Add a consistent scroll offset for the sticky header so the section starts just below the menu, not with a screen of empty space.

## F. For Professionals page

- **Heading in three lines (23):** "I take care of your clients" / "in Amsterdam" / "and the Netherlands."
- **One line (24):** "Your clients have a local they can rely on." on a single line.
- **Remove icons (25)** in the marked block.
- **Swap and one line (26):** swap the two list items so "Museum Reservations: Tickets & Timed Entry" sits on one line with the subtitle below it and no extra gap.

## Technical notes

- Titles/og overrides live in `src/data/experiences.ts` and `src/pages/ExperienceTheme.tsx`.
- Chunk-load recovery: a small listener in `src/main.tsx` plus a router error boundary.
- Collage: `src/components/MosaicWall.tsx` (alt array, mobile rows, drag scroll).
- Homepage items: `src/pages/Index.tsx`, `src/components/PodcastPlayer.tsx`, `src/components/ContactSection.tsx`.
- Navigation and offsets: `src/components/Header.tsx`, `src/components/Footer.tsx`, shared `scroll-mt` value.
- Professionals page: `src/pages/TravelAgents.tsx`.

## Order of work

1. A + B (search, sharing, error screen)
2. C + D (collage and homepage)
3. E + F (navigation and professionals page)
