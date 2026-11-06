'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

/* =========================================================
   EASY SETTINGS  (change only these)
========================================================= */

const NAME = 'ANKIT';
const LABEL_ONE = 'Portfolio';
const LABEL_TWO = 'Hello, from Ankit';

/*
  1   = exact timing of the reference video (~17.5s)
  1.4 = a bit faster (~12.5s)   <- default
  2   = quick (~9s)
*/
const SPEED = 1.4;

/* =========================================================
   ARC MATH
   Angles are in degrees, measured clockwise from 12 o'clock.
   Letters first sit on the TOP arc, later on the BOTTOM arc.
   Dots always take the opposite arc of the letters.
========================================================= */

const COUNT = NAME.length;

const TOP_ARC = Array.from(
  { length: COUNT },
  (_, i) => (i - (COUNT - 1) / 2) * Math.min(40, 150 / Math.max(COUNT - 1, 1)),
);

const BOTTOM_ARC = TOP_ARC.map((a) => (a < 0 ? -180 - a : 180 - a));

const rad = (deg: number) => (deg * Math.PI) / 180;

/* =========================================================
   STYLES (self-contained, every class starts with "pl-")
========================================================= */

const css = `
.pl-root{
  --u:min(0.85vh,1.06vw);
  --R:calc(var(--u) * 24.7);
  --dot:max(10px,calc(var(--u) * 2.8));
  position:fixed;
  inset:0;
  z-index:9999;
  overflow:hidden;
  background:#fef4eb;
  font-family:var(--font-sans,'Helvetica Neue',Helvetica,Arial,sans-serif);
  -webkit-font-smoothing:antialiased;
}

.pl-bg{position:absolute;inset:0;overflow:hidden}

.pl-blob{
  position:absolute;
  left:50%;
  top:50%;
  opacity:0;
  will-change:transform,opacity;
}
.pl-blue{
  width:170vw;height:92vh;
  background:radial-gradient(closest-side,#9cc0ef 0%,#a6c6ee 45%,rgba(166,198,238,0) 100%);
}
.pl-lav{
  width:150vw;height:60vh;
  background:radial-gradient(closest-side,#9ea8f6 0%,rgba(158,168,246,.85) 40%,rgba(158,168,246,0) 100%);
}
.pl-indigo{
  width:150vw;height:60vh;
  background:radial-gradient(closest-side,#4b4fb8 0%,rgba(75,79,184,.9) 45%,rgba(75,79,184,0) 100%);
}
.pl-orange{
  width:170vw;height:85vh;
  background:radial-gradient(closest-side,#f0863a 0%,#f08a40 42%,rgba(240,138,62,0) 100%);
}
.pl-white{
  width:130vw;height:78vh;
  background:radial-gradient(closest-side,rgba(255,255,255,.95) 0%,rgba(255,255,255,.7) 40%,rgba(255,255,255,0) 100%);
}
.pl-navy{
  position:absolute;
  inset:0;
  opacity:0;
  background:linear-gradient(180deg,#0e0c0d 0%,#0e0c0d 16%,#0b2653 58%,rgba(11,38,83,.92) 68%,rgba(11,38,83,0) 88%);
  will-change:transform,opacity;
}
.pl-cream{position:absolute;inset:0;background:#fef4eb;opacity:0}

.pl-grain{
  position:absolute;
  inset:-20%;
  pointer-events:none;
  opacity:.42;
  mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation:pl-grain .9s steps(1) infinite;
}
@keyframes pl-grain{
  0%{transform:translate(0,0)}
  20%{transform:translate(-3%,2%)}
  40%{transform:translate(2%,-3%)}
  60%{transform:translate(-2%,-2%)}
  80%{transform:translate(3%,3%)}
  100%{transform:translate(0,0)}
}

.pl-stage{position:absolute;inset:0}

.pl-word{
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  display:flex;
  gap:.46em;
  font-size:max(18px,calc(var(--u) * 4.4));
  font-weight:500;
  line-height:1;
}
.pl-letter{
  display:block;
  opacity:0;
  color:#141414;
  will-change:transform,opacity;
}

.pl-label{
  --wipe:-20;
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  font-size:max(11px,calc(var(--u) * 2));
  letter-spacing:.02em;
  color:#fff;
  white-space:nowrap;
  -webkit-mask-image:linear-gradient(90deg,#000 calc(var(--wipe) * 1%),transparent calc(var(--wipe) * 1% + 20%));
  mask-image:linear-gradient(90deg,#000 calc(var(--wipe) * 1%),transparent calc(var(--wipe) * 1% + 20%));
}

.pl-dot{
  position:absolute;
  left:50%;
  top:50%;
  width:0;
  height:0;
  opacity:0;
  will-change:transform,opacity;
}
.pl-dot i{
  position:absolute;
  left:0;
  top:calc(var(--R) * -1);
  width:var(--dot);
  height:var(--dot);
  margin:calc(var(--dot) / -2) 0 0 calc(var(--dot) / -2);
  border-radius:50%;
  background:#fff6e8;
}

@media (prefers-reduced-motion:reduce){
  .pl-grain{animation:none}
}
`;

/* =========================================================
   COMPONENT
========================================================= */

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const announceDone = () => window.dispatchEvent(new Event('preloader-done'));

    const finish = () => {
      document.body.style.overflow = prevOverflow;
      setVisible(false);
    };

    /* ---------- reduced motion: show the name, then fade out ---------- */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root
        .querySelectorAll<HTMLElement>('.pl-letter')
        .forEach((el) => (el.style.opacity = '1'));

      const fade = gsap.to(root, {
        opacity: 0,
        duration: 0.5,
        delay: 0.9,
        ease: 'power1.out',
        onStart: announceDone,
        onComplete: finish,
      });

      return () => {
        fade.kill();
        document.body.style.overflow = prevOverflow;
      };
    }

    /* ---------- sizes (same proportions as the reference video) ---------- */
    const vw = window.innerWidth / 100;
    const vh = window.innerHeight / 100;
    const u = Math.min(window.innerHeight * 0.0085, window.innerWidth * 0.0106);
    const R = u * 24.7;

    root.style.setProperty('--u', `${u}px`);
    root.style.setProperty('--R', `${R}px`);
    root.style.setProperty('--dot', `${Math.max(10, u * 2.8)}px`);

    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>('.pl-letter', root);
      const dots = gsap.utils.toArray<HTMLElement>('.pl-dot', root);

      /* where each letter naturally sits (the straight "ANKIT" line),
         measured relative to the screen centre */
      const natX = (i: number) => {
        const rect = letters[i].getBoundingClientRect();
        const rootRect = root.getBoundingClientRect();
        const currentX = Number(gsap.getProperty(letters[i], 'x')) || 0;
        return rect.left + rect.width / 2 - (rootRect.left + rootRect.width / 2) - currentX;
      };

      const arcX = (angles: number[]) => (i: number) =>
        R * Math.sin(rad(angles[i])) - natX(i);
      const arcY = (angles: number[]) => (i: number) =>
        -R * Math.cos(rad(angles[i]));

      /* ---------- start states ---------- */
      const blob = (sel: string, x: number, y: number) =>
        gsap.set(sel, { xPercent: -50, yPercent: -50, x, y, opacity: 0 });

      blob('.pl-orange', 10 * vw, 100 * vh);
      blob('.pl-blue', 0, -45 * vh);
      blob('.pl-lav', 0, 72 * vh);
      blob('.pl-indigo', 0, 78 * vh);
      blob('.pl-white', 0, -50 * vh);
      gsap.set('.pl-navy', { yPercent: -100, opacity: 0 });
      gsap.set('.pl-cream', { opacity: 0 });

      /* ---------- master timeline (times are in "video seconds") ---------- */
      const tl = gsap.timeline({ onComplete: finish });

      /* 1) A N K I T fades in, one letter at a time */
      tl.fromTo(
        letters,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.2, ease: 'power2.out' },
        1.0,
      );

      /* 2) colours start to bloom (cream -> blue + orange) */
      tl.to('.pl-white', { opacity: 0.9, y: -40 * vh, duration: 0.9, ease: 'power1.inOut' }, 3.0);
      tl.to('.pl-blue', { opacity: 0.9, y: -22 * vh, duration: 0.9, ease: 'power1.inOut' }, 3.0);
      tl.to('.pl-orange', { opacity: 1, x: 0, y: 12 * vh, duration: 1.8, ease: 'power2.inOut' }, 3.0);

      /* 3) letters open up onto the TOP arc, text turns white */
      tl.to(
        letters,
        {
          x: arcX(TOP_ARC),
          y: arcY(TOP_ARC),
          duration: 1.2,
          ease: 'power3.inOut',
          stagger: { each: 0.05, from: 'center' },
        },
        3.0,
      );
      tl.to(letters, { color: '#ffffff', duration: 1.0, ease: 'power1.inOut' }, 3.3);

      /* 4) label one + orbiting dots (bottom arc) */
      tl.fromTo('.pl-label-a', { '--wipe': -20 }, { '--wipe': 100, duration: 0.8, ease: 'power2.out' }, 4.2);

      tl.fromTo(
        dots,
        { rotation: (i: number) => BOTTOM_ARC[i] - 130 },
        {
          rotation: (i: number) => BOTTOM_ARC[i],
          duration: 1.6,
          ease: 'power3.out',
          stagger: 0.12,
        },
        4.1,
      );
      tl.to(dots, { opacity: 1, duration: 0.5, ease: 'none', stagger: 0.12 }, 4.1);

      /* background drifts: orange -> blue -> lavender */
      tl.to('.pl-orange', { opacity: 0.35, x: -35 * vw, y: -25 * vh, duration: 1.4, ease: 'power2.inOut' }, 4.8);
      tl.to('.pl-blue', { opacity: 1, y: 8 * vh, duration: 1.2, ease: 'power1.inOut' }, 4.8);
      tl.to('.pl-white', { opacity: 0.85, x: -38 * vw, y: 32 * vh, duration: 0.8, ease: 'power1.inOut' }, 4.9);
      tl.to('.pl-lav', { opacity: 0.75, y: 40 * vh, duration: 1.3, ease: 'power1.inOut' }, 4.9);
      tl.to('.pl-orange', { opacity: 0, duration: 0.7, ease: 'none' }, 6.2);
      tl.to('.pl-white', { opacity: 0.3, y: 38 * vh, duration: 0.9, ease: 'none' }, 5.7);

      /* orange sunrise from the bottom (just before the first label leaves) */
      tl.set('.pl-orange', { x: 30 * vw, y: 105 * vh, opacity: 0 }, 7.0);
      tl.to('.pl-orange', { opacity: 0.95, x: 18 * vw, y: 52 * vh, duration: 1.5, ease: 'power2.out' }, 7.1);

      /* 5) dots orbit away, label one is wiped out */
      tl.to(
        dots,
        {
          rotation: (i: number) => BOTTOM_ARC[i] + 110,
          duration: 1.0,
          ease: 'power2.in',
          stagger: 0.07,
        },
        7.4,
      );
      tl.to(dots, { opacity: 0, duration: 0.5, ease: 'power1.in', stagger: 0.07 }, 7.7);
      tl.to('.pl-label-a', { '--wipe': -20, duration: 0.7, ease: 'power2.in' }, 7.7);

      /* 6) letters close back into one straight line */
      tl.to(
        letters,
        {
          x: 0,
          y: 0,
          duration: 1.4,
          ease: 'power3.inOut',
          stagger: { each: 0.04, from: 'center' },
        },
        8.5,
      );

      tl.to('.pl-orange', { opacity: 0, x: 5 * vw, y: 110 * vh, duration: 1.6, ease: 'power2.in' }, 8.6);
      tl.to('.pl-blue', { y: -2 * vh, duration: 1.4, ease: 'power1.inOut' }, 8.6);
      tl.to('.pl-white', { opacity: 0.95, x: 40 * vw, y: -38 * vh, duration: 1.2, ease: 'power1.inOut' }, 8.6);

      /* 7) night falls: dark navy slides in from the top */
      tl.to('.pl-navy', { yPercent: 0, opacity: 1, duration: 1.8, ease: 'power2.inOut' }, 9.9);
      tl.to('.pl-white', { opacity: 0.75, x: 0, y: 58 * vh, duration: 1.2, ease: 'power1.inOut' }, 10.2);
      tl.to('.pl-indigo', { opacity: 1, y: 40 * vh, duration: 1.8, ease: 'power1.inOut' }, 10.4);

      /* 8) letters open up again, this time onto the BOTTOM arc */
      tl.to(
        letters,
        {
          x: arcX(BOTTOM_ARC),
          y: arcY(BOTTOM_ARC),
          duration: 1.2,
          ease: 'power3.inOut',
          stagger: { each: 0.05, from: 'center' },
        },
        11.2,
      );

      /* 9) label two + dots on the top arc */
      tl.set(dots, { rotation: (i: number) => TOP_ARC[i] - 130, opacity: 0 }, 11.6);
      tl.fromTo('.pl-label-b', { '--wipe': -20 }, { '--wipe': 100, duration: 0.8, ease: 'power2.out' }, 12.4);

      tl.fromTo(
        dots,
        { rotation: (i: number) => TOP_ARC[i] - 130 },
        {
          rotation: (i: number) => TOP_ARC[i],
          duration: 1.6,
          ease: 'power3.out',
          stagger: 0.12,
        },
        12.3,
      );
      tl.to(dots, { opacity: 1, duration: 0.5, ease: 'none', stagger: 0.12 }, 12.3);

      /* 10) everything fades out while the sky turns light, then cream */
      tl.to([...letters, '.pl-label-b', ...dots], { opacity: 0, duration: 0.6, ease: 'power1.in' }, 15.4);
      tl.to('.pl-navy', { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 15.1);
      tl.to('.pl-indigo', { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 15.1);
      tl.to('.pl-white', { opacity: 1, x: 0, y: 0, scale: 1.5, duration: 0.8, ease: 'power1.inOut' }, 15.4);
      tl.to('.pl-cream', { opacity: 1, duration: 0.6, ease: 'power1.inOut' }, 15.9);

      /* 11) preloader lifts up and the real site is revealed */
      tl.to(root, { yPercent: -100, duration: 1.0, ease: 'power4.inOut' }, 16.6);
      tl.call(announceDone, [], 17.1);

      tl.timeScale(SPEED);
    }, root);

    return () => {
      ctx.revert();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pl-root"
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <style>{css}</style>

      <div className="pl-bg" aria-hidden="true">
        <span className="pl-blob pl-blue" />
        <span className="pl-blob pl-lav" />
        <span className="pl-blob pl-indigo" />
        <span className="pl-blob pl-orange" />
        <span className="pl-blob pl-white" />
        <span className="pl-navy" />
        <span className="pl-cream" />
      </div>

      <div className="pl-grain" aria-hidden="true" />

      <div className="pl-stage" aria-hidden="true">
        <div className="pl-word">
          {NAME.split('').map((ch, i) => (
            <span key={i} className="pl-letter">
              {ch}
            </span>
          ))}
        </div>

        <span className="pl-label pl-label-a">{LABEL_ONE}</span>
        <span className="pl-label pl-label-b">{LABEL_TWO}</span>

        {NAME.split('').map((_, i) => (
          <span key={i} className="pl-dot">
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}