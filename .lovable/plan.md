

# About Dennis: Person with Photo, then Guide

## Layout

```text
┌─────────────────────────────────────────────────┐
│  ABOUT DENNIS                                   │
│  THE PERSON & THE GUIDE                         │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐  ┌─────────────────────────┐  │
│  │              │  │ A TRUE AMSTERDAMMER      │  │
│  │   Photo of   │  │                         │  │
│  │   Dennis     │  │ Personal story copy...  │  │
│  │              │  │                         │  │
│  │              │  │ Second paragraph...     │  │
│  └──────────────┘  └─────────────────────────┘  │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────────────────────────────────────┐│
│  │ ─── accent line ───                        ││
│  │ A DIFFERENT KIND OF GUIDE                  ││
│  │                                            ││
│  │ Guide philosophy copy...                   ││
│  │                                            ││
│  │ Second paragraph...                        ││
│  └─────────────────────────────────────────────┘│
│                                                 │
│  "I don't want you to remember what I told you."│
│                                                 │
└─────────────────────────────────────────────────┘
```

## What changes

### Section 1: "The Person" (photo + text side by side)
- Two-column layout: left column holds a photo of Dennis (placeholder for now), right column has the "A True Amsterdammer" heading and personal copy
- Photo styled with a subtle border or shadow to feel editorial
- On mobile, photo stacks above text

### Section 2: "The Guide" (full-width text block)
- Separated with generous spacing below the person block
- Full-width text block with accent line, heading, and guide philosophy copy
- Slightly different visual treatment (e.g. centered or offset) to distinguish from above

### Blockquote
- Stays at the bottom as-is

## What I need from you
- A photo of Dennis to use. For now I'll add a placeholder image. Do you have one to upload?

## File changes
1. **`src/pages/Index.tsx`** - Restructure the About section: photo+text row for "The Person," then full-width block for "The Guide"

