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
              I don't show a city.<br />
              I translate it.
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-lg">
              I walk alongside you, not in front of you. We'll find the stories, the quiet corners,
              the places that make you stop and really look. That's what I do.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            {/* Portrait placeholder */}
             <div className="flex justify-center lg:justify-end h-full items-center">
              <img
                src={dennisIllustration}
                alt="Hand-drawn portrait illustration of Dennis Gerrits"
                className="w-full h-full object-contain"
              />
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
              I think the best way to experience a place is through a real conversation. No microphones, no groups of twenty, no checkboxes. Just the two of us, walking and talking while a city unfolds around us.
            </p>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Some days we walk for hours. Other days we sit with coffee and watch people go by. It depends on you, and that's the whole point.
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
              text: "We skip the obvious stuff. Instead, we find the things that actually matter. A hidden courtyard, a bakery with a hundred-year story, the way light hits a particular street at four in the afternoon.",
            },
            {
              title: "Connection Without Pressure",
              text: "There's no itinerary to rush through. No schedule. We move at the speed of your curiosity.",
            },
            {
              title: "A Friend, Not a Guide",
              text: "I share what I love about a place the way I'd share it with a friend. Honestly, personally, and with the occasional detour that ends up being the best part of the day.",
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
             A short conversation is the best way to find out if we're a good fit. No obligations, no pressure. Just a friendly chat.
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
