import { useEffect, useRef, useState } from "react";

interface DayProgressProps {
  /** Labels in order, e.g. ["Morning", "Late Morning", ...] */
  labels: string[];
  /** Selector or ref for the section whose scroll drives progress.
   *  Defaults to the closest <section> ancestor. */
}

/**
 * A thin, sticky-friendly progress strip for the "A Day in My Life" section.
 * Shows a horizontal track from "Morning" to "Evening" with an animated
 * marker that follows scroll progress through the parent <section>.
 *
 * Designed to live INSIDE the sticky inner container of the 200vh Day section,
 * so it feels like a quiet wayfinder while the moments change.
 */
const DayProgress = ({ labels }: DayProgressProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const section = el.closest("section");
    if (!section) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const start = viewH * 0.3;
      const end = viewH * 0.7;
      const traveled = start - rect.top;
      const total = rect.height - (viewH - end + (viewH - start));
      const raw = total > 0 ? traveled / total : 0;
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeIdx = Math.round(progress * (labels.length - 1));

  return (
    <div ref={ref} className="mb-10 lg:mb-12 max-w-3xl">
      <div className="flex items-center justify-between mb-3">
        <span className="font-body text-[11px] tracking-[0.22em] uppercase text-secondary">
          Morning
        </span>
        <span className="font-body text-[11px] tracking-[0.22em] uppercase text-secondary">
          Evening
        </span>
      </div>
      <div
        className="relative h-px w-full"
        style={{ backgroundColor: "hsl(var(--heritage-taupe) / 0.5)" }}
      >
        {/* Filled portion */}
        <div
          className="absolute top-0 left-0 h-px transition-[width] duration-500 ease-out"
          style={{
            width: `${progress * 100}%`,
            backgroundColor: "hsl(var(--heritage-orange))",
          }}
        />
        {/* Stops */}
        {labels.map((label, i) => {
          const left = (i / (labels.length - 1)) * 100;
          const reached = i <= activeIdx;
          const isActive = i === activeIdx;
          return (
            <div
              key={label}
              className="absolute top-1/2"
              style={{ left: `${left}%`, transform: "translate(-50%, -50%)" }}
            >
              <div
                className="rounded-full transition-all duration-500"
                style={{
                  width: isActive ? 12 : 7,
                  height: isActive ? 12 : 7,
                  backgroundColor: reached
                    ? "hsl(var(--heritage-orange))"
                    : "hsl(var(--heritage-taupe))",
                  boxShadow: isActive
                    ? "0 0 0 4px hsl(var(--background))"
                    : "0 0 0 2px hsl(var(--background))",
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-3 font-body text-xs tracking-[0.2em] uppercase text-primary/70">
        {labels[activeIdx]}
      </div>
    </div>
  );
};

export default DayProgress;
