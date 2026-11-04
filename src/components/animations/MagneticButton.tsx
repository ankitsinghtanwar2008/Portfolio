
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  strength?: number;
  external?: boolean;
}

export default function MagneticButton({
  children,
  href,
  className = '',
  strength = 0.25,
  external = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;

    if (!button) return;

    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = button.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
        overwrite: true,
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(button);
    };
  }, [strength]);

  if (!href) {
    return (
      <button
        type="button"
        className={`magnetic-button ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      ref={buttonRef}
      href={href}
      className={`magnetic-button ${className}`}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Link>
  );
}
