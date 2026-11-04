"use client";

import {
  Code2,
  Database,
  TerminalSquare,
  Globe,
  MonitorSmartphone,
  Cpu,
  ServerCog,
  Layers,
  FileJson,
  Github
} from "lucide-react";

// Teri skills ko row ke hisaab se divide kiya hai infinite scroll ke liye
const rowOneSkills = [
  { name: "Java", icon: <Code2 /> },
  { name: "JavaScript", icon: <FileJson /> },
  { name: "Python", icon: <TerminalSquare /> },
  { name: "HTML5", icon: <Globe /> },
  { name: "CSS3", icon: <Layers /> },
  { name: "Node.js", icon: <ServerCog /> },
  { name: "Express.js", icon: <ServerCog /> },
];

const rowTwoSkills = [
  { name: "MongoDB", icon: <Database /> },
  { name: "MySQL", icon: <Database /> },
  { name: "React.js", icon: <MonitorSmartphone /> },
  { name: "Tailwind CSS", icon: <Layers /> },
  { name: "Bootstrap", icon: <Layers /> },
  { name: "Git", icon: <TerminalSquare /> },
  { name: "GitHub", icon: <Github /> },
];

const rowThreeSkills = [
  { name: "Data Structures", icon: <Cpu /> },
  { name: "Algorithms", icon: <Cpu /> },
  { name: "OOP", icon: <Code2 /> },
  { name: "DBMS", icon: <Database /> },
  { name: "Operating Systems", icon: <TerminalSquare /> },
  { name: "AI / ML", icon: <Cpu /> },
  { name: "IoT", icon: <ServerCog /> },
];

export default function Technical() {
  return (
    <section className="technical-section" id="technical">
      <div className="technical-header">
        <h2 className="minimal-title">
          My Tech <em>Arsenal.</em>
        </h2>
        <p className="subtitle">
          The languages, tools, and frameworks I use to build scalable products.
        </p>
      </div>

      <div className="marquee-wrapper">
        {/* Row 1 - Moves Left */}
        <div className="marquee-track">
          <div className="marquee-content scroll-left">
            {[...rowOneSkills, ...rowOneSkills].map((skill, index) => (
              <div className="skill-card" key={index}>
                <div className="skill-icon">{skill.icon}</div>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Moves Right */}
        <div className="marquee-track">
          <div className="marquee-content scroll-right">
            {[...rowTwoSkills, ...rowTwoSkills].map((skill, index) => (
              <div className="skill-card" key={index}>
                <div className="skill-icon">{skill.icon}</div>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 - Moves Left */}
        <div className="marquee-track">
          <div className="marquee-content scroll-left">
            {[...rowThreeSkills, ...rowThreeSkills].map((skill, index) => (
              <div className="skill-card" key={index}>
                <div className="skill-icon">{skill.icon}</div>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* This creates the faded edges effect you asked for */}
        <div className="marquee-fade-overlay"></div>
      </div>
    </section>
  );
}