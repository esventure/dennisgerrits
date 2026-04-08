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
      {/* Orange div masked by the skyline image — only the lines show */}
      <div
        className="w-full opacity-[0.12]"
        style={{
          backgroundColor: 'hsl(var(--accent))',
          maskImage: `url(${skyline}), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)`,
          WebkitMaskImage: `url(${skyline}), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)`,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
          maskSize: '100% auto, 100% 100%',
          WebkitMaskSize: '100% auto, 100% 100%',
          maskPosition: 'bottom center',
          WebkitMaskPosition: 'bottom center',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          aspectRatio: '1920 / 400',
        }}
        role="img"
        aria-label="Amsterdam skyline illustration"
      />
    </div>
  );
};

export default AmsterdamSkyline;
