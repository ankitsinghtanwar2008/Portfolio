'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const cursor = cursorRef.current;

    if (!cursor) return;

    const moveX = gsap.quickTo(cursor, 'x', {
      duration: 0.35,
      ease: 'power3.out',
    });

    const moveY = gsap.quickTo(cursor, 'y', {
      duration: 0.35,
      ease: 'power3.out',
    });

    const handleMouseMove = (event: MouseEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.closest(
          'a, button, .project-panel, input, textarea, select, [data-cursor="active"]'
        )
      ) {
        cursor.classList.add('is-active');
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.closest(
          'a, button, .project-panel, input, textarea, select, [data-cursor="active"]'
        )
      ) {
        cursor.classList.remove('is-active');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      gsap.killTweensOf(cursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    >
      <span />
    </div>
  );
}
