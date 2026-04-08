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
  { x: 120, y: 80, label: "Jordaan Café", icon: "☕" },
  { x: 280, y: 140, label: "Canal Walk", icon: "👣" },
  { x: 340, y: 260, label: "Local Lunch", icon: "🍴" },
  { x: 480, y: 220, label: "Hidden Garden", icon: "🌿" },
  { x: 460, y: 360, label: "Waterfront Bar", icon: "🍷" },
];

/* ── SVG path data between consecutive stops (hand-drawn curves) ── */
const pathSegments = [
  "M 120 80 C 160 60, 230 100, 280 140",
  "M 280 140 C 300 180, 310 220, 340 260",
  "M 340 260 C 380 250, 430 230, 480 220",
  "M 480 220 C 500 270, 490 320, 460 360",
];

/* Approximate path lengths for dash animation */
const pathLengths = [200, 180, 160, 180];

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
      const sectionProgress = Math.max(0, Math.min(1,
        -rect.top / scrollableHeight
      ));

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
          {/* ── Drop shadow filter ── */}
          <defs>
            <filter id="marker-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="hsl(24, 100%, 45%)" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* ── Canals with wavy water effect ── */}
          <path
            d="M 0 180 Q 150 140, 300 200 T 600 170"
            stroke="hsl(var(--heritage-taupe))"
            strokeWidth="18"
            opacity="0.25"
            strokeLinecap="round"
          />
          {/* Water ripples */}
          <path d="M 80 175 Q 90 170, 100 175" stroke="hsl(var(--heritage-taupe))" strokeWidth="1.5" opacity="0.3" fill="none" />
          <path d="M 200 185 Q 210 180, 220 185" stroke="hsl(var(--heritage-taupe))" strokeWidth="1.5" opacity="0.25" fill="none" />
          <path d="M 350 195 Q 360 190, 370 195" stroke="hsl(var(--heritage-taupe))" strokeWidth="1.5" opacity="0.3" fill="none" />
          <path d="M 500 172 Q 510 167, 520 172" stroke="hsl(var(--heritage-taupe))" strokeWidth="1.5" opacity="0.25" fill="none" />

          <path
            d="M 0 320 Q 200 280, 400 340 T 600 310"
            stroke="hsl(var(--heritage-taupe))"
            strokeWidth="14"
            opacity="0.2"
            strokeLinecap="round"
          />
          {/* Water ripples on second canal */}
          <path d="M 150 300 Q 160 295, 170 300" stroke="hsl(var(--heritage-taupe))" strokeWidth="1.5" opacity="0.2" fill="none" />
          <path d="M 380 330 Q 390 325, 400 330" stroke="hsl(var(--heritage-taupe))" strokeWidth="1.5" opacity="0.2" fill="none" />

          <path
            d="M 50 450 Q 250 420, 450 460 T 600 440"
            stroke="hsl(var(--heritage-taupe))"
            strokeWidth="10"
            opacity="0.15"
            strokeLinecap="round"
          />

          {/* ── Landmark silhouettes (more visible) ── */}
          {/* Church spire */}
          <g opacity="0.2">
            <rect x="190" y="50" width="12" height="40" fill="hsl(var(--primary))" />
            <polygon points="196,30 184,70 208,70" fill="hsl(var(--primary))" />
          </g>
          {/* Canal houses row */}
          <g opacity="0.18">
            <rect x="400" y="140" width="16" height="28" fill="hsl(var(--primary))" />
            <rect x="418" y="146" width="14" height="22" fill="hsl(var(--primary))" />
            <rect x="434" y="138" width="18" height="30" fill="hsl(var(--primary))" />
            <polygon points="400,140 408,128 416,140" fill="hsl(var(--primary))" />
            <polygon points="418,146 425,136 432,146" fill="hsl(var(--primary))" />
            <polygon points="434,138 443,124 452,138" fill="hsl(var(--primary))" />
          </g>
          {/* Trees (Vondelpark) */}
          <g opacity="0.18">
            <circle cx="100" cy="380" r="18" fill="hsl(var(--heritage-green))" />
            <circle cx="140" cy="390" r="14" fill="hsl(var(--heritage-green))" />
            <circle cx="70" cy="400" r="12" fill="hsl(var(--heritage-green))" />
          </g>

          {/* ── Whimsical decorations ── */}
          {/* Bicycle */}
          <g opacity="0.2" transform="translate(200, 110)">
            <circle cx="0" cy="0" r="6" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
            <circle cx="16" cy="0" r="6" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
            <path d="M 0 0 L 8 -8 L 16 0" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
            <line x1="8" y1="-8" x2="8" y2="-12" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            <line x1="6" y1="-12" x2="10" y2="-12" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          </g>

          {/* Boat on canal */}
          <g opacity="0.18" transform="translate(260, 310)">
            <path d="M -12 0 Q -8 6, 0 6 Q 8 6, 12 0 Z" fill="hsl(var(--primary))" />
            <line x1="0" y1="0" x2="0" y2="-10" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            <path d="M 0 -10 Q 6 -8, 6 -4" stroke="hsl(var(--primary))" strokeWidth="1" fill="hsl(var(--primary))" opacity="0.5" />
          </g>

          {/* Birds */}
          <g opacity="0.15">
            <path d="M 520 60 Q 525 55, 530 60 Q 535 55, 540 60" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
            <path d="M 540 45 Q 544 41, 548 45 Q 552 41, 556 45" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
            <path d="M 505 50 Q 508 47, 511 50 Q 514 47, 517 50" stroke="hsl(var(--primary))" strokeWidth="1.2" fill="none" />
          </g>

          {/* Windmill */}
          <g opacity="0.15" transform="translate(550, 420)">
            <rect x="-4" y="-20" width="8" height="20" fill="hsl(var(--primary))" />
            <line x1="0" y1="-20" x2="-14" y2="-30" stroke="hsl(var(--primary))" strokeWidth="2" />
            <line x1="0" y1="-20" x2="14" y2="-30" stroke="hsl(var(--primary))" strokeWidth="2" />
            <line x1="0" y1="-20" x2="-14" y2="-10" stroke="hsl(var(--primary))" strokeWidth="2" />
            <line x1="0" y1="-20" x2="14" y2="-10" stroke="hsl(var(--primary))" strokeWidth="2" />
          </g>

          {/* ── Route paths (sketchier) ── */}
          {pathSegments.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke="hsl(var(--accent))"
              strokeWidth="4"
              strokeDasharray="12 4 4 4"
              strokeLinecap="round"
              style={{
                strokeDashoffset: i < maxVisited ? 0 : pathLengths[i],
                transition: "stroke-dashoffset 0.8s ease-in-out, opacity 0.5s ease",
              }}
              opacity={i < maxVisited ? 0.85 : 0.12}
            />
          ))}

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
                {/* Pulse ring for active */}
                {isActive && (
                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r="26"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="2"
                    opacity="0.4"
                  >
                    <animate
                      attributeName="r"
                      from="20"
                      to="32"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.5"
                      to="0"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                {/* Main circle - larger */}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r="20"
                  fill={isActive || isVisited ? "hsl(var(--accent))" : "hsl(var(--background))"}
                  stroke="hsl(var(--accent))"
                  strokeWidth={isActive ? 3 : 2}
                  style={{
                    transition: "fill 0.3s, stroke-width 0.3s, transform 0.3s",
                  }}
                />
                {/* Bounce animation wrapper for active */}
                {isActive ? (
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      values="1;1.15;1"
                      dur="0.4s"
                      repeatCount="1"
                      additive="sum"
                      calcMode="spline"
                      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                    />
                  </g>
                ) : null}
                {/* Icon emoji */}
                <text
                  x={stop.x}
                  y={stop.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="16"
                  style={{ transition: "opacity 0.3s" }}
                >
                  {stop.icon}
                </text>
                {/* Label below */}
                {isActive && (
                  <text
                    x={stop.x}
                    y={stop.y + 38}
                    textAnchor="middle"
                    fill="hsl(var(--foreground))"
                    fontSize="11"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="600"
                    opacity="0.8"
                  >
                    {stop.label}
                  </text>
                )}
              </g>
            );
          })}
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
