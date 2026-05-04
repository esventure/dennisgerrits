import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FadeIn from "@/components/FadeIn";
import { cn } from "@/lib/utils";
import StoryBook from "@/components/StoryBook";
import { supabase } from "@/integrations/supabase/client";
import iconHistory from "@/assets/icon-history.png";
import iconFood from "@/assets/icon-food.png";
import iconArchitecture from "@/assets/icon-architecture.png";
import iconArt from "@/assets/icon-art.png";
import iconNature from "@/assets/icon-nature.png";
import iconCraft from "@/assets/icon-craft.png";

const themes = [
  {
    id: "history",
    title: "Hidden History",
    description: "The stories that never made it into guidebooks. Secret passages, forgotten wars, the people who shaped a city but whose names you won't find on any monument.",
    icon: iconHistory,
  },
  {
    id: "food",
    title: "Local Food Culture",
    description: "Markets where chefs shop at dawn. Bakeries that haven't changed their recipe in a century. The story behind every regional dish you'll taste.",
    icon: iconFood,
  },
  {
    id: "architecture",
    title: "Architecture & Design",
    description: "From medieval brickwork to brutalist experiments. Why a building looks the way it does, and what it says about the people who built it.",
    icon: iconArchitecture,
  },
  {
    id: "art",
    title: "Street Art & Subculture",
    description: "Murals, studios, underground galleries. Art that lives on the streets and tells you more about a city than any museum could.",
    icon: iconArt,
  },
  {
    id: "nature",
    title: "Parks & Hidden Gardens",
    description: "Green spaces that locals keep to themselves. A bench with the perfect view. A garden that's been tended for three hundred years.",
    icon: iconNature,
  },
  {
    id: "craft",
    title: "Local Craft & Makers",
    description: "Workshops, ateliers, and people who still make things by hand. The stories behind the craft are often as beautiful as the objects.",
    icon: iconCraft,
  },
];

const stories = [
  {
    id: "bookshop",
    title: "The Bookshop That Refused to Close",
    intro: "On a quiet street in the Jordaan, there's a bookshop that's been open since 1953. The owner still wraps every purchase in brown paper.",
    body: "I asked him once why he never retired. He looked at me like I'd said something absurd. 'Why would I stop doing the thing I love?' He knows every book in the shop by memory. He'll recommend one based on the look in your eyes, not what's trending. It's the kind of place that makes you believe the world still has room for things that are slow, personal, and real.",
  },
  {
    id: "canal-houses",
    title: "Why the Canal Houses Lean Forward",
    intro: "It's not bad engineering. It's actually on purpose. And the reason says a lot about how the Dutch think about commerce.",
    body: "In the 17th century, Amsterdam's merchants stored their goods in the attics of their canal houses. To hoist heavy bales up without smashing the façade, the buildings were designed to lean slightly forward. The hooks you still see at the top? Those are original hoisting beams. It's a small detail that tells a big story about a city built on trade, pragmatism, and a refusal to waste space.",
  },
  {
    id: "bench",
    title: "A Bench With the Best View in Amsterdam",
    intro: "It's not where you'd expect. No famous landmarks in sight. Just water, sky, and the kind of quiet that makes you want to sit for a while.",
    body: "I won't tell you exactly where it is — that would ruin it. But I will say this: it faces west, and on a clear evening the light turns the water gold. There's usually nobody else there. No tourists, no noise. Just the sound of a boat passing now and then. It's the kind of place that reminds you why you travel in the first place.",
  },
  {
    id: "cafe",
    title: "The Café That Only Serves What's Left",
    intro: "Every evening, a small café in De Pijp serves whatever the local market couldn't sell that day. No menu. Just trust.",
    body: "The chef arrives at the Albert Cuyp market around 5pm, just as the vendors are packing up. Whatever's left — a box of peppers, some fish, half a wheel of cheese — becomes dinner. You sit down, you eat what's served, and somehow it's always exactly right. It's food without pretension, made from what the city had to offer that day.",
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme, i) => (
              <FadeIn key={theme.id} delay={i * 0.08}>
                <button
                  onClick={() => setActive(active === theme.id ? null : theme.id)}
                  className={cn(
                    "w-full text-left p-8 rounded-lg transition-all duration-300 shadow-md border",
                    active === theme.id
                      ? "border-secondary bg-secondary/10 shadow-lg border-l-4 border-l-secondary"
                      : "border-accent/10 bg-accent/5 hover:-translate-y-1 hover:shadow-lg hover:border-l-4 hover:border-l-secondary/40"
                  )}
                >
                  <div className="w-16 h-16 mb-4">
                    <img src={theme.icon} alt={theme.title} width={64} height={64} loading="lazy" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-heading text-2xl text-primary mb-3">{theme.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {theme.description}
                  </p>
                </button>
              </FadeIn>
            ))}
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
