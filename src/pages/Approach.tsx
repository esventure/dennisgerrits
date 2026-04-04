import FadeIn from "@/components/FadeIn";

const moments = [
  {
    time: "Morning",
    title: "A Quiet Start",
    text: "We meet at a café I love — somewhere away from the tourist centre. Over coffee, we talk about what interests you, what you've seen, what you're curious about. There's no rush.",
  },
  {
    time: "Late Morning",
    title: "Into the City",
    text: "We walk. Slowly. I share stories about the streets, the buildings, the people who shaped them. We stop when something catches your eye. We take detours. The best discoveries are never planned.",
  },
  {
    time: "Midday",
    title: "A Shared Table",
    text: "Lunch at a place the locals go — not a tourist restaurant with laminated menus, but somewhere with a story. We eat, we talk, we watch the city move around us.",
  },
  {
    time: "Afternoon",
    title: "Following Curiosity",
    text: "Maybe we visit a hidden garden, explore a quiet museum, or simply sit on a bench and discuss what we've seen. The afternoon belongs to whatever feels right.",
  },
  {
    time: "Late Afternoon",
    title: "Winding Down",
    text: "We find a spot for a drink — something local, something good. We reflect on the day. By now, the city feels different to you. More personal. More yours.",
  },
];

const Approach = () => (
  <main>
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <FadeIn>
            <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
              The Approach
            </p>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary leading-[0.95] mb-8">
              A Day in the Life
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              There are no fixed tours. Every day is shaped by you — your pace, your curiosity,
              your energy. Here's what a day together might look like.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>

    <section className="pb-24 lg:pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto space-y-16">
          {moments.map((m, i) => (
            <FadeIn key={m.time} delay={i * 0.08}>
              <div className="flex gap-8">
                <div className="flex flex-col items-center pt-1">
                  <div className="w-3 h-3 rounded-full bg-secondary shrink-0" />
                  {i < moments.length - 1 && <div className="w-px flex-1 bg-border mt-3" />}
                </div>
                <div className="pb-4">
                  <p className="font-body text-xs tracking-widest uppercase text-accent font-medium mb-2">
                    {m.time}
                  </p>
                  <h3 className="font-heading text-2xl text-primary mb-3">{m.title}</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">{m.text}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default Approach;
