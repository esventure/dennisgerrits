import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import dennisIllustration from "@/assets/dennis_illustration.png";

const Index = () => (
  <main>
    {/* Hero */}
    <section className="min-h-[85vh] flex items-center">
      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
              Personal Travel Companion
            </p>
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary leading-[0.95] mb-8">
              Hello, I'm Dennis.<br />
              I don't show a city —<br />
              I translate it.
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-lg">
              I walk alongside you, not in front of you. Together we discover the hidden layers
              of a place — its stories, its rhythms, and the quiet corners that make it unforgettable.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            {/* Portrait placeholder */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-72 h-96 lg:w-80 lg:h-[28rem] rounded-sm bg-heritage-green/10 border-2 border-heritage-green/30 flex items-end justify-center overflow-hidden">
                <div className="text-center pb-8 px-6">
                  <div className="w-32 h-32 mx-auto rounded-full bg-heritage-green/20 border-2 border-heritage-green/40 mb-4 flex items-center justify-center">
                    <span className="font-heading text-4xl text-heritage-green">DG</span>
                  </div>
                  <p className="font-body text-xs text-heritage-green/70 italic">
                    Hand-drawn portrait illustration
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* Philosophy */}
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-8">
              Walking Alongside, Not Guiding From the Front
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              I believe that the best way to experience a place is through genuine connection —
              not a rehearsed script. There are no microphones, no groups of twenty, no checkboxes.
              Just two people having a real conversation while a city unfolds around them.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              I adapt to your pace, your curiosity, and your energy. Some days we walk for hours;
              other days we sit with coffee and watch the world go by. That's entirely up to you.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* The Experience */}
    <section className="py-24 lg:py-32 bg-primary">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {[
            {
              title: "Depth Over Highlights",
              text: "We skip the obvious and find the meaningful. A hidden courtyard, a local bakery with a hundred-year story, the way light falls on a particular street at four in the afternoon.",
            },
            {
              title: "Connection Without Pressure",
              text: "There is no itinerary to rush through and no schedule to keep. We move at the speed of curiosity — yours.",
            },
            {
              title: "A Friend, Not a Guide",
              text: "I share what I love about a place the way you'd share it with a friend. Honestly, personally, and with the occasional detour that turns out to be the best part.",
            },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.15}>
              <div>
                <div className="w-12 h-0.5 bg-accent mb-6" />
                <h3 className="font-heading text-2xl text-primary-foreground mb-4">{item.title}</h3>
                <p className="font-body text-primary-foreground/70 leading-relaxed">{item.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <FadeIn>
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
            Curious? Let's Talk.
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-lg mx-auto mb-10">
            A short conversation is the best way to see if we're a good fit for your trip.
            No obligations, no pressure — just a friendly chat.
          </p>
          <Link
            to="/contact"
            className="inline-block font-body text-sm tracking-widest uppercase px-10 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
          >
            Get in Touch
          </Link>
        </FadeIn>
      </div>
    </section>
  </main>
);

export default Index;
