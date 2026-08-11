import { Head } from "vite-react-ssg";
import { useState, useEffect } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FadeIn from "@/components/FadeIn";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { lovableAssetUrl } from "@/lib/utils";
import dennisBoat from "@/assets/dennis-hero.jpg.asset.json";

import iconMessage from "@/assets/icon-message.png";
import iconItinerary from "@/assets/icon-itinerary.png";
import iconFoot from "@/assets/icon-foot.png";
import iconBoat from "@/assets/icon-boat.png";
import iconHistory from "@/assets/icon-history.png";

/* ── Small inline visual helpers (reused across sections) ── */

const Squiggle = ({ color = "hsl(var(--heritage-orange))", className = "w-40 h-4" }) => (
  <svg aria-hidden viewBox="0 0 200 14" className={className}>
    <path
      d="M 6 8 C 50 2, 150 12, 194 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const PaperGrain = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
    }}
  />
);

const HandwrittenNote = ({
  children,
  rotate = "-2deg",
  color = "hsl(var(--heritage-green))",
  className = "",
}: {
  children: React.ReactNode;
  rotate?: string;
  color?: string;
  className?: string;
}) => (
  <p
    className={`text-2xl md:text-3xl ${className}`}
    style={{
      fontFamily: "'Caveat', cursive",
      color,
      transform: `rotate(${rotate})`,
      display: "inline-block",
      lineHeight: 1.1,
    }}
  >
    {children}
  </p>
);

const SectionDivider = () => (
  <div className="container mx-auto px-6 lg:px-12">
    <div className="flex justify-center py-8">
      <Squiggle className="w-32 h-3 opacity-60" />
    </div>
  </div>
);

/* Tiny line-art icons in heritage palette */
const HandshakeIcon = ({ color = "hsl(var(--heritage-orange))" }) => (
  <svg viewBox="0 0 56 56" className="w-12 h-12" fill="none" stroke={color}
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M6 28 L18 22 L26 28 L36 22 L50 28" />
    <path d="M22 30 C 24 34, 30 34, 32 30" />
    <path d="M14 28 L14 38 M42 28 L42 38" />
  </svg>
);

const BridgeIcon = ({ color = "hsl(var(--heritage-orange))" }) => (
  <svg viewBox="0 0 56 56" className="w-12 h-12" fill="none" stroke={color}
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 38 C 18 18, 38 18, 52 38" />
    <line x1="4" y1="44" x2="52" y2="44" />
    <line x1="14" y1="32" x2="14" y2="44" />
    <line x1="28" y1="26" x2="28" y2="44" />
    <line x1="42" y1="32" x2="42" y2="44" />
  </svg>
);

const StarSketch = ({ color = "hsl(var(--heritage-orange))" }) => (
  <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke={color}
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M24 6 L29 19 L43 20 L32 29 L36 42 L24 34 L12 42 L16 29 L5 20 L19 19 Z" />
  </svg>
);

const HandoverIcon = ({ color = "hsl(var(--heritage-orange))" }) => (
  <svg viewBox="0 0 56 56" className="w-12 h-12" fill="none" stroke={color}
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="20" y="18" width="16" height="20" rx="2" />
    <path d="M14 30 L4 30 M42 30 L52 30" />
    <path d="M8 26 L4 30 L8 34 M48 26 L52 30 L48 34" />
  </svg>
);

/* Faint Amsterdam-ish canal silhouette behind sections */
const FaintCanal = ({ side = "right" }: { side?: "left" | "right" }) => (
  <svg
    aria-hidden
    viewBox="0 0 600 200"
    className={`pointer-events-none absolute bottom-0 ${
      side === "right" ? "right-0" : "left-0"
    } w-[520px] max-w-[60%] opacity-[0.06]`}
    fill="none"
    stroke="hsl(var(--heritage-orange))"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M0 180 L600 180" />
    <path d="M40 180 L40 120 L60 100 L80 120 L80 180" />
    <path d="M50 130 L50 150 M70 130 L70 150" />
    <path d="M120 180 L120 90 L150 70 L180 90 L180 180" />
    <path d="M135 110 L135 140 M165 110 L165 140" />
    <path d="M220 180 L220 110 L240 95 L260 110 L260 180" />
    <path d="M310 180 L310 80 L340 60 L370 80 L370 180" />
    <path d="M325 100 L325 130 M355 100 L355 130" />
    <path d="M410 180 L410 100 L440 80 L470 100 L470 180" />
    <path d="M510 180 L510 120 L530 100 L550 120 L550 180" />
  </svg>
);

const TravelAgents = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", company: "", email: "", inquiryType: "", message: "" });

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Inquiry sent", description: "Thank you. I'll be in touch personally." });
    setForm({ name: "", company: "", email: "", inquiryType: "", message: "" });
  };

  /* Shared CTA — match homepage primary style */
  const ctaClass =
    "inline-block font-body text-sm tracking-widest uppercase px-8 py-4 border-2 transition-colors duration-300";
  const ctaPrimary = `${ctaClass} text-primary-foreground`;
  const ctaPrimaryStyle = {
    backgroundColor: "hsl(var(--heritage-bordeaux))",
    borderColor: "hsl(var(--heritage-bordeaux))",
  };

  return (
    <main className="bg-background">
      <Head>
        <title>Amsterdam Local Partner for Travel Advisors</title>
        <meta
          name="description"
          content="Dennis Gerrits supports travel advisors and concierges in Amsterdam: on-the-ground care for your clients, tailored days, bookings and local answers."
        />
        <link rel="canonical" href="https://dennisgerrits.com/travel-agents" />
        <meta property="og:title" content="Amsterdam Local Partner for Travel Advisors" />
        <meta
          property="og:description"
          content="On-the-ground care in Amsterdam for the clients of travel advisors and concierges."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dennisgerrits.com/travel-agents" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Dennis Gerrits – Amsterdam Travel Companion",
            url: "https://dennisgerrits.com/travel-agents",
            description:
              "Collaboration for travel advisors and concierges: a trusted local companion in Amsterdam who looks after your clients, arranges tailored days and answers questions on the ground.",
            areaServed: { "@type": "City", name: "Amsterdam" },
            provider: {
              "@type": "Person",
              name: "Dennis Gerrits",
              jobTitle: "Travel Companion & Storyteller",
            },
          })}
        </script>
        <meta name="twitter:title" content="Amsterdam Local Partner for Travel Advisors" />
        <meta name="twitter:description" content="On-the-ground care in Amsterdam for the clients of travel advisors and concierges." />
      </Head>

      {/* ────────────────── 1. Hero ────────────────── */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <FaintCanal side="right" />
        <div className="container mx-auto px-6 lg:px-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                For Travel Advisors &amp; Concierges
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary leading-[0.95] mb-6">
                I take care of your clients<br />in Amsterdam and the Netherlands.
              </h1>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-8">
                20+ years in tourism &middot; 9 years as a private guide &middot; Local expert
              </p>
              <div className="font-body text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10 space-y-5">
                <p>
                  Travel plans can change. Questions come up. Sometimes clients simply feel more comfortable knowing they have someone local they can reach out to.
                </p>
                <p>
                  I'm there as a trusted presence on the ground, before, during, and whenever needed throughout their stay.
                </p>
                <p>
                  Whether it's practical support like finding a pharmacy, help with local coordination, last-minute adjustments, or simply a familiar contact in the city, your clients know they are not navigating Amsterdam alone.
                </p>
                <p className="font-heading text-2xl lg:text-3xl text-primary">
                  You take care of the journey. I take care of them.
                </p>
              </div>
              <a href="#contact" onClick={scrollToContact} className={ctaPrimary} style={ctaPrimaryStyle}>
                Let's Connect
              </a>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="relative mx-auto max-w-md">
                {/* tape */}
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 rotate-[-4deg] z-10"
                  style={{ backgroundColor: "hsl(var(--heritage-orange) / 0.55)" }}
                />
                <div
                  className="bg-background p-3 pb-12 shadow-lg"
                  style={{ transform: "rotate(-1.5deg)" }}
                >
                  <img
                    src={lovableAssetUrl(dennisBoat.url)}
                    alt="Dennis in Amsterdam"
                    className="w-full aspect-[4/5] object-cover"
                    loading="lazy"
                  />
                  <p
                    className="text-center mt-4 text-2xl"
                    style={{ fontFamily: "'Caveat', cursive", color: "hsl(var(--heritage-bordeaux))" }}
                  >
                    based in Amsterdam
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ────────────────── 3. Two Ways to Work Together ────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary leading-[0.95]">
                Two ways to work together
              </h2>
              <p className="font-body text-lg text-muted-foreground mt-6">
                Every travel advisor works differently. I adapt to the way you prefer to work.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Option 1 */}
            <FadeIn delay={0.1}>
              <article
                className="h-full p-10 lg:p-12 bg-background border-t-4 shadow-md hover:shadow-xl transition-shadow rounded-sm"
                style={{ borderColor: "hsl(var(--heritage-purple))" }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="font-body text-xs tracking-widest uppercase text-secondary mb-2">
                      Option One
                    </p>
                    <p
                      className="font-heading text-7xl leading-none"
                      style={{ color: "hsl(var(--heritage-orange))" }}
                    >
                      01
                    </p>
                  </div>
                  <img src={iconItinerary} alt="" aria-hidden className="w-14 h-14 object-contain" loading="lazy" />
                </div>
                <span
                  className="inline-block font-body text-xs tracking-widest uppercase px-3 py-1 mb-4 rounded-sm"
                  style={{ backgroundColor: "hsl(var(--heritage-purple) / 0.12)", color: "hsl(var(--heritage-purple))" }}
                >
                  Full concierge – I plan and deliver
                </span>
                <h3 className="font-heading text-3xl lg:text-4xl text-primary mb-6 leading-tight">
                  You hand it over. I take care of the rest.
                </h3>
                <div className="space-y-5 font-body text-foreground/90 leading-relaxed">
                  <p>
                    Your clients are personally taken care of before they even arrive in
                    Amsterdam.
                  </p>
                  <p>
                    I begin with a video call to get to know them, their interests, travel style,
                    pace, and what they hope to experience during their time in the Netherlands.
                    Based on that, I create a fully personalized itinerary that feels thoughtful,
                    seamless, and deeply local.
                  </p>
                  <p>
                    I take care of reservations, tickets and timed entries, private boats,
                    transportation, restaurant recommendations, and personal guidance throughout
                    their stay. Always with flexibility, attention to detail, and genuine care.
                  </p>
                  <p>
                    You stay informed, while your clients feel relaxed, welcomed, and completely
                    looked after.
                  </p>
                </div>
              </article>
            </FadeIn>

            {/* Option 2 */}
            <FadeIn delay={0.2}>
              <article
                className="h-full p-10 lg:p-12 bg-background border-t-4 shadow-md hover:shadow-xl transition-shadow rounded-sm"
                style={{ borderColor: "hsl(var(--heritage-green))" }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="font-body text-xs tracking-widest uppercase text-secondary mb-2">
                      Option Two
                    </p>
                    <p
                      className="font-heading text-7xl leading-none"
                      style={{ color: "hsl(var(--heritage-orange))" }}
                    >
                      02
                    </p>
                  </div>
                  <img src={iconFoot} alt="" aria-hidden className="w-14 h-14 object-contain" loading="lazy" />
                </div>
                <span
                  className="inline-block font-body text-xs tracking-widest uppercase px-3 py-1 mb-4 rounded-sm"
                  style={{ backgroundColor: "hsl(var(--heritage-green) / 0.14)", color: "hsl(var(--heritage-green))" }}
                >
                  Local partner – you plan, I host
                </span>
                <h3 className="font-heading text-3xl lg:text-4xl text-primary mb-6 leading-tight">
                  You plan. I deliver on the ground.
                </h3>
                <div className="space-y-5 font-body text-foreground/90 leading-relaxed">
                  <p>
                    You already have the trip, itinerary, or structure in place. I step in as
                    your trusted local contact on the ground in Amsterdam and throughout the
                    Netherlands.
                  </p>
                  <p>
                    I welcome your clients personally, help bring the itinerary to life, assist
                    with local coordination when needed, and make sure everything runs smoothly
                    during their stay.
                  </p>
                  <p>
                    Your clients experience the warmth, flexibility, and local connection of
                    having someone nearby while you remain their trusted advisor throughout the
                    journey.
                  </p>
                </div>
              </article>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ────────────────── 4. Always On Call ────────────────── */}
      <section
        className="relative py-16 lg:py-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--heritage-bordeaux) / 0.08) 0%, hsl(var(--background)) 100%)",
        }}
      >
        <FaintCanal side="left" />
        <div className="container mx-auto px-6 lg:px-12 relative">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <FadeIn>
              <div className="max-w-3xl mb-12 lg:mb-16">
                <img
                  src={iconMessage}
                  alt=""
                  aria-hidden
                  className="w-14 h-14 mb-6"
                  loading="lazy"
                />
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary leading-[1]">
                  Your clients have a local they can rely on.
                </h2>
              </div>
            </FadeIn>

            {/* Two-column compact grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-12 lg:mb-16">
              {[
                {
                  title: "A trusted presence",
                  body: "Travel plans can change. Questions come up. I'm there before, during, and whenever needed throughout their stay.",
                },
                {
                  title: "Reachable, personally",
                  body: "Every client gets my phone number, so they can contact me throughout their stay, including in the evenings when needed.",
                },
                {
                  title: "Practical support",
                  body: "From finding a pharmacy to last-minute adjustments, your clients know they are not navigating Amsterdam alone.",
                },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.08}>
                  <div className="border-t pt-5" style={{ borderColor: "hsl(var(--heritage-bordeaux) / 0.4)" }}>
                    <h3 className="font-heading text-xl text-primary mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-body text-base text-foreground/85 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Pull-quote callout: A true extension of your service */}
            <FadeIn delay={0.2}>
              <div
                className="relative p-8 lg:p-10 border-l-4 bg-background shadow-md"
                style={{
                  borderColor: "hsl(var(--heritage-orange))",
                  transform: "rotate(-0.4deg)",
                }}
              >
                <PaperGrain />
                <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                  <div className="md:col-span-5">
                    <img src={iconHistory} alt="" aria-hidden className="w-12 h-12 object-contain mb-4" loading="lazy" />
                    <h3 className="font-heading text-2xl lg:text-3xl text-primary leading-tight">
                      A true extension of your service.
                    </h3>
                  </div>
                  <div className="md:col-span-7 space-y-4 font-body text-base lg:text-lg text-foreground/90 leading-relaxed">
                    <p>
                      When we work together, you're not handing your clients off. You're extending your service with someone you can trust. Someone who understands your clients, takes ownership, and is there when it matters.
                    </p>
                    <p className="font-heading text-xl lg:text-2xl text-primary pt-1">
                      So you can say: "I have someone in Amsterdam. He'll take care of you." And truly mean it.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>


      {/* ────────────────── 6. Testimonials ────────────────── */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ backgroundColor: "hsl(var(--heritage-taupe) / 0.18)" }}
      >
        <PaperGrain />
        <div className="container mx-auto px-6 lg:px-12 relative">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="font-body text-sm tracking-widest uppercase text-secondary">
                From Advisors I Work With
              </p>
            </div>
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
                <figure className="text-center px-4">
                  <span
                    aria-hidden
                    className="block font-heading text-7xl leading-none select-none mb-4"
                    style={{ color: "hsl(var(--heritage-green))" }}
                  >
                    “
                  </span>
                  <blockquote className="font-body text-xl lg:text-2xl text-primary leading-relaxed mb-8">
                    {t.quote}
                  </blockquote>
                  <div className="flex justify-center mb-4">
                    <span
                      className="block h-[2px] w-10"
                      style={{ backgroundColor: "hsl(var(--heritage-orange))" }}
                    />
                  </div>
                  <figcaption className="font-body text-sm tracking-wide uppercase text-secondary">
                    {t.author}, {t.location}
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ────────────────── 7. Let's Connect ────────────────── */}
      <section id="contact" className="py-20 lg:py-28 scroll-mt-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-6xl mx-auto relative">
            {/* hand-drawn vertical divider on desktop */}
            <svg
              aria-hidden
              viewBox="0 0 14 400"
              className="hidden lg:block absolute left-1/2 top-4 -translate-x-1/2 h-[80%] w-3 opacity-50"
              fill="none"
              stroke="hsl(var(--heritage-orange))"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M 6 4 C 12 80, 2 160, 8 240 C 12 320, 4 380, 6 396" />
            </svg>

            <FadeIn>
              <div>


                <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                  Let's Connect
                </p>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary leading-[0.95] mb-8">
                  If this resonates, I'd love to hear from you.
                </h2>
                <div className="font-body text-lg text-muted-foreground leading-relaxed space-y-5">
                  <p>The easiest way to start is simply by sending me a message.</p>
                  <p>
                    From there, we can schedule a short introductory call so I can introduce
                    myself and learn more about how you like to work and what your clients are
                    looking for.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div
                className="bg-background rounded-sm p-10 shadow-md border-t-4"
                style={{ borderColor: "hsl(var(--heritage-orange))" }}
              >
                <h3 className="font-heading text-2xl text-primary mb-6">Get in touch</h3>
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
                    <Label className="font-body text-sm">How can I help? <span className="text-muted-foreground/70">(optional)</span></Label>
                    <Select
                      value={form.inquiryType}
                      onValueChange={(v) => setForm({ ...form, inquiryType: v })}
                    >
                      <SelectTrigger className="h-12 text-base font-body">
                        <SelectValue placeholder="Choose what fits best" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-concierge">Full concierge – I plan and deliver</SelectItem>
                        <SelectItem value="local-partner">Local partner – you plan, I host</SelectItem>
                        <SelectItem value="exploring">Just exploring a fit</SelectItem>
                        <SelectItem value="other">Something else</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Tell me about your clients <span className="text-muted-foreground/70">(optional)</span></Label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="A few words about who's coming, when, and what they're hoping for."
                      className="min-h-[120px] text-base font-body"
                    />
                  </div>
                  <button type="submit" className={`${ctaPrimary} w-full`} style={ctaPrimaryStyle}>
                    Reach out
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
