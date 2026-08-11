# Feedback verwerken (notities 8 augustus)

## Eerst: het contactformulier

Het formulier verstuurt op dit moment **niets**. Bij "Send" wordt alleen een bevestigingsmelding getoond en worden de velden geleegd; er is geen mailadres, geen e-mailservice en geen opslag in de database. Berichten die bezoekers achterlaten komen dus nergens aan.

Voorstel (aparte stap, na jouw akkoord): berichten opslaan in de database én doorsturen per e-mail via Resend naar een adres van Dennis. Daar heb ik van jou nodig:
- naar welk e-mailadres de berichten moeten gaan;
- of we vanaf een eigen domein (bijv. no-reply@dennisgerrits.com) mogen versturen, want dan is er een domeinverificatie nodig.

## Footer
- "For Travel Advisors & Concierges" scrollt bij navigatie niet naar boven: bij een routewissel altijd naar de top scrollen.
- Onder de copyrightregel toevoegen: "Webdesign by Es Venture" met link naar https://www.esventure.nl.

## What I take care of
Zes items in deze volgorde en met deze teksten:
1. Museum Reservations - Helping arrange tickets and timed-entry reservations for museums and cultural experiences.
2. Dining Reservations - Thoughtfully selected restaurants, from local favorites to memorable dining experiences.
3. Transportation Coordination - Help arranging transportation, including airport transfers, train tickets and local travel.
4. Private Cars & Boats - Arranging private cars and boats for comfortable and seamless travel.
5. Hotel & B&B Recommendations - Recommendations for hotels and B&Bs in locations that suit your travel style and plans.
6. On-the-Ground Support - Personal support, practical help and local advice whenever you need it during your stay.

Nieuw item "Private Cars & Boats" krijgt een passend hand-drawn icoon (boot). Teksten staan deels in de database, die worden meegewijzigd zodat de site en de admin gelijk lopen.

## A Day in My Amsterdam
- "Following Curiosity": tekst wordt "In the afternoon, we continue exploring the streets and canals together."
- "A Hidden Place": tekst wordt "Here we take our time, continue our conversation and enjoy the slower pace of the day."

Plattegrond:
- "Starts here" weghalen.
- Rood kruis in Het IJ weghalen.
- Alle iconen bij de genummerde stops weghalen (route, nummers en labels blijven).

## Radio interview
- De vier tags (Neighbourhood life, Canals, Local culture, Living in Amsterdam) verwijderen.
- Bijschrift onder de foto wordt: "Live at Studio Zeedijk - Amsterdam."
- Rode kleurzweem in de foto verminderen via een lichte CSS-correctie (saturatie/hue), zodat het originele bestand ongemoeid blijft.

## What draws you in
Volgorde wordt:
1. Threads to follow (kicker)
2. What draws you in?
3. No two journeys are ever the same. These are a few places where they often begin.
4. Some ideas to inspire your journey.

Deze wijziging geldt zowel op de homepage als op de Experiences-pagina.

## Podcast
- Ontbrekende spatie herstellen: "Start with Episode 0 and step into the world of Two Stories, One City."

## For Professionals
- Kop en intro volgens de notities:
  - "For Travel Advisors & Concierges"
  - "I take care of your clients in Amsterdam and the Netherlands."
  - "20+ years in tourism - 9 years as a private guide - Local expert"
  - Drie alinea's plus slotregel "You take care of the journey. I take care of them."
- Option 1: "You hand it over, I take care of the rest." zonder boek-icoon.
- Option 2: "You plan, I handle everything locally." zonder schoen-icoon.
- Sectie "Your clients have a local they can rely on" met de aangeleverde tekst en de lijst onder "Where I Come In" (Private Guiding, Custom Itineraries, Museum Reservations: Tickets & Timed Entry, Dining Reservations, Transportation Coordination, Private Boats & Cars, Last-Minute Adjustments, On-the-Ground Support).
- Get in touch: "Send me a message through the contact form or WhatsApp, and I'll get back to you within 24 hours."

## Technisch
- `src/components/Footer.tsx`: credit-regel; scroll-naar-top bij routewissel via een kleine ScrollToTop in `src/Layout.tsx`.
- `src/pages/Index.tsx`: concierge-lijst, dagteksten, radio-sectie, kicker-volgorde, podcasttekst.
- `src/components/DayMap.tsx`: label, kruis en stop-iconen verwijderen.
- `src/pages/GetInspired.tsx`: kicker-volgorde.
- `src/pages/TravelAgents.tsx`: copy en iconen.
- `src/lib/siteContentSchema.ts` plus een database-update van `site_content` voor de gewijzigde en nieuwe servicesleutels.
