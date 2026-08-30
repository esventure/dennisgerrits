import imgHistory from "@/assets/interests/history.jpg";
import imgFood from "@/assets/interests/food.jpg";
import imgArchitecture from "@/assets/interests/architecture.jpg";
import imgArt from "@/assets/interests/art.jpg";
import imgNature from "@/assets/interests/nature.jpg";
import imgWater from "@/assets/interests/water.jpg";
import imgNeighborhood from "@/assets/interests/neighbourhood.jpg";
import imgTulips from "@/assets/interests/tulips.jpg";
import imgHeritageMemory from "@/assets/interests/heritage-memory.jpg";
import imgLeiden from "@/assets/interests/leiden.jpg";
import imgCountryside from "@/assets/interests/countryside.jpg";
import imgRotterdam from "@/assets/interests/rotterdam.jpg";
import imgDelft from "@/assets/interests/delft.jpg";
import imgBrownCafe from "@/assets/interests/brown-cafe.jpg";
import imgVanGogh from "@/assets/interests/vangogh.jpg";
import imgHaarlem from "@/assets/interests/haarlem.jpg";
import imgRembrandt from "@/assets/interests/rembrandt.jpg";
import imgQuietCorners from "@/assets/interests/quiet-corners.jpg";
import imgShapedByWater from "@/assets/interests/shaped-by-water.jpg";
import imgCycling from "@/assets/interests/cycling.jpg";

export type ExperienceTheme = {
  id: string;
  slug: string;
  title: string;
  note: string;
  caption: string;
  body: string[];
  image: string;
  /** Absolute URL of this experience's own social sharing image. */
  ogImage: string;
  /** Full <title> for this experience (already includes the brand). */
  seoTitle: string;
  /** Title used for og:title and twitter:title. */
  socialTitle: string;
  rotate: number;
  pin: "tape-tl" | "tape-tr" | "tape-gl" | "tape-gr";
};


type Block = {
  title: string;
  note: string;
  caption: string;
  body: string[];
  image: string;
};

const blocks: Block[] = [
  {
    title: "The neighborhood",
    note: "real Amsterdam lives here",
    caption:
      "Quiet side streets where everyday life unfolds. Someone watering plants outside their front door. A neighbor locking up a bicycle.",
    body: [
      "Most visitors see Amsterdam from the busiest streets. I like to walk one canal further, into the streets where people actually live. Kids on their way to school, a baker who knows every regular by name, laundry drying behind a window that has not changed in fifty years.",
      "We take our time here. I show you how a neighborhood is built, why the houses lean the way they do, and what changed in the last twenty years. You leave with the feeling of having visited a place, not a postcard.",
    ],
    image: imgNeighborhood,
  },
  {
    title: "Rembrandt and the Golden Age Stories",
    note: "the city that painted itself into history",
    caption:
      "Rembrandt and his living light. Rijksmuseum walls full of time and memory. Golden Age architecture where history still breathes.",
    body: [
      "In the seventeenth century Amsterdam was rich, curious and restless. That is the world Rembrandt painted in, and you can still walk through it. The houses of the merchants, the streets where his studio stood, the light he chased in every portrait.",
      "We look at the paintings together, but we also look at what is behind them. Who paid for them, who is missing from them, and what that century cost. It makes the Rijksmuseum feel like a story instead of a checklist.",
    ],
    image: imgRembrandt,
  },
  {
    title: "Food Culture",
    note: "where you taste Amsterdam, one bite at a time",
    caption:
      "Morning markets full of daily life. The smell of fresh bread from bakeries. Local flavors in every bite.",
    body: [
      "Dutch food has a reputation it does not deserve. Start at a market in the morning, taste cheese that was made a few kilometers outside the city, herring the way locals eat it, a stroopwafel pressed while you wait, and you will understand quickly.",
      "Amsterdam is also an immigrant city, so the food map runs from Surinamese roti to Indonesian rijsttafel to Turkish bakeries. I take you to places I actually eat myself, not the ones with the biggest sign.",
    ],
    image: imgFood,
  },
  {
    title: "Slow Evenings",
    note: "when Amsterdam turns quiet and cozy",
    caption:
      "Brown cafés where time disappears. Locals settling into their night. Small restaurants that feel like home.",
    body: [
      "When the day trippers leave, the city softens. The brown cafés fill up, the light on the canals turns gold, and conversations get longer. This is the Amsterdam I love most.",
      "An evening like this is not a schedule. It is a drink at a bar that has been serving for two hundred years, a walk over a bridge with nobody on it, and a small restaurant where the owner cooks what the market had that morning.",
    ],
    image: imgBrownCafe,
  },
  {
    title: "From the Water",
    note: "seeing the city in a different rhythm",
    caption:
      "On a private boat through quiet canals. The city unfolding around you. A picnic, wine, and shared moments.",
    body: [
      "Amsterdam was built for boats, so the canals show you the city the way it was designed to be seen. From the water the houses are taller, the bridges are lower, and the whole rhythm slows down.",
      "I arrange a private boat with a skipper, not a crowded tour vessel. Bring a picnic, a bottle of wine, and a few hours. It is often the part of the day people remember longest.",
    ],
    image: imgWater,
  },
  {
    title: "Living Architecture",
    note: "unlike anywhere else in the world",
    caption:
      "A city built in layers of time. Old and modern architecture side by side. Every building carries its own story.",
    body: [
      "Amsterdam is a museum you walk through without a ticket. Medieval wooden houses, seventeenth century canal palaces, Amsterdam School brickwork, and bold new buildings on the eastern islands, all within one afternoon.",
      "I show you what to look at: the hoisting beams, the gable stones, the small details that tell you who lived there and what they traded. Once you see them you cannot unsee them.",
    ],
    image: imgArchitecture,
  },
  {
    title: "Stories of History",
    note: "feel how time has passed through Amsterdam",
    caption:
      "So many lives have shaped this city. History still lives in every street. 750 years of change.",
    body: [
      "Amsterdam turned 750 years old, and almost every one of those centuries left something behind. A dam in a river, a trading empire, a refuge for people with the wrong religion, a war, a rebuilding, a city that keeps reinventing itself.",
      "I tell that history the way I would tell it to a friend, with the people in front and the dates behind. No lectures, just stories you can still stand inside.",
    ],
    image: imgHistory,
  },
  {
    title: "Van Gogh Creates",
    note: "see the world through his eyes",
    caption:
      "Van Gogh Museum, where his work lives. His art is also found in the Kröller-Müller Museum. A life shaped by color and emotion.",
    body: [
      "Van Gogh painted for barely ten years and changed how we look at everything. In the Van Gogh Museum you can follow that decade almost month by month, from the dark potato eaters to the wheat fields that burn with color.",
      "If you have more time, the Kröller-Müller Museum in the middle of a national park holds another great part of his work. We can make a full day of it, with a bike ride through the woods included.",
    ],
    image: imgVanGogh,
  },
  {
    title: "On Two Wheels",
    note: "experience Amsterdam like the locals do",
    caption:
      "Feel the freedom of movement. Bikes shape the city's DNA. It's a way of life for locals.",
    body: [
      "In Amsterdam the bicycle is not a sport, it is how you get to work, to school and to dinner. Riding along means you cover more ground and you stop being a spectator.",
      "We ride at a calm pace, on quiet routes, with stops whenever something is worth stopping for. If you are unsure about traffic, we practice first in a park until it feels natural.",
    ],
    image: imgCycling,
  },
  {
    title: "Heritage of Memory",
    note: "Jewish history and World War II in Amsterdam",
    caption:
      "Jewish life through the centuries. Stories of survival, courage and resistance. The impact of World War II on the city.",
    body: [
      "For centuries Amsterdam was a place where Jewish life could flourish, and then it became the city where most of that life was destroyed. Both parts belong to the story, and both are still visible in the streets.",
      "We visit the Jewish quarter, the memorials and, if you wish, the Anne Frank House or the Hollandsche Schouwburg. It is a quiet, careful day, and I give you the space it deserves.",
    ],
    image: imgHeritageMemory,
  },
  {
    title: "Art Scene",
    note: "a vibrant art world in Amsterdam",
    caption:
      "Artists shaping the city. Streets full of galleries and antique stores. Graffiti and art in public spaces.",
    body: [
      "The art here does not stop at the museum doors. Small galleries, artist studios in former shipyards, antique dealers who love to talk, murals on the side of an apartment block.",
      "We follow whatever you are drawn to, from contemporary photography to street art in Noord. I know the people behind many of these doors, which usually makes for a better conversation.",
    ],
    image: imgArt,
  },
  {
    title: "Gardens & Green Spaces",
    note: "a greener side of Amsterdam",
    caption:
      "Hidden gardens and botanical gardens in the city. Beautiful parks where people gather and enjoy life. Quiet spaces to relax and unwind.",
    body: [
      "Behind the canal houses lie gardens almost nobody sees from the street. Add the Hortus Botanicus, the hidden courtyards and the big parks, and Amsterdam is far greener than it looks on a map.",
      "This is a gentle day with benches, coffee and shade. Perfect if you want beauty without a long walk, or if you simply need the city to slow down for a few hours.",
    ],
    image: imgNature,
  },
  {
    title: "Quiet Corners",
    note: "benches where Amsterdam slows down",
    caption:
      "Sit and watch the city pass by. Rest, enjoy and just be. Share stories with locals nearby.",
    body: [
      "Some of the best moments of a day here happen sitting down. A bench on a bridge, a terrace on a square that tourists walk past, a courtyard where the noise of the city disappears completely.",
      "I build these pauses into every day on purpose. They are where the conversations happen, and where you start to feel the city instead of only seeing it.",
    ],
    image: imgQuietCorners,
  },
  {
    title: "Shaped by Water",
    note: "how the Netherlands lives with water every day",
    caption:
      "A constant fight with water. Continuous innovation in water management. Cities built around water systems.",
    body: [
      "Half of this country would be under water without the work of engineers, and that fact shapes everything: the landscape, the cities, even the way the Dutch make decisions together.",
      "We look at dikes, pumping stations, windmills and modern storm barriers, and I explain how it all fits together. It sounds technical, but it is really a story about a country that refused to move.",
    ],
    image: imgShapedByWater,
  },
  {
    title: "The Dutch Countryside",
    note: "step into a living postcard",
    caption:
      "Endless farmlands stretching to the horizon. Colorful houses, windmills and waterlands. A quiet rhythm of rural life.",
    body: [
      "Half an hour outside Amsterdam the horizon opens up. Meadows, cows, drawbridges, wooden houses in green and white, and villages where nothing needs to hurry.",
      "We visit farms, small harbors and windmills that still work, and stop wherever the light is good. It is the best way to understand where the city gets its food, its wealth and its calm.",
    ],
    image: imgCountryside,
  },
  {
    title: "Tulip Season",
    note: "in spring, the landscape blooms even brighter",
    caption:
      "Tulip fields in endless bloom. Keukenhof Gardens, wandering among countless flowers. A vibrant mix of colors and scents that stays with you forever.",
    body: [
      "From late March into May the fields south of Amsterdam turn into stripes of red, yellow and pink. Keukenhof is the famous stop, and it is worth it, but the fields themselves are the real spectacle.",
      "Timing matters a lot in this season, so I follow the bloom closely and plan the day around where the flowers actually are, and around the hours when it is quietest.",
    ],
    image: imgTulips,
  },
  {
    title: "Haarlem",
    note: "home of Frans Hals and hidden beauty",
    caption:
      "Close to Amsterdam, different in spirit. Frans Hals Museum, see the master at work. A city of courtyards, quiet streets and timeless elegance.",
    body: [
      "Haarlem is fifteen minutes by train and feels a century calmer. A great market square, a cathedral with the organ Mozart played, and the Frans Hals Museum with its extraordinary portraits.",
      "The real pleasure is the hofjes, small almshouse courtyards hidden behind unmarked doors. I know which ones you can enter and when.",
    ],
    image: imgHaarlem,
  },
  {
    title: "Leiden",
    note: "birthplace of Rembrandt and rich in history",
    caption:
      "Centuries of stories along its beautiful canals. The Netherlands' oldest university city. Home to many Pilgrim Fathers before the Mayflower voyage.",
    body: [
      "Leiden is a student city with canals, a windmill in the middle of town and the oldest university in the country. Rembrandt was born here, and the Pilgrims lived here for years before sailing to America.",
      "For American visitors especially, this is often the most surprising day of the trip. The Pilgrim story is told here in a detail you rarely find at home.",
    ],
    image: imgLeiden,
  },
  {
    title: "Rotterdam",
    note: "where innovation, architecture and creativity meet",
    caption:
      "A city reinvented through vision and design. Bold architecture and a modern skyline. Where the future is already taking shape.",
    body: [
      "Rotterdam lost its center in a single night in 1940 and decided to build something entirely new. The result is the boldest skyline in the Netherlands and a city that never stopped experimenting.",
      "We walk the market hall, the cube houses and the harbor, and I explain why this city thinks so differently from Amsterdam. It is a great contrast to add to your trip.",
    ],
    image: imgRotterdam,
  },
  {
    title: "Delft & The Hague",
    note: "Dutch history, royalty and art together",
    caption:
      "The Hague, royal palaces and political power. Delft, home of Vermeer and Delft Blue porcelain. Two iconic cities shaped by centuries of culture.",
    body: [
      "The Hague is where the country is governed and where the Mauritshuis keeps Vermeer's Girl with a Pearl Earring. Delft, a few minutes away, is where Vermeer lived and where the blue porcelain is still painted by hand.",
      "Together they make one very full, very rewarding day: royal palaces, world famous paintings, and a small canal city that has barely changed since the seventeenth century.",
    ],
    image: imgDelft,
  },
];

const rotations = [-2.4, 1.8, -1.2, 2.2, -1.6, 1.4, -2.0, 1.6];
const pins = ["tape-tl", "tape-tr", "tape-gl", "tape-gr"] as const;

export const SITE_ORIGIN = "https://dennisgerrits.com";

/**
 * Each experience has its own sharing image. The bundled imports carry a
 * build hash, so the same photos live in /public/images/interests to give
 * crawlers a stable absolute URL.
 */
const shareImageByImport = new Map<string, string>([
  [imgNeighborhood, "neighbourhood.jpg"],
  [imgRembrandt, "rembrandt.jpg"],
  [imgFood, "food.jpg"],
  [imgBrownCafe, "brown-cafe.jpg"],
  [imgWater, "water.jpg"],
  [imgArchitecture, "architecture.jpg"],
  [imgHistory, "history.jpg"],
  [imgVanGogh, "vangogh.jpg"],
  [imgCycling, "cycling.jpg"],
  [imgHeritageMemory, "heritage-memory.jpg"],
  [imgArt, "art.jpg"],
  [imgNature, "nature.jpg"],
  [imgQuietCorners, "quiet-corners.jpg"],
  [imgShapedByWater, "shaped-by-water.jpg"],
  [imgCountryside, "countryside.jpg"],
  [imgTulips, "tulips.jpg"],
  [imgHaarlem, "haarlem.jpg"],
  [imgLeiden, "leiden.jpg"],
  [imgRotterdam, "rotterdam.jpg"],
  [imgDelft, "delft.jpg"],
]);

const FALLBACK_SHARE_IMAGE = `${SITE_ORIGIN}/images/dennis-og-hero.jpg`;

/**
 * The four places outside Amsterdam are day trips, so "… in Amsterdam"
 * would be factually wrong in the search result. They get their own title.
 */
const socialTitleOverrides: Record<string, string> = {
  Haarlem: "Haarlem Day Trip from Amsterdam",
  Leiden: "Leiden Day Trip from Amsterdam",
  Rotterdam: "Rotterdam Day Trip from Amsterdam",
  "Delft & The Hague": "Delft & The Hague Day Trip from Amsterdam",
};

export const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const experiences: ExperienceTheme[] = blocks.map((b, i) => {
  const file = shareImageByImport.get(b.image);
  const socialTitle = socialTitleOverrides[b.title] ?? `${b.title} in Amsterdam`;
  return {
    id: `block-${i + 1}`,
    slug: slugify(b.title),
    title: b.title,
    note: b.note,
    caption: b.caption,
    body: b.body,
    image: b.image,
    ogImage: file ? `${SITE_ORIGIN}/images/interests/${file}` : FALLBACK_SHARE_IMAGE,
    socialTitle,
    seoTitle: `${socialTitle} | Dennis Gerrits`,
    rotate: rotations[i % rotations.length],
    pin: pins[i % pins.length],
  };
});


export const experienceSlugs = experiences.map((t) => t.slug);
