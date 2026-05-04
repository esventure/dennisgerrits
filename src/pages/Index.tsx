import { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import AmsterdamSkyline from "@/components/AmsterdamSkyline";
import DayMap from "@/components/DayMap";
import MosaicWall from "@/components/MosaicWall";
import { guestPhotos } from "@/assets/guests";
import dennisIllustration from "@/assets/dennis_illustration.png";
import dennisPhoto from "@/assets/dennis_photo.png";
import dennisRickSteves from "@/assets/dennis_rick_steves.jpg";
import iconTickets from "@/assets/icon-tickets.png";
import iconDining from "@/assets/icon-dining.png";
import iconItinerary from "@/assets/icon-itinerary.png";
import iconMessage from "@/assets/icon-message.png";
import iconTransport from "@/assets/icon-transport.png";
import iconHotel from "@/assets/icon-hotel.png";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSiteContent } from "@/hooks/useSiteContent";
import iconFoot from "@/assets/icon-foot.png";
import ServiceIcon from "@/components/ServiceIcon";
import iconBike from "@/assets/icon-bike.png";
import iconBoat from "@/assets/icon-boat.png";

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
    quote: "Two wonderful days of walking, eating at favorite restaurants, touring the canals, and visiting the Rijks and Van Gogh museums…",
    author: "James E.",
    location: "Rick Steves traveller",
    date: "March 2026",
  },
  {
    quote: "Knowledgeable and very personable. If we were to return we would book Dennis again just for the pleasure of his company…",
    author: "Paul J.",
    location: "United States",
    date: "July 2025",
  },
  {
    quote: "If I could give Dennis 10++ stars I would. One of the best guides we have ever had the pleasure of knowing…",
    author: "Brynn & Bill",
    location: "United States",
    date: "September 2023",
  },
  {
    quote: "Welcoming, kind and enthusiastic. He gave us a walking tour of Amsterdam, drove us to the tulip fields, and took us to the museums…",
    author: "Melanie D.",
    location: "Keller, Texas",
    date: "April 2024",
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


const Index = () => {
  const { toast } = useToast();
  const t = useSiteContent();
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

      {/* ── 2. About Me — Full-Screen Split ── */}
      <section id="about" className="scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Panel — The Person (light) */}
          <div className="flex items-center bg-background px-8 md:px-16 lg:px-20 py-16 lg:py-20">
            <FadeIn>
              <div className="max-w-lg">
                <h2 className="font-heading text-4xl md:text-5xl text-primary leading-[0.95] mb-3">
                  {t("about.person.title", "The Person")}
                </h2>
                <div className="w-12 h-0.5 bg-accent mb-4" />
                <p className="font-body text-sm tracking-[0.15em] uppercase text-secondary mb-4">
                  {t("about.person.kicker", "A True Amsterdammer")}
                </p>
                <p className="font-body text-muted-foreground leading-relaxed whitespace-pre-line">
                  {t("about.person.body", "I'm a free spirit with deep roots here. I grew up cycling these canals and collecting stories along the way. Amsterdam isn't just where I live, it's how I think.")}
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right Panel — The Guide (dark) */}
          <div className="flex items-center bg-primary px-8 md:px-16 lg:px-20 py-16 lg:py-20">
            <FadeIn>
              <div className="max-w-lg">
                <h2 className="font-heading text-4xl md:text-5xl text-primary-foreground leading-[0.95] mb-3">
                  {t("about.guide.title", "The Guide")}
                </h2>
                <div className="w-12 h-0.5 bg-primary-foreground/30 mb-4" />
                <p className="font-body text-sm tracking-[0.15em] uppercase text-primary-foreground/60 mb-4">
                  {t("about.guide.kicker", "A Different Kind of Guide")}
                </p>
                <p className="font-body text-primary-foreground/80 leading-relaxed whitespace-pre-line">
                  {t("about.guide.body", "No flag, no script. Depth over highlights, connection over information. A friend who knows the city inside out, walking beside you instead of in front of you.")}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

      </section>

      {/* ── How It Works (process + concierge) ── */}
      <section id="how-it-works" className="py-24 lg:py-32 scroll-mt-20" style={{ backgroundColor: "hsl(var(--heritage-taupe-tint))" }}>
        <div className="container mx-auto px-6 lg:px-12">

          {/* Heading */}
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                {t("process.kicker", "How It Works")}
              </p>
              <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-6">
                {t("process.title", "No standard tours. Every trip is built from scratch.")}
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                {t("process.intro", "From the first message to the last goodbye, one person looks after every detail.")}
              </p>
            </FadeIn>
          </div>

          {/* 4-step timeline with hand-drawn line */}
          <FadeIn delay={0.1}>
            <div className="relative max-w-5xl mx-auto mb-24 lg:mb-32">
              <svg
                className="hidden md:block absolute top-8 left-0 w-full pointer-events-none"
                height="20"
                viewBox="0 0 1000 20"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M 60 10 Q 200 2, 340 10 T 660 10 T 940 10"
                  fill="none"
                  stroke="hsl(var(--heritage-orange))"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="1 6"
                />
              </svg>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
                {[
                  { n: "01", label: "You reach out", text: "A quick note, a phone call. Tell me when you're coming." },
                  { n: "02", label: "We have a call", text: "I listen. Your pace, your interests, what you've already seen." },
                  { n: "03", label: "I design your trip", text: "A custom itinerary made for you. No templates." },
                  { n: "04", label: "I take care of everything", text: "Bookings, transfers, reservations. One person, one phone number." },
                ].map((step) => (
                  <div key={step.n} className="text-center md:text-left">
                    <div
                      className="mx-auto md:mx-0 w-16 h-16 rounded-full flex items-center justify-center mb-5 font-heading text-2xl"
                      style={{
                        backgroundColor: "hsl(var(--background))",
                        color: "hsl(var(--heritage-orange))",
                        border: "2px solid hsl(var(--heritage-orange))",
                      }}
                    >
                      {step.n}
                    </div>
                    <h3 className="font-heading text-2xl text-primary leading-tight mb-2">
                      {step.label}
                    </h3>
                    <p className="font-body text-muted-foreground leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Concierge: slimmed comparison */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-accent mb-4">
                {t("concierge.kicker", "What I take care of")}
              </p>
              <h3 className="font-heading text-3xl md:text-4xl text-primary leading-tight">
                {t("concierge.title", "More than a guide. A concierge for your whole stay.")}
              </h3>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {(() => {
              const rows = [
                {
                  worry: "Refreshing the Anne Frank House page hoping a slot opens up.",
                  icon: iconTickets,
                  title: "Museum reservations",
                  desc: "Time slots booked in advance. No queues.",
                },
                {
                  worry: "Reading 200 reviews to find a restaurant that isn't a tourist trap.",
                  icon: iconDining,
                  title: "Dining bookings",
                  desc: "Tables at the kind of places locals actually go.",
                },
                {
                  worry: "Wondering, at 9pm, where to eat tonight.",
                  icon: iconMessage,
                  title: "WhatsApp lifeline",
                  desc: "One message away for the whole trip.",
                },
              ];

              const ROW_MIN_H = "min-h-[96px]";

              return (
                <>
                  <FadeIn>
                    <div
                      className="h-full p-8 lg:p-10 bg-background rounded-sm border-t-4 shadow-sm"
                      style={{ borderColor: "hsl(var(--heritage-taupe))" }}
                    >
                      <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-6 font-semibold">
                        Planning it yourself
                      </p>
                      <ul className="font-body text-base lg:text-lg text-foreground leading-relaxed">
                        {rows.map((row) => (
                          <li key={row.worry} className={`flex gap-4 items-center ${ROW_MIN_H}`}>
                            <span
                              aria-hidden
                              className="shrink-0 text-lg font-bold"
                              style={{ color: "hsl(var(--heritage-bordeaux))" }}
                            >
                              ✕
                            </span>
                            <span>{row.worry}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.15}>
                    <div
                      className="h-full p-8 lg:p-10 bg-background rounded-sm border-t-4 shadow-sm"
                      style={{ borderColor: "hsl(var(--heritage-orange))" }}
                    >
                      <p className="font-body text-xs tracking-widest uppercase text-secondary mb-6 font-semibold">
                        With me alongside you
                      </p>
                      <ul className="font-body text-foreground leading-relaxed">
                        {rows.map((row) => (
                          <li key={row.title} className={`flex gap-5 items-center ${ROW_MIN_H}`}>
                            <ServiceIcon src={row.icon} size={56} padding={10} tinted />
                            <span>
                              <span className="font-heading text-xl text-primary block leading-tight mb-1">
                                {row.title}
                              </span>
                              <span className="text-foreground/85 text-base">
                                {row.desc}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                </>
              );
            })()}
          </div>

          <FadeIn delay={0.2}>
            <p className="mt-10 text-center font-body text-sm text-muted-foreground italic max-w-2xl mx-auto">
              And everything else: transfers from Schiphol, hotel recommendations, a full itinerary for your whole stay.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── 3. A Day in the Life ── */}
      <section id="day" className="relative scroll-mt-20" style={{ height: "200vh" }}>
        <div className="sticky top-0 min-h-screen flex items-center">
          <div className="container mx-auto px-6 lg:px-12 py-24 lg:py-32">
            <div className="max-w-3xl mb-16">
              <FadeIn>
                <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                  Let's Explore Together
                </p>
                <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
                  A Day in My Life
                </h2>
                <p className="font-body text-lg text-muted-foreground leading-relaxed">
                  No fixed tours. Every day is shaped by you. Here's what one might look like.
                </p>
              </FadeIn>
            </div>

            <FadeIn>
              <DayMap moments={moments} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Rick Steves Feature ── */}
      <div className="py-20 lg:py-28" style={{ backgroundColor: "hsl(var(--heritage-taupe) / 0.15)" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="relative">
                <img
                  src={dennisRickSteves}
                  alt="Dennis Gerrits with travel writer Rick Steves on an Amsterdam canal, holding the Rick Steves Amsterdam & The Netherlands guidebook"
                  className="w-full h-auto rounded-sm shadow-xl object-cover"
                />
                <p className="font-body text-xs italic text-muted-foreground mt-3">
                  With Rick Steves on an Amsterdam canal.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <p className="font-body text-sm tracking-widest uppercase text-accent mb-6">
                  Featured By
                </p>
                <h2 className="font-heading text-4xl md:text-5xl text-primary leading-[0.95] mb-6">
                  Rick Steves
                </h2>
                <blockquote className="font-body text-xl text-foreground italic leading-relaxed mb-6">
                  "Dennis is the kind of local guide every traveller dreams of finding. He doesn't just show you Amsterdam. He makes you feel like you belong there."
                </blockquote>
                <p className="font-body text-foreground/80 leading-relaxed mb-8">
                  Guest on the Rick Steves Travel with Rick Steves podcast across three episodes, exploring Amsterdam and the Netherlands beyond the tourist trail.
                </p>

                <p className="font-body text-sm tracking-widest uppercase text-secondary mb-4">
                  Listen on Rick Steves
                </p>
                <ul className="space-y-3">
                  {[
                    {
                      date: "April 27, 2024",
                      title: "Program 752",
                      url: "https://www.ricksteves.com/watch-read-listen/audio/radio/programs/program-752",
                    },
                    {
                      date: "August 26, 2023",
                      title: "Program 725",
                      url: "https://www.ricksteves.com/watch-read-listen/audio/radio/programs/program-725",
                    },
                    {
                      date: "May 13, 2023",
                      title: "Program 714",
                      url: "https://www.ricksteves.com/watch-read-listen/audio/radio/programs/program-714",
                    },
                  ].map((ep) => (
                    <li key={ep.url}>
                      <a
                        href={ep.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-baseline justify-between gap-4 border-b border-border/60 pb-3 hover:border-accent transition-colors"
                      >
                        <span className="font-heading text-lg text-primary group-hover:text-accent transition-colors">
                          {ep.title}
                        </span>
                        <span className="font-body text-sm text-muted-foreground">
                          {ep.date}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Invite me — speaking, podcasts, radio */}
          <FadeIn delay={0.1}>
            <div
              className="mt-16 lg:mt-20 rounded-sm border-l-4 p-8 lg:p-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center"
              style={{
                borderLeftColor: "hsl(var(--accent))",
                backgroundColor: "hsl(var(--background))",
              }}
            >
              <div>
                <p className="font-body text-sm tracking-widest uppercase text-accent mb-3">
                  Invite me
                </p>
                <h3 className="font-heading text-3xl md:text-4xl text-primary leading-tight mb-4">
                  Book a lecture or invite me as a guest
                </h3>
                <p className="font-body text-foreground/80 leading-relaxed max-w-2xl">
                  Beyond guiding, I'm available for lectures and as a guest on podcasts and radio shows. If you're a host, organiser, or producer looking for a story about Amsterdam, the Netherlands, or travel beyond the tourist trail, get in touch.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-body text-sm tracking-widest uppercase rounded-sm hover:bg-accent/90 transition-colors whitespace-nowrap"
              >
                Get in touch →
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ── My Service ── */}
      <section id="my-service" className="py-24 lg:py-32 scroll-mt-20" style={{ backgroundColor: "hsl(var(--heritage-taupe-tint))" }}>
        <div className="container mx-auto px-6 lg:px-12">
          {/* Heading + intro, centered editorial block */}
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-accent mb-6">
                {t("service.kicker", "My Service")}
              </p>
              <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
                {t("service.title", "More than a guide. A concierge for your whole stay.")}
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="font-body text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {t("service.intro", "The day we spend together is just the centre of it. Around that, I quietly take care of the things that usually eat up a holiday: the bookings, the queues, the questions at 9pm about where to eat. One person, one phone number, every detail looked after.")}
              </p>
            </FadeIn>
          </div>

          {/* Two-column: what you'd handle alone vs what I take care of */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {(() => {
              const rows = [
                {
                  worry: "Refreshing the Anne Frank House page hoping a slot opens up.",
                  icon: iconTickets,
                  title: "Museum reservations",
                  desc: "Time slots booked in advance. No queues.",
                },
                {
                  worry: "Reading 200 reviews to find a restaurant that isn't a tourist trap.",
                  icon: iconDining,
                  title: "Dining bookings",
                  desc: "Tables at the kind of places locals actually go.",
                },
                {
                  worry: "Wondering, at 9pm, where to eat tonight.",
                  icon: iconMessage,
                  title: "WhatsApp lifeline",
                  desc: "One message away for the whole trip.",
                },
                {
                  worry: "Stitching together trains, trams and a transfer from Schiphol.",
                  icon: iconTransport,
                  title: "Transport and transfers",
                  desc: "Airport pickups, trains, private cars to day trips.",
                },
                {
                  worry: "Hoping the hotel you booked is actually in the right neighbourhood.",
                  icon: iconHotel,
                  title: "Where to stay",
                  desc: "Honest hotel and apartment recommendations.",
                },
                {
                  worry: "Carrying every small question alone.",
                  icon: iconItinerary,
                  title: "A full itinerary",
                  desc: "A curated plan for your whole stay, not just our day.",
                },
              ];

              const ROW_MIN_H = "min-h-[112px]";

              return (
                <>
                  {/* Left: without me */}
                  <FadeIn>
                    <div
                      className="h-full p-10 lg:p-12 bg-background rounded-sm border-t-4 shadow-sm"
                      style={{ borderColor: "hsl(var(--heritage-taupe))" }}
                    >
                      <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-6 font-semibold">
                        Planning it yourself
                      </p>
                      <h3 className="font-heading text-3xl md:text-4xl text-primary leading-tight mb-10">
                        What usually eats up a holiday.
                      </h3>
                      <ul className="font-body text-lg text-foreground leading-relaxed">
                        {rows.map((row) => (
                          <li
                            key={row.worry}
                            className={`flex gap-4 items-center ${ROW_MIN_H}`}
                          >
                            <span
                              aria-hidden
                              className="shrink-0 text-lg font-bold"
                              style={{ color: "hsl(var(--heritage-bordeaux))" }}
                            >
                              ✕
                            </span>
                            <span>{row.worry}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>

                  {/* Right: with me */}
                  <FadeIn delay={0.15}>
                    <div
                      className="h-full p-10 lg:p-12 bg-background rounded-sm border-t-4 shadow-sm"
                      style={{ borderColor: "hsl(var(--heritage-orange))" }}
                    >
                      <p className="font-body text-xs tracking-widest uppercase text-secondary mb-6 font-semibold">
                        With me alongside you
                      </p>
                      <h3 className="font-heading text-3xl md:text-4xl text-primary leading-tight mb-10">
                        What I quietly take care of.
                      </h3>
                      <ul className="font-body text-lg text-foreground leading-relaxed">
                        {rows.map((row) => (
                          <li
                            key={row.title}
                            className={`flex gap-5 items-center ${ROW_MIN_H}`}
                          >
                            <ServiceIcon src={row.icon} size={64} padding={10} tinted />
                            <span>
                              <span className="font-heading text-xl md:text-2xl text-primary block leading-tight mb-1">
                                {row.title}
                              </span>
                              <span className="text-foreground/85 text-base md:text-lg">
                                {row.desc}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                </>
              );
            })()}
          </div>

        </div>
      </section>

      {/* ── 4. Proof: Reviews & Guests ── */}
      <section id="proof" className="py-24 lg:py-32 scroll-mt-20">
        <div className="container mx-auto px-6 lg:px-12">
          {(() => {
            const TA_URL =
              "https://www.tripadvisor.com/Attraction_Review-g188590-d13431295-Reviews-Love_My_City_Tours-Amsterdam_North_Holland_Province.html";
            const TA_GREEN = "#00AA6C";

            const TripAdvisorBubbles = ({ size = 14 }: { size?: number }) => (
              <span
                className="inline-flex items-center gap-1"
                aria-label="5 of 5 bubbles"
              >
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="block rounded-full"
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: TA_GREEN,
                    }}
                  />
                ))}
              </span>
            );

            const TripAdvisorWordmark = ({
              className = "",
            }: {
              className?: string;
            }) => (
              <span
                className={`font-heading tracking-wide ${className}`}
                style={{ color: TA_GREEN }}
              >
                Tripadvisor
              </span>
            );

            return (
              <>
                <div className="max-w-3xl mb-12">
                  <FadeIn>
                    <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                      What Guests Say
                    </p>
                    <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
                      Real Words From Real People
                    </h2>
                    <p className="font-body text-lg text-muted-foreground leading-relaxed">
                      Every review below is from <TripAdvisorWordmark className="text-lg" />. Click any card to read the full review on Tripadvisor.
                    </p>
                  </FadeIn>
                </div>

                {/* Tripadvisor summary badge */}
                <FadeIn>
                  <a
                    href={TA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 bg-background rounded-lg shadow-md hover:shadow-lg transition-all px-6 py-4 mb-10 border border-border"
                  >
                    <div
                      className="flex items-center justify-center rounded-full text-white font-heading text-xl"
                      style={{
                        backgroundColor: TA_GREEN,
                        width: 44,
                        height: 44,
                      }}
                      aria-hidden="true"
                    >
                      ◉
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <TripAdvisorWordmark className="text-xl" />
                        <span className="font-body text-sm text-muted-foreground">
                          Rating
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <TripAdvisorBubbles />
                        <span className="font-body text-sm text-foreground">
                          <strong>5.0</strong> · 218 reviews
                        </span>
                      </div>
                    </div>
                  </a>
                </FadeIn>

                {/* Reviews */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 max-w-4xl mx-auto">
                  {reviews.map((r, i) => (
                    <FadeIn key={i} delay={i * 0.08}>
                      <a
                        href={TA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-background rounded-lg p-5 h-full flex flex-col shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-4"
                        style={{ borderTopColor: TA_GREEN }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <TripAdvisorBubbles size={12} />
                          <span
                            className="font-body text-xs tracking-wide uppercase opacity-70 group-hover:opacity-100 transition-opacity"
                            style={{ color: TA_GREEN }}
                          >
                            Tripadvisor
                          </span>
                        </div>
                        <p className="font-body text-[11px] text-muted-foreground mb-2">
                          Reviewed {r.date}
                        </p>
                        <p className="font-body text-sm text-foreground leading-snug italic flex-1">
                          "{r.quote}"
                        </p>
                        <div className="mt-3 pt-3 border-t border-border flex items-end justify-between gap-3">
                          <div>
                            <p className="font-body text-xs font-medium text-primary">
                              {r.author}
                            </p>
                            <p className="font-body text-[11px] text-muted-foreground">
                              {r.location}
                            </p>
                          </div>
                          <span
                            className="font-body text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: TA_GREEN }}
                          >
                            Read on Tripadvisor →
                          </span>
                        </div>
                      </a>
                    </FadeIn>
                  ))}
                </div>

                {/* All reviews CTA */}
                <FadeIn>
                  <div className="flex flex-col items-center text-center mb-12">
                    <a
                      href={TA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm tracking-widest uppercase border-b pb-1 transition-colors"
                      style={{
                        color: TA_GREEN,
                        borderColor: `${TA_GREEN}66`,
                      }}
                    >
                      Read all 218 reviews on Tripadvisor →
                    </a>
                  </div>
                </FadeIn>
              </>
            );
          })()}

          {/* ── Mosaic Wall: faces of the road ── */}
          <FadeIn>
            <div className="mt-20 lg:mt-28">
              <div className="max-w-3xl mb-8">
                <p className="font-body text-sm tracking-widest uppercase text-accent mb-4">
                  Faces of the Road
                </p>
                <h3 className="font-heading text-4xl lg:text-5xl text-primary mb-4">
                  Moments spent together.
                </h3>
                <p className="font-body text-muted-foreground text-lg leading-relaxed">
                  Real people, real moments. A glimpse of what a day with me actually feels like.
                </p>
              </div>
              <MosaicWall photos={guestPhotos} />
            </div>
          </FadeIn>
        </div>
      </section>
      {/* ── Podcast: Two Stories, One City ── */}
      <section id="podcast" className="py-24 lg:py-32 scroll-mt-20" style={{ backgroundColor: "hsl(var(--heritage-taupe-tint))" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                  The Podcast
                </p>
                <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
                  Two Stories, One City
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Each episode pairs two seemingly unrelated Amsterdam stories and shows how they connect. If you want to know what spending a day with me feels like, start here.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="bg-primary/5 border border-border rounded-lg p-8">
                <div className="bg-muted rounded-sm p-8 flex items-center justify-center min-h-[200px]">
                  <p className="font-body text-sm text-muted-foreground italic">Podcast player embed</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 6. Stories (Blog) ── */}
      <section id="stories" className="py-24 lg:py-32 scroll-mt-20">
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
                <Link to={`/get-inspired?story=${encodeURIComponent(s.title)}`} className="block">
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
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Contact, FAQ & Footer ── */}
      <section id="contact" className="py-24 lg:py-32 scroll-mt-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div
            className="max-w-4xl mx-auto rounded-sm border px-8 md:px-14 py-16 md:py-20 shadow-lg"
            style={{
              backgroundColor: "hsl(var(--heritage-taupe-soft))",
              borderColor: "hsl(var(--heritage-taupe))",
            }}
          >
            <div className="max-w-3xl mb-12">
              <FadeIn>
                <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                  {t("booking.kicker", "Get in Touch")}
                </p>
                <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
                  {t("booking.title", "Let's See if We're a Good Match")}
                </h2>
                <p className="font-body text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {t("booking.intro", "The best way to start is a short, informal conversation. No obligations, just a chance to see if my approach feels right.")}
                </p>
              </FadeIn>
            </div>

            <div className="max-w-2xl">
              {/* Contact form */}
              <FadeIn delay={0.15}>
                <div className="border border-border rounded-sm p-10 bg-background">
                  <div className="w-12 h-0.5 bg-secondary mb-8" />
                  <h3 className="font-heading text-3xl text-primary mb-4">
                    {t("booking.form.title", "Book a Call")}
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed mb-8 whitespace-pre-line">
                    {t("booking.form.intro", "Leave your details and a few words about your trip. I'll reach out personally.")}
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
                      {t("booking.form.cta", "Send Message")}
                    </button>
                  </form>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
