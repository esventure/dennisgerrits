import skyline from '@/assets/amsterdam-skyline.png';
import { useSkylineProgress } from '@/hooks/useSkylineProgress';

const MASK =
  'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)';

type Variant = 'light' | 'dark';

interface Props {
  /**
   * "light" (default): `position: fixed` to the viewport bottom, tuned for
   *   the off-white body background (multiply blend, low opacity).
   * "dark": `position: sticky; bottom: 0` so it pins to the viewport bottom
   *   while its parent section is on screen — matching the light layer's
   *   on-screen position pixel-for-pixel — then scrolls away with the
   *   section. Tuned for the bordeaux contact background (screen blend).
   *   The parent must NOT have `overflow: hidden` on the scroll axis (sticky
   *   would be killed); use `overflow-x: clip` if you need to hide overflow.
   */
  variant?: Variant;
}

const AmsterdamSkyline = ({ variant = 'light' }: Props) => {
  const progress = useSkylineProgress();
  const clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;

  if (variant === 'dark') {
    return (
      <div
        className="pointer-events-none w-full"
        style={{
          position: 'sticky',
          bottom: 0,
          left: 0,
          marginTop: '-1px',
          height: 0,
          zIndex: 1,
        }}
        aria-hidden
      >
        {/* Inner wrapper holds the actual image, lifted above the sticky
            zero-height anchor so it sits flush with the viewport bottom. */}
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{ clipPath }}
        >
          <img
            src={skyline}
            alt=""
            className="w-full h-auto block"
            style={{
              opacity: 0.28,
              maskImage: MASK,
              WebkitMaskImage: MASK,
              filter: 'brightness(1.4) sepia(1) saturate(5) hue-rotate(-15deg)',
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
