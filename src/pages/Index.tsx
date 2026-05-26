
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import FadeIn from "@/components/FadeIn";
import AmsterdamSkyline from "@/components/AmsterdamSkyline";
import StoryBook from "@/components/StoryBook";
import { supabase } from "@/integrations/supabase/client";

import DayMap from "@/components/DayMap";

import MosaicWall from "@/components/MosaicWall";
import { guestPhotos } from "@/assets/guests";
import HeroCarousel from "@/components/HeroCarousel";
import AboutCarousel from "@/components/AboutCarousel";
import dennisIllustration from "@/assets/dennis_illustration.png";
import dennisPhoto from "@/assets/dennis_photo.png";
import dennisPerson from "@/assets/dennis-person-line.png";
import dennisGuide from "@/assets/dennis-guide-line.png";
import dennisRickSteves from "@/assets/dennis_rick_steves.jpg";

import iconTickets from "@/assets/icon-tickets.png";
import iconDining from "@/assets/icon-dining.png";
import iconItinerary from "@/assets/icon-itinerary.png";
import iconMessage from "@/assets/icon-message.png";
import iconTransport from "@/assets/icon-transport.png";
import iconHotel from "@/assets/icon-hotel.png";
import iconBike from "@/assets/icon-bike.png";
import iconBoat from "@/assets/icon-boat.png";
import iconFoot from "@/assets/icon-foot.png";
import { useSiteContent } from "@/hooks/useSiteContent";
import ContactSection from "@/components/ContactSection";
import ServiceIcon from "@/components/ServiceIcon";
import RichText from "@/components/RichText";
import storyBookshop from "@/assets/stories/bookshop.jpg";
import peekHistory from "@/assets/interests/history.jpg";
import peekFood from "@/assets/interests/food.jpg";
import peekWater from "@/assets/interests/water.jpg";
import peekArchitecture from "@/assets/interests/architecture.jpg";
import storyCanalHouses from "@/assets/stories/canal-houses.jpg";
import storyBench from "@/assets/stories/bench.jpg";
import podcastCover from "@/assets/podcast-cover.jpg";
import PodcastPlayer from "@/components/PodcastPlayer";

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
    time: "Beginning of the day",
    title: "Meeting",
    text: "I’ll meet you at your hotel and together we slowly step into the rhythm of the city. Just an easy walk through one of Amsterdam’s beautiful neighborhoods as the day begins.",
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
  const t = useSiteContent();

  const { data: bookStories = [] } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stories")
        .select("id, slug, title, intro, body, image_path")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((s) => ({
        id: s.slug,
        title: s.title,
        intro: s.intro,
        body: s.body,
      }));
    },
  });

  return (
    <main className="relative z-10">
      <AmsterdamSkyline />
      {/* ── 1. Hero (3 swipeable variations for Dennis to choose from) ── */}
      <HeroCarousel />

      {/* Section divider */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="h-px bg-border/70 max-w-5xl mx-auto" />
      </div>

      {/* ── 2. About Me — 2 swipeable variations for Dennis to choose from ── */}
      <AboutCarousel />

      {/* ── How I Work (process + concierge) ── */}
      <section id="how-it-works" className="py-16 md:py-20 lg:py-32 scroll-mt-20" style={{ backgroundColor: "hsl(var(--heritage-taupe-tint))" }}>
        <div className="container mx-auto px-6 lg:px-12">

          {/* Heading */}
          <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                {t("process.kicker", "How I Work")}
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-6">
                {t("process.title", "Every journey starts with a conversation. Every experience is shaped around you.")}
              </h2>
              <RichText
                className="font-body text-lg text-muted-foreground leading-relaxed"
                html={t("process.intro", "")}
                fallback="From the first message to the last goodbye, you’ll always have someone local by your side."
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
                  { n: "01", label: t("process.step1.label", "Let’s Connect"), text: t("process.step1.text", "You reach out, and we plan a personal video call to get to know each other and your travel plans.") },
                  { n: "02", label: t("process.step2.label", "Getting to Know You"), text: t("process.step2.text", "I take the time to listen. Your interests, travel style and wishes help shape the experience.") },
                  { n: "03", label: t("process.step3.label", "Creating Your Journey"), text: t("process.step3.text", "Together, we shape an experience that feels personal and completely tailored to you.") },
                  { n: "04", label: t("process.step4.label", "I Take Care of the Details"), text: t("process.step4.text", "From reservations and transportation to personal recommendations and museum tickets, everything is thoughtfully taken care of.") },
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
              <h3 className="font-heading text-3xl sm:text-4xl text-primary leading-tight">
                {t("concierge.title", "More than a guide. Personal support, thoughtful guidance and local knowledge throughout your stay.")}
              </h3>
            </FadeIn>
          </div>

          <div className="max-w-6xl mx-auto">
            {(() => {
              const rows = [
                {
                  icon: iconTickets,
                  title: t("concierge.tickets.title", "Museum reservations"),
                  desc: t("concierge.tickets.desc", "Including tickets and timed entry reservations for museums and cultural experiences."),
                },
                {
                  icon: iconDining,
                  title: t("concierge.dining.title", "Dining reservations"),
                  desc: t("concierge.dining.desc", "Thoughtfully selected places to eat, from local favorites to memorable dining experiences."),
                },
                {
                  icon: iconTransport,
                  title: t("concierge.transport.title", "Transportation Coordination"),
                  desc: t("concierge.transport.desc", "Help arranging transportation, including airport transfers and train tickets."),
                },
                {
                  icon: iconHotel,
                  title: t("concierge.hotel.title", "Hotel & B&B Recommendations"),
                  desc: t("concierge.hotel.desc", "Helping you find the place and neighborhood that fit your travel style best."),
                },
                {
                  icon: iconMessage,
                  title: t("concierge.support.title", "Guidance & Support"),
                  desc: t("concierge.support.desc", "Always available for questions, practical help and personal support throughout your stay."),
                },
              ];

              return (
                <FadeIn delay={0.15}>
                  <div
                    className="h-full p-6 sm:p-8 lg:p-12 bg-background rounded-sm border-t-4 shadow-md"
                    style={{ borderColor: "hsl(var(--heritage-orange))" }}
                  >
                    <ul className="font-body text-foreground leading-relaxed divide-y divide-border/60 border-y border-border/60">
                      {rows.map((row) => (
                        <li key={row.title} className="flex items-center gap-4 py-3.5">
                          <ServiceIcon src={row.icon} size={36} padding={7} tinted />
                          <span className="flex-1 flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                            <span className="font-heading text-lg text-primary leading-tight sm:min-w-[14rem]">
                              {row.title}
                            </span>
                            <span className="text-foreground/80 text-sm sm:text-base">
                              {row.desc}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              );
            })()}
          </div>

          <FadeIn delay={0.2}>
            <p className="mt-10 text-center font-body text-sm text-muted-foreground italic max-w-2xl mx-auto">
              And everything else you didn't think to ask for. If it makes your stay smoother, it's already on my list.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── 3. A Day in the Life ── */}
      {/* Heading sits ABOVE the sticky section so the map is fully in view
          the moment the section pins on desktop. On mobile the sticky
          behaviour is disabled — the map renders inline with manual
          prev / next controls. */}
      <div id="day" className="relative scroll-mt-20 pt-12 lg:pt-20 pb-2">
      </div>

      <section className="relative lg:h-[420vh]">
        <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:flex lg:flex-col lg:pt-6 lg:pb-4">
          <div className="container mx-auto px-6 lg:px-12 w-full">
            <FadeIn>
              <div className="max-w-3xl mb-4 lg:mb-6">
                <p className="font-body text-xs lg:text-sm tracking-widest uppercase text-secondary mb-2">
                  Let's Explore Together
                </p>
                <h2 className="font-heading text-4xl md:text-5xl text-primary leading-[0.95] mb-2">
                  A Day in My Amsterdam
                </h2>
                <p className="font-body text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                  Every day unfolds differently.{"\n"}
                  Shaped by curiosity, conversation and the rhythm of the city.{"\n"}
                  We discover hidden places, share stories and simply see where the day takes us.{"\n"}
                </p>
              </div>
            </FadeIn>
          </div>
          <div className="container mx-auto px-6 lg:px-12 w-full lg:flex-1 lg:min-h-0">
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
              <div className="lg:pt-16">
                <p className="font-body text-sm tracking-widest uppercase text-accent mb-6">
                  Recommended By
                </p>
                <h2 className="font-heading text-4xl sm:text-5xl text-primary leading-[0.95] mb-6">
                  Rick Steves
                </h2>
                <blockquote className="relative font-body text-lg sm:text-xl text-foreground italic leading-relaxed mb-6 pl-7 sm:pl-10">
                  <span
                    aria-hidden
                    className="absolute -left-1 sm:-left-2 -top-5 sm:-top-6 font-heading text-5xl sm:text-7xl leading-none select-none"
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

          {/* ── Invite me card ── */}
          <div className="mt-16 lg:mt-24">

            <div className="grid grid-cols-1 gap-6 md:gap-8 max-w-xl mx-auto">
              {[
                {
                  kicker: "Invite me",
                  title: "Lectures, podcasts, radio & universities",
                  body: "If you're a host, producer, organiser, or university looking for a guest lecture or a story about Amsterdam beyond the tourist trail.",
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
        </div>
      </div>


      {/* ── Building Blocks preview (4 cards from Get Inspired) ── */}
      <section
        className="relative py-20 md:py-24 lg:py-28 overflow-hidden"
        style={{
          background:
            "radial-gradient(900px 600px at 100% 110%, hsl(var(--heritage-green) / 0.12), transparent 65%), hsl(var(--background))",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <FadeIn>
              <p
                className="mb-3 text-2xl md:text-3xl"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: "hsl(var(--heritage-green))",
                  transform: "rotate(-2deg)",
                  display: "inline-block",
                }}
              >
                a few ideas to start with
              </p>
              <p
                className="font-body text-sm tracking-widest uppercase mb-6"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                Building Blocks
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-6">
                What excites you?
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Pick a thread, and we'll pull on it together. Here are a few to start with.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-y-16 gap-x-6 md:gap-x-10 pt-4">
            {[
              { id: "history", title: "Hidden History", note: "ask me about the cat", image: peekHistory, rotate: -2.4, pin: "tape-tl" },
              { id: "food", title: "Local Food", note: "bring an empty stomach", image: peekFood, rotate: 1.8, pin: "tape-tr" },
              { id: "architecture", title: "Architecture", note: "look up, always", image: peekArchitecture, rotate: -1.2, pin: "tape-gl" },
              { id: "water", title: "From the Water", note: "bring a sweater", image: peekWater, rotate: 2.0, pin: "tape-gr" },
            ].map((theme, i) => {
              const paperPalette = [
                "hsl(40 38% 97%)",
                "hsl(120 22% 92%)",
                "hsl(22 70% 92%)",
                "hsl(350 35% 92%)",
              ];
              const paperBg = paperPalette[i % paperPalette.length];
              const isLeft = theme.pin === "tape-tl" || theme.pin === "tape-gl";
              const tapeColors = [
                { bg: "hsl(var(--heritage-orange) / 0.72)", border: "hsl(var(--heritage-bordeaux) / 0.30)" },
                { bg: "hsl(var(--heritage-green) / 0.55)", border: "hsl(var(--heritage-green) / 0.40)" },
                { bg: "hsl(var(--heritage-bordeaux) / 0.45)", border: "hsl(var(--heritage-bordeaux) / 0.35)" },
              ];
              const tape = tapeColors[i % 3];
              const outlineColors = [
                "hsl(var(--heritage-orange))",
                "hsl(var(--heritage-green))",
                "hsl(var(--heritage-purple))",
              ];
              const outlineColor = outlineColors[i % 3];
              const sketchVariants = [
                [
                  "M 3 4 C 22 2.5, 48 4, 70 2.8 S 96 3.4, 97.5 5 C 98.6 26, 96.8 50, 98 74 C 98.4 92, 97.5 97, 95.5 97.6 C 74 98.8, 50 97.2, 26 98.6 C 9 99, 3 98, 2.5 95.5 C 1.4 75, 3.2 50, 1.8 26 C 1.4 8, 2.2 3, 4 3.4 Z",
                  "M 4 3 C 24 4, 50 2.6, 72 4.2 S 97 4.6, 96.6 6.2 C 97.8 27, 98.6 51, 96.8 75 C 96.4 93, 97.8 96.4, 95 97.4 C 73 97, 49 98.6, 25 96.8 C 8 96.4, 4 97, 3.6 94 C 2.6 74, 1.6 49, 3 25 C 3.4 7, 3 4, 4.4 3.2 Z",
                ],
                [
                  "M 2.5 5 C 26 3.6, 52 5.2, 74 3.4 S 97 4.2, 97 6.4 C 96 28, 98.4 52, 97.2 76 C 97 91, 96 97.8, 94 97 C 72 98, 48 96.6, 24 98 C 7 98.6, 3 97.4, 3.4 94.4 C 2 74, 4 48, 2.4 24 C 2 6, 2.6 4, 4.6 4 Z",
                  "M 5 4 C 28 5.4, 54 3, 75 5.4 S 96 5.6, 95.8 7.4 C 96.6 28, 97 53, 96 77 C 95.6 92, 96.4 95.8, 93.6 96.8 C 71 96.4, 47 98, 23 96.4 C 7 96, 4.4 96.6, 4.4 93.4 C 3.4 73, 2 48, 3.6 24 C 4 6.6, 4 4.4, 5.2 4 Z",
                ],
                [
                  "M 3.4 3 C 23 4.4, 49 2.4, 71 4 S 96.4 2.8, 98 4.4 C 99 27, 97.4 51, 98.6 75 C 99 93, 96.6 97.4, 94.4 98 C 73 98.4, 49 96.6, 25 98 C 8 98.4, 2 98, 2.8 95 C 1 75, 3.6 49, 2 25 C 1.6 8, 2.4 2.6, 4.4 3 Z",
                  "M 4.6 4.4 C 25 3, 51 4.6, 73 3 S 96 6, 96.4 7.2 C 97.4 28, 98.8 52, 97 76 C 96.6 92, 97.4 96, 94.6 97 C 73 97.6, 49 98, 25 96.4 C 9 96, 4 97.6, 3.6 94.6 C 2.4 74, 1.4 49, 3 25 C 3.4 7, 3 4.4, 4.4 4 Z",
                ],
                [
                  "M 3 3.4 C 24 2, 47 4.4, 69 3 S 95 4, 97.6 5.4 C 98 26, 97.6 50, 98.4 75 C 98.6 93, 96.6 96, 95 97 C 75 99, 51 97.6, 27 99 C 9 98.6, 2.6 97.4, 2.6 95 C 1.6 76, 2.6 51, 1.4 26 C 1.6 7, 2 3.4, 4 3 Z",
                  "M 4.4 4 C 26 5, 52 3.4, 74 4.6 S 96.4 4, 96 6 C 97 27, 98.4 50, 96.4 76 C 96.6 92, 97.6 95.6, 94.6 96.8 C 72 97.4, 48 99, 24 97 C 7 96.6, 4 97, 3.4 94 C 2.4 74, 1.6 48, 3.4 24 C 3.6 7, 2.6 4.4, 4.4 3.4 Z",
                ],
              ];
              const sketchPaths = sketchVariants[i % sketchVariants.length];
              return (
                <FadeIn key={theme.id} delay={i * 0.08}>
                  <Link
                    to="/get-inspired"
                    className="group relative block w-full text-left transition-transform duration-500 ease-out hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4"
                    style={{ transform: `rotate(${theme.rotate}deg)` }}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                      style={{
                        background:
                          "radial-gradient(closest-side, hsl(var(--heritage-orange) / 0.35), transparent 70%)",
                      }}
                    />
                    <div className="p-2.5 sm:p-3 pb-16 sm:pb-20 transition-all duration-500 relative">
                      <svg
                        aria-hidden
                        className="absolute inset-0 w-full h-full pointer-events-none transition-[filter] duration-500 group-hover:[filter:drop-shadow(0_22px_24px_rgba(0,0,0,0.28))]"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        style={{
                          color: outlineColor,
                          overflow: "visible",
                          filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.22)) drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
                        }}
                      >
                        <path d={sketchPaths[0]} fill={paperBg} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ strokeWidth: "2.4px" }} />
                        <path d={sketchPaths[1]} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ strokeWidth: "1.2px", opacity: 0.55 }} />
                      </svg>
                      {/* Fastener: alternate tape vs pushpin so cards feel
                          actually stuck to the wall */}
                      {i % 2 === 0 ? (
                        <span
                          aria-hidden
                          className={`absolute top-1 sm:top-1.5 w-16 sm:w-20 h-5 sm:h-6 border z-10 shadow-[0_1px_2px_rgba(0,0,0,0.15)] ${
                            isLeft
                              ? "left-3 sm:left-5 -rotate-[8deg]"
                              : "right-3 sm:right-5 rotate-[6deg]"
                          }`}
                          style={{
                            backgroundColor: tape.bg,
                            borderColor: tape.border,
                          }}
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full z-10 shadow-[inset_-1.5px_-2px_2.5px_rgba(0,0,0,0.4),inset_2px_2px_2.5px_rgba(255,255,255,0.55),0_3px_4px_rgba(0,0,0,0.4)]"
                          style={{ backgroundColor: outlineColor }}
                        />
                      )}
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <img
                          src={theme.image}
                          alt={theme.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02] group-hover:saturate-150"
                          style={{ filter: "saturate(1.18) brightness(1.06) contrast(1.04)" }}
                        />
                      </div>
                      <div className="absolute bottom-3 sm:bottom-4 left-2.5 right-2.5 sm:left-3 sm:right-3 px-1.5 sm:px-2">
                        <h3 className="font-heading text-lg sm:text-xl md:text-2xl text-primary leading-tight tracking-wide truncate">
                          {theme.title}
                        </h3>
                        <p
                          className="text-base sm:text-lg mt-0.5 sm:mt-1 leading-snug truncate"
                          style={{
                            fontFamily: "'Caveat', cursive",
                            color: "hsl(var(--heritage-bordeaux))",
                          }}
                        >
                          <span
                            aria-hidden
                            className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle"
                            style={{ backgroundColor: "hsl(var(--heritage-orange))" }}
                          />
                          {theme.note}
                        </p>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn>
            <p className="text-center mt-16">
              <Link
                to="/get-inspired"
                className="font-body text-base tracking-wide border-b-2 border-dashed pb-1 transition-colors hover:opacity-80 inline-flex items-center gap-2"
                style={{
                  color: "hsl(var(--heritage-orange))",
                  borderColor: "hsl(var(--heritage-orange))",
                }}
              >
                See all building blocks
                <span aria-hidden>→</span>
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Podcast: Two Stories, One City (green band) ── */}
      <section
        id="podcast"
        className="relative py-12 md:py-14 lg:py-16 scroll-mt-20 overflow-hidden"
        style={{ backgroundColor: "hsl(var(--heritage-green))" }}
      >
        {/* faint paper-grain overlay for warmth on the deep green */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-screen"
          aria-hidden
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.92  0 0 0 0 0.85  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        <div className="container mx-auto px-6 lg:px-12 relative">
          <div className="max-w-3xl mx-auto mb-6 md:mb-8 text-center">
            <FadeIn>
              <p className="font-body text-xs tracking-[0.25em] uppercase mb-4" style={{ color: "hsl(var(--heritage-orange))" }}>
                Also worth a listen
              </p>
              <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: "hsl(0 0% 96%)" }}>
                A podcast I make on the side. Two Amsterdammers, one city, one conversation at a time.
              </p>
            </FadeIn>
          </div>
          <FadeIn>
            <PodcastPlayer tone="dark" />
          </FadeIn>
        </div>
      </section>

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
                    <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
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
                        className="group block max-w-4xl mx-auto mb-10 bg-background rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 px-6 sm:px-10 md:px-12 py-8 sm:py-10 md:py-12 relative"
                        style={{ borderLeftColor: "hsl(var(--heritage-green))" }}
                      >
                        <span
                          aria-hidden
                          className="absolute -left-1 -top-5 sm:-top-6 font-heading text-6xl sm:text-7xl md:text-8xl leading-none select-none"
                          style={{ color: "hsl(var(--heritage-green))" }}
                        >
                          “
                        </span>
                        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                          <TripAdvisorBubbles size={16} />
                          <span
                            className="font-body text-xs tracking-wide uppercase opacity-80"
                            style={{ color: TA_GREEN }}
                          >
                            Tripadvisor · {hero.date}
                          </span>
                        </div>
                        <p className="font-heading text-xl sm:text-2xl md:text-3xl text-primary leading-snug italic mb-6">
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
                <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary mb-4">
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


      {/* ── 7. Contact ── */}
      <ContactSection />

      {/* ── Story Book (notebook from Get Inspired) ── */}
      <section
        id="storybook"
        className="relative py-16 md:py-20 lg:py-28 scroll-mt-20 overflow-hidden"
      >
        <AmsterdamSkyline variant="section-light" />
        <div className="relative z-10 container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-10 md:mb-14">
            <FadeIn>
              <p
                className="font-body text-sm tracking-widest uppercase mb-4"
                style={{ color: "hsl(var(--heritage-bordeaux))" }}
              >
                Notes From the City
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-4">
                From my notebook
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Short reflections about Amsterdam. The kind of things I'd tell you over a coffee.
              </p>
            </FadeIn>
          </div>
          <FadeIn>
            <StoryBook stories={bookStories} />
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default Index;
