import { useMemo, useRef, useState, useEffect } from "react";

/**
 * Honest, general descriptions of what the collage shows. They rotate over
 * the tiles so screen readers and search engines get a picture of the
 * photos without naming guests or dates.
 */
const ALT_TEXTS = [
  "Guests with Dennis on a canal boat in Amsterdam",
  "Guests walking with Dennis along an Amsterdam canal",
  "A small group with Dennis in front of a historic Amsterdam house",
  "Guests cycling with Dennis through Amsterdam",
  "Guests with Dennis at a market in Amsterdam",
  "A family with Dennis on a bridge over an Amsterdam canal",
  "Guests with Dennis in a museum in Amsterdam",
  "Guests with Dennis in the Dutch countryside near Amsterdam",
  "Guests with Dennis at a brown café in Amsterdam",
  "Guests with Dennis in a quiet Amsterdam courtyard",
  "Guests with Dennis by the water in Amsterdam Noord",
  "Guests with Dennis among the tulip fields outside Amsterdam",
];

interface MosaicWallProps {
  photos: string[];
  /** Marquee cycle in seconds. Defaults to 60. */
  duration?: number;
  /** Number of visible rows. Defaults to 5. */
  rows?: number;
  /** Number of columns visible in the frame. Defaults to 10. */
  columns?: number;
}


/**
 * Mosaic Wall — a continuously sliding grid of photo tiles.
 *
 * Tiles are arranged in `rows × columns` and the entire strip slides
 * rightwards in an infinite loop. The track is duplicated so the seam
 * is invisible.
 *
 * Honors prefers-reduced-motion (renders a static grid).
 */
const MosaicWall = ({
  photos,
  duration = 60,
  rows: rowsProp = 5,
  columns: colsProp = 10,
}: MosaicWallProps) => {
  // Stable shuffle per mount.
  const shuffled = useMemo(() => {
    const arr = [...photos];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [photos]);

  // Track failed image sources so they drop out of the layout entirely.
  const [broken, setBroken] = useState<Set<string>>(new Set());
  const pool = shuffled.filter((src) => !broken.has(src));

  // Responsive: on mobile the wall is six photos high and six photos wide,
  // making each tile bigger. The strip slides sideways on its own so guests
  // see that more photos are available by swiping.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const rows = isMobile ? 6 : rowsProp;
  const columns = isMobile ? 6 : colsProp;
  const speed = isMobile ? duration * 0.55 : duration;


  // Build exactly rows × columns tiles, repeating from the pool if needed.
  const slots = rows * columns;
  const tiles: string[] = [];
  if (pool.length > 0) {
    for (let i = 0; i < slots; i++) tiles.push(pool[i % pool.length]);
  }

  // Measure container width to compute square tile size.
  const containerRef = useRef<HTMLDivElement>(null);
  const [tileSize, setTileSize] = useState(120);
  const gap = 5;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const size = Math.max(24, (w - gap * (columns - 1)) / columns);
      setTileSize(size);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [columns]);

  const frameHeight = rows * tileSize + (rows - 1) * gap;

  // Render the tile strip twice for a seamless marquee loop.
  const renderStrip = (keyPrefix: string, describe: boolean) => (
    <div
      className="grid h-full shrink-0"
      style={{
        gap: `${gap}px`,
        marginRight: `${gap}px`,
        gridTemplateColumns: `repeat(${columns}, ${tileSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
        gridAutoFlow: "column",
      }}
    >
      {tiles.map((src, i) => {
        // Only the first strip carries descriptions; the duplicate strip is
        // decorative so assistive tech does not read everything twice.
        const alt = describe ? ALT_TEXTS[i % ALT_TEXTS.length] : "";
        return (
          <div
            key={`${keyPrefix}-${src}-${i}`}
            className="overflow-hidden rounded-[3px] bg-muted"
          >
            <img
              src={src}
              alt={alt}
              aria-hidden={alt ? undefined : "true"}
              loading="lazy"
              decoding="async"
              onError={() =>
                setBroken((prev) => {
                  if (prev.has(src)) return prev;
                  const next = new Set(prev);
                  next.add(src);
                  return next;
                })
              }
              className="w-full h-full object-cover block select-none pointer-events-none"
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );

  // Mobile is a manually scrollable strip with arrow buttons so guests can
  // swipe or tap to browse. Desktop keeps the automatic CSS marquee.
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  if (isMobile) {
    return (
      <div className="relative w-full">
        <div
          ref={(node) => {
            scrollRef.current = node;
            containerRef.current = node;
          }}
          className="w-full overflow-x-auto rounded-sm"
          style={{ height: `${frameHeight}px`, WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex h-full items-center" style={{ width: "max-content" }}>
            {renderStrip("a", true)}
            {renderStrip("b", false)}
          </div>
        </div>
        <button
          type="button"
          aria-label="Scroll photos left"
          onClick={() => scrollBy(-1)}
          className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground shadow-md backdrop-blur-sm active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button
          type="button"
          aria-label="Scroll photos right"
          onClick={() => scrollBy(1)}
          className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground shadow-md backdrop-blur-sm active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-sm"
      style={{ height: `${frameHeight}px` }}
    >
      <div className="absolute inset-0 flex items-center mosaic-marquee">
        {renderStrip("a", true)}
        {renderStrip("b", false)}
      </div>

      <style>{`
        @keyframes mosaicMarquee {
          0%   { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .mosaic-marquee {
          width: max-content;
          animation: mosaicMarquee ${speed}s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .mosaic-marquee { animation: none !important; }
        }
      `}</style>
    </div>
  );

};

export default MosaicWall;
