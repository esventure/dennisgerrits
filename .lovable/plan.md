

# Trim Text Across the Homepage

## Problem
Nearly every section has 2-4 paragraphs of body copy. On a scroll-heavy page this creates fatigue — visitors skim past instead of reading. The voice is great, but it needs to breathe.

## Approach
Keep the warmth and personality, but cut each section to its sharpest lines. Where there are 3-4 paragraphs, reduce to 1-2. Let visuals, whitespace, and structure do the heavy lifting.

## Section-by-Section Changes (all in `src/pages/Index.tsx`)

### Hero
- Keep the headline and one short paragraph. Already fairly lean — no change needed.

### About (The Person / The Guide)
- **The Person**: Merge the two paragraphs into one tight paragraph (3 sentences max).
- **The Guide**: Same — condense two paragraphs into one.

### How I Work
- Cut from 4 paragraphs to 2. Lead with the "trusted friend / concierge" line, then one paragraph covering the tailored, unscripted approach. Drop the repeated details about specific museums and neighbourhoods (those are already implied by the interests section).

### My Service
- Cut the two introductory paragraphs to one short one (boat + day trips combined into 2-3 sentences). The 6 service cards already do the explaining — let them carry the weight.

### A Day in the Life
- Trim the intro paragraph. The timeline cards below already tell the story.

### Reviews
- No change — reviews are user quotes, they should stay.

### Rick Steves
- Already concise. No change.

### More Than a Guide (Mission Pillars)
- Shorten each pillar description from 2 sentences to 1 punchy sentence.
- "Invite Dennis" card: trim to 2 sentences + CTA.

### Podcast
- Cut from 2 paragraphs to 1. One strong line about what the podcast is and why it matters.

### Stories
- Already lean. No change.

### Contact + FAQ
- Trim the intro from 3 sentences to 2.
- "Book a Call" card description: cut from 2 sentences to 1.
- FAQ answers: shorten the longer ones (keep under 2 sentences each).

## Estimated reduction
Roughly 40% less body text across the page, while keeping every section's intent and Dennis's voice intact.

## Files Changed
1. **`src/pages/Index.tsx`** — Text trimming throughout all sections listed above

