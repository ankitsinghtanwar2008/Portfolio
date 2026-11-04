"use client";

import { useEffect, useRef, useState } from "react";

const roles = [
  "FULL STACK DEVELOPER",
  "AI/ML ENTHUSIAST",
  "FOUNDER & BUILDER",
  "SMART FARMING ENGINEER",
];

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const heroTop = heroRef.current.offsetTop;
      const heroHeight = heroRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollDistance = heroHeight - viewportHeight;
      const currentScroll = window.scrollY - heroTop;

      const nextProgress = Math.min(
        1,
        Math.max(0, currentScroll / scrollDistance),
      );

      setProgress(nextProgress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const roleIndex = Math.min(
    roles.length - 1,
    Math.floor(progress * roles.length),
  );

  const imageTranslateY = progress * 90 - 35;
  const imageTranslateX = Math.sin(progress * Math.PI * 2) * 35;
  const imageScale = 1.02 + progress * 0.18;
  const imageRotate = progress * 5 - 2.5;
  const imageBlur = Math.max(0, Math.abs(progress - 0.48) * 3);

  const leftOpacity = Math.max(0, 1 - progress * 1.5);
  const introOpacity = Math.min(1, Math.max(0, (progress - 0.58) * 3));

  return (
    <section ref={heroRef} id="home" className="hero-scroll-section">
      <div className="hero-sticky">
        <div className="hero-background-grid" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <header className="site-nav">
          <a href="#home" className="brand">
            ANKIT<span>.</span>
          </a>

          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </nav>

          <a href="#contact" className="nav-button">
            Let&apos;s Talk
          </a>
        </header>

        <main className="hero-content">
          <div
            className="hero-copy"
            style={{
              opacity: leftOpacity,
              transform: `translateY(${progress * -35}px)`,
            }}
          >
            <p className="eyebrow">HELLO, I&apos;M ANKIT</p>

            <h1>
              BUILDING
              <br />
              <span>SCALABLE</span>
              <br />
              SYSTEMS
            </h1>

            <p className="hero-description">
              Full Stack Developer and Founder building practical products
              with Java, React, Node.js, AI/ML, and IoT.
            </p>
          </div>

          <div className="portrait-stage">
            <div
              className="portrait-halo"
              style={{
                transform: `scale(${1 + progress * 0.25})`,
                opacity: 0.65 - progress * 0.2,
              }}
            />

            <div
              className="portrait-frame"
              style={{
                transform: `
                  translate(${imageTranslateX}px, ${imageTranslateY}px)
                  scale(${imageScale})
                  rotate(${imageRotate}deg)
                `,
                filter: `blur(${imageBlur}px)`,
              }}
            >
              <img
                src="/profile.jpg"
                alt="Portrait of Ankit Singh"
                className="portrait-image"
              />
            </div>
          </div>

          <div className="hero-side-copy">
            <p className="side-label">CURRENTLY BUILDING</p>
            <p className="side-text">
              KhetHub — an IoT smart farming platform for Indian farmers.
            </p>

            <div className="side-line" />

            <p className="side-label">SPECIALIZING IN</p>
            <p className="side-text">
              Full stack architecture, responsive interfaces, and real-world
              software products.
            </p>
          </div>

          <div className="role-display">
            <p className="role-kicker">I&apos;M A</p>
            <h2 key={roleIndex}>{roles[roleIndex]}</h2>
          </div>

          <div className="hero-actions">
            <a href="#projects" className="primary-button">
              View My Work
              <span>↗</span>
            </a>

            <a href="#contact" className="secondary-button">
              Contact Me
            </a>
          </div>

          <div
            className="intro-card"
            style={{
              opacity: introOpacity,
              transform: `translateY(${(1 - introOpacity) * 25}px)`,
            }}
          >
            <div className="intro-profile">
              <img src="/profile.jpg" alt="Ankit Singh" />

              <div className="availability">
                <span />
                OPEN TO OPPORTUNITIES
              </div>
            </div>

            <div className="intro-content">
              <p className="system-label">◉ SYSTEM PROFILE</p>

              <h2>
                Hello, I&apos;m
                <br />
                Ankit Singh
              </h2>

              <p>
                Founder of KhetHub Pvt. Ltd. and a B.Tech Computer Science
                student focused on building scalable software, smart farming
                systems, and useful digital products.
              </p>

              <div className="mini-stats">
                <div>
                  <strong>Full Stack</strong>
                  <span>ARCHITECTURE</span>
                </div>

                <div>
                  <strong>AI/ML</strong>
                  <span>INTELLIGENT SYSTEMS</span>
                </div>

                <div>
                  <strong>IoT</strong>
                  <span>SMART FARMING</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div className="scroll-progress">
          <span>↓ SCROLL TO EXPLORE</span>
          <div className="progress-track">
            <div style={{ height: `${progress * 100}%` }} />
          </div>
        </div>

        <div className="hero-counter">
          <span>00</span>
          <div />
          <span>04</span>
        </div>
      </div>
    </section>
  );
}