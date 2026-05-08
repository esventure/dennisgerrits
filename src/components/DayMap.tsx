import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import iconFoot from "@/assets/icon-foot.png";
import iconBoat from "@/assets/icon-boat.png";
import iconFood from "@/assets/icon-food.png";
import iconNature from "@/assets/icon-nature.png";
import iconDining from "@/assets/icon-dining.png";

interface Moment {
  time: string;
  title: string;
  text: string;
}

interface DayMapProps {
  moments: Moment[];
}

/* ── Checkpoint positions on the SVG canvas (600×400) ──
 * Coordinates align with landmarks on the illustrated Amsterdam map:
 * Jordaan/Westerkerk → canal belt → Centrum → Plantage → IJ waterfront. */
const stops = [
  { x: 110, y: 205, label: "Jordaan Café", icon: iconFoot },
  { x: 235, y: 235, label: "Canal Walk", icon: iconBoat },
  { x: 340, y: 215, label: "Local Lunch", icon: iconFood },
  { x: 470, y: 235, label: "Hidden Garden", icon: iconNature },
  { x: 430, y: 75, label: "Waterfront Bar", icon: iconDining },
];

/* Smooth Bézier route segments hugging the canal arc, then cutting
 * up to the IJ waterfront. */
const pathSegments = [
  "M 110 205 C 155 230, 195 245, 235 235",
  "M 235 235 C 270 220, 305 210, 340 215",
  "M 340 215 C 380 230, 425 235, 470 235",
  "M 470 235 C 480 180, 460 115, 430 75",
];

const PATH_LEN = 240;

/* Hand-drawn helpers — slightly irregular shapes via path data */
const sketchCircle = (cx: number, cy: number, r: number, jitter = 0.6) => {
  // Build a wobbly closed path using 8 anchor points around the circle
  const pts = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
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

const DayMap = ({ moments }: DayMapProps) => {
  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleSelect = useCallback((idx: number) => {
    setActive(idx);
    setVisited((prev) => {
      const next = new Set(prev);
      for (let i = 0; i <= idx; i++) next.add(i);
      return next;
    });
  }, []);

  const goPrev = () => handleSelect(Math.max(0, active - 1));
  const goNext = () => handleSelect(Math.min(moments.length - 1, active + 1));

  /* Scroll-driven progression — desktop only.
     On mobile / tablet the section is not sticky, so manual prev / next
     and dot controls drive the experience instead. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const section = el.closest("section");
    if (!section) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    let attached = false;
    let ticking = false;
    let lastIdx = 0;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom < viewH * 0.2 || rect.top > viewH * 0.8) return;

      const start = viewH * 0.3;
      const end = viewH * 0.7;
      const traveled = start - rect.top;
      const total = rect.height - (viewH - end + (viewH - start));
      const raw = total > 0 ? traveled / total : 0;
      const progress = Math.max(0, Math.min(1, raw));

      const exact = progress * (moments.length - 1);
      let next = Math.round(exact);
      if (Math.abs(exact - lastIdx) < 0.35) next = lastIdx;
      next = Math.max(0, Math.min(moments.length - 1, next));

      if (next !== lastIdx) {
        lastIdx = next;
        setActive(next);
        setVisited((prev) => {
          const s = new Set(prev);
          for (let i = 0; i <= next; i++) s.add(i);
          return s;
        });
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(update);
    };

    const attach = () => {
      if (attached) return;
      attached = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      update();
    };
    const detach = () => {
      if (!attached) return;
      attached = false;
      window.removeEventListener("scroll", onScroll);
    };

    const sync = () => (mq.matches ? attach() : detach());
    sync();
    mq.addEventListener("change", sync);

    return () => {
      detach();
      mq.removeEventListener("change", sync);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [moments.length]);

  const maxVisited = useMemo(() => {
    let max = 0;
    visited.forEach((v) => {
      if (v > max) max = v;
    });
    return max;
  }, [visited]);

  return (
    <div
      ref={sectionRef}
      className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center"
    >
      {/* ── Left: Minimal Sketch Map ── */}
      <div
        className="relative w-full"
        style={{ aspectRatio: "6 / 4", overflow: "visible" }}
      >
        <svg
          viewBox="0 0 600 400"
          className="relative w-full h-full"
          style={{ overflow: "visible" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Minimal sketch of Amsterdam's canal belt with the day's route"
        >
          <defs>
            <filter id="sketch" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" />
            </filter>
          </defs>

          {/* ── Soft canal-belt arcs (background hint, no labels) ── */}
          <g
            stroke="hsl(var(--heritage-taupe))"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            filter="url(#sketch)"
            opacity="0.55"
          >
            <path d="M 60 250 C 130 110, 360 70, 520 150" />
            <path d="M 80 270 C 150 140, 360 105, 510 180" opacity="0.75" />
            <path d="M 100 290 C 170 170, 360 140, 500 210" opacity="0.55" />
            {/* IJ waterfront hint */}
            <path d="M 360 60 C 420 55, 480 60, 560 50" opacity="0.5" />
            {/* Amstel hint */}
            <path d="M 470 380 C 480 320, 490 280, 500 230" opacity="0.45" />
          </g>

          {/* ── Route: pencil under-drawing + ink wobble on top ── */}
          {pathSegments.map((d, i) => {
            const visible = i < maxVisited;
            return (
              <g key={i}>
                {/* pencil shadow */}
                <path
                  d={d}
                  stroke="hsl(var(--heritage-taupe))"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  fill="none"
                  opacity={visible ? 0.25 : 0.08}
                  transform="translate(1.5, 1.5)"
                  style={{ transition: "opacity 0.6s ease" }}
                />
                {/* ink */}
                <path
                  d={d}
                  stroke="hsl(var(--heritage-orange))"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#sketch)"
                  strokeDasharray={`${PATH_LEN} ${PATH_LEN}`}
                  style={{
                    strokeDashoffset: visible ? 0 : PATH_LEN,
                    opacity: visible ? 0.9 : 0.18,
                    transition:
                      "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease",
                  }}
                />
              </g>
            );
          })}

          {/* ── Sketchy checkpoint markers ── */}
          {stops.map((stop, i) => {
            const isActive = i === active;
            const isVisited = visited.has(i);
            const filled = isActive || isVisited;
            return (
              <g
                key={i}
                onClick={() => handleSelect(i)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Stop ${i + 1}: ${stop.label}`}
              >
                {isActive && (
                  <g
                    style={{
                      transformOrigin: `${stop.x}px ${stop.y}px`,
                      animation: "daymap-spin 14s linear infinite",
                    }}
                  >
                    <path
                      d={sketchCircle(stop.x, stop.y, 22, 1.2)}
                      stroke="hsl(var(--heritage-orange))"
                      strokeWidth="0.9"
                      strokeDasharray="3 4"
                      fill="none"
                      opacity="0.55"
                      filter="url(#sketch)"
                    />
                  </g>
                )}
                {/* outer ring (sketch) */}
                <path
                  d={sketchCircle(stop.x, stop.y, 14, 0.7)}
                  fill={filled ? "hsl(var(--heritage-orange))" : "hsl(var(--background))"}
                  stroke="hsl(var(--heritage-orange))"
                  strokeWidth={isActive ? 1.8 : 1.3}
                  filter="url(#sketch)"
                  style={{ transition: "fill 0.3s, stroke-width 0.3s" }}
                />
                <text
                  x={stop.x}
                  y={stop.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="12"
                  fontFamily="'Bebas Neue', sans-serif"
                  letterSpacing="0.05em"
                  fill={filled ? "hsl(var(--background))" : "hsl(var(--heritage-orange))"}
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
                {isActive && (
                  <>
                    {/* Hand-drawn icon floating above the stop */}
                    <image
                      href={stop.icon}
                      x={stop.x - 18}
                      y={stop.y - 56}
                      width="36"
                      height="36"
                      opacity="0.95"
                      style={{ filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.05))" }}
                    />
                    <text
                      x={stop.x}
                      y={stop.y + 36}
                      textAnchor="middle"
                      fill="hsl(var(--primary))"
                      fontSize="11"
                      fontFamily="'Bebas Neue', sans-serif"
                      letterSpacing="0.22em"
                    >
                      {stop.label.toUpperCase()}
                    </text>
                    <path
                      d={`M ${stop.x - 28} ${stop.y + 42} C ${stop.x - 10} ${stop.y + 45}, ${stop.x + 10} ${stop.y + 39}, ${stop.x + 28} ${stop.y + 42}`}
                      stroke="hsl(var(--heritage-orange))"
                      strokeWidth="1.1"
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.7"
                      filter="url(#sketch)"
                    />
                  </>
                )}
              </g>
            );
          })}

          {/* ── X marks the spot at the final destination ── */}
          {maxVisited >= stops.length - 1 && (
            <g
              transform={`translate(${stops[stops.length - 1].x + 30}, ${stops[stops.length - 1].y - 26})`}
              opacity="0.8"
              filter="url(#sketch)"
            >
              <path
                d={sketchCircle(0, 0, 11, 0.9)}
                stroke="hsl(var(--heritage-bordeaux))"
                strokeWidth="0.9"
                fill="none"
                opacity="0.55"
              />
              <line x1="-6" y1="-6" x2="6" y2="6" stroke="hsl(var(--heritage-bordeaux))" strokeWidth="2" strokeLinecap="round" />
              <line x1="-6" y1="6" x2="6" y2="-6" stroke="hsl(var(--heritage-bordeaux))" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          <style>{`
            @keyframes daymap-spin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            @media (prefers-reduced-motion: reduce) {
              [style*="daymap-spin"] { animation: none !important; }
            }
          `}</style>
        </svg>
      </div>

      {/* ── Right: Story Card ── */}
      <div className="flex flex-col justify-center min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative rounded-sm p-8 lg:p-10 pl-10 lg:pl-12"
          >
            {/* Hand-drawn vertical squiggle replacing the solid border */}
            <svg
              aria-hidden
              viewBox="0 0 8 240"
              preserveAspectRatio="none"
              className="absolute left-0 top-2 bottom-2 w-2"
            >
              <path
                d="M 4 4 C 6 50, 2 100, 4 150 C 6 190, 2 220, 4 236"
                stroke="hsl(var(--heritage-orange))"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            <p className="font-body text-xs tracking-[0.25em] uppercase text-accent font-semibold mb-4">
              {moments[active].time}
            </p>
            <h3 className="font-heading text-4xl lg:text-5xl text-primary leading-[1] mb-5">
              {moments[active].title}
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed text-base">
              {moments[active].text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={goPrev}
            disabled={active === 0}
            className="p-2 rounded-full border border-border text-muted-foreground hover:text-accent hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous stop"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2 items-center">
            {moments.map((_, i) => {
              const isActive = i === active;
              const wasVisited = visited.has(i);
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className="w-3 h-3 flex items-center justify-center"
                  aria-label={`Go to stop ${i + 1}`}
                >
                  {isActive ? (
                    <span
                      className="block w-3 h-3 rounded-full border-[1.5px] border-accent"
                    />
                  ) : (
                    <span
                      className={`block w-2 h-2 rounded-full ${
                        wasVisited ? "bg-accent/40" : "bg-border"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={goNext}
            disabled={active === moments.length - 1}
            className="p-2 rounded-full border border-border text-muted-foreground hover:text-accent hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next stop"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DayMap;
