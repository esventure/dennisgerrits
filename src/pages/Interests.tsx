import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { cn } from "@/lib/utils";

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

const Interests = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <main>
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                Your Interests
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
              These are starting points, not limits. Your interests might take us somewhere entirely unexpected — and that's exactly the point.
            </p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Interests;
