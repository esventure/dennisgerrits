import skyline from '@/assets/amsterdam-skyline.png';
import { useSkylineProgress } from '@/hooks/useSkylineProgress';

const MASK =
  'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)';

type Variant = 'light' | 'dark';

interface Props {
  /**
   * "light" (default): fixed to the viewport, tuned for the off-white body.
   * "dark": absolute inside its parent (must be `position: relative` and
   *   `overflow: hidden`), tuned for the bordeaux contact section. Used to
   *   continue the same reveal progress over an opaque dark background that
   *   would otherwise hide the global fixed skyline.
   */
  variant?: Variant;
}

const AmsterdamSkyline = ({ variant = 'light' }: Props) => {
  const progress = useSkylineProgress();
  const clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;

  if (variant === 'dark') {
    return (
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{ zIndex: 0, clipPath }}
        aria-hidden
      >
        <img
          src={skyline}
          alt=""
          className="w-full h-auto"
          style={{
            opacity: 0.28,
            maskImage: MASK,
            WebkitMaskImage: MASK,
            filter: 'brightness(1.4) sepia(1) saturate(5) hue-rotate(-15deg)',
            mixBlendMode: 'screen',
          }}
        />
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
        className="w-full h-auto"
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
