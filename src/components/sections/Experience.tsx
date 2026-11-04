"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight, Award, BriefcaseBusiness } from "lucide-react";

const experiences = [
  {
    id: 1,
    period: "March 2026 – Present",
    category: "ENTREPRENEURSHIP",
    role: "Founder & Lead Developer",
    organization: "KhetHub Pvt. Ltd.",
    description: "Founded an AgriTech startup building IoT-based smart farming solutions for Indian farmers. Leading end-to-end product development and business strategy.",
    highlights: [
      "Designed a smart agriculture platform with automated irrigation and real-time crop monitoring.",
      "Developed a digital ShareCropping management system.",
      "Actively pursuing government and private funding to scale the product."
    ],
    bgClass: "khethub-bg" // For CSS background image
  },
  {
    id: 2,
    period: "July 2026 – August 2026",
    category: "RESEARCH",
    role: "Cybersecurity Research Intern",
    organization: "Indian Institute of Technology Roorkee",
    description: "Completed a research internship at the Department of Computer Science and Engineering, IIT Roorkee, under the ISEA Project Phase-3, an initiative of MeitY, Government of India.",
    highlights: [
      "Research topic: An Attack Graph-Based Probabilistic Security Metric.",
      "Research under Prof. Sugata Gangopadhyay.",
      "ISEA Project Phase-3."
    ],
    bgClass: "iit-bg" // For CSS background image
  },
  {
    id: 3,
    period: "June 2025 – August 2025",
    category: "INTERNSHIP",
    role: "Java Development Intern",
    organization: "CodeSoft (Virtual)",
    description: "Completed a virtual Java development internship focused on object-oriented programming and practical application development.",
    highlights: [
      "Developed modular Java applications applying OOP principles.",
      "Built a secure ATM Management System using Java and MySQL.",
      "Practiced Git and GitHub for version control in a structured environment."
    ],
    bgClass: "java-bg" // For CSS background image
  }
];

const achievements = [
  { id: 1, category: "AMBASSADORSHIP", title: "Google Student Ambassador", organization: "Google", date: "May 2026" },
  { id: 2, category: "FIRST POSITION", title: "National Level Hackathon Winner", organization: "Manthon", date: "2026" },
  { id: 3, category: "FIRST POSITION", title: "University Level Hackathon Winner", organization: "COER University", date: "2026" },
  { id: 4, category: "INNOVATION", title: "Ideathon Participant", organization: "Ideathon Competition", date: "2026" }
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        y: 40,
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
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
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
    <section id="experience" className="experience-section dark-section" ref={sectionRef}>
      <div className="section-container">

        <div className="section-heading reveal" style={{ marginBottom: "50px" }}>
          <h2 
            className="minimal-title"
            style={{
              fontFamily: 'var(--font-serif, "Playfair Display", serif)',
              fontSize: 'clamp(48px, 6vw, 96px)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              margin: '0 0 16px 0'
            }}
          >
            The journey<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#a36142' }}>
              so far.
            </em>
          </h2>
          <p 
            className="subtitle"
            style={{
              color: '#a1a1aa',
              fontSize: '15px',
              fontWeight: 400,
              letterSpacing: '0.01em',
              maxWidth: '500px',
              margin: 0,
              lineHeight: 1.5
            }}
          >
            Research, engineering, entrepreneurship and continuous learning.
          </p>
        </div>

        <div className="timeline">
          {experiences.map((item) => (
            <article className={`timeline-item ${item.bgClass}`} key={item.id}>
              
              {/* Dark overlay specifically for the background image to fade it */}
              <div className="timeline-item-overlay"></div>

              {/* The content sits above the overlay */}
              <div className="timeline-content-wrapper">
                <div className="timeline-left">
                  <div className="timeline-date">{item.period}</div>
                  <ArrowUpRight className="timeline-arrow" size={24} />
                </div>

                <div className="timeline-content">
                  <span className="experience-category">
                    <BriefcaseBusiness size={14} />
                    {item.category}
                  </span>
                  
                  <h3 className="role-title">{item.role}</h3>
                  <h4 className="organization-title">{item.organization}</h4>
                  
                  <p className="role-desc">{item.description}</p>
                  
                  <ul className="role-highlights">
                    {item.highlights.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
            </article>
          ))}
        </div>

        <div className="recognition-heading" style={{ marginTop: "80px", marginBottom: "30px" }}>
          <h3 
            className="minimal-title"
            style={{
              fontFamily: 'var(--font-serif, "Playfair Display", serif)',
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 300,
              color: '#ffffff',
              margin: 0
            }}
          >
            Things worth remembering.
          </h3>
        </div>

        <div className="achievement-grid">
          {achievements.map((item) => (
            <article className="achievement-card" key={item.id}>
              <Award className="achievement-icon" size={20} />
              <span className="achievement-category">{item.category}</span>
              <h4 className="achievement-title">{item.title}</h4>
              <div className="achievement-bottom">
                <span className="achievement-org">{item.organization}</span>
                <span className="achievement-date">{item.date}</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}