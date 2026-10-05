import { useMemo, useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
export function getMobilePhotoLayout(photos: string[]) {
  return { rows: 5, tiles: [...new Set(photos)].slice(0, 50) };
}

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

  // Mobile shows five rows and six visible columns, with 50 unique
  // photos in an automatic loop, also available by swiping sideways.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const mobileLayout = getMobilePhotoLayout(pool);
  const rows = isMobile ? mobileLayout.rows : rowsProp;
  const columns = isMobile ? 6 : colsProp;
  const speed = isMobile ? duration * 0.55 : duration;


  // Mobile uses up to 50 unique photos; desktop retains its fixed frame.
  const slots = rows * columns;
  const tiles: string[] = isMobile ? mobileLayout.tiles : [];
  if (!isMobile && pool.length > 0) {
    for (let i = 0; i < slots; i++) tiles.push(pool[i % pool.length]);
  }
  const trackColumns = isMobile ? Math.ceil(tiles.length / rows) : columns;

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
        gridTemplateColumns: `repeat(${Math.max(1, trackColumns)}, ${tileSize}px)`,
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

  // Three copies keep the mobile scroll position in the middle cycle, so
  // automatic movement, swiping and arrows can wrap in either direction.
  const scrollRef = useRef<HTMLDivElement>(null);
  const pauseUntil = useRef(0);
  const touching = useRef(false);
  const cycleWidth = Math.max(1, trackColumns) * (tileSize + gap);
  const wrapScroll = () => {
    const el = scrollRef.current;
    if (!el || !isMobile || tiles.length === 0) return;
    if (el.scrollLeft < cycleWidth) el.scrollLeft += cycleWidth;
    else if (el.scrollLeft >= cycleWidth * 2) el.scrollLeft -= cycleWidth;
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!isMobile || !el || tiles.length === 0) return;
    el.scrollLeft = cycleWidth;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let position = el.scrollLeft;
    const tick = (now: number) => {
      const delta = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      if (Math.abs(el.scrollLeft - position) > 1) position = el.scrollLeft;
      if (!mq.matches && !touching.current && now >= pauseUntil.current) {
        position += delta * cycleWidth / (Math.max(1, speed) * 1000);
        if (position >= cycleWidth * 2) position -= cycleWidth;
        el.scrollLeft = position;
      } else {
        position = el.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isMobile, cycleWidth, speed, tiles.length]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    pauseUntil.current = performance.now() + 1500;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "auto" });
    wrapScroll();
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
          onScroll={wrapScroll}
          onTouchStart={() => { touching.current = true; }}
          onTouchEnd={() => {
            touching.current = false;
            pauseUntil.current = performance.now() + 1500;
          }}
          onTouchCancel={() => { touching.current = false; }}
          style={{ height: `${frameHeight}px`, WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex h-full items-center" style={{ width: "max-content" }}>
            {renderStrip("before", false)}
            {renderStrip("a", true)}
            {renderStrip("after", false)}
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Scroll photos left"
          onClick={() => scrollBy(-1)}
          className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground shadow-md backdrop-blur-sm active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Scroll photos right"
          onClick={() => scrollBy(1)}
          className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground shadow-md backdrop-blur-sm active:scale-95"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </Button>
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
