
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  delay?: number;
  duration?: number;
  priority?: boolean;
}

export default function ImageReveal({
  src,
  alt,
  className = '',
  imageClassName = '',
  delay = 0,
  duration = 1.2,
  priority = false,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    if (!container || !image) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        delay,
      });

      timeline
        .fromTo(
          container,
          { clipPath: 'inset(0 0 100% 0)' },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration,
            ease: 'power4.inOut',
          },
        )
        .fromTo(
          image,
          { scale: 1.2 },
          {
            scale: 1,
            duration,
            ease: 'power3.out',
          },
          '<',
        );
    }, container);

    return () => ctx.revert();
  }, [delay, duration, src]);

  return (
    <div
      ref={containerRef}
      className={`image-reveal ${className}`}
    >
      <div ref={imageRef} className="image-reveal-inner">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`image-reveal-image ${imageClassName}`}
        />
      </div>
    </div>
  );
}
