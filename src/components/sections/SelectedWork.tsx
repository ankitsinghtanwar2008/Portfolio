"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { projects } from "@/data/projects";

export default function SelectedWork() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    let target = track.scrollLeft;
    let current = track.scrollLeft;
    let animationFrame = 0;
    let isVisible = false;

    const maxScroll = () =>
      Math.max(0, track.scrollWidth - track.clientWidth);

    const animate = () => {
      current += (target - current) * 0.075;

      if (Math.abs(target - current) < 0.5) {
        current = target;
      }

      track.scrollLeft = current;

      if (current !== target) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        animationFrame = 0;
      }
    };

    const moveGallery = (amount: number) => {
      target = Math.max(0, Math.min(maxScroll(), target + amount));

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isVisible) return;

      // Trackpad horizontal gestures are handled natively.
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        return;
      }

      // Vertical page scrolling gently advances the gallery.
      if (Math.abs(event.deltaY) > 8) {
        moveGallery(event.deltaY * 0.45);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    section.addEventListener("wheel", handleWheel, {
      passive: true,
    });

    return () => {
      observer.disconnect();
      section.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section
      className="work-section dark-section"
      id="work"
      ref={sectionRef}
    >
      <div className="work-heading">
        <div>
          <p className="eyebrow">
            SELECTED PROJECTS / 2024—2026
          </p>

          <h2>
            Things I've
            <br />
            <span className="serif-italic">
              put into the world.
            </span>
          </h2>
        </div>

        <span className="work-instruction">
          SCROLL TO EXPLORE
          <ArrowRight size={14} />
        </span>
      </div>

      <div className="project-track" ref={trackRef}>
        {projects.map((project) => (
          <article
            className={`project-panel project-${project.slug}`}
            key={project.slug}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="project-visual"
              aria-label={`View ${project.title}`}
            >
              <div className="project-visual-top">
                <span>SELECTED PROJECT</span>
                <span>{project.number} / 08</span>
              </div>

              <div className="project-art-content">
                <span className="art-small">
                  {project.category}
                </span>

                <strong>
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

              <span className="project-visual-arrow">
                <ArrowUpRight size={22} />
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
                    <span key={technology}>
                      {technology}
                    </span>
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
        <span>DESIGNED & BUILT WITH INTENTION.</span>
      </div>
    </section>
  );
}