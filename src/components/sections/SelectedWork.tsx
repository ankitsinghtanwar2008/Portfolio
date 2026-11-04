"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SelectedWork() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const track = section.querySelector<HTMLElement>(".project-track");

      if (
        track &&
        window.matchMedia("(min-width: 900px)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${Math.max(0, track.scrollWidth - window.innerWidth)}`,
            invalidateOnRefresh: true,
          },
        });
      } else {
        gsap.from(".project-panel", {
          y: 35,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: track,
            start: "top 85%",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="work-section dark-section" id="work" ref={ref}>
      <div className="work-heading">
        <div>
          <p className="eyebrow">04 / SELECTED WORK</p>

          <h2>
            Things I've
            <br />
            <span className="serif-italic">put into the world.</span>
          </h2>
        </div>

        <span className="work-instruction">
          DRAG / SCROLL TO EXPLORE ↗
        </span>
      </div>

      <div className="project-track">
        {projects.filter((project) => project.featured).map((project) => (
          <article
            className={`project-panel project-${project.slug}`}
            key={project.slug}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="project-visual"
            >
              <div className="project-visual-top">
                <span>AS / SELECTED WORK</span>
                <span>{project.number} — 03</span>
              </div>

              <div className="project-art-content">
                <span className="art-small">{project.category}</span>

                <strong
                  className={
                    project.slug === "gharse" ? "serif-italic" : ""
                  }
                >
                  {project.title}
                  <span>.</span>
                </strong>

                <span className="art-bottom">
                  {project.description}
                </span>
              </div>

              <span className="project-visual-index">
                {project.number}
              </span>
            </Link>

            <div className="project-info">
              <div>
                <p className="project-category">
                  {project.category} · {project.year}
                </p>

                <h3>{project.title}</h3>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="project-stack">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="project-open"
                aria-label={`Explore ${project.title}`}
              >
                <ArrowUpRight size={23} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="work-footnote">
        <span>MORE EXPERIMENTS IN PROGRESS</span>
        <span>03 / 03</span>
      </div>
    </section>
  );
}