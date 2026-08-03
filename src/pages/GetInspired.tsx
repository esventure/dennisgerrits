import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { cn } from "@/lib/utils";
import ContactSection from "@/components/ContactSection";
import imgHistory from "@/assets/interests/history.jpg";
import imgFood from "@/assets/interests/food.jpg";
import imgArchitecture from "@/assets/interests/architecture.jpg";
import imgArt from "@/assets/interests/art.jpg";
import imgNature from "@/assets/interests/nature.jpg";
import imgCraft from "@/assets/interests/craft.jpg";
import imgCafes from "@/assets/interests/cafes.jpg";
import imgCycling from "@/assets/interests/cycling.jpg";
import imgLiterature from "@/assets/interests/literature.jpg";
import imgMusic from "@/assets/interests/music.jpg";
import imgWater from "@/assets/interests/water.jpg";
import imgMarkets from "@/assets/interests/markets.jpg";
import imgNeighbourhood from "@/assets/interests/neighbourhood.jpg";
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

const blocks: { title: string; note: string; caption: string; image: string }[] = [
  {
    title: "The Neighbourhood Way",
    note: "real Amsterdam lives here",
    caption:
      "Quiet side streets where everyday life unfolds. Someone watering plants outside their front door. A neighbour locking up a bicycle.",
    image: imgNeighbourhood,
  },
  {
    title: "Rembrandt and the Golden Age Stories",
    note: "the city that painted itself into history",
    caption:
      "Rembrandt and his living light. Rijksmuseum walls full of time and memory. Golden Age architecture where history still breathes.",
    image: imgRembrandt,
  },
  {
    title: "Food Culture",
    note: "where you taste Amsterdam, one bite at a time",
    caption:
      "Morning markets full of daily life. The smell of fresh bread from bakeries. Local flavours in every bite.",
    image: imgFood,
  },
  {
    title: "Slow Evenings",
    note: "when Amsterdam turns quiet and cozy",
    caption:
      "Brown cafés where time disappears. Locals settling into their night. Small restaurants that feel like home.",
    image: imgBrownCafe,
  },
  {
    title: "From the Water",
    note: "seeing the city in a different rhythm",
    caption:
      "On a private boat through quiet canals. The city unfolding around you. A picnic, wine, and shared moments.",
    image: imgWater,
  },
  {
    title: "Living Architecture",
    note: "unlike anywhere else in the world",
    caption:
      "A city built in layers of time. Old and modern architecture side by side. Every building carries its own story.",
    image: imgArchitecture,
  },
  {
    title: "Stories of History",
    note: "feel how time has passed through Amsterdam",
    caption:
      "So many lives have shaped this city. History still lives in every street. 750 years of change.",
    image: imgHistory,
  },
  {
    title: "Van Gogh Creates",
    note: "see the world through his eyes",
    caption:
      "Van Gogh Museum, where his work lives. His art is also found in the Kröller-Müller Museum. A life shaped by colour and emotion.",
    image: imgVanGogh,
  },
  {
    title: "On Two Wheels",
    note: "experience Amsterdam like the locals do",
    caption:
      "Feel the freedom of movement. Bikes shape the city's DNA. It's a way of life for locals.",
    image: imgCycling,
  },
  {
    title: "Heritage of Memory",
    note: "Jewish history and World War II in Amsterdam",
    caption:
      "Jewish life through the centuries. Stories of survival, courage and resistance. The impact of World War II on the city.",
    image: imgHeritageMemory,
  },
  {
    title: "Art Scene",
    note: "a vibrant art world in Amsterdam",
    caption:
      "Artists shaping the city. Streets full of galleries and antique stores. Graffiti and art in public spaces.",
    image: imgArt,
  },
  {
    title: "Gardens & Green Spaces",
    note: "a greener side of Amsterdam",
    caption:
      "Hidden gardens and botanical gardens in the city. Beautiful parks where people gather and enjoy life. Quiet spaces to relax and unwind.",
    image: imgNature,
  },
  {
    title: "Quiet Corners",
    note: "benches where Amsterdam slows down",
    caption:
      "Sit and watch the city pass by. Rest, enjoy and just be. Share stories with locals nearby.",
    image: imgQuietCorners,
  },
  {
    title: "Shaped by Water",
    note: "how the Netherlands lives with water every day",
    caption:
      "A constant fight with water. Continuous innovation in water management. Cities built around water systems.",
    image: imgShapedByWater,
  },
  {
    title: "The Dutch Countryside",
    note: "step into a living postcard",
    caption:
      "Endless farmlands stretching to the horizon. Colourful houses, windmills and waterlands. A quiet rhythm of rural life.",
    image: imgCountryside,
  },
  {
    title: "Tulip Season",
    note: "in spring, the landscape blooms even brighter",
    caption:
      "Tulip fields in endless bloom. Keukenhof Gardens, wandering among countless flowers. A vibrant mix of colours and scents that stays with you forever.",
    image: imgTulips,
  },
  {
    title: "Haarlem",
    note: "home of Frans Hals and hidden beauty",
    caption:
      "Close to Amsterdam, different in spirit. Frans Hals Museum, see the master at work. A city of courtyards, quiet streets and timeless elegance.",
    image: imgHaarlem,
  },
  {
    title: "Leiden",
    note: "birthplace of Rembrandt and rich in history",
    caption:
      "Centuries of stories along its beautiful canals. The Netherlands' oldest university city. Home to many Pilgrim Fathers before the Mayflower voyage.",
    image: imgLeiden,
  },
  {
    title: "Rotterdam",
    note: "where innovation, architecture and creativity meet",
    caption:
      "A city reinvented through vision and design. Bold architecture and a modern skyline. Where the future is already taking shape.",
    image: imgRotterdam,
  },
  {
    title: "Delft & The Hague",
    note: "Dutch history, royalty and art together",
    caption:
      "The Hague, royal palaces and political power. Delft, home of Vermeer and Delft Blue porcelain. Two iconic cities shaped by centuries of culture.",
    image: imgDelft,
  },
];

const rotations = [-2.4, 1.8, -1.2, 2.2, -1.6, 1.4, -2.0, 1.6];
const pins = ["tape-tl", "tape-tr", "tape-gl", "tape-gr"] as const;

const themes = blocks.map((b, i) => ({
  id: `block-${i + 1}`,
  slug: b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  title: b.title,
  caption: b.caption,
  note: b.note,
  image: b.image,
  rotate: rotations[i % rotations.length],
  pin: pins[i % pins.length],
}));

const GetInspired = () => {
  const [active, setActive] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const requestedSlug = searchParams.get("theme");

  useEffect(() => {
    if (!requestedSlug) {
      window.scrollTo(0, 0);
      return;
    }
    const match = themes.find((t) => t.slug === requestedSlug);
    if (!match) {
      window.scrollTo(0, 0);
      return;
    }
    setActive(match.id);
    const timer = window.setTimeout(() => {
      cardRefs.current[match.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 250);
    return () => window.clearTimeout(timer);
  }, [requestedSlug]);

  return (
    <main>
      {/* Interests — green header band */}
      <section
        className="relative pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16 overflow-hidden"
        style={{ backgroundColor: "hsl(var(--heritage-green))" }}
      >
        {/* paper-grain overlay for warmth on the green */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-screen"
          aria-hidden
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.92  0 0 0 0 0.85  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        <div className="relative container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <FadeIn>
              <p
                className="mb-3 text-2xl md:text-3xl"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: "hsl(var(--heritage-orange))",
                  transform: "rotate(-2deg)",
                  display: "inline-block",
                }}
              >
                Some ideas to inspire your journey
              </p>
              <p
                className="font-body text-sm tracking-widest uppercase mb-6"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                Threads to follow
              </p>
              <h1
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-8 relative inline-block"
                style={{ color: "hsl(0 0% 98%)" }}
              >
                What draws you in?
                <svg
                  aria-hidden
                  className="absolute -bottom-2 right-0"
                  width="160"
                  height="14"
                  viewBox="0 0 160 14"
                  fill="none"
                  style={{ color: "hsl(var(--heritage-orange))" }}
                >
                  <path
                    d="M2 8 C 22 2, 42 12, 62 6 S 102 2, 122 8 S 152 4, 158 7"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </h1>
              <p
                className="font-body text-lg leading-relaxed"
                style={{ color: "hsl(0 0% 94%)" }}
              >
                No two journeys are ever the same. These are a few places where they often begin.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Polaroid wall on warm cream canvas */}
      <section
        className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
        style={{ backgroundColor: "hsl(40 38% 96%)" }}
      >
        {/* paper-grain noise overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-multiply"
          aria-hidden
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.45  0 0 0 0 0.36  0 0 0 0 0.25  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        <div className="relative container mx-auto px-6 lg:px-12">

          {/* Polaroid wall */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 md:gap-y-16 gap-x-6 md:gap-x-10 pt-8">
            {themes.filter((t) => t && t.title && t.image).map((theme, i) => {
              const isActive = active === theme.id;
              const paperPalette = [
                "hsl(40 38% 97%)",            // cream
                "hsl(120 22% 92%)",           // soft green
                "hsl(22 70% 92%)",            // warm orange-blush
                "hsl(350 35% 92%)",           // dusty bordeaux-pink
              ];
              const paperBg = paperPalette[i % paperPalette.length];
              const isLeft = theme.pin === "tape-tl" || theme.pin === "tape-gl";
              const tapeColors = [
                { bg: "hsl(var(--heritage-orange) / 0.72)", border: "hsl(var(--heritage-bordeaux) / 0.30)" },
                { bg: "hsl(var(--heritage-green) / 0.55)", border: "hsl(var(--heritage-green) / 0.40)" },
                { bg: "hsl(var(--heritage-bordeaux) / 0.45)", border: "hsl(var(--heritage-bordeaux) / 0.35)" },
              ];
              const tape = tapeColors[i % 3];
              const outlineColors = [
                "hsl(var(--heritage-orange))",
                "hsl(var(--heritage-green))",
                "hsl(var(--heritage-purple))",
              ];
              const outlineColor = outlineColors[i % 3];
              const sketchVariants = [
                [
                  "M 3 4 C 22 2.5, 48 4, 70 2.8 S 96 3.4, 97.5 5 C 98.6 26, 96.8 50, 98 74 C 98.4 92, 97.5 97, 95.5 97.6 C 74 98.8, 50 97.2, 26 98.6 C 9 99, 3 98, 2.5 95.5 C 1.4 75, 3.2 50, 1.8 26 C 1.4 8, 2.2 3, 4 3.4 Z",
                  "M 4 3 C 24 4, 50 2.6, 72 4.2 S 97 4.6, 96.6 6.2 C 97.8 27, 98.6 51, 96.8 75 C 96.4 93, 97.8 96.4, 95 97.4 C 73 97, 49 98.6, 25 96.8 C 8 96.4, 4 97, 3.6 94 C 2.6 74, 1.6 49, 3 25 C 3.4 7, 3 4, 4.4 3.2 Z",
                ],
                [
                  "M 2.5 5 C 26 3.6, 52 5.2, 74 3.4 S 97 4.2, 97 6.4 C 96 28, 98.4 52, 97.2 76 C 97 91, 96 97.8, 94 97 C 72 98, 48 96.6, 24 98 C 7 98.6, 3 97.4, 3.4 94.4 C 2 74, 4 48, 2.4 24 C 2 6, 2.6 4, 4.6 4 Z",
                  "M 5 4 C 28 5.4, 54 3, 75 5.4 S 96 5.6, 95.8 7.4 C 96.6 28, 97 53, 96 77 C 95.6 92, 96.4 95.8, 93.6 96.8 C 71 96.4, 47 98, 23 96.4 C 7 96, 4.4 96.6, 4.4 93.4 C 3.4 73, 2 48, 3.6 24 C 4 6.6, 4 4.4, 5.2 4 Z",
                ],
                [
                  "M 3.4 3 C 23 4.4, 49 2.4, 71 4 S 96.4 2.8, 98 4.4 C 99 27, 97.4 51, 98.6 75 C 99 93, 96.6 97.4, 94.4 98 C 73 98.4, 49 96.6, 25 98 C 8 98.4, 2 98, 2.8 95 C 1 75, 3.6 49, 2 25 C 1.6 8, 2.4 2.6, 4.4 3 Z",
                  "M 4.6 4.4 C 25 3, 51 4.6, 73 3 S 96 6, 96.4 7.2 C 97.4 28, 98.8 52, 97 76 C 96.6 92, 97.4 96, 94.6 97 C 73 97.6, 49 98, 25 96.4 C 9 96, 4 97.6, 3.6 94.6 C 2.4 74, 1.4 49, 3 25 C 3.4 7, 3 4.4, 4.4 4 Z",
                ],
                [
                  "M 3 3.4 C 24 2, 47 4.4, 69 3 S 95 4, 97.6 5.4 C 98 26, 97.6 50, 98.4 75 C 98.6 93, 96.6 96, 95 97 C 75 99, 51 97.6, 27 99 C 9 98.6, 2.6 97.4, 2.6 95 C 1.6 76, 2.6 51, 1.4 26 C 1.6 7, 2 3.4, 4 3 Z",
                  "M 4.4 4 C 26 5, 52 3.4, 74 4.6 S 96.4 4, 96 6 C 97 27, 98.4 50, 96.4 76 C 96.6 92, 97.6 95.6, 94.6 96.8 C 72 97.4, 48 99, 24 97 C 7 96.6, 4 97, 3.4 94 C 2.4 74, 1.6 48, 3.4 24 C 3.6 7, 2.6 4.4, 4.4 3.4 Z",
                ],
              ];
              const sketchPaths = sketchVariants[i % sketchVariants.length];
              return (
                <FadeIn key={theme.id} delay={i * 0.08}>
                  <div ref={(el) => { cardRefs.current[theme.id] = el; }}>
                  <button
                    onClick={() => setActive(isActive ? null : theme.id)}
                    className="group relative block w-full text-left transition-transform duration-500 ease-out hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4"
                    style={{ transform: `rotate(${isActive ? 0 : theme.rotate}deg)` }}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                      style={{
                        background:
                          "radial-gradient(closest-side, hsl(var(--heritage-orange) / 0.35), transparent 70%)",
                      }}
                    />
                    <div
                      className="p-2.5 sm:p-3 pb-16 sm:pb-20 transition-all duration-500 relative"
                    >
                      <svg
                        aria-hidden
                        className="absolute inset-0 w-full h-full pointer-events-none transition-[filter] duration-500 group-hover:[filter:drop-shadow(0_22px_24px_rgba(0,0,0,0.28))]"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        style={{
                          color: outlineColor,
                          overflow: "visible",
                          filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.22)) drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
                        }}
                      >
                        <path d={sketchPaths[0]} fill={paperBg} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ strokeWidth: "2.4px" }} />
                        <path d={sketchPaths[1]} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ strokeWidth: "1.2px", opacity: 0.55 }} />
                      </svg>
                      {/* Fastener: alternate between tape and pushpin so it
                          really feels like the polaroid is stuck to the wall */}
                      {i % 2 === 0 ? (
                        <span
                          aria-hidden
                          className={cn(
                            "absolute top-1 sm:top-1.5 w-16 sm:w-20 h-5 sm:h-6 border z-10 shadow-[0_1px_2px_rgba(0,0,0,0.15)]",
                            isLeft
                              ? "left-3 sm:left-5 -rotate-[8deg]"
                              : "right-3 sm:right-5 rotate-[6deg]",
                          )}
                          style={{
                            backgroundColor: tape.bg,
                            borderColor: tape.border,
                          }}
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full z-10 shadow-[inset_-1.5px_-2px_2.5px_rgba(0,0,0,0.4),inset_2px_2px_2.5px_rgba(255,255,255,0.55),0_3px_4px_rgba(0,0,0,0.4)]"
                          style={{ backgroundColor: outlineColor }}
                        />
                      )}
                      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                        <img
                          src={theme.image}
                          alt={theme.title}
                          width={768}
                          height={960}
                          loading="lazy"
                          decoding="async"
                          // @ts-expect-error fetchpriority is a valid HTML attribute
                          fetchpriority="low"
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02] group-hover:saturate-150"
                          style={{ filter: "saturate(1.18) brightness(1.06) contrast(1.04)" }}
                        />
                      </div>
                      <div className="relative mt-3 sm:mt-4 px-1.5 sm:px-2">
                        <h3 className="font-heading text-lg sm:text-xl md:text-2xl text-primary leading-tight tracking-wide">
                          {theme.title}
                        </h3>
                        <p
                          className="text-base sm:text-lg mt-0.5 sm:mt-1 leading-snug"
                          style={{
                            fontFamily: "'Caveat', cursive",
                            color: "hsl(var(--heritage-bordeaux))",
                          }}
                        >
                          <span
                            aria-hidden
                            className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle"
                            style={{ backgroundColor: "hsl(var(--heritage-orange))" }}
                          />
                          {theme.note}
                        </p>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-500 ease-out",
                        isActive ? "max-h-60 opacity-100 mt-3 sm:mt-4" : "max-h-0 opacity-0 mt-0"
                      )}
                    >
                      <p
                        className="text-lg sm:text-xl md:text-2xl leading-snug px-1"
                        style={{
                          fontFamily: "'Caveat', cursive",
                          color: "hsl(var(--heritage-bordeaux))",
                        }}
                      >
                        {theme.caption}
                      </p>
                    </div>
                  </button>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn>
            <p
              className="text-center mt-16 mb-2 text-2xl md:text-3xl"
              style={{
                fontFamily: "'Caveat', cursive",
                color: "hsl(var(--heritage-orange))",
                transform: "rotate(-1.5deg)",
              }}
            >
              when you're ready…
            </p>
            <p className="font-body text-center text-base mb-4 text-foreground/70">
              Pick a few that speak to you, then let's talk about building your perfect day.
            </p>
            <p className="text-center">
              <a
                href="#contact"
                className="font-body text-base tracking-wide border-b-2 border-dashed pb-1 transition-colors hover:opacity-80 inline-flex items-center gap-2"
                style={{
                  color: "hsl(var(--heritage-bordeaux))",
                  borderColor: "hsl(var(--heritage-bordeaux) / 0.5)",
                }}
              >
                Ready to start planning? Let's talk.
                <span aria-hidden>→</span>
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact section — same as homepage so visitors can act now */}
      <ContactSection />
    </main>
  );
};

export default GetInspired;
