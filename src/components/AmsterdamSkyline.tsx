import skyline from '@/assets/amsterdam-skyline.png';
import { useSkylineProgress } from '@/hooks/useSkylineProgress';

const MASK =
  'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)';

/**
 * Fixed Amsterdam skyline that uncovers from left → right as the page is
 * scrolled.
 *
 * Two stacked `position: fixed` layers share the EXACT same clipPath:
 *   - "light" layer (multiply blend, low opacity): shows the orange line
 *     art on the off-white body background. Practically invisible on the
 *     bordeaux contact section (multiplying with a dark color stays dark).
 *   - "dark" layer (screen blend, higher opacity): lightens the bordeaux
 *     into a warm orange silhouette. Practically invisible on the off-
 *     white body (screen against near-white stays near-white).
 *
 * Because both layers are global and share the same scroll-driven clip,
 * the reveal stays continuous when the bordeaux section enters the
 * viewport — no sudden full-width pop-in, no per-section overrides needed.
 */
const AmsterdamSkyline = () => {
  const progress = useSkylineProgress();
  const clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;

  return (
    <>
      {/* Light-background layer */}
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
            filter:
              'invert(1) brightness(1.5) sepia(1) saturate(5) hue-rotate(-15deg)',
            mixBlendMode: 'multiply',
          }}
        />
      </div>

      {/* Dark-background layer (only visually contributes over dark colors) */}
      <div
        className="fixed bottom-0 left-0 w-full pointer-events-none"
        style={{ zIndex: 0, clipPath }}
        aria-hidden
      >
        <img
          src={skyline}
          alt=""
          className="w-full h-auto block"
          style={{
            opacity: 0.35,
            maskImage: MASK,
            WebkitMaskImage: MASK,
            filter: 'brightness(1.5) sepia(1) saturate(6) hue-rotate(-15deg)',
            mixBlendMode: 'screen',
          }}
        />
      </div>
    </>
  );
};

export default AmsterdamSkyline;
