## Goal

Make the **How I Work** section feel as distinctive and editorial as the rest of the site. Today it's a flat two-column intro that gets visually outshone by the Rick Steves block right below it. Let's give it real structure, more of the source story, and a few signature visual moves so it earns its place as the philosophy anchor between Hero/About and the Rick Steves feature.

## What's wrong today

- Only ~2 short paragraphs survive from your full text. Loses the boat, the day-trips, the architecture background, the "rhythm of the streets" voice.
- Layout is the same left-title / right-text pattern used in three other sections, so it doesn't stand out.
- No visual texture, no pull-quote, no rhythm changes — reads like filler.

## Proposed redesign

A single section with **three movements**, each with its own visual treatment:

```text
┌─────────────────────────────────────────────────────────────┐
│  HOW I WORK  (small uppercase eyebrow, taupe bg)            │
│                                                             │
│  Like a trusted local friend,                               │
│  with the eye of a private concierge.        (oversized)    │
│                                                             │
│  ── Movement 1: The Approach ─────────────────────────────  │
│  [intro paragraph]      |   [hand-pencilled accent          │
│                         |    illustration / portrait        │
│                         |    crop or canal sketch]          │
│                                                             │
│  ── Movement 2: Pull-quote (full width, bordeaux accent) ─  │
│      "My aim is for you to become part of my city,          │
│       to feel at home here."                                │
│                                                             │
│  ── Movement 3: How We Explore (3 cards) ────────────────   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │ On Foot  │  │ By Bike  │  │ Private  │                   │
│  │          │  │          │  │  Boat ★  │                   │
│  └──────────┘  └──────────┘  └──────────┘                   │
│  + one-line note: "Beyond Amsterdam: The Hague,             │
│    Delft, Leiden, Rotterdam, Haarlem, tulip fields,         │
│    countryside villages, all by private car."               │
└─────────────────────────────────────────────────────────────┘
```

**Why this works**
- Headline + pull-quote give two memorable phrases instead of one wall of grey body copy.
- The three-mode cards make the "walking / biking / boat" choice feel concrete and bookable — and let us star the boat as the personal recommendation, which is the most distinctive part of the source text.
- The day-trips line keeps the "beyond Amsterdam" promise without duplicating the existing "My Service" section that already lists logistics.

## Rewritten copy (first person, no em dashes, target 55+ readable)

**Eyebrow:** How I Work
**Heading:** Like a trusted local friend, with the eye of a private concierge.

**Intro (two short paragraphs):**

> Every day I guide is built around you. Nothing is scripted. We follow your curiosity, whether that is the hush of the Jordaan at breakfast, the brushwork of a Vermeer, the food halls locals actually use, or the quiet streets of the Jewish Cultural Quarter.
>
> I studied architecture, so the city's bones are something I love to share. But we move at your pace. If you would rather slow down for coffee on a bridge or chase a memory from a story your grandmother once told, that is the day we will have.

**Pull-quote (large, accent-coloured, full-width band):**

> "My aim is for you to feel at home in my city. To understand Amsterdam not just through its sights, but through the rhythm of its streets, its culture, and its people."

**Three "ways to explore" cards:**

1. **On Foot** — The oldest way to read a city. Ideal for the canal belt, the Jordaan, and the museum quarter.
2. **By Bike** — How locals actually live here. We ride at a calm pace, on quieter routes, with a bike chosen for you.
3. **Private Boat** *(starred as my recommendation)* — A slow cruise along the canals with a glass of wine and a picnic. The view of Amsterdam from the water is the one most travellers never forget.

**Closing line under the cards:**

> Beyond the city, I arrange private day trips by car to The Hague, Delft, Leiden, Rotterdam, and Haarlem, plus the windmills, tulip fields, and countryside villages that make the Netherlands itself worth the journey.

## Visual / styling details

- Keep the existing `heritage-taupe / 0.1` section background.
- Heading: existing `font-heading text-5xl md:text-6xl text-primary` rhythm.
- Pull-quote: large `font-heading` italic in `heritage-bordeaux`, with a left accent rule and generous vertical padding, sitting on a slightly lighter inset panel so it visually breaks from the surrounding body copy.
- Cards: paper-style (off-white panel, hairline border, soft shadow), hand-drawn green icons matching the existing Interests cards style (foot / bike / boat). The boat card gets a subtle accent border and a small "My recommendation" tag in `heritage-orange`.
- Day-trips closing line: small italic body copy, centered or left-aligned under the cards, separated by a thin divider rule.
- All new copy strictly avoids em dashes and stays first person.

## Files touched

- `src/pages/Index.tsx` — replace the current `#how-i-work` section block (lines ~188-214) with the new three-movement layout.
- Reuse existing `FadeIn` for scroll-triggered fade-ins (one per movement) to stay on-brand.
- No new dependencies; icons via `lucide-react` already in the project.

## Out of scope

- The Rick Steves block, "My Service" block, and "A Day in My Life" block stay unchanged. They remain the next sections after this one.
- No changes to navigation, anchors, or section IDs.
