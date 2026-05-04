import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Moment {
  time: string;
  title: string;
  text: string;
}

interface DayMapProps {
  moments: Moment[];
}

/* ── Checkpoint positions on the SVG canvas (600×500) ──
   Re-spaced for a calmer, more editorial composition. */
const stops = [
  { x: 110, y: 110, label: "Jordaan Café" },
  { x: 250, y: 175, label: "Canal Walk" },
  { x: 360, y: 270, label: "Local Lunch" },
  { x: 470, y: 215, label: "Hidden Garden" },
  { x: 480, y: 380, label: "Waterfront Bar" },
];

/* Smooth Bézier route segments between consecutive stops */
const pathSegments = [
  "M 110 110 C 160 95, 210 150, 250 175",
  "M 250 175 C 290 220, 320 240, 360 270",
  "M 360 270 C 400 245, 440 220, 470 215",
  "M 470 215 C 495 270, 480 330, 480 380",
];

const PATH_LEN = 280;

const DayMap = ({ moments }: DayMapProps) => {
  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleSelect = useCallback((idx: number) => {
    setActive(idx);
    setVisited((prev) => {
      const next = new Set(prev);
      // Mark this stop and all earlier ones as visited so the trail fills in.
      for (let i = 0; i <= idx; i++) next.add(i);
      return next;
    });
  }, []);

  const goPrev = () => handleSelect(Math.max(0, active - 1));
  const goNext = () => handleSelect(Math.min(moments.length - 1, active + 1));

  /* ── Smoother scroll-driven progression with rAF + hysteresis ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const section = el.closest("section");
    if (!section) return;

    let ticking = false;
    let lastIdx = 0;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom < viewH * 0.2 || rect.top > viewH * 0.8) return;

      // Use the section's vertical journey through the viewport as progress.
      // Start counting once the top hits 30% of the viewport,
      // finish when the bottom passes 70%.
      const start = viewH * 0.3;
      const end = viewH * 0.7;
      const traveled = start - rect.top;
      const total = rect.height - (viewH - end + (viewH - start));
      const raw = total > 0 ? traveled / total : 0;
      const progress = Math.max(0, Math.min(1, raw));

      // Map progress to discrete stop with a small dead-zone (hysteresis)
      // so tiny scrolls don't oscillate.
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

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
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
      {/* ── Left: Editorial Map ── */}
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
            {/* Subtle paper tone */}
            <linearGradient id="paper" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--heritage-taupe))" stopOpacity="0.06" />
              <stop offset="100%" stopColor="hsl(var(--heritage-taupe))" stopOpacity="0.14" />
            </linearGradient>
          </defs>

          {/* ── Paper field ── */}
          <rect x="0" y="0" width="600" height="500" rx="2" fill="url(#paper)" />

          {/* ── Canals (calm, fewer, thinner) ── */}
          <g
            stroke="hsl(var(--heritage-taupe))"
            fill="none"
            strokeLinecap="round"
            opacity="0.55"
          >
            <path d="M 0 200 C 150 170, 300 220, 600 190" strokeWidth="1.25" />
            <path d="M 0 320 C 200 290, 400 340, 600 310" strokeWidth="1.25" />
            <path d="M 60 430 C 260 410, 440 440, 600 420" strokeWidth="1.25" />
          </g>

          {/* ── Minimal canal-house silhouettes (top band) ── */}
          <g
            stroke="hsl(var(--primary))"
            strokeWidth="0.9"
            fill="none"
            opacity="0.22"
          >
            {[
              { x: 380, w: 14, h: 30 },
              { x: 396, w: 12, h: 26 },
              { x: 410, w: 16, h: 32 },
              { x: 428, w: 12, h: 24 },
              { x: 442, w: 14, h: 28 },
            ].map((h, i) => (
              <g key={i}>
                <rect x={h.x} y={155 - h.h} width={h.w} height={h.h} />
                <polygon
                  points={`${h.x},${155 - h.h} ${h.x + h.w / 2},${155 - h.h - 8} ${h.x + h.w},${155 - h.h}`}
                />
              </g>
            ))}
          </g>

          {/* ── Compass (refined, single ring + N) ── */}
          <g transform="translate(545, 70)" opacity="0.55">
            <circle
              cx="0"
              cy="0"
              r="18"
              stroke="hsl(var(--primary))"
              strokeWidth="0.8"
              fill="none"
            />
            <line
              x1="0"
              y1="-18"
              x2="0"
              y2="-26"
              stroke="hsl(var(--heritage-orange))"
              strokeWidth="1.2"
            />
            <polygon
              points="0,-18 3,-12 0,-14 -3,-12"
              fill="hsl(var(--heritage-orange))"
            />
            <text
              x="0"
              y="-30"
              textAnchor="middle"
              fontSize="9"
              fontFamily="'Bebas Neue', sans-serif"
              letterSpacing="0.15em"
              fill="hsl(var(--primary))"
            >
              N
            </text>
          </g>

          {/* ── Editorial place labels (Bebas Neue, tracked) ── */}
          <text
            x="60"
            y="60"
            fontFamily="'Bebas Neue', sans-serif"
            fontSize="22"
            letterSpacing="0.22em"
            fill="hsl(var(--primary))"
            opacity="0.55"
          >
            AMSTERDAM
          </text>
          <text
            x="430"
            y="475"
            fontFamily="'Bebas Neue', sans-serif"
            fontSize="11"
            letterSpacing="0.3em"
            fill="hsl(var(--primary))"
            opacity="0.5"
          >
            TO THE HARBOUR
          </text>

          {/* ── Route segments (smooth, dashed-fill on progress) ── */}
          {pathSegments.map((d, i) => {
            const visible = i < maxVisited;
            return (
              <path
                key={i}
                d={d}
                stroke="hsl(var(--heritage-orange))"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray={`${PATH_LEN} ${PATH_LEN}`}
                style={{
                  strokeDashoffset: visible ? 0 : PATH_LEN,
                  opacity: visible ? 0.85 : 0.18,
                  transition:
                    "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease",
                }}
              />
            );
          })}

          {/* ── Numbered checkpoint markers ── */}
          {stops.map((stop, i) => {
            const isActive = i === active;
            const isVisited = visited.has(i);
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
                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r="22"
                    fill="none"
                    stroke="hsl(var(--heritage-orange))"
                    strokeWidth="1"
                    opacity="0.4"
                  >
                    <animate
                      attributeName="r"
                      from="16"
                      to="28"
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.5"
                      to="0"
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r="14"
                  fill={
                    isActive || isVisited
                      ? "hsl(var(--heritage-orange))"
                      : "hsl(var(--background))"
                  }
                  stroke="hsl(var(--heritage-orange))"
                  strokeWidth={isActive ? 2 : 1.4}
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
                  fill={
                    isActive || isVisited
                      ? "hsl(var(--background))"
                      : "hsl(var(--heritage-orange))"
                  }
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
                {isActive && (
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
                )}
              </g>
            );
          })}

          {/* ── Final destination cross ── */}
          {maxVisited >= stops.length - 1 && (
            <g
              transform={`translate(${stops[stops.length - 1].x + 28}, ${stops[stops.length - 1].y - 24})`}
              opacity="0.7"
            >
              <line
                x1="-6"
                y1="-6"
                x2="6"
                y2="6"
                stroke="hsl(var(--heritage-bordeaux))"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <line
                x1="-6"
                y1="6"
                x2="6"
                y2="-6"
                stroke="hsl(var(--heritage-bordeaux))"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
          )}
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
            className="rounded-sm p-8 lg:p-10 border-l-2 border-l-accent"
          >
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

          <div className="flex gap-2">
            {moments.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? "bg-accent scale-125"
                    : visited.has(i)
                      ? "bg-accent/40"
                      : "bg-border"
                }`}
                aria-label={`Go to stop ${i + 1}`}
              />
            ))}
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
