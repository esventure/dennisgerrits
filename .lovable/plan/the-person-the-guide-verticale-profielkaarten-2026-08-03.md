# The Person & The Guide — verticale profielkaarten

## Doel
De huidige twee horizontale banen vervangen door twee verticale profielkaarten. Op desktop staan de kaarten naast elkaar, op mobiel en tablet stapelen ze. Elke kaart krijgt een groot portret bovenaan en het verhaal eronder, als een magazine-bijdrage.

## Aanpak

1. **Nieuwe component-structuur in `src/components/AboutCarousel.tsx`**
   - Voeg een vierde variant toe: `AboutProfileCards`.
   - Laat de carousel deze variant renderen (vervang `AboutEditorial` als hoofdweergave).
   - Behoud `AboutEditorial`, `AboutLetter` en `AboutFigures` in de code voor later, maar render ze niet.

2. **Kaart-layout**
   - Desktop: `grid-cols-2` met twee even hoge kaarten naast elkaar.
   - Tablet: `grid-cols-1 md:grid-cols-2` zodat ze op tablet nog naast elkaar passen, met aangepaste padding.
   - Mobiel: gestapeld, volledige breedte.
   - Elke kaart heeft bovenaan een foto-container met vaste hoogte (`h-80 sm:h-96 lg:h-[28rem]`) en daaronder de tekst.

3. **Foto's**
   - Gebruik de huidige originele assets: `dennis-person-original.jpg` en `dennis-guide-original.jpg`.
   - Behoud de `<img>`-rendering met `object-fit: cover` en het huidige `PhotoAdjustments`-systeem (x, y, zoom, rotate).
   - De foto-editor blijft werken op de nieuwe kaartfoto's.

4. **Tekst en stijl per kaart**
   - **The Person**: off-white achtergrond, donkere tekst, oranje handgetekende underline.
   - **The Guide**: paarse (`--primary`) achtergrond, lichte tekst, oranje handgetekende underline.
   - Kicker, titel, body en underline behouden hun huidige typografie en teksten.
   - Tekstkolom gecentreerd in de kaart, met `max-w-md` zodat regellengte leesbaar blijft voor 55+.

5. **Animatie**
   - Behoud subtiele fade-in via het bestaande `FadeIn`-component.
   - Linkerkaart fade-in zonder vertraging, rechterkaart met `delay={0.15}`.

6. **Responsive en toegankelijkheid**
   - Ruimere padding op grotere schermen, compactere padding op mobiel.
   - Foto's blijven herkenbaar op iPad/tablet.
   - Alt-teksten en lazy loading blijven intact.

7. **Opruimen**
   - Verwijder de huidige horizontale band-layout uit de actieve render.
   - Zorg dat de carousel nog steeds alleen de gekozen variant toont (geen lege carousel-states).

## Technische details
- Nieuwe variant `AboutProfileCards` in `src/components/AboutCarousel.tsx`.
- Gebruik bestaande `PhotoAdjustments`, `DEFAULT_ADJUSTMENTS`, editor en opslag (`about-photo-adjustments-v3`).
- Grid via Tailwind: `grid grid-cols-1 md:grid-cols-2`.
- Foto-container: `aspect-[4/5]` of vaste hoogte met `overflow-hidden`.
- Geen nieuwe dependencies.
