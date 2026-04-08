import { useEffect, useRef, useState } from 'react';
import skyline from '@/assets/amsterdam-skyline.png';

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

  return (
    <div
      className="fixed bottom-0 left-0 w-full pointer-events-none"
      style={{
        zIndex: 0,
        clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
      }}
    >
      <img
        src={skyline}
        alt="Amsterdam skyline illustration"
        className="w-full h-auto"
        style={{
          opacity: 0.15,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          filter: 'invert(1) brightness(1.5) sepia(1) saturate(5) hue-rotate(-15deg)',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );
};

export default AmsterdamSkyline;
