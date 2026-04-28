## Goal

Make **My Service** instantly scannable so a 55+ visitor can answer "what can Dennis actually do for me?" in under 5 seconds. Today's section already lists six items, but they sit cramped in a half-column under a paragraph that overlaps with the new "How I Work" boat/day-trips copy. We'll declutter, restructure, and give it visual hierarchy on par with the redesigned section above.

## What's wrong today

- Repeats the boat / day-trips line that now lives in **How I Work** (movement 3 + closing line). Reads as duplication.
- Six service items live in a narrow half-column, two columns wide. On iPad and mobile they feel cramped and visually flat.
- All six items look equally important. There's no sense of what's most distinctive (the WhatsApp lifeline, the full itinerary).
- "Everything Taken Care Of" headline is generic and doesn't promise anything specific.

## Proposed redesign

A full-width section with a clear three-part rhythm: a focused intro, a **6-tile service grid** with hand-drawn icons, and a single closing reassurance line.

```text
┌─────────────────────────────────────────────────────────────┐
│  MY SERVICE  (eyebrow, accent)                              │
│                                                             │
│  More than a guide.                                         │
│  A concierge for your whole stay.        (oversized)        │
│                                                             │
│  Short 2-line intro, max-w-2xl, centered or left.           │
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                     │
│  │ 🎟 icon  │ │ 🍽 icon  │ │ 🗓 icon  │                     │
│  │ Museum   │ │ Dining   │ │ Full     │                     │
│  │ Tickets  │ │ Bookings │ │ Itinerary│                     │
│  └──────────┘ └──────────┘ └──────────┘                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                     │
│  │ 💬 icon  │ │ 🚗 icon  │ │ 🏨 icon  │                     │
│  │ WhatsApp │ │ Transport│ │ Where to │                     │
│  │ Lifeline │ │ & Trains │ │ Stay     │                     │
│  └──────────┘ └──────────┘ └──────────┘                     │
│                                                             │
│  ── Closing reassurance ─────────────────────────────────   │
│  "One contact, every detail handled. So your only job       │
│   is to enjoy the city."                                    │
└─────────────────────────────────────────────────────────────┘
```

**Why this works**
- A 3 × 2 grid reads at a glance, in any order. Eyes don't have to track left to right through a wall of text.
- Each tile gets its own hand-drawn green lucide icon (matching the "How I Work" cards and Interests cards), so the service stops looking like a bulleted list and starts looking like a menu of capabilities.
- The closing line replaces the duplicated boat/day-trips paragraph with a single emotional payoff.
- No service is starred as "featured" here — they're all equal — which contrasts intentionally with the "Private Boat" highlight in How I Work.

## Rewritten copy (first person, no em dashes)

**Eyebrow:** My Service
**Heading:** More than a guide. A concierge for your whole stay.

**Intro (one short paragraph):**

> The day we spend together is just the centre of it. Around that, I quietly take care of the things that usually eat up a holiday: the bookings, the queues, the questions at 9pm about where to eat. One person, one phone number, every detail looked after.

**Six service tiles:**

| Icon | Title | One-line description |
|------|-------|----------------------|
| Ticket | Museum Reservations | Time slots booked in advance for the Van Gogh Museum, the Rijksmuseum, the Anne Frank House, and more. No queues. |
| UtensilsCrossed | Dining Bookings | Tables at the kind of places locals actually go, from neighbourhood bistros to canal-side gems. |
| CalendarDays | Full Itinerary | A curated plan for your entire stay, not just the day we spend together. |
| MessageCircle | WhatsApp Lifeline | I am one message away for the whole trip. Restaurant tip, last-minute change, anything you need. |
| Car | Transport & Transfers | Airport pickups, train tickets, and private cars to day-trip destinations, all arranged before you arrive. |
| Hotel | Where to Stay | Honest recommendations for hotels and apartments that match how you like to travel. |

**Closing reassurance line (italic, centered, under a thin divider):**

> One contact, every detail handled. Your only job is to enjoy the city.

## Visual / styling details

- Section keeps its current off-white background (no taupe tint), so it reads as a calm "logistics" counterweight to the textured "How I Work" section above it.
- Heading: same `font-heading text-5xl md:text-6xl` rhythm as other section H2s, left-aligned in a centered max-w-3xl block (not the current asymmetric 2-column).
- Tiles: paper-style cards (off-white panel, hairline border `border/60`, `rounded-sm`, soft shadow on hover), generous padding, hand-drawn lucide icons at ~36px, strokeWidth 1.5, in `heritage-green`. Title in `font-heading text-xl md:text-2xl`, body in `font-body text-sm md:text-base text-muted-foreground`.
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`. iPad lands cleanly on the 2-col breakpoint, then expands to 3-col on desktop.
- Closing line: thin `heritage-bordeaux / 0.4` divider rule (matching the one in How I Work for visual rhyme), italic body copy, centered, max-w-2xl.
- Subtle FadeIn on heading, intro, each tile (small staggered delay), and closing line.

## Files touched

- `src/pages/Index.tsx` — replace the current `#my-service` section block (lines ~422-460) with the new layout, and add the six lucide icon imports (`Ticket`, `UtensilsCrossed`, `CalendarDays`, `MessageCircle`, `Car`, `Hotel`) to the existing lucide-react import line.

## Out of scope

- Header nav anchor `#my-service` stays unchanged.
- "How I Work", "A Day in My Life", and the Rick Steves block are untouched.
- No new dependencies; all icons already available in `lucide-react`.
