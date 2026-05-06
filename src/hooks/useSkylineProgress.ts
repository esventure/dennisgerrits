import { useEffect, useRef, useState } from 'react';

/**
 * Returns the page-scroll progress (0 → 1) used to drive the
 * Amsterdam skyline left → right reveal. Shared between the global
 * fixed skyline and any in-section skyline overlays so the clip stays
 * perfectly in sync.
 */
export function useSkylineProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
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

  return progress;
}
