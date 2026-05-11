## Why it feels "funeral" right now

- Hero is a single paragraph on a near‑white wash with one small orange eyebrow. No color, no texture, no warmth.
- The polaroid wall does most of the visual work, but every card sits on plain white with grey shadows. The "tape" pieces are the only color and they're small.
- The Stories section drops onto a flat taupe block with a quiet purple headline. After 12 colorful polaroids it reads like a footer.
- Heritage green is barely used anywhere on the page.

## Proposed uplift (visual only, copy & structure unchanged)

### 1. Hero block — give it warmth and personality
- Replace the cool radial wash with a warmer layered background: soft orange glow top‑left + a green wash bottom‑right, both at low opacity over off‑white.
- Add a hand‑drawn orange squiggle under "Build Your Day" (same style as "Notes From the City" on the homepage), and a small Caveat‑script line in green above the eyebrow ("a few ideas to start with").
- Add a subtle hand‑drawn green arrow or dotted line pointing down toward the polaroid grid, so the eye is pulled in.

### 2. Polaroid wall — more color, less mortuary white
- Tint the polaroid paper itself: alternate between off‑white, a very pale cream, and a faint green‑tinted card, instead of pure white. Keeps the analog feel but breaks the uniform grey.
- Make the tape strips bigger, more varied, and rotate through three colors (orange, green, bordeaux) instead of just two. Slight torn‑paper edge.
- On hover: lift + a soft orange glow behind the card (instead of just a deeper grey shadow).
- Active/expanded card: bordeaux caption stays, but add a thin green underline accent on the title and a small orange dot before the script note.

### 3. Section divider between polaroids and stories
- Add a hand‑drawn green wavy divider (same family as the orange skyline lines) between the two sections so Stories doesn't feel "dropped in".
- Optional: a small orange Caveat label "and a few stories…" sitting on the divider, rotated a couple of degrees.

### 4. Stories section — warmer canvas
- Swap the flat taupe for a layered background: cream base + a soft green radial in one corner + a faint orange paper‑grain noise (same noise pattern used on the homepage Stories section, kept low opacity).
- Add a small orange "Stories" eyebrow above the H2 (matches the homepage rhythm and ties the two pages together).
- Give the StoryBook container a subtle green page‑edge or bordeaux thread accent so it reads as a "real" notebook on the page.

### 5. CTA line at the bottom of the polaroids
- Currently a thin orange dashed link. Upgrade to a small handwritten‑style block: green Caveat line ("when you're ready…") above the existing orange link, with a tiny hand‑drawn arrow.

## Heritage palette usage after the change
- Orange: hero glow, squiggle under H1, polaroid hover glow, bottom CTA link, Stories eyebrow.
- Green: secondary hero wash, ~⅓ of polaroid tape strips, divider squiggle, Stories background accent, "when you're ready" script.
- Bordeaux: kept where it is (Caveat captions, notes) — already working.
- Purple: kept for headings only.

## Out of scope
- No copy changes, no structural changes, no new sections, no new images.
- StoryBook component internals untouched.
- Homepage untouched.

## Technical notes
- All edits live in `src/pages/GetInspired.tsx` plus possibly one small reusable SVG squiggle/divider component in `src/components/`.
- Colors via existing `--heritage-orange`, `--heritage-green`, `--heritage-bordeaux` HSL tokens — no new tokens needed.
- Animations stay in the existing `FadeIn` envelope (subtle fade‑in only, per project rules).
