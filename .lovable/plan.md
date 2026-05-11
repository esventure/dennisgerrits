## Plan: Refine the Get Inspired page

### 1. Remove the orange gradient on the polaroid wall
- Delete the orange + bordeaux radial-gradient overlay div sitting on top of the green polaroid section. The corner glow currently reads as a heavy orange wash bleeding into the green.
- Keep the subtle paper-grain noise overlay so the green still has texture.

### 2. Differentiate the header band from the polaroid wall
Right now both the intro band and the polaroid canvas are heritage green, so the section reads as one giant green block.

Proposal:
- **Header band** stays heritage green (it works well with white headline + orange "What excites you?" eyebrow and ties into the Contact and Podcast green bands elsewhere on the site).
- **Polaroid wall** moves to a warm off-white / cream canvas (`hsl(40 38% 96%)`), so the white polaroid cards no longer fight the green and the contrast between the two zones is clear.
- To stop the wall from feeling beige and funereal again, inject color into the cards themselves:
  - Rotate polaroid paper tints across more colors: cream, soft green, warm orange-blush, dusty bordeaux-pink (instead of the current three near-identical creams).
  - Keep tape colors rotating through orange / green / bordeaux as today.
  - Keep the soft orange hover glow behind active cards (this is local to the card, not a section wash).

### 3. Drop Stories, add Contact section instead
The notebook / StoryBook now lives on the homepage, so the duplicate at the bottom of Get Inspired is redundant.

- Delete the Stories section (`#stories-section`) and the hand-drawn divider above it from `src/pages/GetInspired.tsx`.
- Remove the now-unused stories data fetch, `openStory` state, `searchParams` deep-link effect, `StoryBook` import, and supabase + react-query imports if nothing else needs them.
- Replace with the same Contact section that lives on the homepage so visitors who picked their interests have an immediate next step.

To avoid duplicating ~120 lines of contact form markup, extract the contact block into a reusable component:
- New file `src/components/ContactSection.tsx` containing the green rounded card, headline, intro photo, and the Book-a-Call form (with its submit handler, `useToast`, and translation hooks).
- `src/pages/Index.tsx` swaps its inline contact section for `<ContactSection />`.
- `src/pages/GetInspired.tsx` renders `<ContactSection />` directly after the polaroid wall.

The handwritten "let's talk →" margin note, the Rick Steves trust signal, and any FAQ block currently sitting outside that contact card on the homepage stay only on the homepage; Get Inspired only gets the booking card itself.

### Out of scope
- No copy changes (headlines, eyebrows, captions stay as written).
- No structural changes to the polaroid grid, sizes, or tape geometry.
- Homepage layout is untouched apart from the contact-section refactor.
- StoryBook component internals untouched.

### Files touched
- `src/pages/GetInspired.tsx` — remove orange wash, change polaroid wall background, expand polaroid paper tint palette, delete Stories block + divider, mount `<ContactSection />`.
- `src/components/ContactSection.tsx` — new shared component extracted from current Index contact markup.
- `src/pages/Index.tsx` — replace inline contact section with `<ContactSection />`.
