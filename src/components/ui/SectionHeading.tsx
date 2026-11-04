
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface SectionHeadingProps {
  number: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
  dark?: boolean;
}

export default function SectionHeading({
  number,
  label,
  title,
  description,
  className = '',
  dark = false,
}: SectionHeadingProps) {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = headingRef.current;

    if (!element) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(element.querySelectorAll('.section-heading-item'), {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, element);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={headingRef}
      className={`section-heading ${dark ? 'section-heading-dark' : ''} ${className}`}
    >
      <div className="section-heading-top section-heading-item">
        <span className="section-heading-number">{number}</span>
        <span className="section-heading-label">{label}</span>
      </div>

      <div className="section-heading-content">
        <h2 className="section-heading-title section-heading-item">
          {title}
        </h2>

        {description && (
          <p className="section-heading-description section-heading-item">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
