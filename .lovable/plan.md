## Goal
Reduce middle-of-page text by merging "How I Work" and "My Service" into one section "How It Works", and remove "Three Ways to Explore" (folding transport modes into the Day in the Life section as a single line).

## New section: "How It Works"
Replaces the current `#how-i-work` AND `#my-service` sections (lines 189–299 and 432–567 of Index.tsx).

Three movements stacked:

**1. Heading (centered)**
- Kicker: "How It Works"
- Title: "No standard tours. Every trip is built from scratch."
- One-line intro: "From the first message to the last goodbye, one person looks after every detail."

**2. Hand-drawn 4-step timeline**
- Dotted/dashed orange SVG curve connecting 4 circular numerals (01–04) on desktop; stacked on mobile.
- Steps:
  - 01 You reach out — "A quick note, a phone call. Tell me when you're coming."
  - 02 We have a call — "I listen. Your pace, your interests, what you've already seen."
  - 03 I design your trip — "A custom itinerary made for you. No templates."
  - 04 I take care of everything — "Bookings, transfers, reservations. One person, one phone number."

**3. Slimmed concierge comparison**
- Sub-heading: "What I take care of — More than a guide. A concierge for your whole stay."
- 2-column compare, but only **3 universal pain points** (museums, dining, WhatsApp) instead of 6.
- Quiet italic line below: "And everything else: transfers from Schiphol, hotel recommendations, a full itinerary for your whole stay."

## Day in the Life — small additions
- Add ONE line under the existing intro paragraph (and under the map):
  "We move on foot, by private boat, or by car beyond the city."
- Removes the standalone "Beyond Amsterdam" italic block (its essence moves here).
- No bike anywhere — they don't bike.

## Removed
- Entire "Three Ways to Explore" block (cards, "Beyond Amsterdam" line).
- Standalone "My Service" section (rolled into "How It Works").
- Imports for `iconBike` (unused after removal).

## Site content schema update
Add new editable keys to `src/lib/siteContentSchema.ts` for the new section so Dennis can edit them:
- `process.kicker`, `process.title`, `process.intro`
- `concierge.kicker`, `concierge.title`
- Remove the now-unused `service.*` keys from the schema (existing DB rows can stay; harmless).

## Section flow after change
```
Hero → About → How It Works → A Day in the Life → Rick Steves → Proof → Podcast → Stories → Contact
```

## Files touched
- `src/pages/Index.tsx` — replace two sections with one merged section; small edit to Day in the Life.
- `src/lib/siteContentSchema.ts` — swap service.* keys for process.* + concierge.* keys.
