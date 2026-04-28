import { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, Map, Sparkles } from "lucide-react";

const TravelAgents = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Inquiry sent", description: "Thank you. I'll be in touch personally." });
    setForm({ name: "", company: "", email: "", message: "" });
  };

  return (
    <main className="bg-background">
      {/* 1. Hero */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                For Travel Advisors
              </p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary leading-[0.95] mb-8">
                I take care of your clients<br />in Amsterdam.
              </h1>
              <p className="font-body text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
                You don't need another guide. You need someone you can trust with your clients,
                completely. I am your trusted contact in Amsterdam, and when needed, throughout
                the Netherlands.
              </p>
              <Link
                to="/#contact"
                className="inline-block font-body text-sm tracking-widest uppercase px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                Schedule a Short Call
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. The Promise */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "hsl(var(--heritage-taupe) / 0.15)" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-body text-2xl lg:text-3xl text-primary leading-relaxed">
                Someone who understands that your reputation is on the line. That your clients
                expect not just a well-planned trip, but a seamless, personal, and deeply local
                experience.
              </p>
              <p className="font-heading text-3xl lg:text-4xl text-primary mt-10">
                That's where I come in.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. Two Ways to Work Together */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-4">
                How We Work
              </p>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary leading-[0.95]">
                Two ways to work together
              </h2>
              <p className="font-body text-lg text-muted-foreground mt-6">
                Every travel advisor works differently. I adapt to you.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <FadeIn delay={0.1}>
              <article
                className="h-full p-10 lg:p-12 border border-border"
                style={{ backgroundColor: "hsl(var(--heritage-purple) / 0.08)" }}
              >
                <p className="font-body text-xs tracking-widest uppercase text-secondary mb-4">
                  Option One
                </p>
                <h3 className="font-heading text-3xl lg:text-4xl text-primary mb-6 leading-tight">
                  You hand it over. I take care of everything.
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-8">
                  If you prefer to stay at a higher level, I step in as your local partner.
                </p>
                <ul className="space-y-4 font-body text-foreground/90">
                  <li className="flex gap-3">
                    <span className="text-secondary mt-2">·</span>
                    <span>A personal video call to connect with your clients</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-secondary mt-2">·</span>
                    <span>Fully tailored itineraries based on who they are</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-secondary mt-2">·</span>
                    <span>Advice on hotels, neighbourhoods, pacing and overall flow</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-secondary mt-2">·</span>
                    <span>
                      All reservations and logistics: tickets, timed entries, restaurants,
                      private boats and private cars
                    </span>
                  </li>
                </ul>
                <p className="font-body text-sm text-muted-foreground italic mt-8">
                  From planning to execution, your clients are completely looked after.
                </p>
              </article>
            </FadeIn>

            <FadeIn delay={0.2}>
              <article
                className="h-full p-10 lg:p-12 border border-border"
                style={{ backgroundColor: "hsl(var(--heritage-green) / 0.08)" }}
              >
                <p className="font-body text-xs tracking-widest uppercase text-secondary mb-4">
                  Option Two
                </p>
                <h3 className="font-heading text-3xl lg:text-4xl text-primary mb-6 leading-tight">
                  You plan. I deliver on the ground.
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-8">
                  If you prefer to design everything yourself, I become your trusted presence in
                  Amsterdam.
                </p>
                <ul className="space-y-4 font-body text-foreground/90">
                  <li className="flex gap-3">
                    <span className="text-secondary mt-2">·</span>
                    <span>I guide your clients in a personal, meaningful way</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-secondary mt-2">·</span>
                    <span>I elevate your itinerary with local knowledge and access</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-secondary mt-2">·</span>
                    <span>I make sure everything runs smoothly once they arrive</span>
                  </li>
                </ul>
                <p className="font-body text-sm text-muted-foreground italic mt-8">
                  You stay in control. I make sure it comes to life.
                </p>
              </article>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. Always On Call */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "hsl(var(--heritage-bordeaux) / 0.06)" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <FadeIn>
              <div className="lg:col-span-5">
                <Phone className="w-10 h-10 text-secondary mb-8" strokeWidth={1.5} />
                <h2 className="font-heading text-4xl md:text-5xl text-primary leading-[1] mb-6">
                  Your clients have a local they can rely on.
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="lg:col-span-7 space-y-6 font-body text-lg text-foreground/90 leading-relaxed">
                <p>
                  From the moment your clients are preparing for their trip, I am there. Once
                  they arrive, I become their direct point of contact. I share my phone number
                  with them personally, so they can reach me whenever they need to.
                </p>
                <p>
                  I'm available throughout their stay, evenings included, for guidance,
                  support, and peace of mind. Whether it's something simple or unexpected, they
                  know they have someone local they can trust. From last-minute reservations to
                  help navigating public transportation, or practical needs such as finding a
                  pharmacy.
                </p>
                <p className="font-heading text-2xl text-primary pt-4">
                  Quietly, quickly, and personally. So you don't have to.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. Deeply Local */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <Map className="w-10 h-10 text-secondary mx-auto mb-6" strokeWidth={1.5} />
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary leading-[0.95]">
                  Deeply local.<br />Personally connected.
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="space-y-6 font-body text-lg text-foreground/90 leading-relaxed max-w-2xl mx-auto">
                <p>
                  I've lived in Amsterdam for over 20 years. I know the city like the back of my
                  hand, not just the highlights, but the places that make people feel something.
                </p>
                <p>
                  And for many of my clients, the experience doesn't stop there. I also guide
                  and support them throughout the Netherlands, from other cities to the
                  countryside.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div
                className="mt-20 p-10 lg:p-12 border-l-4"
                style={{
                  borderColor: "hsl(var(--heritage-orange))",
                  backgroundColor: "hsl(var(--heritage-taupe) / 0.12)",
                }}
              >
                <Sparkles className="w-8 h-8 text-secondary mb-6" strokeWidth={1.5} />
                <h3 className="font-heading text-3xl lg:text-4xl text-primary mb-6 leading-tight">
                  A true extension of your service.
                </h3>
                <div className="space-y-4 font-body text-lg text-foreground/90 leading-relaxed">
                  <p>
                    When we work together, you're not handing your clients off. You're extending
                    your service with someone you can trust. Someone who understands your
                    clients. Someone who takes ownership. Someone who is there when it matters.
                  </p>
                  <p className="font-heading text-2xl text-primary pt-2">
                    So you can say: "I have someone in Amsterdam. He'll take care of you." And
                    truly mean it.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section
        className="py-24 lg:py-32"
        style={{ backgroundColor: "hsl(var(--heritage-taupe) / 0.15)" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <FadeIn>
            <p className="font-body text-sm tracking-widest uppercase text-secondary text-center mb-16">
              From Advisors I Work With
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
            {[
              {
                quote:
                  "Dennis is our trusted contact in Amsterdam. Our clients are always in the best hands.",
                author: "Travel Advisor",
                location: "United States",
              },
              {
                quote:
                  "Working with Dennis gives us complete peace of mind. Our clients are taken care of from start to finish.",
                author: "Travel Advisor",
                location: "United States",
              },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <figure
                  className="border-l-4 pl-8 py-2"
                  style={{ borderColor: "hsl(var(--heritage-orange))" }}
                >
                  <blockquote className="font-body text-xl lg:text-2xl text-primary leading-relaxed mb-6">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="font-body text-sm tracking-wide uppercase text-secondary">
                    {t.author}, {t.location}
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Let's Connect */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-6xl mx-auto">
            <FadeIn>
              <div>
                <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                  Let's Connect
                </p>
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-primary leading-[0.95] mb-8">
                  If this resonates, I'd love to hear from you.
                </h2>
                <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10">
                  The easiest way to start is a short call. We can talk through how you work,
                  the kind of clients you serve, and whether we're a good fit.
                </p>
                <Link
                  to="/#contact"
                  className="inline-block font-body text-sm tracking-widest uppercase px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 mb-8"
                >
                  Schedule a Short Call
                </Link>
                <p className="font-body text-sm text-muted-foreground">
                  Or write directly using the form. I read and respond to every message
                  personally.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="border border-border p-10 bg-background">
                <h3 className="font-heading text-2xl text-primary mb-6">Send a message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Your Name</Label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="h-12 text-base font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Agency / Company</Label>
                    <Input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="h-12 text-base font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Email Address</Label>
                    <Input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="h-12 text-base font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Tell me about your clients</Label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="min-h-[120px] text-base font-body"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full font-body text-sm tracking-widest uppercase px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TravelAgents;
