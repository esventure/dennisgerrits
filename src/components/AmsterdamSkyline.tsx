import skyline from '@/assets/amsterdam-skyline.png';
import { useSkylineProgress } from '@/hooks/useSkylineProgress';

const MASK =
  'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)';

type Props = {
  /**
   * "global" (default): two `position: fixed` layers anchored to the
   * viewport bottom — used once at the page root.
   * "section": a single `position: absolute` layer that fills its
   * parent, intended to be dropped inside the bordeaux contact
   * section so the skyline keeps "filling" the red instead of leaving
   * a tall solid-red band above the fixed viewport-bottom layer.
   */
  variant?: 'global' | 'section';
};

const AmsterdamSkyline = ({ variant = 'global' }: Props) => {
  const progress = useSkylineProgress();
  const clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;

  if (variant === 'section') {
    // Fills the parent (which must be `position: relative`). The image
    // is anchored to the bottom and uses `screen` blend so it lights
    // up the bordeaux background into a warm orange silhouette
    // through the entire height of the section, not just a strip at
    // the viewport bottom.
    return (
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0, clipPath, isolation: 'isolate' }}
        aria-hidden
      >
        <img
          src={skyline}
          alt=""
          className="absolute bottom-0 left-0 w-full h-auto block"
          style={{
            opacity: 0.12,
            maskImage: MASK,
            WebkitMaskImage: MASK,
            filter:
              'brightness(1.5) sepia(1) saturate(6) hue-rotate(-15deg)',
            mixBlendMode: 'screen',
          }}
        />
      </div>
    );
  }

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
            opacity: 0.03,
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
        style={{ zIndex: 5, clipPath, isolation: 'isolate' }}
        aria-hidden
      >
        <img
          src={skyline}
          alt=""
          className="w-full h-auto block"
          style={{
            opacity: 0.12,
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
