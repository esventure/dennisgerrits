import FadeIn from "@/components/FadeIn";

const About = () => (
  <main>
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl">
          <FadeIn>
            <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
              About Dennis
            </p>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary leading-[0.95] mb-12">
              The Storyteller
            </h1>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <FadeIn>
            {/* Photo placeholder */}
            <div className="aspect-[3/4] bg-muted rounded-sm flex items-center justify-center">
              <p className="font-body text-sm text-muted-foreground italic">Documentary-style photograph</p>
            </div>
          </FadeIn>

          <div className="space-y-8">
            <FadeIn delay={0.1}>
             <p className="font-body text-lg text-foreground leading-relaxed">
                Most of my life, I've been fascinated by the layers beneath the surface of a city.
                Not the monuments everyone photographs. The other stuff. The stories that live in between:
                in the architecture of an unremarkable building, in a neighbourhood bakery's recipe, in how a street got its name.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                I grew up surrounded by history and culture. Studied it, lived it. And at some point I realised
                the thing I enjoyed most was sharing it. Not lecturing about it, but having a conversation about
                why a place feels the way it does.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                So that's what I do now. I'm not here to impress you with facts. I'm here to help you
                feel something real about a place, and to enjoy the day together while we do.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="pt-4">
                <div className="w-12 h-0.5 bg-accent mb-6" />
                <blockquote className="font-body text-xl text-secondary italic leading-relaxed">
                  "I don't want you to remember what I told you. I want you to remember how the city made you feel."
                </blockquote>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default About;
