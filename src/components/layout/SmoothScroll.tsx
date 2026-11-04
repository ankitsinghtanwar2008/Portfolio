'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from '@/lib/gsap';

export default function SmoothScroll() {
  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    const updateScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on('scroll', updateScroll);

    let animationFrame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null;

      if (!link) return;

      const hash = link.getAttribute('href');

      if (!hash || hash === '#') return;

      const section = document.querySelector(hash);

      if (!section) return;

      event.preventDefault();

      lenis.scrollTo(section, {
        offset: 0,
        duration: 1.2,
      });
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(animationFrame);
      document.removeEventListener('click', handleAnchorClick);
      lenis.off('scroll', updateScroll);
      lenis.destroy();
    };
  }, []);

  return null;
}
