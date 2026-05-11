import { useMemo, useRef, useState, useEffect } from "react";

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

  // Responsive: use fewer rows/cols on small viewports so tiles aren't tiny.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const rows = isMobile ? Math.min(3, rowsProp) : rowsProp;
  const columns = isMobile ? Math.min(4, colsProp) : colsProp;

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
      const size = Math.max(40, (w - gap * (columns - 1)) / columns);
      setTileSize(size);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [columns]);

  const frameHeight = rows * tileSize + (rows - 1) * gap;

  // Render the tile strip twice for a seamless marquee loop.
  const renderStrip = (keyPrefix: string) => (
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
      {tiles.map((src, i) => (
        <div
          key={`${keyPrefix}-${src}-${i}`}
          className="overflow-hidden rounded-[3px] bg-muted"
        >
          <img
            src={src}
            alt=""
            aria-hidden="true"
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
      ))}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-sm"
      style={{ height: `${frameHeight}px` }}
    >
      <div className="absolute inset-0 flex items-center mosaic-marquee">
        {renderStrip("a")}
        {renderStrip("b")}
      </div>

      <style>{`
        @keyframes mosaicMarquee {
          0%   { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .mosaic-marquee {
          width: max-content;
          animation: mosaicMarquee ${duration}s linear infinite;
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
