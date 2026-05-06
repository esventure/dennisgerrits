import { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import AmsterdamSkyline from "@/components/AmsterdamSkyline";
import DayMap from "@/components/DayMap";

import MosaicWall from "@/components/MosaicWall";
import { guestPhotos } from "@/assets/guests";
import HeroCarousel from "@/components/HeroCarousel";
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
import ServiceIcon from "@/components/ServiceIcon";
import RichText from "@/components/RichText";
import storyBookshop from "@/assets/stories/bookshop.jpg";
import peekHistory from "@/assets/interests/history.jpg";
import peekFood from "@/assets/interests/food.jpg";
import peekWater from "@/assets/interests/water.jpg";
import storyCanalHouses from "@/assets/stories/canal-houses.jpg";
import storyBench from "@/assets/stories/bench.jpg";
import podcastCover from "@/assets/podcast-cover.jpg";

/* Hand-drawn ring path for the timeline step circles — matches the
   sketchbook style used in DayMap. Slightly irregular closed loop. */
const sketchedRingPath = (cx: number, cy: number, r: number, seed = 0) => {
  const pts = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2;
    const wob =
      Math.sin(i * 1.7 + seed) * 0.8 + Math.cos(i * 2.3 + seed * 1.3) * 0.8;
    const rr = r + wob;
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr] as const;
  });
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 1; i <= pts.length; i++) {
    const p = pts[i % pts.length];
    d += ` L ${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
  }
  return d + " Z";
};

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
  {
    quote: "Dennis took us off the beaten path and showed us the Amsterdam locals know. We finished the day feeling like we'd made a friend, not hired a guide…",
    author: "Sarah & Tom",
    location: "United Kingdom",
    date: "May 2025",
  },
  {
    quote: "From the moment we connected by email, Dennis was attentive and thoughtful. The day itself flowed effortlessly. We can't recommend him highly enough…",
    author: "Linda H.",
    location: "Australia",
    date: "October 2024",
  },
];



const stories = [
  {
    title: "The Bookshop That Refused to Close",
    intro: "On a quiet street in the Jordaan, there's a bookshop that's been open since 1953. The owner still wraps every purchase in brown paper. I asked him once why he never retired.",
    image: storyBookshop,
    caption: "Jordaan, autumn",
  },
  {
    title: "Why the Canal Houses Lean Forward",
    intro: "It's not bad engineering. It's actually on purpose. And the reason says a lot about how the Dutch think about commerce, neighbours, and showing off.",
    image: storyCanalHouses,
    caption: "Herengracht, looking up",
  },
  {
    title: "A Bench With the Best View in Amsterdam",
    intro: "It's not where you'd expect. No famous landmarks in sight. Just water, sky, and the kind of quiet that makes you want to sit for a while.",
    image: storyBench,
    caption: "A quiet corner, sunset",
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
      {/* ── 1. Hero (3 swipeable variations for Dennis to choose from) ── */}
      <HeroCarousel />

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
                <RichText
                  className="font-body text-muted-foreground leading-relaxed"
                  html={t("about.person.body", "")}
                  fallback="I'm a free spirit with deep roots here. I grew up cycling these canals and collecting stories along the way. Amsterdam isn't just where I live, it's how I think."
                />
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
                <RichText
                  className="font-body text-primary-foreground/80 leading-relaxed"
                  html={t("about.guide.body", "")}
                  fallback="No flag, no script. Depth over highlights, connection over information. A friend who knows the city inside out, walking beside you instead of in front of you."
                />
              </div>
            </FadeIn>
          </div>
        </div>

      </section>

      {/* ── How It Works (process + concierge) ── */}
      <section id="how-it-works" className="py-16 md:py-20 lg:py-32 scroll-mt-20" style={{ backgroundColor: "hsl(var(--heritage-taupe-tint))" }}>
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
              <RichText
                className="font-body text-lg text-muted-foreground leading-relaxed"
                html={t("process.intro", "")}
                fallback="From the first message to the last goodbye, one person looks after every detail."
              />
            </FadeIn>
          </div>

          {/* 4-step timeline — hand-drawn sketchbook style */}
          <FadeIn delay={0.1}>
            <div className="relative max-w-5xl mx-auto mb-24 lg:mb-32">
              <svg
                className="hidden md:block absolute left-0 w-full pointer-events-none"
                style={{ top: "32px" }}
                height="40"
                viewBox="0 0 1000 40"
                preserveAspectRatio="none"
                aria-hidden
              >
                <defs>
                  <filter id="timelineSketch" x="-2%" y="-20%" width="104%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="5" />
                    <feDisplacementMap in="SourceGraphic" scale="2.2" />
                  </filter>
                </defs>
                {/* pencil under-stroke */}
                <path
                  d="M 70 22 C 220 12, 380 28, 530 18 S 820 26, 935 16"
                  fill="none"
                  stroke="hsl(var(--heritage-taupe))"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  opacity="0.35"
                  transform="translate(1.5, 1.5)"
                />
                {/* ink wobble */}
                <path
                  d="M 70 20 C 220 10, 380 26, 530 16 S 820 24, 935 14"
                  fill="none"
                  stroke="hsl(var(--heritage-orange))"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="2 7"
                  filter="url(#timelineSketch)"
                  opacity="0.85"
                />
              </svg>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
                {/* Mobile-only vertical hand-drawn connector */}
                <svg
                  className="md:hidden absolute pointer-events-none"
                  style={{ top: 64, bottom: 64, left: "50%", width: 20, transform: "translateX(-50%)" }}
                  viewBox="0 0 20 800"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <defs>
                    <filter id="timelineSketchV" x="-20%" y="-2%" width="140%" height="104%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="6" />
                      <feDisplacementMap in="SourceGraphic" scale="2.2" />
                    </filter>
                  </defs>
                  <path
                    d="M 10 0 C 14 200, 6 400, 10 600 S 14 760, 10 800"
                    fill="none"
                    stroke="hsl(var(--heritage-orange))"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeDasharray="2 8"
                    filter="url(#timelineSketchV)"
                    opacity="0.85"
                  />
                </svg>
                {[
                  { n: "01", label: "You reach out", text: "A quick note, a phone call. Tell me when you're coming." },
                  { n: "02", label: "We have a call", text: "I listen. Your pace, your interests, what you've already seen." },
                  { n: "03", label: "I design your trip", text: "A custom itinerary made for you. No templates." },
                  { n: "04", label: "I take care of everything", text: "Bookings, transfers, reservations. One person, one phone number." },
                ].map((step, idx) => (
                  <div key={step.n} className="text-center md:text-left">
                    <div className="mx-auto md:mx-0 mb-5 relative" style={{ width: 64, height: 64 }}>
                      <svg viewBox="0 0 64 64" className="w-full h-full" style={{ overflow: "visible" }}>
                        <defs>
                          <filter id={`stepWobble-${idx}`} x="-15%" y="-15%" width="130%" height="130%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed={idx + 1} />
                            <feDisplacementMap in="SourceGraphic" scale="1.4" />
                          </filter>
                        </defs>
                        {/* paper fill so the orange dashed line is visually broken */}
                        <circle cx="32" cy="32" r="30" fill="hsl(var(--heritage-taupe-tint))" />
                        {/* hand-drawn ring */}
                        <path
                          d={sketchedRingPath(32, 32, 26, idx)}
                          fill="hsl(var(--background))"
                          stroke="hsl(var(--heritage-orange))"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          filter={`url(#stepWobble-${idx})`}
                        />
                        <text
                          x="32"
                          y="34"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontFamily="'Bebas Neue', sans-serif"
                          fontSize="22"
                          letterSpacing="0.05em"
                          fill="hsl(var(--heritage-orange))"
                        >
                          {step.n}
                        </text>
                      </svg>
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

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
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
                  <FadeIn className="lg:col-span-2 h-full">
                    <div
                      className="lg:col-span-2 h-full p-8 lg:p-10 bg-background rounded-sm border-t-4 shadow-sm"
                      style={{ borderColor: "hsl(var(--heritage-taupe))" }}
                    >
                      <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-6 font-semibold">
                        Planning it yourself
                      </p>
                      <ul className="font-body text-base lg:text-lg text-foreground leading-relaxed">
                        {rows.map((row) => (
                          <li key={row.worry} className={`flex gap-4 items-center ${ROW_MIN_H}`}>
                            <svg
                              aria-hidden
                              viewBox="0 0 40 40"
                              className="shrink-0 w-9 h-9"
                              fill="none"
                              stroke="hsl(var(--heritage-bordeaux))"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <defs>
                                <filter id="thumbSketch" x="-10%" y="-10%" width="120%" height="120%">
                                  <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" />
                                  <feDisplacementMap in="SourceGraphic" scale="1.3" />
                                </filter>
                              </defs>
                              <g filter="url(#thumbSketch)">
                                {/* Cuff at top */}
                                <path d="M 8 9 L 16 9 L 16 14 L 8 14 Z" />
                                {/* Palm — rounded rectangle below cuff */}
                                <path d="M 9 14 L 9 24 C 9 26, 10 27, 12 27 L 21 27 C 23 27, 24 26, 24 24 L 24 14" />
                                {/* Thumb pointing down on the right */}
                                <path d="M 24 17 C 27 17, 30 18, 31 21 C 32 24, 31 27, 28 28 L 24 28" />
                                {/* Knuckle creases */}
                                <path d="M 12 18 L 15 18" opacity="0.55" />
                                <path d="M 12 21 L 15 21" opacity="0.55" />
                                <path d="M 12 24 L 15 24" opacity="0.55" />
                              </g>
                            </svg>
                            <span>{row.worry}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.15} className="lg:col-span-3 h-full">
                    <div
                      className="lg:col-span-3 h-full p-8 lg:p-12 bg-background rounded-sm border-t-4 shadow-md"
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
              And everything else: transfers from Schiphol, hotel recommendations, a full itinerary for your whole stay, even after we part ways.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── 3. A Day in the Life ── */}
      {/* Heading sits ABOVE the sticky section so the map is fully in view
          the moment the section pins on desktop. On mobile the sticky
          behaviour is disabled — the map renders inline with manual
          prev / next controls. */}
      <div id="day" className="scroll-mt-20 pt-16 lg:pt-32 pb-6 lg:pb-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                Let's Explore Together
              </p>
              <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-6">
                A Day in My Life
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed mb-2">
                No fixed tours. Every day is shaped by you. Here's what one might look like.
              </p>
              <p className="font-body text-base text-muted-foreground italic">
                We move on foot, by private boat, or by car beyond the city.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>

      <section className="relative pb-16 lg:pb-0 lg:h-[200vh]">
        <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center">
          <div className="container mx-auto px-6 lg:px-12 w-full">
            <FadeIn>
              <DayMap moments={moments} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Rick Steves Feature ── */}
      <div className="relative py-14 md:py-20 lg:py-28" style={{ backgroundColor: "hsl(var(--heritage-taupe) / 0.15)" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div className="relative">
                <img
                  src={dennisRickSteves}
                  alt="Dennis Gerrits with travel writer Rick Steves on an Amsterdam canal, holding the Rick Steves Amsterdam & The Netherlands guidebook"
                  className="w-full h-auto rounded-sm shadow-xl object-cover"
                />
                <p
                  className="mt-3 text-base italic"
                  style={{
                    fontFamily: "'Caveat', 'Outfit', cursive",
                    color: "hsl(var(--heritage-bordeaux))",
                  }}
                >
                  With Rick Steves on an Amsterdam canal, 2023
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <p className="font-body text-sm tracking-widest uppercase text-accent mb-6">
                  Recommended By
                </p>
                <h2 className="font-heading text-4xl md:text-5xl text-primary leading-[0.95] mb-6">
                  Rick Steves
                </h2>
                <blockquote className="relative font-body text-xl text-foreground italic leading-relaxed mb-6 pl-10">
                  <span
                    aria-hidden
                    className="absolute -left-2 -top-6 font-heading text-7xl leading-none select-none"
                    style={{ color: "hsl(var(--heritage-green))" }}
                  >
                    “
                  </span>
                  Dennis is the kind of local guide every traveller dreams of finding. He doesn't just show you Amsterdam. He makes you feel like you belong there.
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

          {/* ── Other ways to work with me — postcard pair ── */}
          <div className="mt-16 lg:mt-24">
            <FadeIn>
              <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground text-center mb-8">
                Other ways to work with me
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {[
                {
                  kicker: "Invite me",
                  title: "Lectures, podcasts & radio",
                  body: "If you're a host, producer, or organiser looking for a story about Amsterdam beyond the tourist trail.",
                  cta: "Get in touch",
                  href: "#contact",
                  color: "hsl(var(--accent))",
                  rotate: "-1.2deg",
                  stamp: "GUEST",
                  icon: (
                    <g>
                      <rect x="20" y="8" width="12" height="22" rx="6" />
                      <path d="M 14 24 C 14 32, 20 36, 26 36 C 32 36, 38 32, 38 24" />
                      <line x1="26" y1="36" x2="26" y2="44" />
                      <line x1="20" y1="44" x2="32" y2="44" />
                    </g>
                  ),
                },
                {
                  kicker: "Travel agents",
                  title: "A partner for your Amsterdam clients",
                  body: "I work quietly alongside agencies and concierges. Private guiding, reservations, transfers, on-the-ground support.",
                  cta: "Partner with me",
                  href: "#contact",
                  color: "hsl(var(--heritage-bordeaux))",
                  rotate: "1deg",
                  stamp: "TRADE",
                  icon: (
                    <g>
                      <rect x="8" y="16" width="36" height="26" rx="2" />
                      <path d="M 19 16 L 19 11 C 19 9, 20 8, 22 8 L 30 8 C 32 8, 33 9, 33 11 L 33 16" />
                      <line x1="8" y1="26" x2="44" y2="26" />
                      <line x1="24" y1="24" x2="28" y2="24" strokeWidth="2.4" />
                    </g>
                  ),
                },
              ].map((card, i) => (
                <FadeIn key={card.kicker} delay={i * 0.08}>
                  <a
                    href={card.href}
                    className="group block relative bg-background rounded-sm border-l-[3px] p-6 md:p-7 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                    style={{
                      borderLeftColor: card.color,
                      transform: `rotate(${card.rotate})`,
                    }}
                  >
                    <span
                      aria-hidden
                      className="absolute top-3 right-3 font-body text-[10px] tracking-[0.3em] uppercase border px-2 py-0.5 rounded-sm opacity-60 group-hover:opacity-90 transition-opacity"
                      style={{ color: card.color, borderColor: card.color, transform: "rotate(6deg)" }}
                    >
                      {card.stamp}
                    </span>

                    <div className="flex items-start gap-4">
                      <svg
                        viewBox="0 0 52 52"
                        className="shrink-0 w-12 h-12"
                        fill="none"
                        stroke={card.color}
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <defs>
                          <filter id={`callcard-${i}`} x="-10%" y="-10%" width="120%" height="120%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed={i + 7} />
                            <feDisplacementMap in="SourceGraphic" scale="1.3" />
                          </filter>
                        </defs>
                        <g filter={`url(#callcard-${i})`}>{card.icon}</g>
                      </svg>

                      <div className="flex-1 min-w-0">
                        <p
                          className="font-body text-[11px] tracking-[0.25em] uppercase mb-1.5"
                          style={{ color: card.color }}
                        >
                          {card.kicker}
                        </p>
                        <h3 className="font-heading text-xl md:text-2xl text-primary leading-tight mb-2">
                          {card.title}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">
                          {card.body}
                        </p>
                        <span
                          className="inline-flex items-center gap-1 font-body text-sm font-medium group-hover:gap-2 transition-all"
                          style={{ color: card.color }}
                        >
                          {card.cta}
                          <span aria-hidden>→</span>
                        </span>
                      </div>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* ── Polaroid peek: bridges into the next section ── */}
          <div className="relative mt-8 lg:mt-10 flex justify-end pointer-events-none">
            <FadeIn delay={0.2}>
              <Link
                to="/get-inspired"
                aria-label="See what excites me on the Wall of Curiosities"
                className="group pointer-events-auto inline-flex items-end gap-4 md:gap-6 relative lg:-mb-32 lg:translate-y-16"
              >
                {/* Stack of overlapping polaroids */}
                <div className="relative w-[200px] sm:w-[240px] h-[150px] sm:h-[170px] shrink-0">
                  {[
                    { img: peekHistory, rot: -9, x: 0, y: 14, z: 1 },
                    { img: peekFood, rot: 5, x: 50, y: 0, z: 2 },
                    { img: peekWater, rot: -3, x: 110, y: 22, z: 3 },
                  ].map((p, i) => (
                    <div
                      key={i}
                      className="absolute bg-[#FAFAF7] p-1.5 pb-5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35),0_2px_6px_-2px_rgba(0,0,0,0.15)] transition-transform duration-500 ease-out group-hover:[&:nth-child(1)]:-rotate-[12deg] group-hover:[&:nth-child(3)]:rotate-[0deg]"
                      style={{
                        left: `${p.x}px`,
                        top: `${p.y}px`,
                        transform: `rotate(${p.rot}deg)`,
                        zIndex: p.z,
                      }}
                    >
                      <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] overflow-hidden bg-muted">
                        <img
                          src={p.img}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Handwritten note */}
                <div className="pb-2">
                  <p
                    className="text-2xl md:text-3xl text-primary leading-tight"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    ...and 9 more
                  </p>
                  <p
                    className="text-lg md:text-xl text-secondary mt-1 inline-block group-hover:translate-x-1 transition-transform"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    in my notebook →
                  </p>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>



      {/* ── 4. Proof: Reviews & Guests ── */}
      <section id="proof" className="py-16 md:py-20 lg:py-32 scroll-mt-20">
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

                {/* Hero pull-quote (first review) */}
                {(() => {
                  const hero = reviews[0];
                  return (
                    <FadeIn>
                      <a
                        href={TA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block max-w-4xl mx-auto mb-10 bg-background rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 px-8 md:px-12 py-10 md:py-12 relative"
                        style={{ borderLeftColor: "hsl(var(--heritage-green))" }}
                      >
                        <span
                          aria-hidden
                          className="absolute -left-1 -top-6 font-heading text-7xl md:text-8xl leading-none select-none"
                          style={{ color: "hsl(var(--heritage-green))" }}
                        >
                          “
                        </span>
                        <div className="flex items-center justify-between mb-4">
                          <TripAdvisorBubbles size={16} />
                          <span
                            className="font-body text-xs tracking-wide uppercase opacity-80"
                            style={{ color: TA_GREEN }}
                          >
                            Tripadvisor · {hero.date}
                          </span>
                        </div>
                        <p className="font-heading text-2xl md:text-3xl text-primary leading-snug italic mb-6">
                          {hero.quote}
                        </p>
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <p className="font-body text-sm font-medium text-primary">
                              {hero.author}
                            </p>
                            <p className="font-body text-xs text-muted-foreground">
                              {hero.location}
                            </p>
                          </div>
                          <span
                            className="font-body text-xs tracking-wide opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                            style={{ color: TA_GREEN }}
                          >
                            Read on Tripadvisor →
                          </span>
                        </div>
                      </a>
                    </FadeIn>
                  );
                })()}

                {/* Remaining reviews — smaller grid for rhythm */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8 max-w-6xl mx-auto">
                  {reviews.slice(1).map((r, i) => {
                    // Vary widths to break the wall: spans 2/2/3/3/2 across 5 cols
                    const spans = ["lg:col-span-2", "lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-5"];
                    const align = i % 2 === 0 ? "text-left" : "text-left md:text-right";
                    return (
                      <FadeIn key={i} delay={i * 0.08}>
                        <a
                          href={TA_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group bg-background rounded-lg p-5 h-full flex flex-col shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-4 ${spans[i] ?? ""} ${align}`}
                          style={{ borderTopColor: TA_GREEN }}
                        >
                          <div className={`flex items-center justify-between mb-2 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
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
                          </div>
                        </a>
                      </FadeIn>
                    );
                  })}
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
      <section id="podcast" className="py-16 md:py-20 lg:py-32 scroll-mt-20" style={{ backgroundColor: "hsl(var(--heritage-taupe-tint))" }}>
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
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-sm shadow-elegant">
                  <img
                    src={podcastCover}
                    alt="Two Stories, One City — podcast cover art"
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-body text-xs text-muted-foreground italic mt-3 text-center">
                  Episodes coming soon.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>


      <section id="stories" className="py-16 md:py-20 lg:py-32 scroll-mt-20">
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
                    <div className="aspect-[16/10] bg-muted overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        width={1024}
                        height={640}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <p
                        className="text-sm mb-2"
                        style={{
                          fontFamily: "'Caveat', 'Outfit', cursive",
                          color: "hsl(var(--heritage-bordeaux))",
                        }}
                      >
                        {s.caption}
                      </p>
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
      <section id="contact" className="py-16 md:py-20 lg:py-32 scroll-mt-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
            {/* Left: editorial intro, no box */}
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                {t("booking.kicker", "Get in Touch")}
              </p>
              <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
                {t("booking.title", "Let's See if We're a Good Match")}
              </h2>
              <RichText
                className="font-body text-lg text-foreground/80 leading-relaxed"
                html={t("booking.intro", "")}
                fallback="The best way to start is a short, informal conversation. No obligations, just a chance to see if my approach feels right."
              />
            </FadeIn>

            {/* Right: form on background, with a single accent rule */}
            <FadeIn delay={0.15}>
              <div
                className="bg-background p-8 lg:p-10 border-l-4 shadow-sm rounded-sm"
                style={{ borderLeftColor: "hsl(var(--heritage-green))" }}
              >
                <h3 className="font-heading text-3xl text-primary mb-3">
                  {t("booking.form.title", "Book a Call")}
                </h3>
                <RichText
                  className="font-body text-muted-foreground leading-relaxed mb-8"
                  html={t("booking.form.intro", "")}
                  fallback="Leave your details and a few words about your trip. I'll reach out personally."
                />
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
      </section>
    </main>
  );
};

export default Index;
