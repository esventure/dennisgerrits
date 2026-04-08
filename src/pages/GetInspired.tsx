import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { cn } from "@/lib/utils";
import StoryBook from "@/components/StoryBook";

const themes = [
  {
    id: "history",
    title: "Hidden History",
    description: "The stories that never made it into guidebooks. Secret passages, forgotten wars, the people who shaped a city but whose names you won't find on any monument.",
    icon: "🏛️",
  },
  {
    id: "food",
    title: "Local Food Culture",
    description: "Markets where chefs shop at dawn. Bakeries that haven't changed their recipe in a century. The story behind every regional dish you'll taste.",
    icon: "🍷",
  },
  {
    id: "architecture",
    title: "Architecture & Design",
    description: "From medieval brickwork to brutalist experiments. Why a building looks the way it does, and what it says about the people who built it.",
    icon: "🏗️",
  },
  {
    id: "art",
    title: "Street Art & Subculture",
    description: "Murals, studios, underground galleries. Art that lives on the streets and tells you more about a city than any museum could.",
    icon: "🎨",
  },
  {
    id: "nature",
    title: "Parks & Hidden Gardens",
    description: "Green spaces that locals keep to themselves. A bench with the perfect view. A garden that's been tended for three hundred years.",
    icon: "🌿",
  },
  {
    id: "craft",
    title: "Local Craft & Makers",
    description: "Workshops, ateliers, and people who still make things by hand. The stories behind the craft are often as beautiful as the objects.",
    icon: "✂️",
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

  useEffect(() => {
    const storyParam = searchParams.get("story");
    if (storyParam) {
      const matched = stories.find((s) => s.title === storyParam);
      if (matched) {
        setOpenStory(matched.id);
        setTimeout(() => {
          document.getElementById("stories-section")?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [searchParams]);

  return (
    <main>
      {/* Interests section */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                Get Inspired
              </p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary leading-[0.95] mb-8">
                Build Your Day
              </h1>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                I don't offer tour packages. Instead, I share my passions, and together we build a
                day around the themes that excite you most. Here are some of the worlds I love to explore.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme, i) => (
              <FadeIn key={theme.id} delay={i * 0.08}>
                <button
                  onClick={() => setActive(active === theme.id ? null : theme.id)}
                  className={cn(
                    "w-full text-left p-8 border rounded-sm transition-all duration-300",
                    active === theme.id
                      ? "border-secondary bg-secondary/5"
                      : "border-border hover:border-secondary/40"
                  )}
                >
                  <span className="text-3xl mb-4 block">{theme.icon}</span>
                  <h3 className="font-heading text-2xl text-primary mb-3">{theme.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {theme.description}
                  </p>
                </button>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <p className="font-body text-center text-muted-foreground mt-16 text-sm">
              These are starting points, not limits. Your interests might take us somewhere completely unexpected. That's the whole point.
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
            <div className="max-w-3xl">
              <Accordion
                type="single"
                collapsible
                value={openStory}
                onValueChange={setOpenStory}
              >
                {stories.map((s) => (
                  <AccordionItem key={s.id} value={s.id} className="border-border">
                    <AccordionTrigger className="font-heading text-xl md:text-2xl text-primary hover:text-secondary hover:no-underline py-6">
                      {s.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="font-body text-sm text-muted-foreground italic mb-4">
                        {s.intro}
                      </p>
                      <p className="font-body text-base text-foreground leading-relaxed">
                        {s.body}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default GetInspired;
