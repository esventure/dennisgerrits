import { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import AmsterdamSkyline from "@/components/AmsterdamSkyline";
import dennisIllustration from "@/assets/dennis_illustration.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const moments = [
  {
    time: "Morning",
    title: "A Quiet Start",
    text: "We meet at a café I like, somewhere away from the tourist centre. Over coffee, we talk about what you're curious about, what you've already seen, what caught your eye. No rush.",
  },
  {
    time: "Late Morning",
    title: "Into the City",
    text: "We walk. Slowly. I share stories about the streets, the buildings, the people who shaped them. If something catches your eye, we stop. The best discoveries are never planned.",
  },
  {
    time: "Midday",
    title: "A Shared Table",
    text: "Lunch at a place the locals actually go. Not a tourist restaurant with laminated menus, but somewhere with a story of its own. We eat, talk, watch the city move around us.",
  },
  {
    time: "Afternoon",
    title: "Following Curiosity",
    text: "Maybe we visit a hidden garden, or explore a quiet museum. Maybe we just sit on a bench and talk about what we've seen. The afternoon goes wherever feels right.",
  },
  {
    time: "Late Afternoon",
    title: "Winding Down",
    text: "We find a spot for a drink. Something local, something good. We reflect on the day. By now, the city probably feels a bit different to you. More personal. More yours.",
  },
];

const faqs = [
  {
    q: "What exactly do you offer?",
    a: "Private, one-on-one experiences. We walk through a city together, share stories, and discover the places that matter most to you. It's not a tour in the traditional sense. It's a shared day.",
  },
  {
    q: "How long is a typical day together?",
    a: "Most experiences last between four and six hours, but there's no strict schedule. We go at your pace. If you'd like a full day, that's possible too. We'll just discuss it beforehand.",
  },
  {
    q: "Is this suitable for someone who can't walk long distances?",
    a: "Absolutely. I adapt everything to your comfort level. We can use public transport, take frequent breaks, or focus on a smaller area with more depth. Accessibility is always part of the plan.",
  },
  {
    q: "Do you work with groups?",
    a: "I keep things intimate. Individuals, couples, or very small groups of close friends or family. Never more than four people. That's what keeps it personal.",
  },
  {
    q: "How does pricing work?",
    a: "My pricing is a flat day rate that covers my time, preparation, and local knowledge. No hidden fees, no upsells. I'll share exact pricing during our introductory conversation.",
  },
  {
    q: "Which cities do you cover?",
    a: "I'm based in the Netherlands and work primarily in Dutch cities. But I regularly collaborate with like-minded companions across Europe. Tell me your destination and I may know just the right person.",
  },
  {
    q: "How far in advance should I book?",
    a: "Two to three weeks is ideal, though I'm sometimes available on shorter notice. The earlier we connect, the better I can prepare something meaningful for you.",
  },
  {
    q: "What if we're not a good match?",
    a: "That's perfectly fine. It's exactly why I offer an introductory conversation first. No pressure to commit. If my approach isn't what you're looking for, I'll happily recommend alternatives.",
  },
];

const Index = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [agentForm, setAgentForm] = useState({ name: "", company: "", email: "", message: "" });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent", description: "Thank you. I'll be in touch soon." });
    setContactForm({ name: "", email: "", message: "" });
  };

  const handleAgentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Inquiry sent", description: "Thank you. I'll respond within 24 hours." });
    setAgentForm({ name: "", company: "", email: "", message: "" });
  };

  return (
    <main>
      {/* Hero */}
      <section id="hero" className="min-h-[85vh] flex items-center scroll-mt-20">
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

      {/* Amsterdam Skyline Illustration */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <AmsterdamSkyline />
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

      {/* About */}
      <section id="about" className="py-24 lg:py-32 scroll-mt-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                About Dennis
              </p>
              <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-12">
                The Storyteller
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
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

      {/* A Day Together (Approach) */}
      <section id="approach" className="py-24 lg:py-32 bg-muted/30 scroll-mt-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                The Approach
              </p>
              <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
                A Day in the Life
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                There are no fixed tours. Every day is shaped by you: your pace, your curiosity,
                your energy. Here's what a day together might look like.
              </p>
            </FadeIn>
          </div>

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

      {/* FAQ */}
      <section id="faq" className="py-24 lg:py-32 scroll-mt-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                Practicalities
              </p>
              <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
                Questions & Answers
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Honest answers to the things you might be wondering about.
              </p>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="max-w-3xl">
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-border px-0">
                    <AccordionTrigger className="font-body text-base text-foreground hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 lg:py-32 bg-muted/30 scroll-mt-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                Get in Touch
              </p>
              <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
                Let's See if We're a Good Match
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                The best way to start is a short, informal conversation. No obligations, no sales pitch.
                Just a chance to talk about your trip and see if my approach feels right for you.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <FadeIn>
              <div className="border border-border rounded-sm p-10">
                <div className="w-12 h-0.5 bg-accent mb-8" />
                <h3 className="font-heading text-3xl text-primary mb-4">
                  Schedule a Video Call
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-8">
                  A 15-minute introductory call where we get to know each other. I'll ask about your
                  interests, you can ask me anything. It's the closest thing to meeting in person
                  before your trip.
                </p>
                <div className="aspect-video bg-muted rounded-sm flex items-center justify-center border border-border">
                  <div className="text-center">
                    <p className="font-body text-sm text-muted-foreground">Calendly embed</p>
                    <p className="font-body text-xs text-muted-foreground/60 mt-1">Integration placeholder</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="border border-border rounded-sm p-10">
                <div className="w-12 h-0.5 bg-secondary mb-8" />
                <h3 className="font-heading text-3xl text-primary mb-4">
                  Request a Callback
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-8">
                  Prefer that I reach out to you? Leave your details and a few words about your trip,
                  and I'll get back to you within 48 hours.
                </p>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Your Name</Label>
                    <Input
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="h-12 text-base font-body"
                      placeholder="e.g. Jane Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Email Address</Label>
                    <Input
                      required
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="h-12 text-base font-body"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Tell Me a Little About Your Trip</Label>
                    <Textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="min-h-[140px] text-base font-body"
                      placeholder="When are you visiting? What are you curious about?"
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

      {/* Travel Agents */}
      <section id="professionals" className="py-24 lg:py-32 scroll-mt-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                For Professionals
              </p>
              <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
                Travel Agents & Concierges
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                I work closely with travel designers, concierges, and boutique agencies who care about
                authentic, personalized experiences for their clients. If that sounds like you,
                I'd love to explore how we can work together.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-12">
              {[
                {
                  title: "What I Offer Partners",
                  text: "A reliable, premium experience that reflects well on your brand. I handle every detail, from personalized itinerary research to day-of execution, so your clients feel genuinely cared for.",
                },
                {
                  title: "How It Works",
                  text: "Share your client's interests and travel dates. I'll create a tailored proposal within 48 hours. You stay the primary point of contact for your client. I integrate seamlessly into their trip.",
                },
                {
                  title: "Pricing & Terms",
                  text: "Transparent flat-rate pricing with no hidden costs. Commission structures available for ongoing partnerships. Happy to discuss terms that work for both of us.",
                },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <div>
                    <div className="w-12 h-0.5 bg-accent mb-6" />
                    <h3 className="font-heading text-2xl text-primary mb-3">{item.title}</h3>
                    <p className="font-body text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.15}>
              <div className="border border-border rounded-sm p-10">
                <h3 className="font-heading text-3xl text-primary mb-6">Get in Touch</h3>
                <form onSubmit={handleAgentSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Your Name</Label>
                    <Input
                      required
                      value={agentForm.name}
                      onChange={(e) => setAgentForm({ ...agentForm, name: e.target.value })}
                      className="h-12 text-base font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Company / Agency</Label>
                    <Input
                      value={agentForm.company}
                      onChange={(e) => setAgentForm({ ...agentForm, company: e.target.value })}
                      className="h-12 text-base font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Email Address</Label>
                    <Input
                      required
                      type="email"
                      value={agentForm.email}
                      onChange={(e) => setAgentForm({ ...agentForm, email: e.target.value })}
                      className="h-12 text-base font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm">How Can We Collaborate?</Label>
                    <Textarea
                      value={agentForm.message}
                      onChange={(e) => setAgentForm({ ...agentForm, message: e.target.value })}
                      className="min-h-[120px] text-base font-body"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full font-body text-sm tracking-widest uppercase px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    Send Inquiry
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

export default Index;
