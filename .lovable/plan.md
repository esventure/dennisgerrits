## Travel Agents Page — Proposed Setup

Dennis's note + the Word doc make the positioning clear: this page is **not** a generic "for partners" page. It's an editorial pitch to high-end travel advisors that says "I am your trusted contact in Amsterdam." The current page is generic placeholder copy and needs to be rebuilt around his actual narrative.

Here's the structure I propose, in his voice and in our existing editorial style (Bebas Neue headings, Outfit body, Heritage palette, off-white bg, generous whitespace, no aggressive CTAs).

---

### Section flow

```text
1. Hero ─────────────── "I take care of your clients in Amsterdam."
2. The Promise ──────── 4-line manifesto from doc opener
3. Two Ways to Work ─── Side-by-side cards: "Hand it Over" / "On the Ground"
4. Always On Call ───── Direct phone line, evenings included, the small things
5. Deeply Local ─────── 20 years in Amsterdam, beyond the city
6. Testimonials ─────── Two pull-quotes from advisors (placeholder names for now)
7. Logos (optional) ─── Quiet logo strip — Dennis is undecided, see open question
8. Let's Connect ────── Calendly-style "Schedule a short call" + simple inquiry form
```

This mirrors the doc's order so Dennis can recognize his own text on the page.

---

### Section-by-section content

**1. Hero**
- Eyebrow: "For Travel Advisors"
- Headline: **"I take care of your clients in Amsterdam."** (lifted directly from his email subject line, strongest line in the doc)
- Subhead: "You don't need another guide. You need someone you can trust with your clients, completely. I am your trusted contact in Amsterdam, and when needed, throughout the Netherlands."
- One small CTA: "Schedule a short call"

**2. The Promise**
A single editorial paragraph block, generous whitespace, set on the off-white background. Direct lift from his opener:
> "Someone who understands that your reputation is on the line. That your clients expect not just a well-planned trip, but a seamless, personal, and deeply local experience. That's where I come in."

**3. Two Ways to Work Together**
Two side-by-side cards (matching the visual treatment of the "Three Ways to Explore" cards on the homepage so the system feels coherent):

- **You Hand It Over — I Take Care of Everything**
  Bullets: video call with clients · tailored itineraries · hotels & pacing advice · all reservations, tickets, restaurants, private boats & cars
- **You Plan — I Deliver on the Ground**
  Bullets: personal, meaningful guiding · elevate your itinerary with local access · ensure smooth execution on arrival

Section closer: *"Every travel advisor works differently. I adapt to you."*

**4. Always On Call** (the trust section)
Heading: **"Your clients have a local they can rely on."**
Body summarizes pages 1–2 of his doc: phone number shared directly, available evenings, last-minute reservations, public transport, finding a pharmacy. Closing line in his exact words: *"Quietly, quickly, and personally. So you don't have to."*

**5. Deeply Local. Personally Connected.**
Two stacked short paragraphs from page 2: 20 years in Amsterdam, plus extending beyond the city. This is the only place I'd suggest a portrait photo (or his Amsterdam skyline motif as a side accent) to break up the text.

**6. Testimonials**
Two pull-quotes, set in the calm Outfit body style we used for the "How I Work" pull-quote (orange left border, off-white bg, no italics). Both quotes are anonymous-by-region for now ("Travel Advisor, USA") since Dennis is still gathering attributions.

**7. Logo strip — OPEN QUESTION**
Dennis is undecided. Two design options if he wants to include them:
- (a) **Quiet, monochrome strip** of 4–6 advisor logos at very low contrast, single row, no border. Editorial, doesn't shout.
- (b) **Skip entirely** and let the testimonials carry the social proof.
My recommendation: (a) **only when he has 4+ confirmed logos with permission**. Two logos look thin; one looks accidental. Until then, skip.

**8. Let's Connect**
Replace the current generic form with a tighter version:
- One short paragraph: *"If this resonates, I'd love to hear from you."*
- Primary CTA: **"Schedule a short call"** button (links to his booking flow / Calendly)
- Secondary: small inquiry form (Name · Agency · Email · "Tell me about your clients") for those who'd rather write
- Show his direct email below the form for high-trust advisors who prefer to skip both

---

### Open questions for Dennis (I'd recommend asking before final build)

1. **Logos**: include or skip for v1? My vote: skip until he has 4+ confirmed.
2. **Testimonial attribution**: keep "Travel Advisor, USA" anonymous, or get permission to name agencies? Named is much stronger but takes longer to gather.
3. **"Schedule a short call" target**: existing Book a Call flow, or a separate Calendly link specifically for advisors so he can triage them differently?
4. **Photo in the "Deeply Local" section**: his portrait (warm, personal) or an Amsterdam scene (editorial, less self-focused)?

---

### Files to change
- `src/pages/TravelAgents.tsx` — full rebuild using existing FadeIn, button, input components, Heritage tokens, and the same section rhythm as `Index.tsx`.
- No new dependencies.
- Header/Footer already link to `/travel-agents` so no routing changes needed.

### Out of scope for this page
- The advisor outreach **email** in his doc is for him to send from his own inbox, not part of the website. I'll leave it untouched unless he wants me to set up an email template.
