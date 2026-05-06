import { useEffect, useRef, useState } from 'react';
import skyline from '@/assets/amsterdam-skyline.png';

/**
 * Fixed Amsterdam skyline that uncovers from left → right based on scroll.
 *
 * Renders TWO stacked layers sharing the exact same position + clipPath so
 * the reveal stays in sync across the page:
 *   - "light" layer: tuned for the off-white body background (multiply blend).
 *   - "dark"  layer: tuned for the bordeaux contact section (screen blend),
 *     so the same skyline silhouette keeps growing into the red panel
 *     instead of suddenly appearing full-width there.
 */
const AmsterdamSkyline = () => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0);
        rafRef.current = 0;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;
  const maskImage =
    'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)';

  return (
    <div
      className="fixed bottom-0 left-0 w-full pointer-events-none"
      style={{ zIndex: 0, clipPath }}
      aria-hidden
    >
      {/* Light-background layer (off-white sections) */}
      <img
        src={skyline}
        alt="Amsterdam skyline illustration"
        className="absolute bottom-0 left-0 w-full h-auto"
        style={{
          opacity: 0.07,
          maskImage,
          WebkitMaskImage: maskImage,
          filter: 'invert(1) brightness(1.5) sepia(1) saturate(5) hue-rotate(-15deg)',
          mixBlendMode: 'multiply',
        }}
      />
      {/* Dark-background layer (bordeaux contact section) */}
      <img
        src={skyline}
        alt=""
        className="relative w-full h-auto"
        style={{
          opacity: 0.22,
          maskImage,
          WebkitMaskImage: maskImage,
          filter: 'brightness(1.4) sepia(1) saturate(4) hue-rotate(-15deg)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};

export default AmsterdamSkyline;
