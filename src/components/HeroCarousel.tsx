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
  <div className="container mx-auto px-5 sm:px-6 lg:px-12 pt-2 pb-16 md:pb-24">
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center">
      <FadeIn>
        <div className="flex flex-col items-center lg:items-start h-full">
          <img
            src={dennisCanalSmile}
            alt="Dennis Gerrits on an Amsterdam canal bridge"
            className="w-full max-w-lg rounded-sm object-cover shadow-lg aspect-[3/4]"
          />
          <p className="font-body text-xs sm:text-sm tracking-widest uppercase text-secondary mt-5 md:mt-6">
            Personal Travel Companion
          </p>
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <h1 className="font-heading text-[2.75rem] sm:text-5xl md:text-7xl lg:text-8xl text-primary leading-[0.95] mb-6 md:mb-8">
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
        <p className="font-body text-base md:text-lg text-foreground/75 leading-relaxed max-w-lg mb-7 md:mb-8">
          I walk alongside you, not in front of you. We'll find the stories, the quiet corners,
          the places that make you stop and really look. That's what I do.
        </p>
        <a
          href="#contact"
          className="inline-flex flex-col items-start gap-2 group"
        >
          <span className="font-body text-sm tracking-widest uppercase border-2 border-primary text-primary px-6 sm:px-7 py-3.5 sm:py-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
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
    <div className="relative z-10 flex items-center px-5 sm:px-6 lg:px-16 py-16 sm:py-20 lg:py-0">
      <FadeIn>
        <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-6">
          Issue 01 · Amsterdam
        </p>
        <h1 className="font-heading text-primary leading-[0.85] mb-8 text-[clamp(2.6rem,11vw,8rem)]">
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
  <div className="container mx-auto px-5 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24">
    <div className="max-w-3xl mx-auto text-center">
      <FadeIn>
        <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-10">
          A note from Dennis
        </p>
        <blockquote className="relative font-heading text-primary leading-[1.05] text-[clamp(2rem,7vw,5.5rem)] mb-10">
          <span
            aria-hidden
            className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 font-heading text-[5rem] sm:text-[8rem] leading-none select-none"
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

const HeroGreen = () => (
  <div className="w-full container mx-auto px-6 lg:px-12 py-10 md:py-14">
    <div
      className="relative overflow-hidden rounded-3xl px-6 py-14 sm:px-10 sm:py-20 md:px-16 md:py-24 lg:px-20 lg:py-28"
      style={{ backgroundColor: "hsl(var(--heritage-green))" }}
    >
      <div className="relative mx-auto max-w-6xl" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: portrait, editorial framing */}
          <FadeIn>
            <div className="flex flex-col items-center lg:items-start">
              <img
                src={dennisCanalSmile}
                alt="Dennis Gerrits on an Amsterdam canal bridge"
                className="w-full max-w-lg rounded-sm object-cover shadow-2xl aspect-[3/4]"
              />
              <p
                className="font-body text-sm tracking-widest uppercase mt-6"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                PERSONAL TRAVEL COMPANION
              </p>
            </div>
          </FadeIn>

          {/* Right: editorial headline + copy + CTA, all caps */}
          <FadeIn delay={0.2}>
            <h1
              className="font-heading text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 md:mb-8 uppercase tracking-tight"
              style={{ color: "hsl(var(--background))" }}
            >
              HELLO,
              <br />
              <span
                className="relative inline-block"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                I'M DENNIS.
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
              I DON'T SHOW
              <br />
              A CITY.
              <br />
              I TRANSLATE IT.
            </h1>
            <p
              className="font-body text-base md:text-lg leading-relaxed max-w-lg mb-10"
              style={{ color: "hsl(var(--background) / 0.85)" }}
            >
              I walk alongside you, not in front of you. We'll find the stories,
              the quiet corners, the places that make you stop and really look.
              That's what I do.
            </p>
            <div className="flex flex-col items-start gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase px-7 py-4 rounded-sm transition-colors"
                style={{
                  backgroundColor: "hsl(var(--heritage-orange))",
                  color: "hsl(var(--background))",
                }}
              >
                Say hello
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <p
                className="text-lg md:text-xl rotate-[-2deg] ml-1"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: "hsl(var(--background) / 0.9)",
                }}
              >
                Let's get to know each other first
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);


const HeroEditorialGreen = () => (
  <div className="w-full container mx-auto px-6 lg:px-12 py-10 md:py-14">
    <div
      className="relative overflow-hidden rounded-3xl px-6 py-14 sm:px-10 sm:py-20 md:px-16 md:py-24 lg:px-20 lg:py-28"
      style={{ backgroundColor: "hsl(var(--heritage-green))" }}
    >

      <div className="relative mx-auto max-w-6xl" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: portrait, editorial framing */}
          <FadeIn>
            <div className="flex flex-col items-center lg:items-start">
              <img
                src={dennisCanalSmile}
                alt="Dennis Gerrits on an Amsterdam canal bridge"
                className="w-full max-w-lg rounded-sm object-cover shadow-2xl aspect-[3/4]"
              />
              <p
                className="font-body text-sm tracking-widest uppercase mt-6"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                Storyteller & Travel Companion
              </p>
            </div>
          </FadeIn>

          {/* Right: editorial headline + copy */}
          <FadeIn delay={0.2}>
            <h1
              className="font-heading text-[2.75rem] sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6 md:mb-8"
              style={{ color: "hsl(var(--background))" }}
            >
              Hello,
              <br />
              <span
                className="relative inline-block"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
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
              A friend who
              <br />
              knows the city.
            </h1>
            <p
              className="font-body text-lg leading-relaxed max-w-lg mb-8"
              style={{ color: "hsl(var(--background) / 0.85)" }}
            >
              We slow down, follow curiosity, and discover places together,
              one story at a time. The best moments are rarely planned.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);

const HeroGreenCaps = () => (
  <div className="w-full container mx-auto px-6 lg:px-12 py-10 md:py-14">
    <div
      className="relative overflow-hidden rounded-3xl px-5 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16 lg:py-24"
      style={{ backgroundColor: "hsl(var(--heritage-green))" }}
    >

      <p
        className="absolute top-5 right-5 md:top-8 md:right-10 text-2xl md:text-3xl rotate-[-4deg] hidden md:block z-10"
        style={{
          fontFamily: "'Caveat', cursive",
          color: "hsl(var(--heritage-orange))",
        }}
        aria-hidden
      >
        say hello →
      </p>

      <div className="relative mx-auto max-w-5xl" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14 items-center">
          <FadeIn>
            <p
              className="font-body text-xs md:text-sm tracking-[0.3em] uppercase mb-6"
              style={{ color: "hsl(var(--heritage-orange))" }}
            >
              PERSONAL TRAVEL COMPANION
            </p>
            <h1
              className="font-heading leading-[0.9] mb-8 text-[clamp(2.5rem,6.5vw,5.75rem)] uppercase tracking-tight"
              style={{ color: "hsl(var(--background))" }}
            >
              HELLO,
              <br />
              <span style={{ color: "hsl(var(--heritage-orange))" }}>
                I'M DENNIS.
              </span>
              <br />
              I DON'T SHOW
              <br />
              A CITY.
              <br />
              I TRANSLATE IT.
            </h1>
            <p
              className="font-body text-base md:text-lg leading-relaxed max-w-md mb-10"
              style={{ color: "hsl(var(--background) / 0.85)" }}
            >
              I walk alongside you, not in front of you. We'll find the stories,
              the quiet corners, the places that make you stop and really look.
              That's what I do.
            </p>
            <a
              href="#contact"
              className="inline-flex flex-col items-start gap-2 group"
            >
              <span
                className="font-body text-sm tracking-widest uppercase border-2 px-7 py-4 transition-colors"
                style={{
                  borderColor: "hsl(var(--background))",
                  color: "hsl(var(--background))",
                }}
              >
                SAY HELLO →
              </span>
              <span
                className="font-body italic text-sm"
                style={{ color: "hsl(var(--background) / 0.7)" }}
              >
                Let's get to know each other first
              </span>
            </a>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div
              className="bg-background border-l-4 shadow-2xl rounded-sm overflow-hidden"
              style={{ borderLeftColor: "hsl(var(--heritage-orange))" }}
            >
              <img
                src={dennisCanalSmile}
                alt="Dennis Gerrits on an Amsterdam canal bridge"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="p-5 md:p-6">
                <p className="font-heading text-2xl text-primary leading-tight uppercase">
                  DENNIS GERRITS
                </p>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  Amsterdammer · Personal Travel Companion
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);

const HeroGreenStoryteller = () => (
  <div className="w-full container mx-auto px-6 lg:px-12 py-10 md:py-14">
    <div
      className="relative overflow-hidden rounded-3xl px-5 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16 lg:py-24"
      style={{ backgroundColor: "hsl(var(--heritage-green))" }}
    >

      <div className="relative mx-auto max-w-5xl" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14 items-center">
          <FadeIn>
            <p
              className="font-body text-xs md:text-sm tracking-[0.3em] uppercase mb-6"
              style={{ color: "hsl(var(--heritage-orange))" }}
            >
              Storyteller &amp; Travel Companion
            </p>
            <h1
              className="font-heading leading-[0.9] mb-8 text-[clamp(2.6rem,6.8vw,6rem)]"
              style={{ color: "hsl(var(--background))" }}
            >
              <span
                className="uppercase tracking-tight"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                HELLO, I'M DENNIS.
              </span>
              <br />
              A friend who
              <br />
              knows the city.
            </h1>
            <p
              className="font-body text-base md:text-lg leading-relaxed max-w-md"
              style={{ color: "hsl(var(--background) / 0.85)" }}
            >
              We slow down, follow curiosity, and discover places together, one
              story at a time. The best moments are rarely planned.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div
              className="bg-background border-l-4 shadow-2xl rounded-sm overflow-hidden"
              style={{ borderLeftColor: "hsl(var(--heritage-orange))" }}
            >
              <img
                src={dennisCanalSmile}
                alt="Dennis Gerrits on an Amsterdam canal bridge"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="p-5 md:p-6">
                <p className="font-heading text-2xl text-primary leading-tight">
                  Dennis Gerrits
                </p>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  Amsterdammer · Storyteller &amp; Travel Companion
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);

const HeroEditorialGreenCaps = () => (
  <div className="w-full container mx-auto px-6 lg:px-12 py-10 md:py-14">
    <div
      className="relative overflow-hidden rounded-3xl px-6 py-14 sm:px-10 sm:py-20 md:px-16 md:py-24 lg:px-20 lg:py-28"
      style={{ backgroundColor: "hsl(var(--heritage-green))" }}
    >

      <div className="relative mx-auto max-w-6xl" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <FadeIn>
            <div className="flex flex-col items-center lg:items-start">
              <img
                src={dennisCanalSmile}
                alt="Dennis Gerrits on an Amsterdam canal bridge"
                className="w-full max-w-lg rounded-sm object-cover shadow-2xl aspect-[3/4]"
              />
              <p
                className="font-body text-sm tracking-widest uppercase mt-6"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                STORYTELLER, HOST &amp; TRAVEL COMPANION
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1
              className="font-heading text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 md:mb-8 uppercase tracking-tight"
              style={{ color: "hsl(var(--background))" }}
            >
              HELLO,
              <br />
              <span
                className="relative inline-block"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                I'M DENNIS.
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
              I DON'T LEAD
              <br />
              THE WAY.
              <br />
              I HELP YOU FIND
              <br />
              YOUR OWN.
            </h1>
            <p
              className="font-body text-lg leading-relaxed max-w-lg"
              style={{ color: "hsl(var(--background) / 0.85)" }}
            >
              We slow down, follow curiosity, and discover places together, one
              story at a time. The best moments are rarely planned.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);

const HeroEditorialGreenListen = () => (
  <div className="w-full container mx-auto px-6 lg:px-12 py-10 md:py-14">
    <div
      className="relative overflow-hidden rounded-3xl px-6 py-14 sm:px-10 sm:py-20 md:px-16 md:py-24 lg:px-20 lg:py-28"
      style={{ backgroundColor: "hsl(var(--heritage-green))" }}
    >

      <div className="relative mx-auto max-w-6xl" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <FadeIn>
            <div className="flex flex-col items-center lg:items-start">
              <img
                src={dennisCanalSmile}
                alt="Dennis Gerrits on an Amsterdam canal bridge"
                className="w-full max-w-lg rounded-sm object-cover shadow-2xl aspect-[3/4]"
              />
              <p
                className="font-body text-sm tracking-widest uppercase mt-6"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                Storyteller, Host &amp; Companion
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1
              className="font-heading text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 md:mb-8"
              style={{ color: "hsl(var(--background))" }}
            >
              <span
                className="relative inline-block uppercase tracking-tight"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                HELLO, I'M DENNIS.
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
              I listen first.
              <br />
              Then I open
              <br />
              the city.
            </h1>
            <p
              className="font-body text-lg leading-relaxed max-w-lg"
              style={{ color: "hsl(var(--background) / 0.85)" }}
            >
              We slow down, follow curiosity, and discover places together, one
              story at a time. The best moments are rarely planned.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);

const HeroEditorialGreenV4Caps = () => (
  <div className="w-full container mx-auto px-6 lg:px-12 py-10 md:py-14">
    <div
      className="relative overflow-hidden rounded-3xl px-6 py-14 sm:px-10 sm:py-20 md:px-16 md:py-24 lg:px-20 lg:py-28"
      style={{ backgroundColor: "hsl(var(--heritage-green))" }}
    >

      <div className="relative mx-auto max-w-6xl" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <FadeIn>
            <div className="flex flex-col items-center lg:items-start">
              <img
                src={dennisCanalSmile}
                alt="Dennis Gerrits on an Amsterdam canal bridge"
                className="w-full max-w-lg rounded-sm object-cover shadow-2xl aspect-[3/4]"
              />
              <p
                className="font-body text-sm tracking-widest uppercase mt-6"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                PERSONAL TRAVEL COMPANION
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1
              className="font-heading text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 md:mb-8 uppercase tracking-tight"
              style={{ color: "hsl(var(--background))" }}
            >
              HELLO,
              <br />
              <span
                className="relative inline-block"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                I'M DENNIS.
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
              I DON'T SHOW
              <br />
              A CITY.
              <br />
              I TRANSLATE IT.
            </h1>
            <p
              className="font-body text-lg leading-relaxed max-w-lg mb-8"
              style={{ color: "hsl(var(--background) / 0.85)" }}
            >
              I walk alongside you, not in front of you. We'll find the stories,
              the quiet corners, the places that make you stop and really look.
              That's what I do.
            </p>
            <a
              href="#contact"
              className="inline-flex flex-col items-start gap-2 group"
            >
              <span
                className="font-body text-sm tracking-widest uppercase border-2 px-7 py-4 transition-colors"
                style={{
                  borderColor: "hsl(var(--background))",
                  color: "hsl(var(--background))",
                }}
              >
                SAY HELLO →
              </span>
              <span
                className="font-body italic text-sm"
                style={{ color: "hsl(var(--background) / 0.7)" }}
              >
                Let's get to know each other first
              </span>
            </a>
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);

const HeroEditorialGreenV4Mixed = () => (
  <div className="w-full container mx-auto px-6 lg:px-12 py-10 md:py-14">
    <div
      className="relative overflow-hidden rounded-3xl px-6 py-14 sm:px-10 sm:py-20 md:px-16 md:py-24 lg:px-20 lg:py-28"
      style={{ backgroundColor: "hsl(var(--heritage-green))" }}
    >

      <div className="relative mx-auto max-w-6xl" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <FadeIn>
            <div className="flex flex-col items-center lg:items-start">
              <img
                src={dennisCanalSmile}
                alt="Dennis Gerrits on an Amsterdam canal bridge"
                className="w-full max-w-lg rounded-sm object-cover shadow-2xl aspect-[3/4]"
              />
              <p
                className="font-body text-sm tracking-widest uppercase mt-6"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                Storyteller &amp; Travel Companion
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1
              className="font-heading text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 md:mb-8"
              style={{ color: "hsl(var(--background))" }}
            >
              <span
                className="relative inline-block uppercase tracking-tight"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                HELLO, I'M DENNIS.
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
              A friend who
              <br />
              knows the city.
            </h1>
            <p
              className="font-body text-lg leading-relaxed max-w-lg"
              style={{ color: "hsl(var(--background) / 0.85)" }}
            >
              We slow down, follow curiosity, and discover places together, one
              story at a time. The best moments are rarely planned.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);

/* ────────────────────────────────────────────────────────────
   Variants of HeroGreen (Green Card)
   ──────────────────────────────────────────────────────────── */

const HeroGreenAllCaps = () => (
  <div className="w-full container mx-auto px-6 lg:px-12 py-10 md:py-14">
    <div
      className="relative overflow-hidden rounded-3xl px-5 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16 lg:py-24"
      style={{ backgroundColor: "hsl(var(--heritage-green))" }}
    >

      <p
        className="absolute top-5 right-5 md:top-8 md:right-10 text-2xl md:text-3xl rotate-[-4deg] hidden md:block z-10"
        style={{
          fontFamily: "'Caveat', cursive",
          color: "hsl(var(--heritage-orange))",
        }}
        aria-hidden
      >
        say hello →
      </p>

      <div className="relative mx-auto max-w-5xl" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14 items-center">
          <FadeIn>
            <p
              className="font-body text-xs md:text-sm tracking-[0.3em] uppercase mb-6"
              style={{ color: "hsl(var(--heritage-orange))" }}
            >
              — HELLO, I AM DENNIS —
            </p>
            <h1
              className="font-heading leading-[0.9] mb-8 text-[clamp(2.6rem,7vw,6rem)] uppercase tracking-tight"
              style={{ color: "hsl(var(--background))" }}
            >
              A FRIEND
              <br />
              WHO HAPPENS
              <br />
              <span style={{ color: "hsl(var(--heritage-orange))" }}>
                TO KNOW
              </span>
              <br />
              THE CITY.
            </h1>
            <p
              className="font-body text-base md:text-lg leading-relaxed max-w-md mb-10"
              style={{ color: "hsl(var(--background) / 0.85)" }}
            >
              I walk alongside you, not in front of you. We find the stories,
              the quiet corners, the places that make you stop and really look.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div
              className="bg-background border-l-4 shadow-2xl rounded-sm overflow-hidden"
              style={{ borderLeftColor: "hsl(var(--heritage-orange))" }}
            >
              <img
                src={dennisCanalSmile}
                alt="Dennis Gerrits on an Amsterdam canal bridge"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="p-5 md:p-6">
                <p className="font-heading text-2xl text-primary leading-tight uppercase">
                  DENNIS GERRITS
                </p>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  Amsterdammer · Personal Travel Companion
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);

const HeroGreenHelloCaps = () => (
  <div className="w-full container mx-auto px-6 lg:px-12 py-10 md:py-14">
    <div
      className="relative overflow-hidden rounded-3xl px-6 py-14 sm:px-10 sm:py-20 md:px-16 md:py-24 lg:px-20 lg:py-28"
      style={{ backgroundColor: "hsl(var(--heritage-green))" }}
    >
      <div className="relative mx-auto max-w-6xl" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left: portrait, editorial framing */}
          <FadeIn>
            <div className="flex flex-col items-center lg:items-start">
              <img
                src={dennisCanalSmile}
                alt="Dennis Gerrits on an Amsterdam canal bridge"
                className="w-full max-w-lg rounded-sm object-cover shadow-2xl aspect-[3/4]"
              />
              <p
                className="font-body text-sm tracking-widest uppercase mt-6"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                Storyteller & Travel Companion
              </p>
            </div>
          </FadeIn>

          {/* Right: editorial headline + copy */}
          <FadeIn delay={0.2}>
            <h1
              className="font-heading text-[2.75rem] sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-6 md:mb-8"
              style={{ color: "hsl(var(--background))" }}
            >
              <span
                className="relative inline-block uppercase tracking-tight"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                HELLO, I'M DENNIS.
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
              A friend who
              <br />
              knows the city.
            </h1>
            <p
              className="font-body text-lg leading-relaxed max-w-lg"
              style={{ color: "hsl(var(--background) / 0.85)" }}
            >
              We slow down, follow curiosity, and discover places together,
              one story at a time. The best moments are rarely planned.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);


/* ────────────────────────────────────────────────────────────
   Variants of HeroEditorialGreen
   ──────────────────────────────────────────────────────────── */

const HeroEditorialGreenAllCaps = () => (
  <div className="w-full container mx-auto px-6 lg:px-12 py-10 md:py-14">
    <div
      className="relative overflow-hidden rounded-3xl px-6 py-14 sm:px-10 sm:py-20 md:px-16 md:py-24 lg:px-20 lg:py-28"
      style={{ backgroundColor: "hsl(var(--heritage-green))" }}
    >

      <div className="relative mx-auto max-w-6xl" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <FadeIn>
            <div className="flex flex-col items-center lg:items-start">
              <img
                src={dennisCanalSmile}
                alt="Dennis Gerrits on an Amsterdam canal bridge"
                className="w-full max-w-lg rounded-sm object-cover shadow-2xl aspect-[3/4]"
              />
              <p
                className="font-body text-sm tracking-widest uppercase mt-6"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                STORYTELLER, HOST & TRAVEL COMPANION
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1
              className="font-heading text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 md:mb-8 uppercase tracking-tight"
              style={{ color: "hsl(var(--background))" }}
            >
              HELLO,
              <br />
              <span
                className="relative inline-block"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                I'M DENNIS.
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
              I DON'T LEAD
              <br />
              THE WAY.
              <br />
              I HELP YOU FIND YOUR OWN.
            </h1>
            <p
              className="font-body text-lg leading-relaxed max-w-lg"
              style={{ color: "hsl(var(--background) / 0.85)" }}
            >
              We slow down, follow curiosity, and discover places together,
              one story at a time. The best moments are rarely planned.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);

const HeroEditorialGreenHelloCaps = () => (
  <div className="w-full container mx-auto px-6 lg:px-12 py-10 md:py-14">
    <div
      className="relative overflow-hidden rounded-3xl px-6 py-14 sm:px-10 sm:py-20 md:px-16 md:py-24 lg:px-20 lg:py-28"
      style={{ backgroundColor: "hsl(var(--heritage-green))" }}
    >

      <div className="relative mx-auto max-w-6xl" style={{ zIndex: 10 }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <FadeIn>
            <div className="flex flex-col items-center lg:items-start">
              <img
                src={dennisCanalSmile}
                alt="Dennis Gerrits on an Amsterdam canal bridge"
                className="w-full max-w-lg rounded-sm object-cover shadow-2xl aspect-[3/4]"
              />
              <p
                className="font-body text-sm tracking-widest uppercase mt-6"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                Storyteller, Host & Companion
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1
              className="font-heading text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] mb-6 md:mb-8"
              style={{ color: "hsl(var(--background))" }}
            >
              <span
                className="relative inline-block uppercase tracking-tight"
                style={{ color: "hsl(var(--heritage-orange))" }}
              >
                HELLO, I'M DENNIS.
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
              I listen first.
              <br />
              Then I open the city.
            </h1>
            <p
              className="font-body text-lg leading-relaxed max-w-lg"
              style={{ color: "hsl(var(--background) / 0.85)" }}
            >
              We slow down, follow curiosity, and discover places together,
              one story at a time. The best moments are rarely planned.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  </div>
);

const slides = [
  { key: "green", label: "Green Card", render: () => <HeroGreen /> },
  { key: "green-all-caps", label: "Green Card · All Caps", render: () => <HeroGreenAllCaps /> },
  { key: "green-hello-caps", label: "Green Card · Hello Caps", render: () => <HeroGreenHelloCaps /> },
  { key: "editorial-green", label: "Editorial Green", render: () => <HeroEditorialGreen /> },
  { key: "editorial-green-all-caps", label: "Editorial Green · All Caps", render: () => <HeroEditorialGreenAllCaps /> },
  { key: "editorial-green-hello-caps", label: "Editorial Green · Hello Caps", render: () => <HeroEditorialGreenHelloCaps /> },
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
      {/* Top control bar — variation badge + nav controls */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3 max-w-[calc(100%-1rem)]">
        <button
          onClick={scrollPrev}
          aria-label="Previous variation"
          className="p-1.5 sm:p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="font-body text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase bg-background/80 backdrop-blur-sm text-secondary px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-border whitespace-nowrap">
          <span className="sm:hidden">{selected + 1}/{slides.length} · {slides[selected].label}</span>
          <span className="hidden sm:inline">Variation {selected + 1} of {slides.length} · {slides[selected].label}</span>
        </span>

        <div className="hidden sm:flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border rounded-full px-3 py-2">
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
          className="p-1.5 sm:p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors shrink-0"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-hidden pt-4" ref={emblaRef}>
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
    </section>
  );
};

export default HeroCarousel;
