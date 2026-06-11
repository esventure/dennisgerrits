
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
import podcastHosts from "@/assets/podcast-hosts.jpg";
import twoStoriesLogo from "@/assets/two-stories-one-city-logo.png";
import dennisRadioTaboe from "@/assets/dennis-radio-taboe.jpg.asset.json";
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
    time: "Morning",
    title: "Coffee & Conversation",
    text: "Somewhere along the way, we can stop at a small local café for a good cup of coffee. A moment to slow down, observe the city around us and simply enjoy the atmosphere.",
  },
  {
    time: "Lunch",
    title: "A Hidden Place",
    text: "For lunch, we settle into one of my favorite local restaurants, hidden inside a beautiful garden with an amazing menu. Here we take our time, continue our conversation and enjoy the slower rhythm of the day.",
  },
  {
    time: "Afternoon",
    title: "Following Curiosity",
    text: "In the afternoon, we continue exploring the streets together. Maybe we step into a small museum, discover a hidden courtyard or stop by my favorite chocolate shop. Some of the best moments are the ones we never planned.",
  },
  {
    time: "Late Afternoon",
    title: "The City from the Water",
    text: "At the end of the day, we step aboard a private boat and we can enjoy a glass of wine. As the light begins to reflect on the canals and the city slowly softens, Amsterdam somehow feels different again. Usually, that's the moment people truly start to feel the city.",
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

          {/* 4-step hand-drawn route — sketchy markers connected by a wobbly trail */}
          <FadeIn delay={0.1}>
            <div className="relative max-w-5xl mx-auto mb-24 lg:mb-32">
              {(() => {
                const steps = [
                  { n: "01", label: t("process.step1.label", "Let’s Connect"), text: t("process.step1.text", "You reach out, and we plan a personal video call to get to know each other and your travel plans.") },
                  { n: "02", label: t("process.step2.label", "Getting to Know You"), text: t("process.step2.text", "I take the time to listen. Your interests, travel style and wishes help shape the experience.") },
                  { n: "03", label: t("process.step3.label", "Creating Your Journey"), text: t("process.step3.text", "Together, we shape an experience that feels personal and completely tailored to you.") },
                  { n: "04", label: t("process.step4.label", "I Take Care of the Details"), text: t("process.step4.text", "From reservations and transportation to personal recommendations and museum tickets, everything is thoughtfully taken care of.") },
                ];

                // SVG viewBox: 1000 wide × 120 tall. Four markers spaced across,
                // with a gently undulating curve threading through them.
                // Align number markers with the 4-column grid centers (12.5%, 37.5%, 62.5%, 87.5%)
                const xs = [125, 375, 625, 875];
                const ys = [60, 60, 60, 60];
                const routeD =
                  `M ${xs[0]} ${ys[0]} ` +
                  `C ${xs[0] + 80} ${ys[0] - 40}, ${xs[1] - 80} ${ys[1] + 40}, ${xs[1]} ${ys[1]} ` +
                  `S ${xs[2] - 80} ${ys[2] + 40}, ${xs[2]} ${ys[2]} ` +
                  `S ${xs[3] - 80} ${ys[3] - 40}, ${xs[3]} ${ys[3]}`;

                // Sketchy circle helper (wobbly closed path)
                const sketchCircle = (cx: number, cy: number, r: number, jitter = 0.7) => {
                  const pts = Array.from({ length: 14 }, (_, i) => {
                    const a = (i / 14) * Math.PI * 2;
                    const rr = r + (Math.sin(i * 1.7) * jitter + Math.cos(i * 2.3) * jitter);
                    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr] as const;
                  });
                  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
                  for (let i = 1; i <= pts.length; i++) {
                    const p = pts[i % pts.length];
                    d += ` L ${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
                  }
                  return d + " Z";
                };

                return (
                  <>
                    {/* Desktop: horizontal hand-drawn route behind the row of markers */}
                    <svg
                      aria-hidden
                      viewBox="0 0 1000 120"
                      preserveAspectRatio="none"
                      className="hidden md:block absolute left-0 right-0 top-0 w-full pointer-events-none"
                      style={{ height: "120px" }}
                    >
                      <defs>
                        <filter id="howiwork-sketch" x="-5%" y="-30%" width="110%" height="160%">
                          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="7" result="noise" />
                          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
                        </filter>
                        <filter id="howiwork-sketch-soft" x="-5%" y="-30%" width="110%" height="160%">
                          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="3" result="noise2" />
                          <feDisplacementMap in="SourceGraphic" in2="noise2" scale="3" />
                        </filter>
                      </defs>

                      {/* loose double-pass ink — gives the line that felt-tip handmade feel */}
                      <path
                        d={routeD}
                        stroke="hsl(var(--heritage-orange))"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        filter="url(#howiwork-sketch)"
                        opacity="0.95"
                      />
                      <path
                        d={routeD}
                        stroke="hsl(var(--heritage-orange))"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        filter="url(#howiwork-sketch-soft)"
                        opacity="0.55"
                        transform="translate(0.8, -1.2)"
                      />

                      {/* sketchy circle markers */}
                      {xs.map((x, i) => (
                        <g key={i}>
                          <path
                            d={sketchCircle(x + 1.5, ys[i] + 1.8, 22, 0.9)}
                            fill="hsl(var(--heritage-taupe))"
                            opacity="0.3"
                          />
                          <path
                            d={sketchCircle(x, ys[i], 22, 0.9)}
                            fill="hsl(var(--heritage-orange))"
                            stroke="hsl(var(--heritage-orange))"
                            strokeWidth="1.2"
                            filter="url(#howiwork-sketch-soft)"
                          />
                          <text
                            x={x}
                            y={ys[i] + 1}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize="18"
                            fontFamily="'Bebas Neue', sans-serif"
                            letterSpacing="0.05em"
                            fill="hsl(var(--background))"
                          >
                            {steps[i].n}
                          </text>
                        </g>
                      ))}

                      {/* hand-drawn arrowhead at the end of the route — like the "say hello" callout */}
                      <g filter="url(#howiwork-sketch)" opacity="0.95">
                        <path
                          d={`M ${xs[3] + 22} ${ys[3] - 10} L ${xs[3] + 40} ${ys[3] + 2} L ${xs[3] + 24} ${ys[3] + 14}`}
                          stroke="hsl(var(--heritage-orange))"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </g>

                    </svg>

                    {/* Content grid — reserves top space for the route on desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative md:pt-[140px]">
                      {steps.map((step) => (
                        <div key={step.n} className="relative text-center md:text-left">
                          {/* Mobile-only sketchy marker above each step */}
                          <div className="md:hidden mb-4 flex items-center justify-center">
                            <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden>
                              <defs>
                                <filter id={`howiwork-sketch-m-${step.n}`} x="-10%" y="-10%" width="120%" height="120%">
                                  <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed={Number(step.n) + 3} result="n" />
                                  <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" />
                                </filter>
                              </defs>
                              <path d={sketchCircle(29.5, 29.8, 22, 0.9)} fill="hsl(var(--heritage-taupe))" opacity="0.3" />
                              <path
                                d={sketchCircle(28, 28, 22, 0.9)}
                                fill="hsl(var(--heritage-orange))"
                                filter={`url(#howiwork-sketch-m-${step.n})`}
                              />
                              <text
                                x="28"
                                y="29"
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontSize="18"
                                fontFamily="'Bebas Neue', sans-serif"
                                letterSpacing="0.05em"
                                fill="hsl(var(--background))"
                              >
                                {step.n}
                              </text>
                            </svg>
                          </div>

                          <h3 className="font-heading text-2xl text-primary leading-tight mb-3 mt-0 md:mt-2">
                            {step.label}
                          </h3>
                          <p className="font-body text-muted-foreground leading-relaxed">
                            {step.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
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
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  Every day unfolds differently. Shaped by curiosity, conversation and the rhythm of the city. We discover hidden places, share stories and simply see where the day takes us.
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
                  Sharing stories with Rick Steves along the canals of Amsterdam.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="lg:pt-16">
                <p className="font-body text-sm tracking-widest uppercase text-accent mb-6">
                  Featured By
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
                  Dennis is the kind of local guide every traveler dreams of finding. He doesn't just show you Amsterdam. He makes you feel like you belong there.
                </blockquote>
                <p className="font-body text-foreground/80 leading-relaxed mb-8">
                  Since 2018, Dennis has been featured in Rick Steves’ Amsterdam & the Netherlands guidebook and invited back for three podcast conversations, where Rick turned to Dennis for his trusted perspective on Amsterdam, its culture, and the people who call it home.
                </p>

                <p className="font-body text-sm tracking-widest uppercase text-secondary mb-4">
                  In conversation with Rick Steves
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

          {/* ── In the Media (feature) ── */}
          <div className="mt-16 lg:mt-24 max-w-5xl mx-auto">
            <FadeIn>
              <div className="flex items-baseline gap-4 mb-8">
                <span
                  className="font-body text-[11px] tracking-[0.3em] uppercase"
                  style={{ color: "hsl(var(--heritage-orange))" }}
                >
                  In the Media
                </span>
                <span
                  aria-hidden
                  className="flex-1 h-px"
                  style={{ background: "hsl(var(--border))" }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
                <figure>
                  <div className="overflow-hidden rounded-sm shadow-sm">
                    <img
                      src={dennisRadioTaboe.url}
                      alt="Dennis Gerrits being interviewed live at Taboe Media radio studio on Zeedijk, Amsterdam"
                      loading="lazy"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <figcaption className="font-body text-xs text-muted-foreground mt-2 italic">
                    Live at Taboe Media, Zeedijk — Amsterdam.
                  </figcaption>
                </figure>

                <div>
                  <p className="font-body text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-2">
                    Radio Interview · Taboe Media
                  </p>
                  <h3 className="font-heading text-2xl md:text-3xl text-primary leading-tight mb-3">
                    Dennis Gerrits — I Love My City
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                    A conversation about Amsterdam, the people who shape its neighbourhoods, and what it means to share the city as a local. Recorded live on the Zeedijk.
                  </p>

                  <div className="rounded-sm overflow-hidden border border-border/60">
                    <iframe
                      title="Dennis Gerrits — I Love My City (SoundCloud)"
                      width="100%"
                      height="166"
                      scrolling="no"
                      frameBorder="no"
                      allow="autoplay"
                      src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Ftaboe-media%2Fdennis-gerrits-i-love-my-city&color=%23b8651a&inverse=false&auto_play=false&show_user=true"
                    />
                  </div>

                  <a
                    href="https://soundcloud.com/taboe-media/dennis-gerrits-i-love-my-city"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-4 font-body text-sm font-medium hover:gap-2 transition-all"
                    style={{ color: "hsl(var(--heritage-orange))" }}
                  >
                    Listen on SoundCloud
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ── Invite Dennis (CTA banner) ── */}
          <div className="mt-16 lg:mt-20 max-w-5xl mx-auto">
            <FadeIn delay={0.08}>
              <a
                href="#contact"
                className="group block relative bg-background rounded-sm border border-border/60 border-l-[3px] p-8 md:p-10 shadow-sm hover:shadow-md transition-all"
                style={{ borderLeftColor: "hsl(var(--accent))" }}
              >
                <span
                  aria-hidden
                  className="absolute top-4 right-4 font-body text-[10px] tracking-[0.3em] uppercase border px-2 py-0.5 rounded-sm opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{
                    color: "hsl(var(--accent))",
                    borderColor: "hsl(var(--accent))",
                    transform: "rotate(4deg)",
                  }}
                >
                  GUEST
                </span>

                <div className="flex items-start gap-5 md:gap-7">
                  <svg
                    viewBox="0 0 52 52"
                    className="shrink-0 w-12 h-12 md:w-14 md:h-14"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <defs>
                      <filter id="invite-mic" x="-10%" y="-10%" width="120%" height="120%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" />
                        <feDisplacementMap in="SourceGraphic" scale="1.3" />
                      </filter>
                    </defs>
                    <g filter="url(#invite-mic)">
                      <rect x="20" y="8" width="12" height="22" rx="6" />
                      <path d="M 14 24 C 14 32, 20 36, 26 36 C 32 36, 38 32, 38 24" />
                      <line x1="26" y1="36" x2="26" y2="44" />
                      <line x1="20" y1="44" x2="32" y2="44" />
                    </g>
                  </svg>

                  <div className="flex-1 min-w-0 pr-16">
                    <p
                      className="font-body text-[11px] tracking-[0.25em] uppercase mb-1.5"
                      style={{ color: "hsl(var(--accent))" }}
                    >
                      Invite Dennis
                    </p>
                    <h3 className="font-heading text-2xl md:text-3xl text-primary leading-tight mb-3">
                      Podcasts · Lectures · Radio · Live Events
                    </h3>
                    <p className="font-body text-base text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                      Dennis regularly joins conversations about Amsterdam, storytelling, travel, culture, and human connection. Available for podcast conversations, guest lectures, interviews, radio shows, cultural programs, and educational events.
                    </p>
                    <span
                      className="inline-flex items-center gap-1 font-body text-sm font-medium group-hover:gap-2 transition-all"
                      style={{ color: "hsl(var(--accent))" }}
                    >
                      Get in touch
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </a>
            </FadeIn>
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
                Some ideas to inspire your journey
              </p>
              <p
                className="font-body text-sm tracking-widest uppercase mb-6"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                Threads to follow
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-6">
                What draws you in?
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                No two journeys are ever the same. These are a few places where they often begin.
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
                Discover more
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: wordmark logo */}
            <FadeIn className="lg:col-span-3 flex justify-center lg:justify-start">
              <img
                src={twoStoriesLogo}
                alt="Two Stories, One City — Amsterdam wordmark"
                loading="lazy"
                className="w-44 md:w-52 lg:w-full max-w-[260px] h-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </FadeIn>

            {/* Center: kicker, heading, copy, player */}
            <FadeIn className="lg:col-span-6 lg:border-x lg:px-10 lg:[border-color:hsl(0_0%_100%/0.15)]">
              <p
                className="font-body text-xs tracking-[0.25em] uppercase mb-4"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                Also worth a listen
              </p>
              <h2
                className="font-heading text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-5"
                style={{ color: "hsl(0 0% 98%)" }}
              >
                Two Stories, One City<br />Amsterdam
              </h2>
              <p className="font-body text-base md:text-lg leading-relaxed mb-2" style={{ color: "hsl(0 0% 92%)" }}>
                A podcast by Louke and Dennis.
              </p>
              <p
                className="font-body italic text-base md:text-lg leading-relaxed mb-5"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                Two locals in conversation with their city, inviting you to listen.
              </p>
              <p className="font-body text-base leading-relaxed mb-6" style={{ color: "hsl(0 0% 88%)" }}>
                Stories about Amsterdam, identity, culture, city life and personal experiences, told through the people who shape the city.
              </p>

              <div className="flex items-start gap-3 mb-6">
                <span
                  className="shrink-0 w-9 h-9 rounded-full border flex items-center justify-center"
                  style={{ borderColor: "hsl(var(--heritage-orange))", color: "hsl(var(--heritage-orange))" }}
                  aria-hidden
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="2" width="6" height="12" rx="3" />
                    <path d="M5 10a7 7 0 0 0 14 0" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                </span>
                <p className="font-body text-base leading-snug" style={{ color: "hsl(0 0% 94%)" }}>
                  <span className="font-semibold">Start with Episode 0</span><br />
                  <span style={{ color: "hsl(0 0% 82%)" }}>and step into the world of <em>Two Stories, One City</em>.</span>
                </p>
              </div>

              <PodcastPlayer tone="dark" />
            </FadeIn>

            {/* Right: hosts photo + listen link */}
            <FadeIn className="lg:col-span-3 flex flex-col items-center lg:items-start gap-6">
              <img
                src={podcastHosts}
                alt="Louke and Dennis, hosts of Two Stories, One City"
                loading="lazy"
                className="w-full max-w-[280px] h-auto rounded-sm shadow-lg object-cover aspect-[4/3]"
              />
              <a
                href="https://twostoriesonecity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 transition-opacity hover:opacity-80"
              >
                <span
                  className="shrink-0 w-9 h-9 rounded-full border flex items-center justify-center mt-1"
                  style={{ borderColor: "hsl(var(--heritage-orange))", color: "hsl(var(--heritage-orange))" }}
                  aria-hidden
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
                <span className="font-body text-sm md:text-base leading-snug" style={{ color: "hsl(0 0% 92%)" }}>
                  Listen to all episodes and<br />join the journey at<br />
                  <span className="underline underline-offset-4" style={{ color: "hsl(var(--heritage-orange))" }}>
                    twostoriesonecity.com →
                  </span>
                </span>
              </a>
            </FadeIn>
          </div>
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
                      Stories from my guests
                    </p>
                    <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
                      Real Words From Real People
                    </h2>
                    <p className="font-body text-lg text-muted-foreground leading-relaxed">
                      These are words shared by travelers after their time with me. Click any card to read the full review on <TripAdvisorWordmark className="text-lg" />.
                    </p>
                  </FadeIn>
                </div>

                {/* Tripadvisor badge + Hero pull-quote side by side */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center mb-10 max-w-6xl mx-auto">
                  {/* Tripadvisor summary badge */}
                  <FadeIn className="md:col-span-4 lg:col-span-3">
                    <a
                      href={TA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 bg-background rounded-lg shadow-md hover:shadow-lg transition-all px-6 py-4 md:py-5 border border-border"
                    >
                      <div
                        className="flex items-center justify-center rounded-full text-white font-heading text-xl shrink-0"
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
                      <FadeIn className="md:col-span-8 lg:col-span-9">
                        <a
                          href={TA_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block bg-background rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 px-6 sm:px-10 md:px-10 py-8 sm:py-10 md:py-10 relative"
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
                          <p className="font-heading text-xl sm:text-2xl md:text-2xl lg:text-3xl text-primary leading-snug italic mb-6">
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
                </div>

                {/* Remaining reviews — smaller grid for rhythm */}
                <div className="overflow-x-auto md:overflow-visible scroll-smooth snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 pb-2 md:pb-0">
                  <div className="flex md:grid md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8 max-w-6xl mx-auto min-w-max md:min-w-0">
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
                            className={`group bg-background rounded-lg p-5 h-full flex flex-col shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-4 snap-start w-[280px] md:w-auto ${spans[i] ?? ""} ${align}`}
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
                  <style>{`
                    .overflow-x-auto::-webkit-scrollbar { display: none; }
                    .overflow-x-auto { -ms-overflow-style: none; scrollbar-width: none; }
                  `}</style>
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
                  Shared Moments
                </p>
                <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary mb-4">
                  Memories made together
                </h3>
                <p className="font-body text-muted-foreground text-lg leading-relaxed">
                  Moments of connection created with people from all around the world.
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
