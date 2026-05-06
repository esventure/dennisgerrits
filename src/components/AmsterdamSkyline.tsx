import skyline from '@/assets/amsterdam-skyline.png';
import { useSkylineProgress } from '@/hooks/useSkylineProgress';

const MASK =
  'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)';

type Variant = 'light' | 'dark';

interface Props {
  /**
   * "light" (default): `position: fixed` to the viewport bottom. Multiply
   *   blend, low opacity. Tuned for the off-white body background.
   * "dark": Pinned to the viewport bottom via `position: sticky` inside the
   *   bordeaux section, so it composites ABOVE the bordeaux background
   *   while the section is on screen — and disappears cleanly when scrolled
   *   past. Screen blend, higher opacity. Both variants use the SAME
   *   clipPath progress so the reveal stays continuous across the boundary.
   *   Parent section must be `position: relative` and must NOT use
   *   `overflow: hidden` on the Y axis (use `overflow-x: clip` instead).
   */
  variant?: Variant;
}

const AmsterdamSkyline = ({ variant = 'light' }: Props) => {
  const progress = useSkylineProgress();
  const clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;

  if (variant === 'dark') {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden
      >
        <div className="sticky w-full" style={{ bottom: 0, clipPath }}>
          <img
            src={skyline}
            alt=""
            className="w-full h-auto block"
            style={{
              opacity: 0.14,
              maskImage: MASK,
              WebkitMaskImage: MASK,
              filter: 'brightness(1.5) sepia(1) saturate(6) hue-rotate(-15deg)',
              mixBlendMode: 'screen',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-0 left-0 w-full pointer-events-none"
      style={{ zIndex: 0, clipPath }}
      aria-hidden
    >
      <img
        src={skyline}
        alt="Amsterdam skyline illustration"
        className="w-full h-auto block"
        style={{
          opacity: 0.07,
          maskImage: MASK,
          WebkitMaskImage: MASK,
          filter: 'invert(1) brightness(1.5) sepia(1) saturate(5) hue-rotate(-15deg)',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );
};

export default AmsterdamSkyline;
