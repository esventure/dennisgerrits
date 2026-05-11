import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FadeIn from "@/components/FadeIn";
import { cn } from "@/lib/utils";
import StoryBook from "@/components/StoryBook";
import { supabase } from "@/integrations/supabase/client";
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
  const [searchParams] = useSearchParams();
  const [openStory, setOpenStory] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: stories = [] } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stories")
        .select("id, slug, title, intro, body, image_path")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((s) => ({
        id: s.slug,
        title: s.title,
        intro: s.intro,
        body: s.body,
      }));
    },
  });

  useEffect(() => {
    const storyParam = searchParams.get("story");
    if (storyParam && stories.length) {
      const matched = stories.find((s) => s.title === storyParam);
      if (matched) {
        setOpenStory(matched.id);
        setTimeout(() => {
          document.getElementById("stories-section")?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [searchParams, stories]);

  return (
    <main>
      {/* Interests section */}
      <section
        className="relative py-24 lg:py-32 overflow-hidden"
        style={{
          background:
            "radial-gradient(900px 500px at 8% -5%, hsl(var(--heritage-orange) / 0.18), transparent 62%), radial-gradient(1100px 700px at 100% 110%, hsl(var(--heritage-green) / 0.16), transparent 65%), hsl(var(--background))",
        }}
      >
        {/* Subtle paper texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <p
                className="mb-3 text-2xl md:text-3xl"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: "hsl(var(--heritage-green))",
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
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary leading-[0.95] mb-8 relative inline-block">
                Build Your Day
                {/* hand-drawn squiggle under "Day" */}
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
              <p className="font-body text-lg text-foreground/80 leading-relaxed">
                Tell me what you love, and I'll show you a side of Amsterdam you won't find in any guidebook.
              </p>
            </FadeIn>
          </div>

          {/* Polaroid wall */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 md:gap-y-16 gap-x-6 md:gap-x-10 pt-8">
            {themes.filter((t) => t && t.title && t.image).map((theme, i) => {
              const isActive = active === theme.id;
              const paperBg =
                i % 3 === 0
                  ? "hsl(40 38% 97%)"
                  : i % 3 === 1
                  ? "hsl(28 35% 95%)"
                  : "hsl(120 15% 96%)";
              const isLeft = theme.pin === "tape-tl" || theme.pin === "tape-gl";
              const tapeColors = [
                { bg: "hsl(var(--heritage-orange) / 0.72)", border: "hsl(var(--heritage-bordeaux) / 0.30)" },
                { bg: "hsl(var(--heritage-green) / 0.55)", border: "hsl(var(--heritage-green) / 0.40)" },
                { bg: "hsl(var(--heritage-bordeaux) / 0.45)", border: "hsl(var(--heritage-bordeaux) / 0.35)" },
              ];
              const tape = tapeColors[i % 3];
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
                      className="p-2.5 sm:p-3 pb-16 sm:pb-20 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.28),0_2px_6px_-2px_rgba(0,0,0,0.12)] transition-shadow duration-500 group-hover:shadow-[0_22px_44px_-16px_rgba(0,0,0,0.35)] relative"
                      style={{ backgroundColor: paperBg }}
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
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
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
                color: "hsl(var(--heritage-green))",
                transform: "rotate(-1.5deg)",
              }}
            >
              when you're ready…
            </p>
            <p className="font-body text-center text-foreground/70 text-base mb-4">
              Pick a few that speak to you, then let's talk about building your perfect day.
            </p>
            <p className="text-center">
              <a
                href="/#contact"
                className="font-body text-base tracking-wide border-b-2 border-dashed pb-1 transition-colors hover:opacity-80 inline-flex items-center gap-2"
                style={{
                  color: "hsl(var(--heritage-orange))",
                  borderColor: "hsl(var(--heritage-orange) / 0.5)",
                }}
              >
                Ready to start planning? Let's talk.
                <span aria-hidden>→</span>
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Hand-drawn divider between sections */}
      <div
        aria-hidden
        className="relative"
        style={{ background: "hsl(var(--background))" }}
      >
        <svg
          className="block w-full h-12 md:h-16"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 32 C 120 12, 240 52, 360 30 S 600 10, 720 34 S 960 54, 1080 28 L 1200 30"
            stroke="hsl(var(--heritage-green))"
            strokeOpacity="0.55"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <span
          className="absolute left-1/2 top-1/2 px-4 text-xl md:text-2xl whitespace-nowrap"
          style={{
            fontFamily: "'Caveat', cursive",
            color: "hsl(var(--heritage-orange))",
            transform: "translate(-50%, -50%) rotate(-2deg)",
            background: "hsl(var(--background))",
          }}
        >
          and a few stories…
        </span>
      </div>

      {/* Stories section — accordion style */}
      <section
        id="stories-section"
        className="relative py-24 lg:py-32 scroll-mt-20 overflow-hidden"
        style={{
          background:
            "radial-gradient(900px 500px at 100% 0%, hsl(var(--heritage-green) / 0.16), transparent 60%), radial-gradient(700px 400px at 0% 100%, hsl(var(--heritage-orange) / 0.10), transparent 65%), hsl(40 38% 95%)",
        }}
      >
        {/* Paper-grain noise overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-multiply"
          aria-hidden
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.45  0 0 0 0 0.36  0 0 0 0 0.25  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        <div className="relative container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-12">
            <FadeIn>
              <p
                className="font-body text-sm tracking-widest uppercase mb-4"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                Stories
              </p>
              <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-6 relative inline-block">
                Notes From the City
                <svg
                  aria-hidden
                  className="absolute -bottom-2 right-0"
                  width="140"
                  height="12"
                  viewBox="0 0 140 12"
                  fill="none"
                  style={{ color: "hsl(var(--heritage-orange))" }}
                >
                  <path
                    d="M2 7 C 22 1, 42 11, 62 5 S 102 1, 122 7 L 138 6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </h2>
              <p className="font-body text-base md:text-lg text-foreground/75 leading-relaxed max-w-xl">
                Short reflections about Amsterdam. The kind of things I'd tell you over a coffee.
              </p>
            </FadeIn>
          </div>

          <FadeIn>
            <StoryBook stories={stories} initialStoryId={openStory || undefined} />
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default GetInspired;
