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

/* ── Checkpoint positions on the SVG canvas (600×500) ── */
const stops = [
  { x: 120, y: 90, label: "Jordaan Café", icon: "☕" },
  { x: 280, y: 150, label: "Canal Walk", icon: "👣" },
  { x: 340, y: 270, label: "Local Lunch", icon: "🍴" },
  { x: 480, y: 220, label: "Hidden Garden", icon: "🌿" },
  { x: 460, y: 370, label: "Waterfront Bar", icon: "🍷" },
];

/* ── Hand-drawn wobbly route between consecutive stops ── */
const pathSegments = [
  "M 120 90 q 20 -8 38 6 t 36 14 q 18 8 32 18 t 54 22",
  "M 280 150 q 6 22 18 38 t 12 38 q 4 16 30 44",
  "M 340 270 q 30 -18 60 -14 t 40 -10 q 20 -2 40 -26",
  "M 480 220 q 8 30 4 60 t -8 50 q -4 16 -16 40",
];

/* Approximate path lengths for dash animation */
const pathLengths = [220, 200, 190, 200];

const DayMap = ({ moments }: DayMapProps) => {
  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollCooldown = useRef(false);

  const handleSelect = useCallback((idx: number) => {
    setActive(idx);
    setVisited((prev) => new Set(prev).add(idx));
  }, []);

  const goPrev = () => handleSelect(Math.max(0, active - 1));
  const goNext = () => handleSelect(Math.min(moments.length - 1, active + 1));

  /* ── Scroll-driven checkpoint progression ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const section = el.closest("section");
    if (!section) return;

    const handleScroll = () => {
      if (scrollCooldown.current) return;
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewH) return;
      const scrollableHeight = rect.height - viewH;
      const sectionProgress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
      const targetStop = Math.min(
        moments.length - 1,
        Math.floor(sectionProgress * moments.length)
      );
      setActive((prev) => {
        if (targetStop !== prev) {
          scrollCooldown.current = true;
          setTimeout(() => { scrollCooldown.current = false; }, 400);
          if (targetStop > prev) {
            setVisited((v) => new Set(v).add(targetStop));
          }
          return targetStop;
        }
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [moments.length]);

  const maxVisited = useMemo(() => {
    let max = 0;
    visited.forEach((v) => { if (v > max) max = v; });
    return max;
  }, [visited]);

  return (
    <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* ── Left: SVG Map ── */}
      <div className="relative w-full" style={{ aspectRatio: "6 / 5", overflow: "visible" }}>
        <svg
          viewBox="0 0 600 500"
          className="w-full h-full"
          style={{ overflow: "visible" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Parchment paper background */}
            <radialGradient id="parchment" cx="50%" cy="50%" r="75%">
              <stop offset="0%" stopColor="hsl(var(--heritage-taupe))" stopOpacity="0.10" />
              <stop offset="70%" stopColor="hsl(var(--heritage-taupe))" stopOpacity="0.18" />
              <stop offset="100%" stopColor="hsl(var(--heritage-taupe))" stopOpacity="0.32" />
            </radialGradient>
            {/* Hand-drawn jitter filters for ink-on-paper feel */}
            <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="3" />
              <feDisplacementMap in="SourceGraphic" scale="2.2" />
            </filter>
            <filter id="rough-strong" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" />
              <feDisplacementMap in="SourceGraphic" scale="3" />
            </filter>
            <filter id="marker-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="hsl(24, 100%, 45%)" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* ── Parchment background with deckled edge ── */}
          <rect
            x="6" y="6" width="588" height="488" rx="6"
            fill="url(#parchment)"
            stroke="hsl(var(--heritage-taupe))"
            strokeWidth="1.5"
            strokeDasharray="2 3"
            strokeOpacity="0.45"
            filter="url(#rough)"
          />

          {/* ── Faint cartographer's grid ── */}
          <g stroke="hsl(var(--heritage-taupe))" strokeWidth="0.6" opacity="0.18">
            {[100, 200, 300, 400, 500].map((x) => (
              <line key={`v${x}`} x1={x} y1="20" x2={x} y2="480" strokeDasharray="2 6" />
            ))}
            {[100, 200, 300, 400].map((y) => (
              <line key={`h${y}`} x1="20" y1={y} x2="580" y2={y} strokeDasharray="2 6" />
            ))}
          </g>

          {/* ── Canals (wavy, hand-drawn) ── */}
          <g filter="url(#rough)">
            <path d="M 0 180 Q 150 140, 300 200 T 600 170"
              stroke="hsl(var(--heritage-taupe))" strokeWidth="16" opacity="0.28" strokeLinecap="round" />
            <path d="M 0 320 Q 200 280, 400 340 T 600 310"
              stroke="hsl(var(--heritage-taupe))" strokeWidth="13" opacity="0.22" strokeLinecap="round" />
            <path d="M 50 450 Q 250 420, 450 460 T 600 440"
              stroke="hsl(var(--heritage-taupe))" strokeWidth="9" opacity="0.18" strokeLinecap="round" />
          </g>
          {/* Water ripples */}
          <g stroke="hsl(var(--heritage-taupe))" strokeWidth="1.2" fill="none" opacity="0.35">
            <path d="M 80 175 q 5 -5 10 0 t 10 0" />
            <path d="M 200 185 q 5 -5 10 0 t 10 0" />
            <path d="M 350 195 q 5 -5 10 0 t 10 0" />
            <path d="M 500 172 q 5 -5 10 0 t 10 0" />
            <path d="M 150 300 q 5 -5 10 0 t 10 0" />
            <path d="M 380 330 q 5 -5 10 0 t 10 0" />
          </g>

          {/* ── Compass rose (top-right) ── */}
          <g transform="translate(540, 70)" opacity="0.55" filter="url(#rough)">
            <circle cx="0" cy="0" r="22" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" />
            <circle cx="0" cy="0" r="14" stroke="hsl(var(--primary))" strokeWidth="0.8" fill="none" strokeDasharray="2 3" />
            <polygon points="0,-20 4,0 0,20 -4,0" fill="hsl(var(--accent))" opacity="0.85" />
            <polygon points="-20,0 0,4 20,0 0,-4" fill="hsl(var(--primary))" opacity="0.45" />
            <text x="0" y="-26" textAnchor="middle" fontSize="9" fontFamily="Caveat, cursive" fill="hsl(var(--primary))" fontWeight="700">N</text>
            <text x="0" y="34" textAnchor="middle" fontSize="9" fontFamily="Caveat, cursive" fill="hsl(var(--primary))">S</text>
            <text x="-28" y="3" textAnchor="middle" fontSize="9" fontFamily="Caveat, cursive" fill="hsl(var(--primary))">W</text>
            <text x="28" y="3" textAnchor="middle" fontSize="9" fontFamily="Caveat, cursive" fill="hsl(var(--primary))">E</text>
          </g>

          {/* ── Sketchy landmark silhouettes (outlined) ── */}
          <g filter="url(#rough)">
            {/* Church spire */}
            <g opacity="0.28">
              <rect x="190" y="50" width="12" height="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" />
              <polygon points="196,30 184,70 208,70" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" />
              <line x1="196" y1="30" x2="196" y2="22" stroke="hsl(var(--primary))" strokeWidth="1" />
              <circle cx="196" cy="20" r="1.5" fill="hsl(var(--primary))" />
            </g>
            {/* Canal houses row */}
            <g opacity="0.3">
              <rect x="400" y="140" width="16" height="28" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" />
              <rect x="418" y="146" width="14" height="22" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" />
              <rect x="434" y="138" width="18" height="30" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" />
              <polygon points="400,140 408,128 416,140" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" />
              <polygon points="418,146 425,136 432,146" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" />
              <polygon points="434,138 443,124 452,138" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" />
            </g>
            {/* Trees */}
            <g opacity="0.32" stroke="hsl(var(--heritage-green))" strokeWidth="1" fill="none">
              <circle cx="100" cy="380" r="16" />
              <circle cx="138" cy="390" r="12" />
              <circle cx="72" cy="402" r="10" />
              <line x1="100" y1="396" x2="100" y2="406" stroke="hsl(var(--primary))" />
              <line x1="138" y1="402" x2="138" y2="410" stroke="hsl(var(--primary))" />
            </g>
            {/* Tulip cluster */}
            <g opacity="0.4" transform="translate(80, 250)">
              <path d="M 0 0 q -3 -8 0 -12 q 3 4 0 12" fill="hsl(var(--accent))" stroke="hsl(var(--primary))" strokeWidth="0.6" />
              <line x1="0" y1="0" x2="0" y2="14" stroke="hsl(var(--heritage-green))" strokeWidth="1" />
              <path d="M 10 2 q -3 -8 0 -12 q 3 4 0 12" fill="hsl(var(--accent))" stroke="hsl(var(--primary))" strokeWidth="0.6" />
              <line x1="10" y1="2" x2="10" y2="16" stroke="hsl(var(--heritage-green))" strokeWidth="1" />
              <path d="M -10 4 q -3 -8 0 -12 q 3 4 0 12" fill="hsl(var(--accent))" stroke="hsl(var(--primary))" strokeWidth="0.6" />
              <line x1="-10" y1="4" x2="-10" y2="18" stroke="hsl(var(--heritage-green))" strokeWidth="1" />
            </g>
            {/* Bicycle */}
            <g opacity="0.32" transform="translate(220, 110)">
              <circle cx="0" cy="0" r="6" stroke="hsl(var(--primary))" strokeWidth="1.2" fill="none" />
              <circle cx="16" cy="0" r="6" stroke="hsl(var(--primary))" strokeWidth="1.2" fill="none" />
              <path d="M 0 0 L 8 -8 L 16 0" stroke="hsl(var(--primary))" strokeWidth="1.2" fill="none" />
              <line x1="8" y1="-8" x2="8" y2="-12" stroke="hsl(var(--primary))" strokeWidth="1.2" />
              <line x1="6" y1="-12" x2="10" y2="-12" stroke="hsl(var(--primary))" strokeWidth="1.2" />
            </g>
            {/* Boat */}
            <g opacity="0.3" transform="translate(260, 310)">
              <path d="M -14 0 Q -8 7, 0 7 Q 8 7, 14 0 Z" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" />
              <line x1="0" y1="0" x2="0" y2="-12" stroke="hsl(var(--primary))" strokeWidth="1.2" />
              <path d="M 0 -12 L 8 -4 L 0 -4 Z" fill="hsl(var(--primary))" opacity="0.4" />
            </g>
            {/* Anchor */}
            <g opacity="0.3" transform="translate(420, 420)" stroke="hsl(var(--primary))" strokeWidth="1.2" fill="none">
              <circle cx="0" cy="-10" r="2.5" />
              <line x1="0" y1="-7.5" x2="0" y2="8" />
              <path d="M -8 4 q 8 10 16 0" />
              <line x1="-5" y1="-4" x2="5" y2="-4" />
            </g>
            {/* Birds */}
            <g opacity="0.28" stroke="hsl(var(--primary))" strokeWidth="1.2" fill="none">
              <path d="M 380 60 q 5 -5 10 0 q 5 -5 10 0" />
              <path d="M 405 45 q 4 -4 8 0 q 4 -4 8 0" />
              <path d="M 360 70 q 3 -3 6 0 q 3 -3 6 0" />
            </g>
            {/* Windmill (outlined) */}
            <g opacity="0.3" transform="translate(560, 440)" stroke="hsl(var(--primary))" strokeWidth="1.2" fill="none">
              <path d="M -6 0 L 0 -22 L 6 0 Z" />
              <line x1="0" y1="-22" x2="-14" y2="-30" />
              <line x1="0" y1="-22" x2="14" y2="-14" />
              <line x1="0" y1="-22" x2="-8" y2="-8" />
              <line x1="0" y1="-22" x2="8" y2="-36" />
              <circle cx="0" cy="-22" r="1.5" fill="hsl(var(--primary))" />
            </g>
            {/* Lantern */}
            <g opacity="0.3" transform="translate(180, 400)" stroke="hsl(var(--primary))" strokeWidth="1.1" fill="none">
              <line x1="0" y1="0" x2="0" y2="14" />
              <rect x="-5" y="14" width="10" height="10" />
              <path d="M -3 24 q 3 4 6 0" />
            </g>
          </g>

          {/* ── Handwritten place labels ── */}
          <text
            x="80" y="50"
            fontFamily="'Outfit', serif"
            fontStyle="italic"
            fontSize="22"
            fontWeight="600"
            fill="hsl(var(--primary))"
            opacity="0.75"
            transform="rotate(-4, 80, 50)"
          >
            Amsterdam
          </text>
          <text
            x="430" y="475"
            fontFamily="'Outfit', serif"
            fontStyle="italic"
            fontSize="14"
            fontWeight="500"
            fill="hsl(var(--primary))"
            opacity="0.7"
            transform="rotate(2, 430, 475)"
          >
            ~ to the harbour ~
          </text>

          {/* ── Route paths (sketchy, with ink-bleed under-stroke) ── */}
          {pathSegments.map((d, i) => {
            const visible = i < maxVisited;
            return (
              <g key={i}>
                <path
                  d={d}
                  stroke="hsl(var(--accent))"
                  strokeWidth="9"
                  strokeLinecap="round"
                  opacity={visible ? 0.15 : 0}
                  filter="url(#rough)"
                  style={{ transition: "opacity 0.6s ease" }}
                />
                <path
                  d={d}
                  stroke="hsl(var(--accent))"
                  strokeWidth="3"
                  strokeDasharray="10 5 3 5"
                  strokeLinecap="round"
                  filter="url(#rough)"
                  style={{
                    strokeDashoffset: visible ? 0 : pathLengths[i],
                    transition: "stroke-dashoffset 0.9s ease-in-out, opacity 0.5s ease",
                  }}
                  opacity={visible ? 0.95 : 0.18}
                />
              </g>
            );
          })}

          {/* ── Checkpoint markers ── */}
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
                filter="url(#marker-shadow)"
              >
                {isActive && (
                  <circle cx={stop.x} cy={stop.y} r="26" fill="none"
                    stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.4">
                    <animate attributeName="r" from="20" to="32" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Stamped outer ring */}
                <circle
                  cx={stop.x} cy={stop.y} r="22"
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  opacity={isVisited ? 0.5 : 0.25}
                />
                <circle
                  cx={stop.x} cy={stop.y} r="20"
                  fill={isActive || isVisited ? "hsl(var(--accent))" : "hsl(var(--background))"}
                  stroke="hsl(var(--accent))"
                  strokeWidth={isActive ? 3 : 2}
                  filter="url(#rough)"
                  style={{ transition: "fill 0.3s, stroke-width 0.3s" }}
                />
                <text x={stop.x} y={stop.y + 1} textAnchor="middle" dominantBaseline="central" fontSize="16">
                  {stop.icon}
                </text>
                {isActive && (
                  <text
                    x={stop.x}
                    y={stop.y + 48}
                    textAnchor="middle"
                    fill="hsl(var(--primary))"
                    fontSize="16"
                    fontFamily="'Outfit', serif"
                    fontStyle="italic"
                    fontWeight="600"
                    opacity="0.95"
                  >
                    {stop.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* ── X marks the spot ── */}
          {maxVisited >= stops.length - 1 && (
            <g
              transform={`translate(${stops[stops.length - 1].x + 32}, ${stops[stops.length - 1].y - 28})`}
              opacity="0.75"
              filter="url(#rough-strong)"
            >
              <line x1="-7" y1="-7" x2="7" y2="7" stroke="hsl(var(--heritage-bordeaux))" strokeWidth="2.8" strokeLinecap="round" />
              <line x1="-7" y1="7" x2="7" y2="-7" stroke="hsl(var(--heritage-bordeaux))" strokeWidth="2.8" strokeLinecap="round" />
            </g>
          )}
        </svg>
      </div>

      {/* ── Right: Story Card ── */}
      <div className="flex flex-col justify-center min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-lg p-8 lg:p-10 border-l-4 border-l-accent border border-border"
            style={{ backgroundColor: "hsl(var(--accent) / 0.05)" }}
          >
            <p className="font-body text-xs tracking-widest uppercase text-accent font-semibold mb-3">
              {moments[active].time}
            </p>
            <h3 className="font-heading text-3xl lg:text-4xl text-primary mb-4">
              {moments[active].title}
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed text-[15px]">
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
