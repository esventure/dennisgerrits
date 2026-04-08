

# Hero: Flip Layout + Bigger Photo

## Change
Reverse the two-column hero grid so Dennis's photo is on the **left** and the text is on the **right**. Make the photo larger and more prominent.

## Layout

```text
┌───────────────────────────┬─────────────────────────┐
│                           │  Personal Travel        │
│    [Dennis photo]         │  Companion              │
│    larger, ~60% width     │                         │
│    rounded-sm, shadow     │  Hello, I'm Dennis...   │
│                           │                         │
│                           │  body text...           │
└───────────────────────────┴─────────────────────────┘
```

## Details
- Grid changes from equal `grid-cols-2` to weighted `lg:grid-cols-[1.2fr_1fr]` so the photo column is wider
- Photo column moves first in DOM (swap the two `<FadeIn>` blocks)
- Photo gets `max-w-lg` (up from `max-w-md`) and a slight `aspect-[3/4]` for portrait framing
- Text aligns left as before, sitting in the narrower right column
- Mobile: stacks with photo on top, text below (natural reading order)

## File changes
1. **`src/pages/Index.tsx`** — In the hero section (~lines 141-167): swap the order of the two grid children, update grid class to `lg:grid-cols-[1.2fr_1fr]`, increase photo max-width

