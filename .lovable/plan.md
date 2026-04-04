

# Rewrite All Content: More Personal, Remove Em Dashes

## What changes

Every page and component with copy will be updated. Two goals:
1. **Remove all em dashes (—)** throughout, replacing with simpler punctuation (periods, commas, colons, or restructured sentences).
2. **Rewrite copy to sound less polished/AI and more like a real person talking.** Less symmetrical phrasing, fewer "three things in a row" constructions, more conversational rhythm, occasional short sentences, less formulaic structure.

## Files to edit (8 files)

### 1. `src/pages/Index.tsx`
- Hero tagline: keep "I translate it" but drop the em dash
- Philosophy section: break up the overly balanced sentence pairs, make it sound more like Dennis actually talks
- Experience cards: less perfectly structured, more natural
- CTA: simpler, warmer

### 2. `src/pages/About.tsx`
- Rewrite the three body paragraphs to feel less like an AI writing exercise and more like someone actually reflecting on their life
- Remove em dashes from all paragraphs
- Blockquote stays but tightened

### 3. `src/pages/Approach.tsx`
- Rewrite the five timeline moments: less poetic symmetry, more real
- Remove em dashes from intro and timeline text

### 4. `src/pages/Interests.tsx`
- Rewrite theme card descriptions to be shorter, punchier, less "writerly"
- Remove em dashes from intro and footer text

### 5. `src/pages/Contact.tsx`
- Simplify the intro and card descriptions
- Remove em dashes

### 6. `src/pages/FAQ.tsx`
- Rewrite all 8 answers: less perfectly structured, more honest and direct
- Remove em dashes from answers

### 7. `src/pages/TravelAgents.tsx`
- Rewrite the three info blocks and intro
- Remove em dashes

### 8. `src/components/Footer.tsx`
- Remove em dash from the tagline

## Technical details
- Pure content changes only, no structural/layout/component changes
- Approximately 50+ instances of em dash removal across all files
- All copy rewritten in the same pass

