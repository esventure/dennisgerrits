

# Restructure Homepage: Rick Steves, Podcast, Speaking, How I Work, My Service

## Summary
The client wants several structural changes: (1) Rick Steves as a prominent trust signal, (2) Dennis's podcast given its own dedicated spot, (3) a "Book me for speaking/podcast/radio" section, (4) University Collaborations moved to the footer alongside Travel Agents, (5) two new distinct sections: "How I Work" and "My Service".

## Current State
- Section 5 ("More Than a Guide") contains mission pillars + a combined "In the Media" box (Rick Steves, Amsterdam Radio, University Collaborations as bullet points) + a podcast card
- No "How I Work" or "My Service" sections exist
- Footer only links to Travel Agents under "For Professionals"

## Changes

### 1. Rick Steves: Prominent trust signal (Index.tsx, section 4 area)
- Create a dedicated **Rick Steves feature block** near the Reviews section (after reviews, before "More")
- Large quote or endorsement-style card with Rick Steves' name prominently displayed
- Warm background, larger typography, possibly his name in the accent color
- This should feel like a standout testimonial, not buried in a list

### 2. Dennis's Podcast: Dedicated section (Index.tsx)
- Elevate the podcast from a small card inside section 5 to its own **full-width section**
- Title: "Two Stories, One City" with description about how it's an extension of Dennis's personality
- Podcast player embed placeholder, prominent and inviting
- Position it after "More Than a Guide" or as a standalone block

### 3. Speaking & Appearances: New visibility (Index.tsx)
- Add a clear block/card within the "More" section: **"Invite Dennis"**
- Copy: available for lectures, podcast guest appearances, and radio
- Simple CTA linking to the contact form
- Replaces the generic "In the Media" list approach

### 4. University Collaborations: Move to Footer (Index.tsx + Footer.tsx)
- Remove "University Collaborations" from the media list in section 5
- Add it to the Footer under "For Professionals" alongside Travel Agents: "Travel Agents & Concierges" and "Universities & Schools"

### 5. "How I Work" and "My Service": Two new sections (Index.tsx)
- Place these between the About section and the "Day in the Life" section
- **How I Work**: Dennis's personal approach. How he gets to know people, how everything is tailored, how personal and bespoke his method is. Warm, conversational tone.
- **My Service**: What people concretely receive. What Dennis arranges, organises, and makes possible. More tangible and practical.
- Two-column or stacked layout with clear visual distinction between the two

### 6. Navigation update (Header.tsx)
- Update nav labels to reflect new section structure (add "How I Work" anchor)

## Section Order (updated)
1. Hero
2. Blockquote
3. About (The Person / The Guide split)
4. **How I Work** (new)
5. **My Service** (new)
6. A Day in the Life
7. Reviews + **Rick Steves feature**
8. More Than a Guide (mission pillars + **Invite Dennis** card + restructured media)
9. **Podcast** (elevated to own section)
10. Stories
11. Contact & FAQ

## Files Changed
1. **`src/pages/Index.tsx`** — Add How I Work section, My Service section, Rick Steves feature block, elevated podcast section, Invite Dennis card, remove University Collaborations from media list
2. **`src/components/Footer.tsx`** — Add "Universities & Schools" link under For Professionals
3. **`src/components/Header.tsx`** — Update nav links to include new anchors

