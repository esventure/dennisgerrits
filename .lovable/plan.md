

# About Dennis — Full-Screen Split Layout

## Concept
Replace the toggle-based section with two side-by-side panels that each take up roughly half the viewport width and full viewport height. Left panel = "The Person," right panel = "The Guide." Both visible simultaneously — no interaction needed. Magazine-style, impossible to scroll past.

## Layout

```text
┌─────────────────────────┬─────────────────────────┐
│                         │                         │
│   THE PERSON            │   THE GUIDE             │
│                         │                         │
│   ─── accent line       │   ─── accent line       │
│                         │                         │
│   A True Amsterdammer   │   A Different Kind      │
│                         │   of Guide              │
│   Personal story...     │                         │
│                         │   Guide philosophy...   │
│   Second paragraph...   │                         │
│                         │   Second paragraph...   │
│                         │                         │
│   (cream/light bg)      │   (dark primary bg,     │
│                         │    light text)           │
│                         │                         │
└─────────────────────────┴─────────────────────────┘
│            Blockquote centered below              │
```

On mobile: stacks vertically, each panel ~80vh.

## Visual treatment
- Left panel: cream/light background (matches site), dark text. Warm, personal feel.
- Right panel: dark primary (`bg-primary`) background with `text-primary-foreground`. Creates strong contrast and visual weight.
- Each panel has generous internal padding, vertically centered content.
- Section heading "About Dennis / The Person & The Guide" removed — the split itself communicates the duality.
- Small label at top of each panel: "THE PERSON" / "THE GUIDE" in tracking-widest uppercase.
- Blockquote remains below as a full-width centered element.

## File changes
1. **`src/pages/Index.tsx`** — Replace the About section (lines 171-254): remove toggle state, replace with a `min-h-screen grid grid-cols-1 lg:grid-cols-2` layout containing two contrasting panels. Remove `aboutTab` state.

