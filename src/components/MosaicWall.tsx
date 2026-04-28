import { useMemo } from "react";

interface MosaicWallProps {
  photos: string[];
  /** Tile size in px (used for CSS grid). Defaults to 120. */
  tileSize?: number;
  /** Drift cycle in seconds. Defaults to 75. */
  duration?: number;
}

/**
 * Infinite Mosaic Wall.
 *
 * A drifting grid of small photo tiles. Designed so no individual face
 * is ever the focus: tiles stay small, motion is constant but slow, and
 * a soft vignette fades the edges. No hover-zoom, no lightbox.
 *
 * Honors prefers-reduced-motion (renders a static grid).
 */
const MosaicWall = ({ photos, tileSize = 120, duration = 35 }: MosaicWallProps) => {
  // Shuffle once per mount so visual rhythm changes between visits without
  // changing during scroll. Use a stable hash of the array length as seed
  // proxy — purely cosmetic.
  const tiles = useMemo(() => {
    const arr = [...photos];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [photos]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-sm"
      style={{
        height: "min(70vh, 620px)",
        backgroundColor: "hsl(var(--background))",
      }}
    >
      {/* Drifting grid layer — sized larger than the frame so edges never reveal */}
      <div
        className="absolute inset-0 mosaic-drift"
        style={{
          width: "140%",
          height: "140%",
          left: "-20%",
          top: "-20%",
        }}
      >
        <div
          className="grid gap-[5px] w-full h-full"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(${tileSize}px, 1fr))`,
            gridAutoRows: `${tileSize}px`,
          }}
        >
          {tiles.map((src, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-[3px] bg-muted"
            >
              <img
                src={src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
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
            "radial-gradient(ellipse at center, transparent 35%, hsl(var(--background) / 0.55) 70%, hsl(var(--background)) 96%)",
        }}
      />

      {/* Inline keyframes — kept local to the component */}
      <style>{`
        @keyframes mosaicDrift {
          0%   { transform: translate3d(0, 0, 0); }
          25%  { transform: translate3d(-3%, -2%, 0); }
          50%  { transform: translate3d(-5%, -4%, 0); }
          75%  { transform: translate3d(-2%, -3%, 0); }
          100% { transform: translate3d(0, 0, 0); }
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
