import { useState, useEffect } from "react";
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

const themes = [
  {
    id: "history",
    title: "Hidden History",
    caption: "I'll take you down an alley most locals walk past. There's a stone above a doorway with a story almost no one knows.",
    note: "ask me about the cat",
    image: imgHistory,
    rotate: -2.4,
    pin: "tape-tl",
  },
  {
    id: "food",
    title: "Local Food",
    caption: "I know a baker who pulls bread out of the oven at six. We can be there before the queue starts.",
    note: "bring an empty stomach",
    image: imgFood,
    rotate: 1.8,
    pin: "tape-tr",
  },
  {
    id: "architecture",
    title: "Architecture",
    caption: "Every gable in this city is a date stamp. Once you know what to look for, the whole street starts talking.",
    note: "look up, always",
    image: imgArchitecture,
    rotate: -1.2,
    pin: "tape-gl",
  },
  {
    id: "art",
    title: "Street Art",
    caption: "A friend paints walls in the north. We can knock on her studio door and see what she's working on.",
    note: "she might be home",
    image: imgArt,
    rotate: 2.2,
    pin: "tape-gr",
  },
  {
    id: "nature",
    title: "Hidden Gardens",
    caption: "There's a courtyard behind a plain wooden door. Three hundred years old, and almost always empty.",
    note: "my favorite bench",
    image: imgNature,
    rotate: -1.6,
    pin: "tape-tl",
  },
  {
    id: "craft",
    title: "Makers & Craft",
    caption: "I'll introduce you to people who still make things by hand. Leather, paper, glass. Their stories stay with you.",
    note: "watch the hands",
    image: imgCraft,
    rotate: 1.4,
    pin: "tape-tr",
  },
  {
    id: "cafes",
    title: "Brown Cafes",
    caption: "Smoky old pubs where regulars have their own stool. We'll have a jenever and listen for a while.",
    note: "ask for the bitter",
    image: imgCafes,
    rotate: -2.0,
    pin: "tape-gl",
  },
  {
    id: "cycling",
    title: "On Two Wheels",
    caption: "I'll get you a proper Dutch bike and we'll take the long way. The city looks different from the saddle.",
    note: "no helmets, sorry",
    image: imgCycling,
    rotate: 1.6,
    pin: "tape-gr",
  },
  {
    id: "literature",
    title: "Books & Writers",
    caption: "I'll show you the cafe where Multatuli sat, and a tiny shop where you can still find first editions.",
    note: "smell the pages",
    image: imgLiterature,
    rotate: -1.4,
    pin: "tape-tl",
  },
  {
    id: "music",
    title: "Live Music",
    caption: "Small rooms, big sound. I know which nights to go and where the locals actually listen.",
    note: "stay till late",
    image: imgMusic,
    rotate: 2.0,
    pin: "tape-tr",
  },
  {
    id: "water",
    title: "From the Water",
    caption: "I know a friend with a small boat. We'll drift through the canals at dusk and see the city the way it was meant to be seen.",
    note: "bring a sweater",
    image: imgWater,
    rotate: -1.8,
    pin: "tape-gl",
  },
  {
    id: "markets",
    title: "Markets",
    caption: "Cheese stalls, flower vendors, the herring guy who's been there since 1978. Markets are where a city actually lives.",
    note: "go hungry",
    image: imgMarkets,
    rotate: 1.2,
    pin: "tape-gr",
  },
];

const GetInspired = () => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                a few ideas to start with
              </p>
              <p
                className="font-body text-sm tracking-widest uppercase mb-6"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                What excites you?
              </p>
              <h1
                className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-8 relative inline-block"
                style={{ color: "hsl(0 0% 98%)" }}
              >
                Build Your Day
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
                Tell me what you love, and I'll show you a side of Amsterdam you won't find in any guidebook.
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
              const sketchPaths = [
                "M 3 4 C 22 2.5, 48 4, 70 2.8 S 96 3.4, 97.5 5 C 98.6 26, 96.8 50, 98 74 C 98.4 92, 97.5 97, 95.5 97.6 C 74 98.8, 50 97.2, 26 98.6 C 9 99, 3 98, 2.5 95.5 C 1.4 75, 3.2 50, 1.8 26 C 1.4 8, 2.2 3, 4 3.4 Z",
                "M 4 3 C 24 4, 50 2.6, 72 4.2 S 97 4.6, 96.6 6.2 C 97.8 27, 98.6 51, 96.8 75 C 96.4 93, 97.8 96.4, 95 97.4 C 73 97, 49 98.6, 25 96.8 C 8 96.4, 4 97, 3.6 94 C 2.6 74, 1.6 49, 3 25 C 3.4 7, 3 4, 4.4 3.2 Z",
              ];
              return (
                <FadeIn key={theme.id} delay={i * 0.08}>
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
                      className="p-2.5 sm:p-3 pb-16 sm:pb-20 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.28),0_2px_6px_-2px_rgba(0,0,0,0.12)] transition-shadow duration-500 group-hover:shadow-[0_22px_44px_-16px_rgba(0,0,0,0.35)] relative border-2 sm:border-[3px] border-dashed"
                      style={{ backgroundColor: paperBg, borderColor: outlineColor }}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -top-3 w-16 sm:w-20 h-6 sm:h-7 border",
                          isLeft
                            ? "left-4 sm:left-6 -rotate-[8deg]"
                            : "right-4 sm:right-6 rotate-[6deg]",
                        )}
                        style={{
                          backgroundColor: tape.bg,
                          borderColor: tape.border,
                        }}
                      />
                      <div className="aspect-square overflow-hidden bg-muted">
                        <img
                          src={theme.image}
                          alt={theme.title}
                          width={768}
                          height={768}
                          loading="lazy"
                          decoding="async"
                          // @ts-expect-error fetchpriority is a valid HTML attribute
                          fetchpriority="low"
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02] group-hover:saturate-150"
                          style={{ filter: "saturate(1.18) brightness(1.06) contrast(1.04)" }}
                        />
                      </div>
                      <div className="absolute bottom-3 sm:bottom-4 left-2.5 right-2.5 sm:left-3 sm:right-3 px-1.5 sm:px-2">
                        <h3 className="font-heading text-lg sm:text-xl md:text-2xl text-primary leading-tight tracking-wide truncate">
                          {theme.title}
                        </h3>
                        <p
                          className="text-base sm:text-lg mt-0.5 sm:mt-1 leading-snug truncate"
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
