# Adding photos to the guest collage

The collage on the homepage ("Stories from my guests") is built from a fixed
folder of images plus a list of alt texts.

## 1. Add the photo files

Put new JPG files in:

```
src/assets/guests/
```

Use the same naming pattern as the existing ones (`p67.jpg`, `p68.jpg`, ...).
Recommended: landscape or portrait JPG, longest side around 1600px, under 500 KB.

Then add the new file to the list in `src/assets/guests/index.ts`:

```ts
import p67 from "./p67.jpg";

export const guestPhotos = [ /* ...existing... */, p67 ];
```

## 2. Set the alt text

Alt text is what screen readers and search engines read. It lives in
`src/components/MosaicWall.tsx`, in the `ALT_TEXTS` array near the top of the
file. The texts repeat across the tiles, so around twelve good descriptions is
enough.

Write what is visible, honestly and short:

- Good: "A canal boat passing under a low bridge in the Jordaan"
- Good: "Guests tasting cheese at a market stall"
- Avoid: names of guests, dates, or marketing claims

## 3. Check the result

Open the homepage and scroll to the collage. On mobile it shows five rows and
can be scrolled sideways by hand; on desktop it drifts automatically.
