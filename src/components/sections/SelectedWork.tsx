"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { projects } from "@/data/projects";

// Github Repository Links Mapping
const repoLinks: Record<string, string> = {
  "khethub": "https://github.com/ankitsinghtanwar2008/KhetHub",
  "gharse": "https://github.com/ankitsinghtanwar2008/GharSe",
  "voice-assistant": "https://github.com/ankitsinghtanwar2008/VoiceAssistant",
  "hanuman-chalisa": "https://github.com/ankitsinghtanwar2008/HanumanChalisa",
  "volume-booster": "https://github.com/ankitsinghtanwar2008/VolumeBooster",
  "atm-management": "https://github.com/ankitsinghtanwar2008/-ATM-INTERFACE",
};

// Private Client Projects
const privateProjects = ["trapla", "krishna-tent-house"];

export default function SelectedWork() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [toastMessage, setToastMessage] = useState("");

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

  const handleProjectClick = (e: React.MouseEvent, slug: string) => {
    if (privateProjects.includes(slug)) {
      e.preventDefault(); // Naye page par jaane se rokega
      setToastMessage("This is a private client project. Repository access is restricted.");
      
      setTimeout(() => {
        setToastMessage("");
      }, 3500);
    }
  };

  return (
    <section
      className="work-section dark-section"
      id="work"
      ref={sectionRef}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .private-toast-popup {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: #ffffff;
          color: #000000;
          padding: 14px 24px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 9999;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}} />

      {/* Professional Notification Toast */}
      {toastMessage && (
        <div className="private-toast-popup">
          <Lock size={18} color="#000" />
          {toastMessage}
        </div>
      )}

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
        {projects.map((project) => {
          const isPrivate = privateProjects.includes(project.slug);
          const destinationUrl = isPrivate ? "#" : (repoLinks[project.slug] || "#");

          return (
            <article
              className={`project-panel project-${project.slug}`}
              key={project.slug}
            >
              {/* Next.js <Link> ki jagah external <a> tag use kiya hai */}
              <a
                href={destinationUrl}
                target={isPrivate ? "_self" : "_blank"}
                rel={isPrivate ? "" : "noopener noreferrer"}
                className="project-visual"
                aria-label={`View ${project.title}`}
                onClick={(e) => handleProjectClick(e, project.slug)}
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
                  {isPrivate ? <Lock size={22} /> : <ArrowUpRight size={22} />}
                </span>
              </a>

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

                <a
                  href={destinationUrl}
                  target={isPrivate ? "_self" : "_blank"}
                  rel={isPrivate ? "" : "noopener noreferrer"}
                  className="project-open"
                  aria-label={`Explore ${project.title}`}
                  onClick={(e) => handleProjectClick(e, project.slug)}
                >
                  {isPrivate ? <Lock size={23} /> : <ArrowUpRight size={23} />}
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="work-footnote">
        <span>MORE EXPERIMENTS IN PROGRESS</span>
        <span>DESIGNED & BUILT WITH INTENTION.</span>
      </div>
    </section>
  );
}