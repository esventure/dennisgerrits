import skyline from '@/assets/amsterdam-skyline.png';
import { useSkylineProgress } from '@/hooks/useSkylineProgress';

const MASK =
  'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)';

type Variant = 'light' | 'dark';

interface Props {
  /**
   * "light" (default): `position: fixed` to the viewport bottom on the off-
   *   white body. Multiply blend, low opacity.
   * "dark": ALSO `position: fixed` to the viewport bottom — but rendered
   *   inside the bordeaux section so it inherits that section's stacking
   *   context and paints ABOVE its opaque background. Screen blend, higher
   *   opacity. Sharing `position: fixed; bottom: 0` with the light variant
   *   guarantees pixel-identical placement, so the reveal stays continuous.
   *   The parent must be `position: relative`.
   */
  variant?: Variant;
}

const AmsterdamSkyline = ({ variant = 'light' }: Props) => {
  const progress = useSkylineProgress();
  const clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;

  const isDark = variant === 'dark';

  return (
    <div
      className="fixed bottom-0 left-0 w-full pointer-events-none"
      style={{ zIndex: isDark ? 1 : 0, clipPath }}
      aria-hidden
    >
      <img
        src={skyline}
        alt={isDark ? '' : 'Amsterdam skyline illustration'}
        className="w-full h-auto block"
        style={
          isDark
            ? {
                opacity: 0.28,
                maskImage: MASK,
                WebkitMaskImage: MASK,
                filter: 'brightness(1.4) sepia(1) saturate(5) hue-rotate(-15deg)',
                mixBlendMode: 'screen',
              }
            : {
                opacity: 0.07,
                maskImage: MASK,
                WebkitMaskImage: MASK,
                filter:
                  'invert(1) brightness(1.5) sepia(1) saturate(5) hue-rotate(-15deg)',
                mixBlendMode: 'multiply',
              }
        }
      />
    </div>
  );
};

export default AmsterdamSkyline;
