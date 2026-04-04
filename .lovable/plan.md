

# Convert to One-Pager with Interests Subpage

## Overview
Restructure the site from 6+ pages into a single scrolling homepage with anchor-based navigation, plus one standalone page for "Your Interests."

## Structure

### Homepage (single scroll page)
The homepage will contain these sections in order, each with an `id` for anchor linking:

1. **Hero** (existing) - `#hero`
2. **About Dennis** (from About.tsx) - `#about`
3. **A Day Together** (from Approach.tsx, the timeline) - `#approach`
4. **FAQ** (from FAQ.tsx, accordion) - `#faq`
5. **Contact / Get in Touch** (from Contact.tsx, video call + form) - `#contact`
6. **Travel Agents** (from TravelAgents.tsx, compact version) - `#professionals`

The Philosophy and Experience sections currently on the homepage stay between Hero and About.

### Interests page (standalone)
Stays as `/interests` - no changes needed.

## Files to change

### 1. `src/pages/Index.tsx`
- Import content/components from About, Approach, FAQ, Contact, and TravelAgents
- Add all sections inline with `id` attributes for anchor scrolling
- Keep existing Hero, Philosophy, and Experience sections
- Replace the current CTA section with the full Contact section

### 2. `src/components/Header.tsx`
- Change nav links from routes to anchor links (`#about`, `#approach`, `#faq`, `#contact`)
- Keep "Your Interests" as a route link to `/interests`
- Add smooth scroll behavior for anchor links
- Handle anchor navigation when on the Interests page (link back to `/#about` etc.)

### 3. `src/components/Footer.tsx`
- Update footer links to use anchors instead of routes
- Keep `/interests` as a route link

### 4. `src/App.tsx`
- Remove routes for About, Approach, Contact, FAQ, TravelAgents
- Keep only `/`, `/interests`, and `*` (NotFound)
- Remove unused imports

### 5. `index.html`
- Add `scroll-behavior: smooth` to the `<html>` tag

### 6. Cleanup
- Delete `src/pages/About.tsx`, `Approach.tsx`, `Contact.tsx`, `FAQ.tsx`, `TravelAgents.tsx` (content moved into Index)

## Technical details
- Anchor links use `<a href="#section">` for same-page, `<Link to="/#section">` when navigating from Interests page
- Smooth scrolling via CSS `scroll-behavior: smooth` on `html`
- Header offset accounted for with `scroll-margin-top` on each section
- Mobile nav closes on anchor click (existing behavior)

