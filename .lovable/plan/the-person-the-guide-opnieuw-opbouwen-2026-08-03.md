# The Person & The Guide opnieuw opbouwen

## Doel
De huidige gedeelde 50/50-sectie vervangen door twee brede redactionele banen onder elkaar. Iedere baan krijgt een zelfstandige tekstkolom en fotokolom, zodat de originele foto's stabiel, groot en herkenbaar blijven op desktop, tablet en mobiel.

## Aanpak
1. **Nieuwe beeldstructuur**
   - Maak één paginabrede baan voor **The Person** en één voor **The Guide**.
   - Plaats op desktop de tekst links en de foto rechts, met een zachte witte respectievelijk paarse overgang op de grens.
   - Geef de foto een echte `<img>`-container met een vaste responsieve verhouding, in plaats van een achtergrondafbeelding over de hele tekstsectie.

2. **Originele foto's opnieuw gebruiken**
   - Gebruik `LW_Dennis-5_-_The_person-4.jpg` voor The Person.
   - Gebruik `dennis-1-4.jpg` voor The Guide.
   - Sla beide via de project-assets op zodat ze ook op het gepubliceerde domein betrouwbaar laden.

3. **Voorspelbare uitsnede**
   - Gebruik `object-fit: cover` met een afzonderlijk focuspunt per foto.
   - Beperk de bediening tot een logisch horizontaal focuspunt, verticaal focuspunt en bescheiden zoom binnen de fotokolom.
   - Gebruik dezelfde beeldcontainer in de editor en in de uiteindelijke weergave, zodat de preview exact overeenkomt met publicatie.

4. **Responsive gedrag**
   - Desktop: ruime tekstkolom links en dominante foto rechts.
   - Tablet: dezelfde compositie met aangepaste kolombreedtes en tekstafstand.
   - Mobiel: foto boven tekst, zonder verloop over het gezicht of de tekst.

5. **Opruimen en controleren**
   - Verwijder de oude aspect-ratio achtergrondlagen, extreme positiepercentages en dubbele maskers uit deze variant.
   - Behoud alle huidige teksten, kleuren, typografie en subtiele fade-in animaties.
   - Controleer de secties visueel op desktop, tablet en mobiel en verifieer dat beide assets laden.

## Technische details
De nieuwe fotokolommen krijgen stabiele afmetingen via gridtracks en `aspect-ratio`. De afbeelding wordt één keer gerenderd als `<img>`; een los overlay-element verzorgt uitsluitend de zachte overgang. Hierdoor zijn uitsnede, editorwaarden en gepubliceerde weergave niet meer afhankelijk van de totale schermbreedte of browserzoom.