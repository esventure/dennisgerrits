# Replace manual TripAdvisor banner with an official TripAdvisor widget

Goal: show the live TripAdvisor rating and review count on the homepage via an official TripAdvisor embed, so the number updates automatically without manual edits.

## What changes

- Replace the static "5.0 · 235 reviews" TripAdvisor banner in the reviews section with an official TripAdvisor widget.
- Keep the existing review cards (Lisa A., dbw001, etc.) unchanged.
- Keep the manual `tripadvisor.review_count` value as a fallback for JSON-LD structured data in case the widget does not load during prerender.
- Ensure the widget loads responsibly (async, no layout shift, graceful fallback).

## Technical approach

1. **Obtain the widget code**
   - TripAdvisor widgets are generated from the business owner's TripAdvisor for Business dashboard for the listing `Love My City Tours` (Amsterdam).
   - The owner copies the provided HTML/JS snippet and shares it, or grants access so we can retrieve it.

2. **Create a small React wrapper component**
   - `src/components/TripAdvisorWidget.tsx` accepts the widget snippet as props.
   - Loads the TripAdvisor script asynchronously.
   - Renders a fallback to the current static banner while the widget is loading or if it fails.

3. **Integrate into the reviews section**
   - In `src/pages/Index.tsx`, swap the static banner block for `<TripAdvisorWidget />`.
   - Keep the surrounding grid and review cards intact.

4. **Preserve structured data**
   - The `Service` JSON-LD `aggregateRating.reviewCount` continues to read from `tripadvisor.review_count`.
   - Update the stored value to 235 now so the fallback and structured data are current until the widget takes over client-side.

5. **Verify**
   - Build passes and prerender completes.
   - Desktop and mobile screenshots show the widget loaded correctly.
   - Fallback banner still appears if the widget script is blocked.

## Open question before implementation

- We need the actual TripAdvisor widget snippet for `Love My City Tours`. Do you have access to the TripAdvisor for Business dashboard and can you paste the generated code here, or would you like us to guide you through retrieving it?
