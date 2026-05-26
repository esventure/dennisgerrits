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
      <div className="bg-background px-6 sm:px-10 md:px-16 lg:px-20 py-14 sm:py-20 lg:py-28 flex items-center">
        <FadeIn>
          <div className="max-w-md mx-auto lg:ml-auto lg:mr-0">
            <p
              className="font-heading text-6xl sm:text-7xl md:text-8xl mb-5 sm:mb-6 leading-none"
              style={{ color: "hsl(var(--heritage-orange))" }}
            >
              01
            </p>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-4">
              {t("about.person.kicker", "A True Amsterdammer")}
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-6">
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
      <div className="bg-primary px-6 sm:px-10 md:px-16 lg:px-20 py-14 sm:py-20 lg:py-28 flex items-center">
        <FadeIn delay={0.15}>
          <div className="max-w-md mx-auto lg:mr-auto lg:ml-0">
            <p
              className="font-heading text-6xl sm:text-7xl md:text-8xl mb-5 sm:mb-6 leading-none"
              style={{ color: "hsl(var(--heritage-orange))" }}
            >
              02
            </p>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/60 mb-4">
              {t("about.guide.kicker", "A Different Kind of Guide")}
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary-foreground leading-[0.95] mb-6">
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
      className="px-5 sm:px-6 md:px-12 py-14 sm:py-20 lg:py-28 min-h-[70vh] flex items-center"
      style={{ backgroundColor: "hsl(var(--heritage-taupe-tint))" }}
    >
      <div
        className="container mx-auto max-w-3xl rounded-sm bg-background/60 px-5 sm:px-6 md:px-12 py-10 sm:py-16 lg:py-20"
        style={{ border: "3px solid hsl(var(--heritage-orange))" }}
      >
        <FadeIn>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary text-center mb-8">
            About me
          </p>

          {/* The Person */}
          <div className="mb-12 sm:mb-16">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-3 text-center">
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
          <div className="flex justify-center mb-12 sm:mb-16">
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
              className="font-heading text-4xl sm:text-5xl md:text-6xl leading-[0.95] mb-3 text-center"
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

/* ── Variation C — Two hand-drawn people (logo-style figures) ── */
import dennisPersonLine from "@/assets/dennis-person-line.png";
import dennisGuideLine from "@/assets/dennis-guide-line.png";

const AboutFigures = () => {
  const t = useSiteContent();
  return (
    <div className="px-5 sm:px-6 md:px-12 py-14 sm:py-20 lg:py-28 min-h-[70vh] flex items-center">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* The Person */}
        <FadeIn>
          <div className="flex flex-col items-center text-center">
            <div
              className="rounded-full p-6 mb-6 flex items-center justify-center border-2"
              style={{ borderColor: "hsl(var(--heritage-bordeaux) / 0.4)" }}
            >
              <img
                src={dennisPersonLine}
                alt="Hand-drawn figure of Dennis the person"
                className="w-44 md:w-60 h-auto object-contain"
                loading="lazy"
              />
            </div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-3">
              {t("about.person.kicker", "A True Amsterdammer")}
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-4">
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
              className="rounded-full p-6 mb-6 flex items-center justify-center"
              style={{ backgroundColor: "hsl(var(--heritage-purple) / 0.18)" }}
            >
              <img
                src={dennisGuideLine}
                alt="Hand-drawn figure of Dennis the guide"
                className="w-44 md:w-60 h-auto object-contain"
                loading="lazy"
              />
            </div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-3">
              {t("about.guide.kicker", "A Different Kind of Guide")}
            </p>
            <h2
              className="font-heading text-4xl sm:text-5xl md:text-6xl leading-[0.95] mb-4"
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
    <section id="about" className="relative scroll-mt-20">
      <AboutEditorial />
    </section>
  );
};

export default AboutCarousel;
