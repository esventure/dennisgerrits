import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "./FadeIn";
import dennisArmsWide from "@/assets/dennis-arms-wide.jpg";
import dennisCanalSmile from "@/assets/dennis-canal-smile.jpg";
import dennisTalking from "@/assets/dennis-talking.jpg";

/* ────────────────────────────────────────────────────────────
   Three hero variations. Each is a self-contained section
   sized to fill the hero viewport so swiping feels consistent.
   ──────────────────────────────────────────────────────────── */

const HeroEditorial = () => (
  <div className="container mx-auto px-6 lg:px-12 pt-2 pb-24">
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
      <FadeIn>
        <div className="flex flex-col items-center lg:items-start h-full">
          <img
            src={dennisCanalSmile}
            alt="Dennis Gerrits on an Amsterdam canal bridge"
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
          <span className="relative inline-block text-accent">
            I'm Dennis.
            <svg
              aria-hidden
              viewBox="0 0 200 12"
              preserveAspectRatio="none"
              className="absolute left-0 -bottom-2 w-full h-3"
            >
              <path
                d="M 4 8 C 60 2, 130 10, 196 5"
                stroke="hsl(var(--heritage-orange))"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
          <br />
          I don't show a city.<br />
          I translate it.
        </h1>
        <p className="font-body text-lg text-foreground/75 leading-relaxed max-w-lg mb-8">
          I walk alongside you, not in front of you. We'll find the stories, the quiet corners,
          the places that make you stop and really look. That's what I do.
        </p>
        <a
          href="#contact"
          className="inline-flex flex-col items-start gap-2 group"
        >
          <span className="font-body text-sm tracking-widest uppercase border-2 border-primary text-primary px-7 py-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            Say hello →
          </span>
          <span className="font-body italic text-sm text-foreground/60">
            Let's get to know each other first
          </span>
        </a>
      </FadeIn>
    </div>
  </div>
);

const HeroMagazine = () => (
  <div className="relative w-full min-h-[85vh] grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] items-stretch bg-[hsl(var(--heritage-taupe)/0.25)]">
    {/* Left: huge cover headline */}
    <div className="relative z-10 flex items-center px-6 lg:px-16 py-20 lg:py-0">
      <FadeIn>
        <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-6">
          Issue 01 · Amsterdam
        </p>
        <h1 className="font-heading text-primary leading-[0.85] mb-8 text-[clamp(3.5rem,9vw,8rem)]">
          AMSTERDAM,
          <br />
          <span className="relative inline-block text-accent">
            TRANSLATED.
            <svg
              aria-hidden
              viewBox="0 0 400 14"
              preserveAspectRatio="none"
              className="absolute left-0 -bottom-1 w-full h-3"
            >
              <path
                d="M 4 8 C 100 2, 250 12, 396 6"
                stroke="hsl(var(--heritage-orange))"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>
        </h1>
        <p
          className="font-body italic text-xl text-foreground/75 max-w-md mb-10"
          style={{ fontFamily: "'Outfit', serif" }}
        >
          A friend who happens to know the city.
          <br />
          <span className="text-secondary not-italic font-body text-sm tracking-widest uppercase mt-2 inline-block">
            Dennis Gerrits
          </span>
        </p>
        <a
          href="#contact"
          className="inline-flex flex-col items-start gap-2 group"
        >
          <span className="font-body text-sm tracking-widest uppercase bg-primary text-primary-foreground px-7 py-4 group-hover:bg-primary/90 transition-colors">
            Say hello →
          </span>
          <span className="font-body italic text-sm text-foreground/60">
            Let's get to know each other first
          </span>
        </a>
      </FadeIn>
    </div>

    {/* Right: full-bleed portrait, no side bars */}
    <div className="relative min-h-[500px] lg:min-h-[85vh] flex items-end justify-center">
      <img
        src={dennisArmsWide}
        alt="Dennis Gerrits with arms wide on an Amsterdam canal bridge"
        className="max-h-[85vh] w-auto h-full object-contain object-bottom"
      />
    </div>
  </div>
);

const HeroLetter = () => (
  <div className="container mx-auto px-6 lg:px-12 py-20 lg:py-24">
    <div className="max-w-3xl mx-auto text-center">
      <FadeIn>
        <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-10">
          A note from Dennis
        </p>
        <blockquote className="relative font-heading text-primary leading-[1.05] text-[clamp(2.5rem,6vw,5.5rem)] mb-10">
          <span
            aria-hidden
            className="absolute -top-10 left-1/2 -translate-x-1/2 font-heading text-[8rem] leading-none select-none"
            style={{ color: "hsl(var(--heritage-green))" }}
          >
            “
          </span>
          I walk alongside you,
          <br />
          <span className="text-accent">not in front of you.</span>
        </blockquote>
        <svg
          aria-hidden
          viewBox="0 0 200 14"
          className="mx-auto w-32 h-4 mb-10"
        >
          <path
            d="M 6 8 C 50 2, 150 12, 194 6"
            stroke="hsl(var(--heritage-orange))"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <p className="font-body text-lg text-foreground/75 leading-relaxed max-w-xl mx-auto mb-10">
          I'm Dennis, an Amsterdammer with deep roots and a love for the quiet
          corners of this city. We'll find the stories, the local spots, the
          places that make you stop and really look.
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="flex flex-col items-center gap-4 mb-10">
          <img
            src={dennisTalking}
            alt="Dennis Gerrits in Amsterdam"
            className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full object-cover shadow-lg"
            style={{ objectPosition: "70% 30%" }}
          />
          <p className="font-body text-sm tracking-[0.2em] uppercase text-secondary">
            Dennis Gerrits · Amsterdam
          </p>
        </div>
        <a
          href="#contact"
          className="inline-flex flex-col items-center gap-2 group"
        >
          <span className="font-body text-sm tracking-widest uppercase border-2 border-primary text-primary px-7 py-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            Say hello →
          </span>
          <span className="font-body italic text-sm text-foreground/60">
            Let's get to know each other first
          </span>
        </a>
      </FadeIn>
    </div>
  </div>
);

const slides = [
  { key: "editorial", label: "Editorial", render: () => <HeroEditorial /> },
  { key: "magazine", label: "Magazine", render: () => <HeroMagazine /> },
  { key: "letter", label: "Letter", render: () => <HeroLetter /> },
];

const HeroCarousel = () => {
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

  // Keyboard arrows when hero is in view
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (window.scrollY > window.innerHeight) return;
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollPrev, scrollNext]);

  return (
    <section id="hero" className="relative scroll-mt-20 group">
      {/* Variation badge — small label so Dennis knows which one he's looking at */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span className="font-body text-[10px] tracking-[0.3em] uppercase bg-background/80 backdrop-blur-sm text-secondary px-3 py-1.5 rounded-full border border-border">
          Variation {selected + 1} of {slides.length} · {slides[selected].label}
        </span>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((s) => (
            <div
              key={s.key}
              className="flex-[0_0_100%] min-w-0 min-h-[85vh] flex items-center"
            >
              {s.render()}
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <button
          onClick={scrollPrev}
          aria-label="Previous variation"
          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-background/80 border border-border text-muted-foreground hover:text-accent hover:border-accent"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

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

        <button
          onClick={scrollNext}
          aria-label="Next variation"
          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-background/80 border border-border text-muted-foreground hover:text-accent hover:border-accent"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
