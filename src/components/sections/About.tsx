"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { gsap } from "@/lib/gsap";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll(
        ".about-heading, .about-photo, .about-description, .about-link"
      );

      if (prefersReducedMotion) {
        gsap.set(elements, { opacity: 1, y: 0 });
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          const timeline = gsap.timeline();

          timeline
            .fromTo(
              ".about-heading",
              { y: 35, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
              }
            )
            .fromTo(
              ".about-photo",
              { scale: 0.94, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 1.1,
                ease: "power3.out",
              },
              "-=0.4"
            )
            .fromTo(
              ".about-description",
              { y: 25, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
              },
              "-=0.5"
            )
            .fromTo(
              ".about-link",
              { y: 15, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
              },
              "-=0.3"
            );

          observer.disconnect();
        },
        { threshold: 0.2 }
      );

      observer.observe(section);

      return () => observer.disconnect();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="about-section"
      id="about"
      ref={sectionRef}
    >
      <div className="about-background">
        <Image
          src="/images/profile/ankit2.jpg"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="about-background-image"
        />
      </div>

      <div className="about-background-overlay" />

      <div className="about-card">
        <div className="about-card-top">
          <div>
            <h2 className="about-heading">ABOUT</h2>
          </div>

          <div className="about-card-navigation">
            <a href="#work">WORK</a>
            <a href="#experience">EXPERIENCE</a>
            {/* Isko bhi update karke new page par bhej diya h */}
            <Link href="/contact">CONTACT</Link>
          </div>
        </div>

        <div className="about-card-content">
          <div className="about-photo">
            <Image
              src="/images/profile/ankit.jpg"
              alt="Ankit Singh"
              fill
              sizes="(max-width: 768px) 80vw, 38vw"
              className="about-photo-image"
            />
            
            {/* WAPAS ADD KIYA GAYA - Image Caption */}
            <span className="about-photo-caption">
              ANKIT SINGH
            </span>
          </div>

          <div className="about-text">
            <span className="about-eyebrow">
              DEVELOPER · FOUNDER · TECHNOLOGY ENTHUSIAST
            </span>

            <h3>
              Building ideas into
              <span> meaningful technology.</span>
            </h3>

            <p className="about-description">
              I'm Ankit Singh, a Computer Science student at COER
              University, Roorkee, specializing in Artificial
              Intelligence and Machine Learning.
            </p>

            <p className="about-description">
              I enjoy building products from the ground up — from
              understanding a problem and designing its architecture
              to developing full-stack applications and exploring
              intelligent technology.
            </p>

            <p className="about-description">
              As the founder of KhetHub, I'm working on technology-driven
              solutions for agriculture. I'm also interested in
              cybersecurity research, product engineering and
              creating technology that solves real-world problems.
            </p>

            {/* Directs to contact page */}
            <Link
              href="/contact"
              className="about-link"
            >
              LET'S CONNECT
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        
        {/* WAPAS ADD KIYA GAYA - Bottom Labels */}
        <div className="about-card-bottom">
          <span>COMPUTER SCIENCE · AI & MACHINE LEARNING</span>
          <span>INDIA</span>
        </div>
      </div>
    </section>
  );
}