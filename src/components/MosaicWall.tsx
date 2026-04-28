import { useMemo, useRef, useState, useEffect } from "react";

interface MosaicWallProps {
  photos: string[];
  /** Drift cycle in seconds. Defaults to 18. */
  duration?: number;
  /** Number of visible rows. Defaults to 5. */
  rows?: number;
  /** Number of columns. Defaults to 10. */
  columns?: number;
}

/**
 * Mosaic Wall — a fixed grid of `rows × columns` photo tiles.
 *
 * Tile size is derived from the container width so the grid always
 * fills the frame edge-to-edge. A soft drift animation keeps the wall
 * alive without ever turning into a feature on any one face.
 *
 * Tiles whose source fails to load are silently hidden, then back-filled
 * from the remaining pool so the grid stays complete.
 *
 * Honors prefers-reduced-motion (renders a static grid).
 */
const MosaicWall = ({
  photos,
  duration = 18,
  rows = 5,
  columns = 10,
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

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-sm"
      style={{
        height: `${frameHeight}px`,
        backgroundColor: "hsl(var(--background))",
      }}
    >
      <div className="absolute inset-0 mosaic-drift">
        <div
          className="grid w-full h-full"
          style={{
            gap: `${gap}px`,
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, ${tileSize}px)`,
          }}
        >
          {tiles.map((src, i) => (
            <div
              key={`${src}-${i}`}
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
      </div>

      {/* Soft radial vignette — fades the edges into the page background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, hsl(var(--background) / 0.45) 75%, hsl(var(--background)) 98%)",
        }}
      />

      <style>{`
        @keyframes mosaicDrift {
          0%   { transform: translate3d(0, 0, 0) scale(1); }
          50%  { transform: translate3d(-1.5%, -1%, 0) scale(1.02); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        .mosaic-drift {
          animation: mosaicDrift ${duration}s ease-in-out infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .mosaic-drift { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default MosaicWall;
