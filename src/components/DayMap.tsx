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
  { x: 120, y: 100, label: "Jordaan Café" },
  { x: 280, y: 160, label: "Canal Walk" },
  { x: 340, y: 300, label: "Local Lunch" },
  { x: 480, y: 260, label: "Hidden Garden" },
  { x: 460, y: 410, label: "Waterfront Bar" },
];

/* ── SVG path data between consecutive stops (hand-drawn curves) ── */
const pathSegments = [
  "M 120 100 C 160 80, 230 120, 280 160",
  "M 280 160 C 300 200, 310 250, 340 300",
  "M 340 300 C 380 290, 430 270, 480 260",
  "M 480 260 C 500 310, 490 360, 460 410",
];

/* Approximate path lengths for dash animation */
const pathLengths = [200, 180, 160, 180];

const DayMap = ({ moments }: DayMapProps) => {
  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
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

    const handleScroll = () => {
      if (scrollCooldown.current) return;

      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current;
      lastScrollY.current = currentY;

      // Only trigger when section is in view
      if (rect.top > viewH || rect.bottom < 0) return;

      // Calculate how far through the section we are (0-1)
      const sectionProgress = Math.max(0, Math.min(1,
        (viewH - rect.top) / (rect.height + viewH * 0.3)
      ));

      // Map progress to stop index
      const targetStop = Math.min(
        moments.length - 1,
        Math.floor(sectionProgress * moments.length)
      );

      setActive((prev) => {
        if (scrollingDown && targetStop > prev) {
          scrollCooldown.current = true;
          setTimeout(() => { scrollCooldown.current = false; }, 600);
          setVisited((v) => new Set(v).add(targetStop));
          return targetStop;
        }
        if (!scrollingDown && targetStop < prev) {
          scrollCooldown.current = true;
          setTimeout(() => { scrollCooldown.current = false; }, 600);
          return targetStop;
        }
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [moments.length]);

  /* Which path segments to reveal: all segments up to the highest visited stop */
  const maxVisited = useMemo(() => {
    let max = 0;
    visited.forEach((v) => { if (v > max) max = v; });
    return max;
  }, [visited]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* ── Left: SVG Map ── */}
      <div className="relative w-full" style={{ aspectRatio: "6 / 5" }}>
        <svg
          viewBox="0 0 600 500"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ── Canals (decorative curves) ── */}
          <path
            d="M 0 180 Q 150 140, 300 200 T 600 170"
            stroke="hsl(var(--heritage-taupe))"
            strokeWidth="18"
            opacity="0.25"
            strokeLinecap="round"
          />
          <path
            d="M 0 320 Q 200 280, 400 340 T 600 310"
            stroke="hsl(var(--heritage-taupe))"
            strokeWidth="14"
            opacity="0.2"
            strokeLinecap="round"
          />
          <path
            d="M 50 450 Q 250 420, 450 460 T 600 440"
            stroke="hsl(var(--heritage-taupe))"
            strokeWidth="10"
            opacity="0.15"
            strokeLinecap="round"
          />

          {/* ── Landmark silhouettes ── */}
          {/* Church spire */}
          <g opacity="0.12">
            <rect x="190" y="50" width="12" height="40" fill="hsl(var(--primary))" />
            <polygon points="196,30 184,70 208,70" fill="hsl(var(--primary))" />
          </g>
          {/* Canal houses row */}
          <g opacity="0.1">
            <rect x="400" y="140" width="16" height="28" fill="hsl(var(--primary))" />
            <rect x="418" y="146" width="14" height="22" fill="hsl(var(--primary))" />
            <rect x="434" y="138" width="18" height="30" fill="hsl(var(--primary))" />
            <polygon points="400,140 408,128 416,140" fill="hsl(var(--primary))" />
            <polygon points="418,146 425,136 432,146" fill="hsl(var(--primary))" />
            <polygon points="434,138 443,124 452,138" fill="hsl(var(--primary))" />
          </g>
          {/* Trees (Vondelpark) */}
          <g opacity="0.1">
            <circle cx="100" cy="380" r="18" fill="hsl(var(--heritage-green))" />
            <circle cx="140" cy="390" r="14" fill="hsl(var(--heritage-green))" />
            <circle cx="70" cy="400" r="12" fill="hsl(var(--heritage-green))" />
          </g>

          {/* ── Route paths ── */}
          {pathSegments.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke="hsl(var(--accent))"
              strokeWidth="3"
              strokeDasharray="8 6"
              strokeLinecap="round"
              style={{
                strokeDashoffset: i < maxVisited ? 0 : pathLengths[i],
                transition: "stroke-dashoffset 0.8s ease-in-out",
              }}
              opacity={i < maxVisited ? 0.8 : 0.15}
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
              >
                {/* Pulse ring for active */}
                {isActive && (
                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r="22"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="2"
                    opacity="0.4"
                  >
                    <animate
                      attributeName="r"
                      from="16"
                      to="26"
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
                {/* Main circle */}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r="16"
                  fill={isActive || isVisited ? "hsl(var(--accent))" : "hsl(var(--background))"}
                  stroke="hsl(var(--accent))"
                  strokeWidth={isActive ? 3 : 2}
                  style={{ transition: "fill 0.3s, stroke-width 0.3s" }}
                />
                {/* Number */}
                <text
                  x={stop.x}
                  y={stop.y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isActive || isVisited ? "hsl(var(--accent-foreground))" : "hsl(var(--accent))"}
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="Outfit, sans-serif"
                  style={{ transition: "fill 0.3s" }}
                >
                  {i + 1}
                </text>
                {/* Label below */}
                {isActive && (
                  <text
                    x={stop.x}
                    y={stop.y + 34}
                    textAnchor="middle"
                    fill="hsl(var(--foreground))"
                    fontSize="11"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="500"
                    opacity="0.7"
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
            className="border border-border rounded-sm p-8 lg:p-10"
            style={{ backgroundColor: "hsl(var(--background))" }}
          >
            <p className="font-body text-xs tracking-widest uppercase text-accent font-medium mb-3">
              {moments[active].time}
            </p>
            <h3 className="font-heading text-3xl lg:text-4xl text-primary mb-4">
              {moments[active].title}
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed">
              {moments[active].text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={goPrev}
            disabled={active === 0}
            className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous stop"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            {moments.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === active
                    ? "bg-accent"
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
            className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
