
import { Head } from "vite-react-ssg";
import { useState, useRef, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
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
import { lovableAssetUrl } from "@/lib/utils";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import ContactSection from "@/components/ContactSection";
import ServiceIcon from "@/components/ServiceIcon";
import RichText from "@/components/RichText";
import storyBookshop from "@/assets/stories/bookshop.jpg";
import peekNeighborhood from "@/assets/interests/neighbourhood.jpg";
import peekFood from "@/assets/interests/food.jpg";
import peekWater from "@/assets/interests/water.jpg";
import peekArchitecture from "@/assets/interests/architecture.jpg";
import storyCanalHouses from "@/assets/stories/canal-houses.jpg";
import storyBench from "@/assets/stories/bench.jpg";
import podcastCover from "@/assets/podcast-cover.jpg";
import podcastHosts from "@/assets/podcast-hosts.jpg";

import dennisRadioTaboe from "@/assets/dennis-radio-taboe.jpg.asset.json";
import PodcastPlayer, { type PodcastPlayerHandle } from "@/components/PodcastPlayer";

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
    text: "Here we take our time, continue our conversation and enjoy the slower pace of the day.",
  },
  {
    time: "Afternoon",
    title: "Following Curiosity",
    text: "In the afternoon, we continue exploring the streets and canals together.",
  },
  {
    time: "Late Afternoon",
    title: "The City from the Water",
    text: "At the end of the day, we step aboard a private boat and we can enjoy a glass of wine. As the light begins to reflect on the canals and the city slowly softens, Amsterdam somehow feels different again. Usually, that's the moment people truly start to feel the city.",
  },
];


/**
 * Counts up to a number the first time it scrolls into view. Falls back to
 * the plain number when someone prefers reduced motion.
 */
const CountUp = ({ value, duration = 1400 }: { value: number; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!value) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const start = performance.now();
    const from = Math.max(0, value - Math.min(value, 40));
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value, duration]);

  return <span ref={ref}>{display}</span>;
};

const reviews = [
  {
    quote: "We spent two full days with Dennis during our time in Amsterdam, and it was easily one of the highlights of our trip. From the very beginning, it felt less like a tour and more like spending time with a friend who genuinely wanted to share the places he loves. We explored Amsterdam, the Jordaan neighborhood, the countryside, and ended one evening with a private canal cruise with wine and cheese. Along the way, Dennis shared stories about the city's history, its architecture, and even the rich history of our hotel, the Ambassade, and its incredible collection of signed books. Those details brought Amsterdam to life in a way we never could have experienced on our own. He also introduced us to places we probably never would have found ourselves, from a traditional brown café to a wonderful countryside lunch at Wapen van Munster, dinner at Hemelse Modder, and a visit to Beemster and the Schermerhorn Museum Mill. Every recommendation was spot on and felt thoughtfully chosen for us, not pulled from a standard itinerary. What made the experience unforgettable, though, was Dennis himself. He has a gift for sharing history and culture in a way that feels like a conversation, and by the end of our two days together, it genuinely felt like we were saying goodbye to a friend rather than a guide. If you're visiting Amsterdam and considering a private guide, don't hesitate to connect with Dennis. We left with wonderful memories, a much deeper appreciation for the city, and the hope that our paths will cross again someday.",
    author: "Lisa A.",
    location: "Tripadvisor review",
    date: "August 2026",
    link: "https://www.tripadvisor.com/ShowUserReviews-g188590-d13431295-r1072825580-Love_My_City_Tours-Amsterdam_North_Holland_Province.html",
  },
  {
    quote: "From the moment we met Dennis, it felt like we were reconnecting with an old friend. Warm, genuine, and completely passionate about his city. This experience wasn't just a tour, it was a heartfelt connection to Amsterdam…",
    author: "William B.",
    location: "Tripadvisor review",
    date: "April 2025",
    link: "https://www.tripadvisor.com/ShowUserReviews-g188590-d13431295-r1007568679-Love_My_City_Tours-Amsterdam_North_Holland_Province.html",
  },
  {
    quote: "Your experience starts before you board your flight with a getting to know you call. Knowing your predilections and curiosities allows him to make your time in Amsterdam packed with all the things you want to see…",
    author: "Erica K.",
    location: "Bethesda, Maryland",
    date: "August 2025",
    link: "https://www.tripadvisor.com/ShowUserReviews-g188590-d13431295-r1028105215-Love_My_City_Tours-Amsterdam_North_Holland_Province.html",
  },
  {
    quote: "We were able to truly experience the Netherlands through Dennis' experienced guidance. The countryside, a historical working windmill, the dikes and the tulip fields. Truly a once in a lifetime experience…",
    author: "Ponciano Q.",
    location: "Tripadvisor review",
    date: "April 2025",
    link: "https://www.tripadvisor.com/ShowUserReviews-g188590-d13431295-r1011724781-Love_My_City_Tours-Amsterdam_North_Holland_Province.html",
  },
  {
    quote: "Of all the guides I've had over all the decades, Dennis is in the very top ranks. His combination of personable, excitable, knowledgeable, flexible, ethical, and practical is really hard to beat. We spent a full day with him in Amsterdam, including a private boat tour on the canals, and cannot imagine a better introduction to the city.",
    author: "dbw001",
    location: "Marathon, Florida",
    date: "August 2026",
    link: "https://www.tripadvisor.com/ShowUserReviews-g188590-d13431295-r1072370509-Love_My_City_Tours-Amsterdam_North_Holland_Province.html",
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
    intro: "It's not bad engineering. It's actually on purpose. And the reason says a lot about how the Dutch think about commerce, neighbors, and showing off.",
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
  const navigate = useNavigate();
  const podcastRef = useRef<PodcastPlayerHandle | null>(null);

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
      <Head>
        <title>Dennis Gerrits, Personal Travel Companion in Amsterdam</title>
        <meta
          name="description"
          content="Discover Amsterdam with Dennis Gerrits, a personal travel companion and storyteller who walks alongside you and shows the city the way a friend would."
        />
        <link rel="canonical" href="https://dennisgerrits.com/" />
        <meta property="og:title" content="Dennis Gerrits, Personal Travel Companion in Amsterdam" />
        <meta
          property="og:description"
          content="A personal, trust-based way of experiencing Amsterdam, guided by someone who feels like a friend."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dennisgerrits.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                name: "Dennis Gerrits",
                url: "https://dennisgerrits.com/",
                description:
                  "A personal, trust-based way of experiencing Amsterdam, guided by someone who feels like a friend.",
              },
              {
                "@type": "Person",
                name: "Dennis Gerrits",
                jobTitle: "Travel Companion & Storyteller",
                url: "https://dennisgerrits.com/",
                description:
                  "Dennis Gerrits is a personal travel companion and storyteller in Amsterdam.",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Amsterdam",
                  addressCountry: "NL",
                },
              },
              {
                "@type": "Service",
                name: "Love My City Tours, Personal Amsterdam Travel Companion",
                serviceType: "Private guided tours",
                areaServed: {
                  "@type": "City",
                  name: "Amsterdam",
                },
                provider: {
                  "@type": "Person",
                  name: "Dennis Gerrits",
                  url: "https://dennisgerrits.com/",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: t("tripadvisor.rating", "5.0"),
                  reviewCount: parseInt(t("tripadvisor.review_count", "218"), 10) || 218,
                  bestRating: "5",
                  worstRating: "1",
                },
                review: reviews.map((r) => {
                  const d = new Date(r.date);
                  return {
                    "@type": "Review",
                    author: { "@type": "Person", name: r.author },
                    ...(Number.isNaN(d.getTime()) ? {} : { datePublished: d.toISOString().slice(0, 10) }),
                    reviewBody: r.quote,
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                      worstRating: "1",
                    },
                    url: r.link,
                  };
                }),
              },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd([]))}
        </script>
        <meta name="twitter:title" content="Dennis Gerrits, Personal Travel Companion in Amsterdam" />
        <meta name="twitter:description" content="A personal, trust-based way of experiencing Amsterdam, guided by someone who feels like a friend." />
      </Head>
      <AmsterdamSkyline />

      {/* ── 1. Hero (3 swipeable variations for Dennis to choose from) ── */}
      <HeroCarousel />

      {/* ── 2. About Me — 2 swipeable variations for Dennis to choose from ── */}
      <div className="pt-10 md:pt-14 lg:pt-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-4 lg:mb-6">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary">
                About me
              </p>
            </FadeIn>
          </div>
        </div>
      </div>

      <AboutCarousel />


      {/* ── How I Work (process + concierge) ── */}
      <section id="how-it-works" className="py-16 md:py-20 lg:py-28 scroll-mt-24" style={{ backgroundColor: "hsl(var(--heritage-taupe-tint))" }}>
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

          {/* Decorative squiggle beneath heading */}
          <FadeIn delay={0.05}>
            <div className="flex justify-center -mt-10 mb-16 lg:mb-20">
              <svg width="192" height="16" viewBox="0 0 200 20" fill="none" aria-hidden>
                <path
                  d="M2 18C25.5 2.5 54.5 2 78 8.5C101.5 15 130.5 17.5 154 11C177.5 4.5 198 2 198 2"
                  stroke="hsl(var(--heritage-orange))"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </FadeIn>

          {/* 4-step editorial notebook grid — staggered */}
          <FadeIn delay={0.1}>
            <div className="max-w-6xl mx-auto mb-24 lg:mb-32">
              {(() => {
                const steps = [
                  { n: "01", label: t("process.step1.label", "Let’s Connect"), text: t("process.step1.text", "You reach out, and we plan a personal video call to get to know each other and your travel plans.") },
                  { n: "02", label: t("process.step2.label", "Getting to Know You"), text: t("process.step2.text", "I take the time to listen. Your interests, travel style and wishes help shape the experience.") },
                  { n: "03", label: t("process.step3.label", "Creating Your Journey"), text: t("process.step3.text", "Together, we shape an experience that feels personal and completely tailored to you.") },
                  { n: "04", label: t("process.step4.label", "I Take Care of the Details"), text: t("process.step4.text", "From reservations and transportation to personal recommendations and museum tickets, everything is thoughtfully taken care of.") },
                ];
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
                    {steps.map((step, i) => (
                      <div
                        key={step.n}
                        className={`text-center md:text-left ${i % 2 === 1 ? "md:mt-16" : ""}`}
                      >
                        <span
                          className="block text-6xl leading-none mb-3 text-[hsl(var(--heritage-orange))]"
                          style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
                        >
                          {step.n}
                        </span>
                        <h3 className="font-heading text-2xl md:text-[1.65rem] tracking-wide text-primary leading-tight mb-3 uppercase">
                          {step.label}
                        </h3>
                        <p className="font-body text-base text-muted-foreground leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </FadeIn>

          {/* Concierge — editorial list card */}
          <div className="max-w-5xl mx-auto">
            {(() => {
              const rows = [
                { icon: iconTickets, title: t("concierge.tickets.title", "Museum Reservations"), desc: t("concierge.tickets.desc", "Helping arrange tickets and timed-entry reservations for museums and cultural experiences.") },
                { icon: iconDining, title: t("concierge.dining.title", "Dining Reservations"), desc: t("concierge.dining.desc", "Thoughtfully selected restaurants, from local favorites to memorable dining experiences."), filter: "sepia(1) saturate(3.5) hue-rotate(-18deg) contrast(1.15)" },
                { icon: iconTransport, title: t("concierge.transport.title", "Transportation Coordination"), desc: t("concierge.transport.desc", "Help arranging transportation, including airport transfers, train tickets and local travel.") },
                { icon: iconBoat, title: t("concierge.private.title", "Private Cars & Boats"), desc: t("concierge.private.desc", "Arranging private cars and boats for comfortable and seamless travel."), filter: "sepia(1) saturate(4) hue-rotate(-15deg) brightness(0.85) contrast(1.4)" },
                { icon: iconHotel, title: t("concierge.hotel.title", "Hotel & B&B Recommendations"), desc: t("concierge.hotel.desc", "Recommendations for hotels and B&Bs in locations that suit your travel style and plans.") },
                { icon: iconMessage, title: t("concierge.support.title", "On-the-Ground Support"), desc: t("concierge.support.desc", "Personal support, practical help and local advice whenever you need it during your stay.") },
              ];
              return (
                <>
                  <FadeIn delay={0.15}>
                    <div className="text-center mb-10 md:mb-12">
                      <p className="font-body text-sm tracking-widest uppercase text-accent mb-4">
                        {t("concierge.kicker", "What I take care of")}
                      </p>
                      <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary leading-[0.95] uppercase">
                        {t("concierge.title", "More than a guide. Personal support, thoughtful guidance and local knowledge throughout your stay.")}
                      </h3>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                    <div
                      className="bg-background rounded-sm shadow-sm overflow-hidden"
                      style={{ borderTop: "4px solid hsl(var(--heritage-orange))" }}
                    >
                      <ul className="divide-y divide-border/40">
                        {rows.map((row) => (
                          <li key={row.title} className="flex items-start gap-5 px-6 py-6 md:px-10 md:py-7">
                            <div
                              className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: "hsl(var(--heritage-taupe) / 0.28)" }}
                              aria-hidden
                            >
                              <img
                                src={row.icon}
                                alt=""
                                className="object-contain w-12 h-12 md:w-14 md:h-14"
                                loading="lazy"
                                aria-hidden
                                style={{
                                  // The hand-drawn icons are pale line art; boost them
                                  // so they stay legible on the light card.
                                  filter: `${row.filter ?? ""} saturate(1.5) contrast(1.45) brightness(0.8)`.trim(),
                                }}
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4 className="font-heading text-lg md:text-xl text-primary tracking-wide uppercase leading-tight mb-1">
                                {row.title}
                              </h4>
                              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                                {row.desc}
                              </p>
                            </div>
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

      {/* ── 3. A Day in the Life (click-to-explore, no scroll driver) ── */}
      <section id="day" className="relative scroll-mt-24 pt-12 lg:pt-20 pb-16 md:pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-3xl mb-6 lg:mb-8">
              <p className="font-body text-xs lg:text-sm tracking-widest uppercase text-secondary mb-2">
                Let's Explore Together
              </p>
              <h2 className="font-heading text-4xl md:text-5xl text-primary leading-[0.95] mb-3">
                A Day in My Amsterdam
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                Every day unfolds differently. Shaped by curiosity, conversation and the rhythm of the city. Tap a number on the map to peek into a moment of the day.
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <DayMap moments={moments} />
          </FadeIn>
        </div>
      </section>


      {/* ── Rick Steves Feature ── */}
      <div id="rick-steves" className="relative pt-10 md:pt-14 lg:pt-20 pb-16 md:pb-20 lg:pb-28 scroll-mt-24" style={{ backgroundColor: "hsl(var(--heritage-taupe) / 0.15)" }}>
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
        </div>
      </div>

      {/* ── Podcast: Two Stories, One City (green band) ── */}
      <section
        id="podcast"
        className="relative py-16 md:py-20 lg:py-28 scroll-mt-24 overflow-hidden"
        style={{ backgroundColor: "hsl(var(--heritage-green))" }}
      >
        {/* faint paper-grain overlay */}
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
            {/* Left: kicker, heading, copy, player */}
            <FadeIn className="lg:col-span-8 lg:border-r lg:pr-10 lg:[border-color:hsl(0_0%_100%/0.15)]">

              <div className="inline-flex items-center gap-2 mb-4">
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full"
                  style={{ backgroundColor: "hsl(var(--heritage-orange))", color: "hsl(var(--heritage-green))" }}
                  aria-hidden
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="2" width="6" height="12" rx="3" />
                    <path d="M5 10a7 7 0 0 0 14 0" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                </span>
                <span
                  className="font-body text-[11px] tracking-[0.3em] uppercase px-3 py-1 rounded-full border"
                  style={{
                    color: "hsl(var(--heritage-orange))",
                    borderColor: "hsl(var(--heritage-orange) / 0.5)",
                  }}
                >
                  Podcast
                </span>
              </div>

              <h2
                className="font-heading text-3xl md:text-4xl lg:text-5xl leading-[1.05] mb-5"
                style={{ color: "hsl(0 0% 98%)" }}
              >
                Two Stories, One City<br />Amsterdam
              </h2>
              <p
                className="font-body italic text-base md:text-lg leading-relaxed mb-5"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                A podcast by Louke and Dennis. Two locals in conversation with their city, inviting you to listen.
              </p>
              <p className="font-body text-base leading-relaxed mb-6" style={{ color: "hsl(0 0% 88%)" }}>
                Stories about Amsterdam, identity, culture, city life and personal experiences, told through the people who shape the city.
              </p>


              <PodcastPlayer ref={podcastRef} tone="dark" />
            </FadeIn>

            {/* Right: hosts photo + listen link */}
            <FadeIn className="lg:col-span-4 flex flex-col items-center lg:items-start gap-6">
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

      {/* ── In the Media + Invite Dennis ── */}
      <div className="relative py-16 md:py-20 lg:py-28" style={{ backgroundColor: "hsl(var(--heritage-taupe) / 0.15)" }}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-4 mb-10 md:mb-12">
                <span
                  className="font-body text-[10px] md:text-[11px] tracking-[0.35em] uppercase whitespace-nowrap"
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
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left: SoundCloud block */}
              <FadeIn className="lg:col-span-7">
                <div className="space-y-6 md:space-y-8">
                  <div className="space-y-4 md:space-y-5">
                    <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary leading-[0.95] tracking-wide">
                      Radio Interview about Amsterdam
                    </h3>
                    <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                      I was invited to speak on Dutch radio about Amsterdam, its culture, the people who shape its neighborhoods and what it means to share the city with visitors. The interview is in Dutch. I'm honored to have been featured as a local voice.
                    </p>
                  </div>

                  <div className="rounded-sm overflow-hidden border border-border/60 shadow-sm">
                    <iframe
                      title="Dennis Gerrits, Radio interview about Amsterdam (SoundCloud)"
                      width="100%"
                      height="140"
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
                    className="inline-flex items-center gap-2 font-body text-sm font-medium hover:gap-3 transition-all"
                    style={{ color: "hsl(var(--heritage-orange))" }}
                  >
                    Listen on SoundCloud
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </FadeIn>

              {/* Right: Picture */}
              <FadeIn delay={0.04} className="lg:col-span-5">
                <figure className="space-y-4">
                  <div className="relative overflow-hidden rounded-sm shadow-md">
                    <img
                      src={lovableAssetUrl(dennisRadioTaboe.url)}
                      alt="Dennis Gerrits being interviewed live at Studio Zeedijk, Amsterdam"
                      loading="lazy"
                      className="w-full aspect-[4/5] object-cover"
                    />
                  </div>
                  <figcaption className="font-body text-xs md:text-sm text-muted-foreground italic flex items-center gap-3">
                    <span
                      aria-hidden
                      className="w-8 h-px"
                      style={{ background: "hsl(var(--heritage-orange))" }}
                    />
                    Live at Studio Zeedijk, Amsterdam.
                  </figcaption>
                </figure>
              </FadeIn>

              {/* Invite Dennis — full width below the SoundCloud card and picture */}
              <FadeIn delay={0.08} className="lg:col-span-12">
                <a
                  href="#contact"
                  className="group block relative overflow-hidden rounded-sm p-6 md:p-10 lg:p-12 transition-all hover:shadow-lg"
                  style={{ background: "hsl(var(--heritage-purple))" }}
                >



                  <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-10">
                    <div className="space-y-3 md:space-y-4">
                      <p
                        className="font-body text-[10px] md:text-[11px] tracking-[0.25em] uppercase"
                        style={{ color: "hsl(var(--heritage-orange))" }}
                      >
                        Invite Dennis
                      </p>
                      <h3
                        className="font-heading text-2xl sm:text-3xl md:text-4xl leading-[0.95] tracking-wide"
                        style={{ color: "hsl(var(--heritage-cream))" }}
                      >
                        Podcasts · Lectures · Radio · Live Events
                      </h3>
                      <p
                        className="font-body text-sm md:text-base leading-relaxed max-w-lg"
                        style={{ color: "hsl(var(--heritage-taupe-tint))" }}
                      >
                        Available for podcast conversations, guest lectures, interviews, and cultural programs.
                      </p>
                    </div>

                    <span
                      className="inline-flex items-center gap-2 font-body text-sm font-bold tracking-widest uppercase group-hover:gap-3 transition-all md:flex-shrink-0"
                      style={{ color: "hsl(var(--heritage-orange))" }}
                    >
                      Get in touch
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </a>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>


      {/* ── Building Blocks preview (4 cards from Get Inspired) ── */}
      <section
        id="experiences"
        className="relative py-16 md:py-20 lg:py-28 scroll-mt-24 overflow-hidden"
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
                className="font-body text-sm tracking-widest uppercase mb-4"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                Threads to follow
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-4">
                What draws you in?
              </h2>
              <p
                className="mb-6 text-2xl md:text-3xl"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: "hsl(var(--heritage-green))",
                  transform: "rotate(-2deg)",
                  display: "inline-block",
                }}
              >
                Some ideas to inspire your journey
              </p>
            </FadeIn>

          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-y-16 gap-x-6 md:gap-x-10 pt-4">
            {[
              { id: "neighborhood", title: "The neighborhood", note: "real Amsterdam lives here", caption: "Quiet side streets where everyday life unfolds. Someone watering plants outside their front door. A neighbor locking up a bicycle.", image: peekNeighborhood, rotate: -2.4, pin: "tape-tl" },
              { id: "food", title: "Food Culture", note: "one bite at a time", caption: "Morning markets full of daily life. The smell of fresh bread from bakeries. Local flavors in every bite.", image: peekFood, rotate: 1.8, pin: "tape-tr" },
              { id: "architecture", title: "Living Architecture", note: "unlike anywhere else", caption: "A city built in layers of time. Old and modern architecture side by side. Every building carries its own story.", image: peekArchitecture, rotate: -1.2, pin: "tape-gl" },
              { id: "water", title: "From the Water", note: "a different rhythm", caption: "On a private boat through quiet canals. The city unfolding around you. A picnic, wine, and shared moments.", image: peekWater, rotate: 2.0, pin: "tape-gr" },
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
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/get-inspired?theme=${theme.title
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, "")}`
                      )
                    }

                    aria-label={`${theme.title}, read more on the Experiences page`}
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
                    <div className="p-2.5 sm:p-3 pb-4 sm:pb-5 transition-all duration-500 relative">
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
                      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                        <img
                          src={theme.image}
                          alt={theme.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02] group-hover:saturate-150"
                          style={{ filter: "saturate(1.18) brightness(1.06) contrast(1.04)" }}
                        />
                      </div>
                      <div className="relative mt-3 sm:mt-4 px-1.5 sm:px-2">
                        <h3 className="font-heading text-lg sm:text-xl md:text-2xl text-primary leading-tight tracking-wide">
                          {theme.title}
                        </h3>
                        <p
                          className="text-xl sm:text-2xl md:text-[1.7rem] mt-1 leading-snug"
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
                        <span
                          className="mt-3 font-body text-xs sm:text-sm tracking-widest uppercase inline-flex items-center gap-1.5 border-b border-dashed pb-0.5 transition-opacity group-hover:opacity-70"
                          style={{ color: "hsl(var(--heritage-orange))", borderColor: "hsl(var(--heritage-orange))" }}
                        >
                          Read more <span aria-hidden>→</span>
                        </span>
                      </div>

                    </div>
                  </button>
                </FadeIn>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 4. Proof: Reviews & Guests ── */}
      <section id="proof" className="py-16 md:py-20 lg:py-28 scroll-mt-24">
        <div className="container mx-auto px-6 lg:px-12">
          {(() => {
            const TA_URL =
              "https://www.tripadvisor.com/Attraction_Review-g188590-d13431295-Reviews-Love_My_City_Tours-Amsterdam_North_Holland_Province.html";
            const TA_GREEN = "#00AA6C";
            const taRating = t("tripadvisor.rating", "5.0");
            const taReviewCount = parseInt(t("tripadvisor.review_count", "218"), 10) || 0;

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
                    <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed md:whitespace-nowrap">
                      These are words shared by travelers after their time with me. Click any card to read the full review on <TripAdvisorWordmark className="text-lg" />.
                    </p>
                  </FadeIn>
                </div>

                {/* Tripadvisor badge + featured review side by side */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-stretch mb-10 max-w-6xl mx-auto">
                  {/* Tripadvisor summary badge */}
                  <FadeIn className="md:col-span-4 lg:col-span-3">
                    <a
                      href={TA_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 bg-background rounded-lg shadow-md hover:shadow-lg transition-all px-5 py-4 md:py-5 border border-border h-full"
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
                            <strong>{taRating}</strong> · <CountUp value={taReviewCount} /> reviews
                          </span>
                        </div>
                      </div>
                    </a>
                  </FadeIn>

                  {/* Featured review (first review) — compact horizontal strip */}
                  {(() => {
                    const hero = reviews[0];
                    return (
                      <FadeIn className="md:col-span-8 lg:col-span-9">
                        <a
                          href={hero.link ?? TA_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col md:flex-row md:items-center gap-5 md:gap-6 bg-background rounded-lg shadow-md hover:shadow-lg transition-all border-l-[3px] px-5 sm:px-6 py-5 h-full"
                          style={{ borderLeftColor: "hsl(var(--heritage-green))" }}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <TripAdvisorBubbles size={12} />
                              <span
                                className="font-body text-[10px] tracking-[0.15em] uppercase opacity-80"
                                style={{ color: TA_GREEN }}
                              >
                                Tripadvisor · {hero.date}
                              </span>
                            </div>
                            <blockquote>
                              <p className="font-body text-sm sm:text-base text-foreground leading-relaxed line-clamp-3">
                                "{hero.quote}"
                              </p>
                            </blockquote>
                          </div>

                          <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-2 md:pl-4 md:border-l border-border shrink-0">
                            <div className="text-left md:text-right">
                              <p className="font-heading text-lg tracking-wide text-primary leading-none uppercase">
                                {hero.author}
                              </p>
                              <p className="font-body text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-semibold mt-1">
                                {hero.location}
                              </p>
                            </div>
                            <span
                              className="font-body text-xs tracking-wide whitespace-nowrap"
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

                {/* Remaining reviews — four in a row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 max-w-6xl mx-auto">
                  {reviews.slice(1).map((r, i) => (
                    <FadeIn key={i} delay={i * 0.08}>
                      <a
                        href={r.link ?? TA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-lg p-5 h-full flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-4 bg-background shadow-md"
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
                        <p className="font-body text-sm text-foreground leading-snug italic flex-1 line-clamp-4">
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
                            className="font-body text-[10px] tracking-wide opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity whitespace-nowrap"
                            style={{ color: TA_GREEN }}
                          >
                            Read →
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
                      Read all <CountUp value={taReviewCount} /> reviews on Tripadvisor →
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

      {/* ── Co-Founder Projects: AroundFriends ── */}
      <section
        id="around-friends"
        className="relative py-16 md:py-20 lg:py-28 scroll-mt-24 overflow-hidden"
        style={{ backgroundColor: "hsl(40 38% 96%)" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <p
                className="font-body text-sm tracking-widest uppercase mb-4"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                Co-Founder Projects
              </p>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
                AroundFriends
              </h2>
              <p className="font-body text-lg text-foreground/85 leading-relaxed mb-5">
                In addition to my work as a travel advisor and local guide in Amsterdam and the Netherlands, I am the co-founder and Guide Community Director of AroundFriends.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-5">
                AroundFriends is a guide-matching platform that connects travelers with carefully selected local guides. Travelers complete a short questionnaire and are then matched with guides who fit their travel style and interests. They can explore detailed guide profiles, watch personal introduction videos, and connect directly with guides before booking, creating a more personal and transparent way to plan meaningful travel experiences.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
                The platform was born from a shared belief that travel becomes more meaningful when it is built on genuine human connection and local insight.
              </p>

              <blockquote
                className="relative pl-6 border-l-4 py-2 mb-8"
                style={{ borderColor: "hsl(var(--heritage-bordeaux))" }}
              >
                <p
                  className="font-body italic text-lg leading-relaxed"
                  style={{ color: "hsl(var(--heritage-bordeaux))" }}
                >
                  “The brainchild of recommended guide Dennis Gerrits.”
                </p>
                <footer className="font-body text-sm tracking-widest uppercase mt-3 text-muted-foreground">
                  Rick Steves Amsterdam &amp; the Netherlands Guidebook, 2025 edition
                </footer>
              </blockquote>

              <a
                href="https://www.aroundfriends.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-base tracking-wide border-b-2 border-dashed pb-1 transition-opacity hover:opacity-80"
                style={{
                  color: "hsl(var(--heritage-bordeaux))",
                  borderColor: "hsl(var(--heritage-bordeaux) / 0.5)",
                }}
              >
                Visit aroundfriends.com
                <span aria-hidden>→</span>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Notebook teaser (short list + link to full notebook for SEO) ── */}
      <section
        id="storybook"
        className="relative py-16 md:py-20 lg:py-28 scroll-mt-24 overflow-hidden"
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

          {bookStories.length > 0 && (
            <FadeIn>
              <div className="mt-12 md:mt-16 text-center">
                <Link
                  to="/notebook"
                  className="inline-flex items-center gap-2 font-body text-base tracking-wide border-b-2 border-dashed pb-1 transition-opacity hover:opacity-80"
                  style={{
                    color: "hsl(var(--heritage-bordeaux))",
                    borderColor: "hsl(var(--heritage-bordeaux) / 0.5)",
                  }}
                >
                  Read all {bookStories.length} chapters in the notebook
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </main>
  );
};

export default Index;
