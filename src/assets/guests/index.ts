// Real guest photos provided by Dennis. 16 source images, displayed
// across the Mosaic Wall as 50 tiles. The wall is in constant motion
// and tiles are small, so light repetition reads as texture, not duplication.
//
// To add more photos: drop pNN.png files in this folder, add the import
// below, and push them into `sourcePhotos`. The build50 helper handles
// distribution and prevents adjacent duplicates.

import p01 from "./p01.png";
import p02 from "./p02.png";
import p03 from "./p03.png";
import p04 from "./p04.png";
import p05 from "./p05.png";
import p06 from "./p06.png";
import p07 from "./p07.png";
import p08 from "./p08.png";
import p09 from "./p09.png";
import p10 from "./p10.png";
import p11 from "./p11.png";
import p12 from "./p12.png";
import p13 from "./p13.png";
import p14 from "./p14.png";
import p15 from "./p15.png";
import p16 from "./p16.png";
import p17 from "./p17.jpg";
import p18 from "./p18.jpg";
import p19 from "./p19.jpg";
import p20 from "./p20.jpg";
import p21 from "./p21.jpg";
import p22 from "./p22.jpg";
import p23 from "./p23.jpg";
import p24 from "./p24.jpg";
import p25 from "./p25.jpg";
import p26 from "./p26.jpg";
import p27 from "./p27.jpg";
import p28 from "./p28.jpg";
import p29 from "./p29.jpg";
import p30 from "./p30.jpg";
import p31 from "./p31.jpg";
import p32 from "./p32.jpg";
import p33 from "./p33.jpg";
import p34 from "./p34.jpg";
import p35 from "./p35.jpg";

const sourcePhotos = [
  p01, p02, p03, p04, p05, p06, p07, p08,
  p09, p10, p11, p12, p13, p14, p15, p16,
  p17, p18, p19, p20, p21, p22, p23, p24, p25,
  p26, p27, p28, p29, p30, p31, p32, p33, p34, p35,
];

const TARGET = 50;

/**
 * Build a 50-tile array by interleaving full shuffled passes of the
 * source photos. Uses a deterministic seeded shuffle so the layout is
 * stable across rerenders, and skips back-to-back duplicates at pass
 * boundaries.
 */
function build50(): string[] {
  const seededShuffle = (arr: string[], seed: number) => {
    const a = [...arr];
    let s = seed;
    for (let i = a.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const j = Math.floor((s / 233280) * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const out: string[] = [];
  let pass = 0;
  while (out.length < TARGET) {
    const shuffled = seededShuffle(sourcePhotos, pass + 1);
    for (const photo of shuffled) {
      if (out.length >= TARGET) break;
      if (out.length > 0 && out[out.length - 1] === photo) continue;
      out.push(photo);
    }
    pass++;
  }
  return out;
}

export const guestPhotos = build50();
