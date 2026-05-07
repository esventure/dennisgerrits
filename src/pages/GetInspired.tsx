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
    pin: "tape-tl",
  },
  {
    id: "art",
    title: "Street Art",
    caption: "A friend paints walls in the north. We can knock on her studio door and see what she's working on.",
    note: "she might be home",
    image: imgArt,
    rotate: 2.2,
    pin: "tape-tr",
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
    pin: "tape-tl",
  },
  {
    id: "cycling",
    title: "On Two Wheels",
    caption: "I'll get you a proper Dutch bike and we'll take the long way. The city looks different from the saddle.",
    note: "no helmets, sorry",
    image: imgCycling,
    rotate: 1.6,
    pin: "tape-tr",
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
    pin: "tape-tl",
  },
  {
    id: "markets",
    title: "Markets",
    caption: "Cheese stalls, flower vendors, the herring guy who's been there since 1978. Markets are where a city actually lives.",
    note: "go hungry",
    image: imgMarkets,
    rotate: 1.2,
    pin: "tape-tr",
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
        className="relative py-24 lg:py-32"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% -10%, hsl(var(--heritage-orange) / 0.08), transparent 60%), hsl(var(--background))",
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
                className="font-body text-sm tracking-widest uppercase mb-6"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                What excites you?
              </p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary leading-[0.95] mb-8">
                Build Your Day
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
              return (
                <FadeIn key={theme.id} delay={i * 0.08}>
                  <button
                    onClick={() => setActive(isActive ? null : theme.id)}
                    className="group relative block w-full text-left transition-transform duration-500 ease-out hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4"
                    style={{ transform: `rotate(${isActive ? 0 : theme.rotate}deg)` }}
                  >
                    <div className="bg-white p-2.5 sm:p-3 pb-16 sm:pb-20 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.28),0_2px_6px_-2px_rgba(0,0,0,0.12)] transition-shadow duration-500 group-hover:shadow-[0_22px_44px_-16px_rgba(0,0,0,0.35)] relative">
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -top-3 w-16 sm:w-20 h-6 sm:h-7 border",
                          theme.pin === "tape-tl" && "left-4 sm:left-6 -rotate-[8deg] bg-[hsl(var(--heritage-orange))]/70 border-[hsl(var(--heritage-bordeaux))]/30",
                          theme.pin === "tape-tr" && "right-4 sm:right-6 rotate-[6deg] bg-[hsl(var(--heritage-orange))]/70 border-[hsl(var(--heritage-bordeaux))]/30",
                          theme.pin === "tape-gl" && "left-4 sm:left-6 -rotate-[6deg] bg-[hsl(var(--heritage-green))]/55 border-[hsl(var(--heritage-green))]/40",
                          theme.pin === "tape-gr" && "right-4 sm:right-6 rotate-[7deg] bg-[hsl(var(--heritage-green))]/55 border-[hsl(var(--heritage-green))]/40",
                        )}
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
            <p className="font-body text-center text-foreground/70 mt-16 text-base mb-4">
              Pick a few that speak to you, then let's talk about building your perfect day.
            </p>
            <p className="text-center">
              <a
                href="/#contact"
                className="font-body text-base tracking-wide border-b-2 border-dashed pb-1 transition-colors hover:opacity-80"
                style={{
                  color: "hsl(var(--heritage-orange))",
                  borderColor: "hsl(var(--heritage-orange) / 0.5)",
                }}
              >
                Ready to start planning? Let's talk.
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stories section — accordion style */}
      <section
        id="stories-section"
        className="py-24 lg:py-32 scroll-mt-20"
        style={{ backgroundColor: "hsl(var(--heritage-taupe-tint))" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                Stories
              </p>
              <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
                Notes From the City
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Short stories and reflections about Amsterdam. The kind of things I'd tell you over a coffee.
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
