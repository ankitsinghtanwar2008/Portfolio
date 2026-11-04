"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    number: "01",
    title: "KhetHub",
    subtitle: "IoT Smart Farming Platform",
    description:
      "An agri-tech platform helping Indian farmers monitor crops, automate irrigation, and manage sharecropping agreements from one digital system.",
    stack: ["IoT", "AI/ML", "Node.js", "React.js", "MongoDB"],
    color: "#d9ff62",
    accent: "#17210d",
  },
  {
    number: "02",
    title: "GharSe",
    subtitle: "Full Stack MERN Application",
    description:
      "A production-grade MERN application with JWT authentication, REST APIs, scalable backend architecture, and a responsive React interface.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    color: "#ff5368",
    accent: "#3c1018",
  },
  {
    number: "03",
    title: "ATM Management System",
    subtitle: "Java Banking Application",
    description:
      "A secure ATM management system with authentication, transaction handling, payment functionality, and MySQL database integration.",
    stack: ["Java", "OOP", "MySQL", "Authentication"],
    color: "#7eb5ff",
    accent: "#101d35",
  },
  {
    number: "04",
    title: "Krishna Tent House",
    subtitle: "Business Website",
    description:
      "A responsive business website designed to improve online presence, usability, and customer engagement for a local client.",
    stack: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    color: "#ffad68",
    accent: "#352012",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Research",
    text: "Understand the problem, users, requirements, and technical constraints before building the foundation.",
  },
  {
    number: "02",
    title: "Design",
    text: "Create a clean architecture and intuitive interface that keeps the product useful and easy to navigate.",
  },
  {
    number: "03",
    title: "Develop",
    text: "Build scalable frontend and backend systems using modern engineering practices and clean code.",
  },
  {
    number: "04",
    title: "Deploy",
    text: "Test, optimize, release, and continuously improve the product after it reaches real users.",
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector("#projects");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const progress = Math.min(
        0.999,
        Math.max(0, -rect.top / (section.clientHeight - window.innerHeight)),
      );

      setActiveProject(
        Math.min(projects.length - 1, Math.floor(progress * projects.length)),
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const project = projects[activeProject];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-intro">
        <p>POV: When your portfolio looks better than your resume. 🔥</p>
      </div>

      <div className="projects-scroll">
        <div className="projects-sticky">
          <div className="projects-heading">
            <span className="section-tag">Featured Projects</span>
            <h2>
              Work that
              <br />
              speaks
              <br />
              for itself.
            </h2>
            <p>
              A selection of projects that showcase my experience in full-stack
              development, Java, AI/ML, IoT, and modern architecture.
            </p>
          </div>

          <div
            className="project-card"
            style={{
              background: project.accent,
              borderColor: project.color,
            }}
          >
            <div className="project-card-top">
              <span style={{ color: project.color }}>{project.number}</span>
              <span className="project-status">Featured Project</span>
            </div>

            <div className="project-card-content">
              <p style={{ color: project.color }}>{project.subtitle}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="project-stack">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className="project-links">
                <a href="#contact">View Project ↗</a>
                <a href="https://github.com/ankitsinghtanwar2008">
                  Source Code ↗
                </a>
              </div>
            </div>
          </div>

          <div className="project-dots">
            {projects.map((item, index) => (
              <span
                key={item.number}
                className={index === activeProject ? "active" : ""}
                style={{
                  backgroundColor:
                    index === activeProject ? item.color : undefined,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="process-section">
        <div className="process-heading">
          <span className="section-tag">My Process</span>
          <h2>
            Here&apos;s how I turn ideas into real-world applications.
          </h2>
          <p>
            I follow a structured, creative, and highly technical approach to
            turn ideas into robust full-stack applications.
          </p>
        </div>

        <div className="process-line" />

        <div className="process-grid">
          {processSteps.map((step, index) => (
            <article
              key={step.number}
              className={`process-card ${index % 2 === 0 ? "highlighted" : ""}`}
            >
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}