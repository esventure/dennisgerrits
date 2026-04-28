// Real guest photos provided by Dennis. Displayed across the Mosaic Wall
// as 50 tiles. The wall is in constant motion and tiles are small, so
// light repetition reads as texture, not duplication.
//
// To add more photos: drop pNN.jpg files in this folder, add the import
// below, and push them into `sourcePhotos`. The build50 helper handles
// distribution and prevents adjacent duplicates.

import p16 from "./p16.jpg";
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
import p36 from "./p36.jpg";
import p37 from "./p37.jpg";
import p38 from "./p38.jpg";
import p39 from "./p39.jpg";
import p40 from "./p40.jpg";
import p41 from "./p41.jpg";
import p42 from "./p42.jpg";
import p43 from "./p43.jpg";
import p44 from "./p44.jpg";
import p45 from "./p45.jpg";
import p46 from "./p46.jpg";
import p47 from "./p47.jpg";
import p48 from "./p48.jpg";
import p49 from "./p49.jpg";
import p50 from "./p50.jpg";
import p51 from "./p51.jpg";
import p52 from "./p52.jpg";
import p53 from "./p53.jpg";
import p54 from "./p54.jpg";
import p55 from "./p55.jpg";
import p56 from "./p56.jpg";
import p57 from "./p57.jpg";
import p58 from "./p58.jpg";
import p59 from "./p59.jpg";
import p60 from "./p60.jpg";
import p61 from "./p61.jpg";
import p62 from "./p62.jpg";
import p63 from "./p63.jpg";
import p64 from "./p64.jpg";
import p65 from "./p65.jpg";
import p66 from "./p66.jpg";

const sourcePhotos = [
  p16, p17, p18, p19, p20,
  p21, p22, p23, p24, p25,
  p26, p27, p28, p29, p30, p31, p32, p33, p34, p35,
  p36, p37, p38, p39, p40, p41, p42, p43, p44, p45,
  p46, p47, p48, p49, p50, p51, p52, p53, p54, p55,
  p56, p57, p58, p59, p60, p61, p62, p63, p64, p65, p66,
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
