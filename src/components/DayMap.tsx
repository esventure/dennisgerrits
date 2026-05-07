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

/* ── Checkpoint positions on the SVG canvas (600×500) ── */
const stops = [
  { x: 110, y: 110, label: "Jordaan Café", icon: iconFoot },
  { x: 250, y: 175, label: "Canal Walk", icon: iconBoat },
  { x: 360, y: 270, label: "Local Lunch", icon: iconFood },
  { x: 470, y: 215, label: "Hidden Garden", icon: iconNature },
  { x: 480, y: 380, label: "Waterfront Bar", icon: iconDining },
];

/* Smooth Bézier route segments between consecutive stops */
const pathSegments = [
  "M 110 110 C 160 95, 210 150, 250 175",
  "M 250 175 C 290 220, 320 240, 360 270",
  "M 360 270 C 400 245, 440 220, 470 215",
  "M 470 215 C 495 270, 480 330, 480 380",
];

const PATH_LEN = 280;

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
      {/* ── Left: Sketchbook Map ── */}
      <div
        className="relative w-full"
        style={{ aspectRatio: "6 / 5", overflow: "visible" }}
      >
        <svg
          viewBox="0 0 600 500"
          className="w-full h-full"
          style={{ overflow: "visible" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Sketch wobble filter — applied to "ink" elements */}
            <filter id="sketch" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04"
                numOctaves="2"
                seed="4"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2.6"
              />
            </filter>

            {/* Subtle paper grain */}
            <filter id="paperGrain" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="2"
                seed="3"
              />
              <feColorMatrix
                values="0 0 0 0 0.42
                        0 0 0 0 0.36
                        0 0 0 0 0.28
                        0 0 0 0.06 0"
              />
            </filter>

            <linearGradient id="paper" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--heritage-taupe))" stopOpacity="0.05" />
              <stop offset="100%" stopColor="hsl(var(--heritage-taupe))" stopOpacity="0.13" />
            </linearGradient>
          </defs>

          {/* ── Paper field ── */}
          <rect x="0" y="0" width="600" height="500" rx="2" fill="url(#paper)" />
          <rect
            x="0"
            y="0"
            width="600"
            height="500"
            filter="url(#paperGrain)"
            opacity="0.4"
          />

          {/* Hand-drawn border — wobbly inset rectangle */}
          <path
            d="M 14 18 L 588 12 L 590 484 L 12 488 Z"
            stroke="hsl(var(--heritage-taupe))"
            strokeWidth="0.9"
            fill="none"
            opacity="0.55"
            filter="url(#sketch)"
          />
          {/* Folded corner crease (top-right) */}
          <path
            d="M 575 12 L 588 28 L 572 26 Z"
            stroke="hsl(var(--heritage-taupe))"
            strokeWidth="0.8"
            fill="hsl(var(--heritage-taupe) / 0.08)"
            filter="url(#sketch)"
            opacity="0.6"
          />

          {/* ── Canals (loose, hand-drawn squiggles) ── */}
          <g
            stroke="hsl(var(--heritage-taupe))"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
            filter="url(#sketch)"
          >
            <path d="M 0 205 C 140 175, 310 225, 600 192" strokeWidth="1.4" />
            <path d="M 60 425 C 260 405, 440 438, 600 418" strokeWidth="1.4" />
          </g>

          {/* ── Canal-house silhouettes (top + bottom clusters) ── */}
          <g
            stroke="hsl(var(--primary))"
            strokeWidth="1.1"
            fill="none"
            opacity="0.28"
            filter="url(#sketch)"
          >
            {[
              { x: 380, w: 14, h: 30 },
              { x: 396, w: 12, h: 26 },
              { x: 410, w: 16, h: 32 },
              { x: 428, w: 12, h: 24 },
              { x: 442, w: 14, h: 28 },
            ].map((h, i) => (
              <g key={`top-${i}`}>
                <rect x={h.x} y={155 - h.h} width={h.w} height={h.h} />
                <polygon
                  points={`${h.x},${155 - h.h} ${h.x + h.w / 2},${155 - h.h - 8} ${h.x + h.w},${155 - h.h}`}
                />
              </g>
            ))}
            {[
              { x: 60, w: 12, h: 22 },
              { x: 74, w: 14, h: 26 },
              { x: 90, w: 10, h: 18 },
            ].map((h, i) => (
              <g key={`bot-${i}`}>
                <rect x={h.x} y={385 - h.h} width={h.w} height={h.h} />
                <polygon
                  points={`${h.x},${385 - h.h} ${h.x + h.w / 2},${385 - h.h - 7} ${h.x + h.w},${385 - h.h}`}
                />
              </g>
            ))}
          </g>

          {/* ── Sketchy compass ── */}
          <g transform="translate(545, 70)" opacity="0.65" filter="url(#sketch)">
            <path
              d={sketchCircle(0, 0, 18, 0.8)}
              stroke="hsl(var(--primary))"
              strokeWidth="0.9"
              fill="none"
            />
            <path
              d={sketchCircle(0, 0, 11, 0.5)}
              stroke="hsl(var(--primary))"
              strokeWidth="0.6"
              fill="none"
              opacity="0.5"
            />
            <line x1="0" y1="-17" x2="0" y2="-26" stroke="hsl(var(--heritage-orange))" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="0" y1="17" x2="0" y2="22" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
            <line x1="-17" y1="0" x2="-22" y2="0" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
            <line x1="17" y1="0" x2="22" y2="0" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
            <polygon points="0,-18 3,-12 0,-14 -3,-12" fill="hsl(var(--heritage-orange))" />
            <text
              x="0"
              y="-30"
              textAnchor="middle"
              fontSize="10"
              fontFamily="'Bebas Neue', sans-serif"
              letterSpacing="0.18em"
              fill="hsl(var(--primary))"
            >
              N
            </text>
          </g>

          {/* ── Place labels with hand-drawn underlines ── */}
          <g>
            <text
              x="60"
              y="60"
              fontFamily="'Bebas Neue', sans-serif"
              fontSize="22"
              letterSpacing="0.22em"
              fill="hsl(var(--primary))"
              opacity="0.6"
            >
              AMSTERDAM
            </text>
            <path
              d="M 60 68 C 110 65, 160 71, 215 66"
              stroke="hsl(var(--heritage-orange))"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              opacity="0.55"
              filter="url(#sketch)"
            />
          </g>

          <g>
            <text
              x="430"
              y="475"
              fontFamily="'Bebas Neue', sans-serif"
              fontSize="11"
              letterSpacing="0.3em"
              fill="hsl(var(--primary))"
              opacity="0.55"
            >
              TO THE HARBOUR
            </text>
            <path
              d="M 430 480 C 480 478, 530 481, 568 478"
              stroke="hsl(var(--heritage-taupe))"
              strokeWidth="0.9"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
              filter="url(#sketch)"
            />
          </g>

          {/* Handwritten note near stop 01 */}
          <text
            x="135"
            y="92"
            fontFamily="'Outfit', sans-serif"
            fontStyle="italic"
            fontSize="10"
            fill="hsl(var(--heritage-orange))"
            opacity="0.85"
          >
            start here ↘
          </text>

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
