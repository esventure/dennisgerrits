import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "./FadeIn";
import RichText from "./RichText";
import { useSiteContent } from "@/hooks/useSiteContent";

/* ────────────────────────────────────────────────────────────
   Two icon-less variations of the About / "Person & Guide"
   section. Same content, different editorial treatment, so
   Dennis can pick which composition feels most like him.
   ──────────────────────────────────────────────────────────── */

const PERSON_FALLBACK =
  "I'm a free spirit with deep roots here. I grew up cycling these canals and collecting stories along the way. Amsterdam isn't just where I live, it's how I think.";
const GUIDE_FALLBACK =
  "No flag, no script. Depth over highlights, connection over information. A friend who knows the city inside out, walking beside you instead of in front of you.";

/* ── Variation A — Editorial split, no illustrations ─────── */
const AboutEditorial = () => {
  const t = useSiteContent();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
      {/* Left: The Person */}
      <div className="bg-background px-8 md:px-16 lg:px-20 py-20 lg:py-28 flex items-center">
        <FadeIn>
          <div className="max-w-md mx-auto lg:ml-auto lg:mr-0">
            <p
              className="font-heading text-7xl md:text-8xl mb-6 leading-none"
              style={{ color: "hsl(var(--heritage-orange))" }}
            >
              01
            </p>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-4">
              {t("about.person.kicker", "A True Amsterdammer")}
            </p>
            <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-6">
              {t("about.person.title", "The Person")}
            </h2>
            <div className="w-12 h-0.5 bg-accent mb-6" />
            <RichText
              className="font-body text-base md:text-lg text-muted-foreground leading-relaxed"
              html={t("about.person.body", "")}
              fallback={PERSON_FALLBACK}
            />
          </div>
        </FadeIn>
      </div>

      {/* Right: The Guide */}
      <div className="bg-primary px-8 md:px-16 lg:px-20 py-20 lg:py-28 flex items-center">
        <FadeIn delay={0.15}>
          <div className="max-w-md mx-auto lg:mr-auto lg:ml-0">
            <p
              className="font-heading text-7xl md:text-8xl mb-6 leading-none"
              style={{ color: "hsl(var(--heritage-orange))" }}
            >
              02
            </p>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/60 mb-4">
              {t("about.guide.kicker", "A Different Kind of Guide")}
            </p>
            <h2 className="font-heading text-5xl md:text-6xl text-primary-foreground leading-[0.95] mb-6">
              {t("about.guide.title", "The Guide")}
            </h2>
            <div className="w-12 h-0.5 bg-primary-foreground/40 mb-6" />
            <RichText
              className="font-body text-base md:text-lg text-primary-foreground/80 leading-relaxed"
              html={t("about.guide.body", "")}
              fallback={GUIDE_FALLBACK}
            />
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

/* ── Variation B — Magazine letter, single column ────────── */
const AboutLetter = () => {
  const t = useSiteContent();
  return (
    <div
      className="px-6 md:px-12 py-20 lg:py-28 min-h-[70vh] flex items-center"
      style={{ backgroundColor: "hsl(var(--heritage-taupe-tint))" }}
    >
      <div className="container mx-auto max-w-3xl">
        <FadeIn>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary text-center mb-8">
            About me
          </p>

          {/* The Person */}
          <div className="mb-16">
            <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-3 text-center">
              {t("about.person.title", "The Person")}
            </h2>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary text-center mb-6">
              {t("about.person.kicker", "A True Amsterdammer")}
            </p>
            <RichText
              className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed text-center"
              html={t("about.person.body", "")}
              fallback={PERSON_FALLBACK}
            />
          </div>

          {/* Hand-drawn divider */}
          <div className="flex justify-center mb-16">
            <svg
              aria-hidden
              viewBox="0 0 200 14"
              className="w-40 h-4"
            >
              <path
                d="M 6 8 C 50 2, 150 12, 194 6"
                stroke="hsl(var(--heritage-orange))"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* The Guide */}
          <div>
            <h2
              className="font-heading text-5xl md:text-6xl leading-[0.95] mb-3 text-center"
              style={{ color: "hsl(var(--heritage-bordeaux))" }}
            >
              {t("about.guide.title", "The Guide")}
            </h2>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary text-center mb-6">
              {t("about.guide.kicker", "A Different Kind of Guide")}
            </p>
            <RichText
              className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed text-center"
              html={t("about.guide.body", "")}
              fallback={GUIDE_FALLBACK}
            />
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

/* ── Variation C — Two hand-drawn people ─────────────────── */
const PersonFigure = () => (
  <svg
    aria-hidden
    viewBox="0 0 120 200"
    className="w-full h-full"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* head */}
    <path d="M58 26 C 46 26, 42 38, 44 48 C 46 58, 54 62, 60 62 C 68 62, 76 56, 76 46 C 76 36, 70 26, 58 26 Z" />
    {/* hair tuft */}
    <path d="M48 32 C 52 24, 64 22, 72 28" />
    {/* neck */}
    <path d="M56 62 L 56 70 M 66 62 L 66 70" />
    {/* shirt / torso */}
    <path d="M40 78 C 46 70, 56 68, 60 70 C 64 68, 74 70, 80 78 L 84 120 C 78 124, 68 126, 60 126 C 52 126, 42 124, 36 120 Z" />
    {/* arms */}
    <path d="M40 80 C 32 96, 28 116, 30 132" />
    <path d="M80 80 C 88 96, 92 116, 90 132" />
    {/* hands */}
    <path d="M28 132 C 26 136, 28 140, 32 138" />
    <path d="M92 132 C 94 136, 92 140, 88 138" />
    {/* legs */}
    <path d="M50 124 C 48 150, 46 174, 48 188" />
    <path d="M70 124 C 72 150, 74 174, 72 188" />
    {/* shoes */}
    <path d="M44 188 C 42 192, 50 194, 54 190" />
    <path d="M68 190 C 72 194, 80 192, 78 188" />
    {/* face dots */}
    <circle cx="54" cy="46" r="0.9" fill="currentColor" />
    <circle cx="66" cy="46" r="0.9" fill="currentColor" />
    <path d="M56 54 C 58 56, 62 56, 64 54" />
  </svg>
);

const GuideFigure = () => (
  <svg
    aria-hidden
    viewBox="0 0 120 200"
    className="w-full h-full"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* hat brim + crown */}
    <path d="M30 34 C 50 28, 78 28, 92 34 C 88 36, 70 38, 60 38 C 50 38, 36 36, 30 34 Z" />
    <path d="M44 34 C 46 22, 74 22, 78 34" />
    {/* head */}
    <path d="M50 38 C 44 42, 44 56, 50 62 C 56 68, 70 66, 74 60 C 78 54, 76 42, 70 38" />
    {/* neck */}
    <path d="M56 64 L 56 72 M 66 64 L 66 72" />
    {/* jacket */}
    <path d="M38 80 C 46 72, 56 70, 60 72 C 64 70, 74 72, 82 80 L 86 122 C 80 126, 70 128, 60 128 C 50 128, 40 126, 34 122 Z" />
    {/* lapel */}
    <path d="M60 72 L 54 96 L 60 110 L 66 96 Z" />
    {/* arms — one gesturing */}
    <path d="M38 82 C 28 96, 22 110, 24 124 C 28 132, 38 130, 42 122" />
    <path d="M82 82 C 92 96, 96 114, 90 128" />
    {/* satchel strap */}
    <path d="M44 78 C 60 92, 78 100, 90 102" />
    {/* legs */}
    <path d="M50 126 C 48 152, 46 176, 48 190" />
    <path d="M70 126 C 72 152, 74 176, 72 190" />
    {/* shoes */}
    <path d="M44 190 C 42 194, 52 196, 56 192" />
    <path d="M68 192 C 72 196, 82 194, 78 190" />
    {/* face */}
    <circle cx="55" cy="50" r="0.9" fill="currentColor" />
    <circle cx="67" cy="50" r="0.9" fill="currentColor" />
    <path d="M55 58 C 58 60, 64 60, 67 58" />
  </svg>
);

const AboutFigures = () => {
  const t = useSiteContent();
  return (
    <div
      className="px-6 md:px-12 py-20 lg:py-28 min-h-[70vh] flex items-center"
      style={{ backgroundColor: "hsl(var(--heritage-taupe-tint))" }}
    >
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* The Person */}
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <div
              className="w-40 md:w-52 h-64 md:h-80 mb-6"
              style={{ color: "hsl(var(--heritage-orange))" }}
            >
              <PersonFigure />
            </div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-3">
              {t("about.person.kicker", "A True Amsterdammer")}
            </p>
            <h2 className="font-heading text-5xl md:text-6xl text-primary leading-[0.95] mb-4">
              {t("about.person.title", "The Person")}
            </h2>
            <div className="w-12 h-0.5 bg-accent mb-5" />
            <RichText
              className="font-body text-base md:text-lg text-foreground/80 leading-relaxed max-w-md"
              html={t("about.person.body", "")}
              fallback={PERSON_FALLBACK}
            />
          </div>
        </FadeIn>

        {/* The Guide */}
        <FadeIn delay={0.15}>
          <div className="flex flex-col items-center text-center">
            <div
              className="w-40 md:w-52 h-64 md:h-80 mb-6"
              style={{ color: "hsl(var(--heritage-bordeaux))" }}
            >
              <GuideFigure />
            </div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-3">
              {t("about.guide.kicker", "A Different Kind of Guide")}
            </p>
            <h2
              className="font-heading text-5xl md:text-6xl leading-[0.95] mb-4"
              style={{ color: "hsl(var(--heritage-bordeaux))" }}
            >
              {t("about.guide.title", "The Guide")}
            </h2>
            <div
              className="w-12 h-0.5 mb-5"
              style={{ backgroundColor: "hsl(var(--heritage-bordeaux))" }}
            />
            <RichText
              className="font-body text-base md:text-lg text-foreground/80 leading-relaxed max-w-md"
              html={t("about.guide.body", "")}
              fallback={GUIDE_FALLBACK}
            />
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const slides = [
  { key: "editorial", label: "Editorial Split", render: () => <AboutEditorial /> },
  { key: "letter", label: "Magazine Letter", render: () => <AboutLetter /> },
  { key: "figures", label: "Drawn Figures", render: () => <AboutFigures /> },
];

const AboutCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    duration: 30,
  });
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="about" className="relative scroll-mt-20 group">
      {/* Top control bar — variation badge + nav controls */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <button
          onClick={scrollPrev}
          aria-label="Previous variation"
          className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="font-body text-[10px] tracking-[0.3em] uppercase bg-background/80 backdrop-blur-sm text-secondary px-3 py-1.5 rounded-full border border-border">
          Variation {selected + 1} of {slides.length} · {slides[selected].label}
        </span>

        <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-2">
          {slides.map((s, i) => {
            const isActive = i === selected;
            return (
              <button
                key={s.key}
                onClick={() => scrollTo(i)}
                aria-label={`Go to ${s.label} variation`}
                className="w-3 h-3 flex items-center justify-center"
              >
                {isActive ? (
                  <span className="block w-3 h-3 rounded-full border-[1.5px] border-accent" />
                ) : (
                  <span className="block w-2 h-2 rounded-full bg-border" />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={scrollNext}
          aria-label="Next variation"
          className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-hidden pt-16" ref={emblaRef}>
        <div className="flex">
          {slides.map((s) => (
            <div
              key={s.key}
              className="flex-[0_0_100%] min-w-0"
            >
              {s.render()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutCarousel;
