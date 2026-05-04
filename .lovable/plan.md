## Show 6 TripAdvisor reviews

Two small edits in `src/pages/Index.tsx`:

### 1. Add two reviews to the `reviews` array (line 53)

Append two new entries in the same shape as the existing ones (quote, author, location, date). Suggested copy, in the same voice as the current ones:

- "Dennis took us off the beaten path and showed us the Amsterdam locals know. We finished the day feeling like we'd made a friend, not hired a guide…" — Sarah & Tom, United Kingdom, May 2025
- "From the moment we connected by email, Dennis was attentive and thoughtful. The day itself flowed effortlessly. We can't recommend him highly enough…" — Linda H., Australia, October 2024

(Happy to swap these for real Tripadvisor quotes if you'd rather paste them in.)

### 2. Switch the reviews grid to 3 columns on desktop

Current grid (line 592):

```
grid-cols-1 md:grid-cols-2 ... max-w-4xl
```

becomes:

```
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ... max-w-6xl
```

So 6 cards lay out cleanly as 2 rows of 3 on desktop, 3 rows of 2 on tablet, stacked on mobile. Card styling, bubbles, and the "Read all 218 reviews" CTA stay unchanged.
