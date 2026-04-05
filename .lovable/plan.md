
# Homepage & Site Restructure

## Homepage Sections (single scroll page)

1. **Hero** `#hero` — Full-width Amsterdam atmosphere, headline, subheadline, CTA button, trust line
2. **About Me** `#about` — Two blocks: Dennis as person/Amsterdammer + Dennis as professional guide with philosophy & USPs
3. **A Day in the Life** `#day` — Personalised experience concept brought to life through atmosphere, story, imagery (replaces current timeline)
4. **Proof** `#proof` — Five TripAdvisor quotes + large photo collage of past guests
5. **More** `#more` — Three mission pillars, media appearances (Rick Steves, radio), podcast "Two Stories One City", university collaborations
6. **Stories** `#stories` — Blog-style cards with atmospheric image, title, intro text
7. **Contact, FAQ & Footer** `#contact` — Contact form, Calendly integration, FAQ accordion, footer

## Standalone Pages

- **Get Inspired** `/get-inspired` — Combines the existing Interests building blocks + a stories/blog section
- **Get in Touch** `/get-in-touch` — Video call scheduling (Calendly) or callback request form
- **Travel Agents** `/travel-agents` — Professional page, linked only from footer

## Navigation
- Header: Hero, About, A Day, Proof, More, Stories, Contact (anchor links) + "Get Inspired" (page link)
- Footer: All anchor links + Get Inspired + Travel Agents + Get in Touch

## Files to change
1. **`src/pages/Index.tsx`** — Rewrite with all 7 sections
2. **`src/pages/GetInspired.tsx`** — New page combining Interests content + Stories section
3. **`src/pages/GetInTouch.tsx`** — New page with Calendly embed + callback form
4. **`src/pages/TravelAgents.tsx`** — New standalone page (recreate)
5. **`src/components/Header.tsx`** — Update nav links
6. **`src/components/Footer.tsx`** — Update footer links
7. **`src/App.tsx`** — Add routes for new pages
8. **`src/pages/Interests.tsx`** — Content moves to GetInspired, delete or redirect

## Content notes
- Reviews section needs placeholder quotes (user to provide real ones later)
- Photo collage needs placeholder images
- Stories/blog cards need placeholder content
- Calendly integration placeholder (URL to be provided)
- Amsterdam skyline illustration stays between sections as visual interlude
- All copy in personal, conversational tone (no em dashes)
