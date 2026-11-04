"use client";

import { gsap, ScrollTrigger } from "./gsap";

export const revealElements = (scope: HTMLElement) => {
  const elements = scope.querySelectorAll<HTMLElement>(".reveal");

  const animations = Array.from(elements).map((element) =>
    gsap.fromTo(
      element,
      {
        y: 45,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
        },
      }
    )
  );

  return () => {
    animations.forEach((animation) => animation.scrollTrigger?.kill());
    animations.forEach((animation) => animation.kill());
  };
};

export const splitTextReveal = (
  element: HTMLElement,
  delay = 0
) => {
  return gsap.fromTo(
    element,
    {
      yPercent: 110,
      opacity: 0,
    },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.2,
      delay,
      ease: "power4.out",
    }
  );
};

export const imageReveal = (element: HTMLElement) => {
  return gsap.fromTo(
    element,
    {
      clipPath: "inset(0 0 100% 0)",
      scale: 1.08,
    },
    {
      clipPath: "inset(0 0 0% 0)",
      scale: 1,
      duration: 1.5,
      ease: "power3.inOut",
    }
  );
};

export { ScrollTrigger };