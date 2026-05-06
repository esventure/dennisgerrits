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
];

const GetInspired = () => {
  const [active, setActive] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [openStory, setOpenStory] = useState<string>("");

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
      <section className="py-24 lg:py-32 bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                What excites you?
              </p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary leading-[0.95] mb-8">
                Build Your Day
              </h1>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Tell me what you love, and I'll show you a side of Amsterdam you won't find in any guidebook.
              </p>
            </FadeIn>
          </div>

          {/* Polaroid wall */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 md:gap-x-12 pt-8">
            {themes.map((theme, i) => {
              const isActive = active === theme.id;
              return (
                <FadeIn key={theme.id} delay={i * 0.08}>
                  <button
                    onClick={() => setActive(isActive ? null : theme.id)}
                    className="group relative block w-full text-left transition-transform duration-500 ease-out hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4"
                    style={{ transform: `rotate(${isActive ? 0 : theme.rotate}deg)` }}
                  >
                    <div className="bg-[#FAFAF7] p-3 pb-20 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35),0_2px_6px_-2px_rgba(0,0,0,0.15)] transition-shadow duration-500 group-hover:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.4)] relative">
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -top-3 w-20 h-7 bg-[hsl(var(--heritage-orange))]/25 border border-[hsl(var(--heritage-orange))]/30",
                          theme.pin === "tape-tl" ? "left-6 -rotate-[8deg]" : "right-6 rotate-[6deg]"
                        )}
                      />
                      <div className="aspect-square overflow-hidden bg-muted">
                        <img
                          src={theme.image}
                          alt={theme.title}
                          width={768}
                          height={768}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                      </div>
                      <div className="absolute bottom-4 left-3 right-3 px-2">
                        <h3 className="font-heading text-2xl text-primary leading-none tracking-wide">
                          {theme.title}
                        </h3>
                        <p
                          className="text-lg text-foreground/70 mt-1 leading-snug"
                          style={{ fontFamily: "'Caveat', cursive" }}
                        >
                          {theme.note}
                        </p>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-500 ease-out",
                        isActive ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
                      )}
                    >
                      <p
                        className="text-xl text-foreground/85 leading-snug px-1"
                        style={{ fontFamily: "'Caveat', cursive" }}
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
            <p className="font-body text-center text-muted-foreground mt-16 text-sm mb-4">
              Pick a few that speak to you, then let's talk about building your perfect day.
            </p>
            <p className="text-center">
              <a href="/#contact" className="font-body text-secondary hover:text-secondary/80 transition-colors text-sm tracking-wide underline underline-offset-4">
                Ready to start planning? Let's talk.
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stories section — accordion style */}
      <section id="stories-section" className="py-24 lg:py-32 bg-muted/30 scroll-mt-20">
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
