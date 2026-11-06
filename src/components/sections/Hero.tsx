"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { NoiseBackground } from "@/components/ui/noise-background";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            ".hero-title-line",
            ".hero-description",
            ".hero-actions",
            ".hero-portrait",
            ".hero-orbit",
          ],
          {
            opacity: 1,
            y: 0,
            clearProps: "transform",
          }
        );

        return;
      }

      const timeline = gsap.timeline({
        delay: 0.3,
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".hero-title-line", {
          yPercent: 110,
          rotation: 2,
          opacity: 0,
          stagger: 0.13,
          duration: 1.1,
          ease: "power4.out",
        })
        .from(
          ".hero-description, .hero-actions",
          {
            y: 20,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-portrait",
          {
            scale: 1.08,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=1"
        )
        .from(
          ".hero-orbit",
          {
            scale: 0.7,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
          },
          "-=1"
        );

      gsap.to(".hero-orbit-core", {
        rotate: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".hero-orbit-ring", {
        rotate: -360,
        duration: 42,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".hero-portrait img", {
        y: -12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="hero dark-section"
      id="top"
      ref={heroRef}
    >
      <div className="hero-grain" />

      <div className="hero-content">
        <div className="hero-main">
          <div className="hero-copy">
            <div className="hero-title-wrap">
              <h1>
                <span className="title-mask">
                  <span className="hero-title-line">
                    CODE WITH
                  </span>
                </span>

                <span className="title-mask">
                  <span className="hero-title-line title-outline">
                    PURPOSE
                  </span>
                </span>

                <span className="title-mask">
                  <span className="hero-title-line">
                    & CRAFT<span className="hero-period">.</span>
                  </span>
                </span>
              </h1>
            </div>

            <p className="hero-description">
              A developer and founder turning thoughtful ideas into
              meaningful technology, intelligent products and
              well-crafted digital experiences.
            </p>

            <div className="hero-actions">
              <a href="#work" className="hero-action-link">
                <NoiseBackground
                  containerClassName="w-fit rounded-full"
                  gradientColors={[
                    "rgba(255, 100, 150, 1)",
                    "rgba(100, 150, 255, 1)",
                    "rgba(255, 200, 100, 1)",
                  ]}
                >
                  <button className="hero-action-button">
                    <span>EXPLORE MY WORK</span>
                    <ArrowUpRight size={14} />
                  </button>
                </NoiseBackground>
              </a>

              <a href="#about" className="hero-action-link">
                <NoiseBackground
                  containerClassName="w-fit rounded-full"
                  gradientColors={[
                    "rgba(100, 150, 255, 1)",
                    "rgba(255, 100, 150, 1)",
                    "rgba(255, 200, 100, 1)",
                  ]}
                >
                  <button className="hero-action-button">
                    <span>MORE ABOUT ME</span>
                  </button>
                </NoiseBackground>
              </a>
            </div>
          </div>

          <div className="hero-visual">
            {/* Portrait with seamless background blending */}
            <div className="hero-portrait">
              <Image
                src="/images/profile/ankit1.jpg"
                alt="Ankit Singh"
                fill
                priority
                sizes="(max-width: 768px) 85vw, 48vw"
                className="hero-portrait-image"
              />

              <div className="hero-portrait-overlay" />

              <span className="portrait-caption">
                ANKIT SINGH
              </span>
            </div>

            {/* Orbit animation */}
            <div className="hero-orbit">
              <div className="hero-orbit-ring">
                <i />
                <i />
                <i />
              </div>

              <div className="hero-orbit-core">
                <span>AS</span>
              </div>

              <span className="orbit-label">
                IDEAS INTO IMPACT
              </span>
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <span className="hero-location">
            BASED IN INDIA · AVAILABLE WORLDWIDE
          </span>
        </div>
      </div>
    </section>
  );
}