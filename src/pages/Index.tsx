import { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import AmsterdamSkyline from "@/components/AmsterdamSkyline";
import DayMap from "@/components/DayMap";
import dennisIllustration from "@/assets/dennis_illustration.png";
import dennisPhoto from "@/assets/dennis_photo.png";
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

const reviews = [
  {
    quote: "Dennis made Amsterdam feel like home. We laughed, we explored, we discovered corners of the city I never would have found on my own.",
    author: "Sarah & Michael",
    location: "California, USA",
  },
  {
    quote: "It wasn't a tour. It was a day with a friend who happens to know everything about his city. Truly special.",
    author: "Margaret",
    location: "London, UK",
  },
  {
    quote: "We've travelled to over 40 countries. Our day with Dennis in Amsterdam is one of the best travel experiences we've ever had.",
    author: "Robert & Linda",
    location: "Texas, USA",
  },
  {
    quote: "I came for the history, but what I got was so much more. Dennis has a gift for making you feel like you belong in a place.",
    author: "James",
    location: "Toronto, Canada",
  },
  {
    quote: "My mother is 78 and Dennis adjusted the entire day to her pace without ever making her feel like she was slowing us down. That's rare.",
    author: "Catherine",
    location: "Boston, USA",
  },
];

const stories = [
  {
    title: "The Bookshop That Refused to Close",
    intro: "On a quiet street in the Jordaan, there's a bookshop that's been open since 1953. The owner still wraps every purchase in brown paper. I asked him once why he never retired.",
    image: null,
  },
  {
    title: "Why the Canal Houses Lean Forward",
    intro: "It's not bad engineering. It's actually on purpose. And the reason says a lot about how the Dutch think about commerce, neighbours, and showing off.",
    image: null,
  },
  {
    title: "A Bench With the Best View in Amsterdam",
    intro: "It's not where you'd expect. No famous landmarks in sight. Just water, sky, and the kind of quiet that makes you want to sit for a while.",
    image: null,
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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent", description: "Thank you. I'll be in touch soon." });
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="relative z-10">
      <AmsterdamSkyline />
      {/* ── 1. Hero ── */}
      <section id="hero" className="min-h-[85vh] flex items-center scroll-mt-20">
        <div className="container mx-auto px-6 lg:px-12 pt-2 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
            <FadeIn>
              <div className="flex flex-col items-center lg:items-start h-full">
                <img
                  src={dennisPhoto}
                  alt="Photo of Dennis Gerrits"
                  className="w-full max-w-lg rounded-sm object-cover shadow-lg aspect-[3/4]"
                />
                <p className="font-body text-sm tracking-widest uppercase text-secondary mt-6">
                  Personal Travel Companion
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary leading-[0.95] mb-8">
                Hello,<br />
                <span className="text-accent">I'm Dennis.</span><br />
                I don't show a city.<br />
                I translate it.
              </h1>
              <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-lg mb-8">
                I walk alongside you, not in front of you. We'll find the stories, the quiet corners,
                the places that make you stop and really look. That's what I do.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Blockquote */}
      <div className="py-20" style={{ backgroundColor: "hsl(var(--heritage-taupe) / 0.15)" }}>
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center px-6">
            <blockquote className="font-body text-xl text-secondary italic leading-relaxed">
              "I don't want you to remember what I told you. I want you to remember how the city made you feel."
            </blockquote>
          </div>
        </FadeIn>
      </div>

      {/* ── 2. About Me — Full-Screen Split ── */}
      <section id="about" className="scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left Panel — The Person (dark) */}
          <div className="min-h-[80vh] lg:min-h-screen flex items-center bg-primary px-8 md:px-16 lg:px-20 py-20">
            <FadeIn>
              <div className="max-w-lg">
                <h2 className="font-heading text-5xl md:text-6xl text-primary-foreground leading-[0.95] mb-4">
                  The Person
                </h2>
                <div className="w-12 h-0.5 bg-primary-foreground/30 mb-6" />
                <p className="font-body text-sm tracking-[0.15em] uppercase text-primary-foreground/60 mb-6">
                  A True Amsterdammer
                </p>
                <p className="font-body text-primary-foreground/80 leading-relaxed mb-4">
                  I'm a free spirit with deep roots in this city. I grew up cycling along the canals, getting lost in neighbourhoods,
                  and collecting stories from the people I met along the way. Amsterdam isn't just where I live. It's how I think.
                </p>
                <p className="font-body text-primary-foreground/80 leading-relaxed">
                  I love good coffee, slow mornings, and conversations that go deeper than small talk.
                  That's probably why this work suits me so well.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right Panel — The Guide (light) */}
          <div className="min-h-[80vh] lg:min-h-screen flex items-center bg-background px-8 md:px-16 lg:px-20 py-20">
            <FadeIn>
              <div className="max-w-lg">
                <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-4">
                  The Guide
                </h2>
                <div className="w-12 h-0.5 bg-accent mb-6" />
                <p className="font-body text-sm tracking-[0.15em] uppercase text-secondary mb-6">
                  A Different Kind of Guide
                </p>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  I don't carry a flag or a microphone. I don't follow a script. Every experience I create starts with you:
                  your interests, your pace, your curiosity. My job is to make the city feel personal.
                </p>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Depth over highlights. Connection over information. A friend who knows the city inside out,
                  walking beside you instead of in front of you.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

      </section>

      {/* ── 3. A Day in the Life ── */}
      <section id="day" className="relative scroll-mt-20" style={{ backgroundColor: "hsl(var(--heritage-green) / 0.08)", height: "200vh" }}>
        <div className="sticky top-0 min-h-screen flex items-center">
          <div className="container mx-auto px-6 lg:px-12 py-24 lg:py-32">
            <div className="max-w-3xl mb-16">
              <FadeIn>
                <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                  A Day Together
                </p>
                <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
                  A Day in the Life of Dennis
                </h2>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  There are no fixed tours. Every day is shaped by you: your pace, your curiosity,
                  your energy. Here's what a day together might look like.
                </p>
              </FadeIn>
            </div>

            <FadeIn>
              <DayMap moments={moments} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 4. Proof: Reviews & Guests ── */}
      <section id="proof" className="py-24 lg:py-32 scroll-mt-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                What Guests Say
              </p>
              <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
                Real Words From Real People
              </h2>
            </FadeIn>
          </div>

          {/* Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {reviews.map((r, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="border border-border rounded-sm p-8 h-full flex flex-col">
                  <p className="font-body text-foreground leading-relaxed italic flex-1">
                    "{r.quote}"
                  </p>
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="font-body text-sm font-medium text-primary">{r.author}</p>
                    <p className="font-body text-xs text-muted-foreground">{r.location}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Photo collage placeholder */}
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`bg-muted rounded-sm flex items-center justify-center ${
                    i === 0 || i === 5 ? "aspect-[3/4]" : "aspect-square"
                  }`}
                >
                  <p className="font-body text-xs text-muted-foreground italic">Guest photo</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 5. More: Mission, Media & Podcast ── */}
      <section id="more" className="py-24 lg:py-32 bg-primary scroll-mt-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-accent mb-6">
                Beyond the Walk
              </p>
              <h2 className="font-heading text-5xl md:text-6xl text-primary-foreground leading-[0.95] mb-8">
                More Than a Guide
              </h2>
            </FadeIn>
          </div>

          {/* Mission pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-20">
            {[
              {
                title: "Storytelling",
                text: "Every city has layers of stories waiting to be told. I believe the best way to understand a place is through the people who shaped it, the choices they made, and the traces they left behind.",
              },
              {
                title: "Building Community",
                text: "Travel should bring people closer, not just to a destination but to each other. I create experiences that leave guests with real connections, not just photographs.",
              },
              {
                title: "Honouring the City",
                text: "Amsterdam gave me everything. This work is my way of giving something back: showing its beauty with respect, sharing its complexity honestly, and introducing visitors the right way.",
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

          {/* Media & Podcast */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <FadeIn>
              <div className="border border-primary-foreground/20 rounded-sm p-8">
                <h3 className="font-heading text-2xl text-primary-foreground mb-4">In the Media</h3>
                <ul className="space-y-3">
                  <li className="font-body text-primary-foreground/70">
                    <span className="text-accent font-medium">Rick Steves Podcast</span> — Guest appearance on exploring Amsterdam beyond the tourist trail
                  </li>
                  <li className="font-body text-primary-foreground/70">
                    <span className="text-accent font-medium">Amsterdam Radio</span> — Regular contributor on the city's hidden stories
                  </li>
                  <li className="font-body text-primary-foreground/70">
                    <span className="text-accent font-medium">University Collaborations</span> — Guest lectures on urban storytelling and cultural tourism
                  </li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="border border-primary-foreground/20 rounded-sm p-8">
                <h3 className="font-heading text-2xl text-primary-foreground mb-4">Two Stories, One City</h3>
                <p className="font-body text-primary-foreground/70 leading-relaxed mb-4">
                  My podcast where I pair two seemingly unrelated Amsterdam stories and show how they connect.
                  History, architecture, food, people. Everything in this city is linked if you know where to look.
                </p>
                <div className="bg-primary-foreground/10 rounded-sm p-6 flex items-center justify-center">
                  <p className="font-body text-sm text-primary-foreground/50 italic">Podcast player embed</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 6. Stories (Blog) ── */}
      <section id="stories" className="py-24 lg:py-32 scroll-mt-20" style={{ backgroundColor: "hsl(var(--heritage-taupe) / 0.15)" }}>
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
                Short reflections and stories about Amsterdam. The kind of things I'd tell you over a coffee.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div className="border border-border rounded-sm overflow-hidden group cursor-pointer">
                  <div className="aspect-[16/10] bg-muted flex items-center justify-center">
                    <p className="font-body text-xs text-muted-foreground italic">Atmospheric image</p>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-2xl text-primary mb-3 group-hover:text-secondary transition-colors">
                      {s.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {s.intro}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Contact, FAQ & Footer ── */}
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

          <div className="max-w-2xl">
            {/* Contact form */}
            <FadeIn delay={0.15}>
              <div className="border border-border rounded-sm p-10">
                <div className="w-12 h-0.5 bg-secondary mb-8" />
                <h3 className="font-heading text-3xl text-primary mb-4">
                  Book a Call
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed mb-8">
                  Leave your details and a few words about your trip. I'll reach out personally
                  to find a time that works for both of us.
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

          {/* FAQ */}
          <div className="mt-24">
            <div className="max-w-3xl mb-12">
              <FadeIn>
                <h3 className="font-heading text-4xl text-primary mb-4">Questions & Answers</h3>
                <p className="font-body text-muted-foreground">
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
        </div>
      </section>
    </main>
  );
};

export default Index;
