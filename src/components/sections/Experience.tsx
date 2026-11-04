"use client";

import { useEffect, useRef } from "react";
import { experiences, achievements } from "@/data/experience";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowUpRight, Award, BriefcaseBusiness } from "lucide-react";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        x: -35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".achievement-card", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".achievement-grid",
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="section-container">

        <div className="section-heading reveal">
          <span className="eyebrow">04 / EXPERIENCE</span>
          <h2>
            The journey
            <br />
            <em>so far.</em>
          </h2>
          <p>
            Research, engineering, entrepreneurship and continuous learning.
          </p>
        </div>

        <div className="timeline">
          {experiences.map((item) => (
            <article className="timeline-item" key={item.id}>
              <div className="timeline-date">{item.period}</div>

              <div className="timeline-content">
                <span className="experience-category">
                  <BriefcaseBusiness size={14} />
                  {item.category}
                </span>

                <h3>{item.role}</h3>
                <h4>{item.organization}</h4>

                <p>{item.description}</p>

                <ul>
                  {item.highlights.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              <ArrowUpRight className="timeline-arrow" />
            </article>
          ))}
        </div>

        <div className="recognition-heading">
          <span className="eyebrow">RECOGNITION / MILESTONES</span>
          <h3>Things worth remembering.</h3>
        </div>

        <div className="achievement-grid">
          {achievements.map((item) => (
            <article className="achievement-card" key={item.id}>
              <Award size={22} />

              <span>{item.category}</span>

              <h4>{item.title}</h4>

              <p>{item.organization}</p>

              <small>{item.date}</small>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}