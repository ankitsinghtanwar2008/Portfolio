'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });

  useEffect(() => {
    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setVisible(false),
      });

      tl.from('.preloader-mark', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.out',
      })
        .from(
          '.preloader-caption',
          {
            y: 12,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.35',
        )
        .to(
          counter,
          {
            value: 100,
            duration: 1.5,
            ease: 'power2.inOut',
            onUpdate: () => setProgress(Math.round(counter.value)),
          },
          '-=0.1',
        )
        .to(
          '.preloader-line span',
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power2.inOut',
          },
          '<',
        )
        .to(
          '.preloader-inner',
          {
            y: -20,
            opacity: 0,
            duration: 0.45,
            ease: 'power2.in',
          },
          '+=0.15',
        )
        .to(
          preloaderRef.current,
          {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut',
          },
          '-=0.1',
        );
    }, preloaderRef);

    return () => ctx.revert();
  }, []);

  if (!visible) return null;

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="preloader-inner">
        <div className="preloader-topline">
          <span>ANKIT SINGH</span>
          <span>PORTFOLIO / 2026</span>
        </div>

        <div className="preloader-center">
          <span className="preloader-mark">
            AS<span>.</span>
          </span>

          <span className="preloader-caption">
            IDEAS INTO IMPACT — LOADING EXPERIENCE
          </span>
        </div>

        <div className="preloader-bottom">
          <div className="preloader-progress-info">
            <span>PLEASE WAIT</span>
            <span className="preloader-percent">
              {String(progress).padStart(3, '0')}%
            </span>
          </div>

          <div className="preloader-line">
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
