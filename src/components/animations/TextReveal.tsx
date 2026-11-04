'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}

export default function TextReveal({
  children,
  className = '',
  as: Tag = 'p',
  delay = 0,
  stagger = 0.035,
  duration = 0.7,
  once = true,
}: TextRevealProps) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const words = element.querySelectorAll('.text-reveal-word');

    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.set(words, {
        yPercent: 110,
        opacity: 0,
        rotateX: -35,
        transformOrigin: 'center bottom',
      });

      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration,
        stagger,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: once
            ? 'play none none none'
            : 'play none none reverse',
        },
      });
    }, element);

    return () => ctx.revert();
  }, [children, delay, duration, once, stagger]);

  const words = children.split(/(\s+)/);

  return (
    <Tag
      ref={elementRef as React.Ref<never>}
      className={`text-reveal ${className}`}
    >
      {words.map((word, index) =>
        /^\s+$/.test(word) ? (
          word
        ) : (
          <span className="text-reveal-mask" key={index}>
            <span className="text-reveal-word">{word}</span>
          </span>
        ),
      )}
    </Tag>
  );
}
