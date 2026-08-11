import { useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import iconFoot from "@/assets/icon-foot.png";
import iconBoat from "@/assets/icon-boat.png";
import iconFood from "@/assets/icon-food.png";
import iconNature from "@/assets/icon-nature.png";
import iconDining from "@/assets/icon-dining.png";
import amsterdamMap from "@/assets/amsterdam-map.jpg";

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
  { x: 110, y: 205, label: "Neighborhood", icon: iconFoot },
  { x: 235, y: 235, label: "Local Cafe", icon: iconBoat },
  { x: 340, y: 215, label: "Hidden Garden", icon: iconFood },
  { x: 470, y: 235, label: "Streets and Canals", icon: iconNature },
  { x: 430, y: 75, label: "Private Boat", icon: iconDining },
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
        style={{ aspectRatio: "6 / 4", overflow: "visible" }}
      >
        {/* Illustrated Amsterdam map */}
        <img
          src={amsterdamMap}
          alt="Hand-drawn illustrated map of central Amsterdam showing the canal belt, Centraal Station, Westerkerk, Vondelpark, Rijksmuseum and the Amstel river."
          width={1536}
          height={1024}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover rounded-sm shadow-[0_18px_40px_-22px_rgba(0,0,0,0.35)]"
        />

        <svg
          viewBox="0 0 600 400"
          className="relative w-full h-full"
          style={{ overflow: "visible" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Sketch wobble filter */}
            <filter id="sketch" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.6" />
            </filter>
          </defs>




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
                    {/* Cream pill behind label for legibility on the photo map */}

                    {(() => {
                      const labelW = Math.max(72, stop.label.length * 8.2);
                      return (
                        <g filter="url(#sketch)">
                          <rect
                            x={stop.x - labelW / 2}
                            y={stop.y + 26}
                            width={labelW}
                            height="20"
                            rx="3"
                            fill="hsl(40 38% 95%)"
                            stroke="hsl(var(--heritage-orange))"
                            strokeWidth="1"
                            opacity="0.96"
                          />
                        </g>
                      );
                    })()}
                    <text
                      x={stop.x}
                      y={stop.y + 40}
                      textAnchor="middle"
                      fill="hsl(var(--heritage-purple))"
                      fontSize="13"
                      fontFamily="'Bebas Neue', sans-serif"
                      letterSpacing="0.18em"
                      fontWeight="500"
                    >
                      {stop.label.toUpperCase()}
                    </text>
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
            className="relative rounded-sm p-6 sm:p-8 lg:p-10 pl-7 sm:pl-10 lg:pl-12"
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
            <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary leading-[1] mb-5">
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
