import { useEffect } from 'react';
import { createLenis, destroyLenis } from '@/lib/lenis';

export function useLenis() {
  useEffect(() => {
    const lenis = createLenis();
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      destroyLenis();
    };
  }, []);
}
