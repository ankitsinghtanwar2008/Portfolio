"use client";

import {
  Code2, Database, TerminalSquare, Globe, 
  MonitorSmartphone, Cpu, ServerCog, Layers, 
  FileJson, Github, AppWindow, Network, HardDrive
} from "lucide-react";

// Arrays ko multiply karne ka function taaki scroll infinite ho
const createMarquee = (items: any[]) => [...items, ...items, ...items];

// ROW 1 - Left to Right
const row1 = [
  { type: "empty" },
  { type: "icon", name: "Java", icon: <Code2 size={32} color="#f89820" /> },
  { type: "empty" },
  { type: "icon", name: "JavaScript", icon: <FileJson size={32} color="#f7df1e" /> },
  { type: "empty" },
  { type: "icon", name: "Python", icon: <TerminalSquare size={32} color="#3776ab" /> },
  { type: "icon", name: "HTML5", icon: <Globe size={32} color="#e34f26" /> },
  { type: "empty" },
];

// ROW 2 - Right to Left
const row2 = [
  { type: "icon", name: "React.js", icon: <MonitorSmartphone size={32} color="#61dafb" /> },
  { type: "empty" },
  { type: "icon", name: "Node.js", icon: <ServerCog size={32} color="#339933" /> },
  { type: "empty" },
  { type: "empty" },
  { type: "icon", name: "MongoDB", icon: <Database size={32} color="#47a248" /> },
  { type: "icon", name: "CSS3", icon: <Layers size={32} color="#1572b6" /> },
  { type: "empty" },
];

// ROW 3 - Left to Right
const row3 = [
  { type: "empty" },
  { type: "empty" },
  { type: "icon", name: "Git", icon: <TerminalSquare size={32} color="#f05032" /> },
  { type: "icon", name: "GitHub", icon: <Github size={32} color="#181717" /> },
  { type: "empty" },
  { type: "icon", name: "MySQL", icon: <Database size={32} color="#4479a1" /> },
  { type: "empty" },
  { type: "icon", name: "Express.js", icon: <ServerCog size={32} color="#000000" /> },
];

// ROW 4 - Right to Left
const row4 = [
  { type: "icon", name: "Tailwind CSS", icon: <AppWindow size={32} color="#38b2ac" /> },
  { type: "empty" },
  { type: "icon", name: "DSA", icon: <Network size={32} color="#8b5cf6" /> },
  { type: "empty" },
  { type: "icon", name: "DBMS", icon: <HardDrive size={32} color="#ef4444" /> },
  { type: "empty" },
  { type: "icon", name: "AI/ML", icon: <Cpu size={32} color="#10b981" /> },
  { type: "empty" },
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

      <div className="grid-marquee-wrapper">
        
        {/* Track 1 */}
        <div className="grid-marquee-track">
          <div className="grid-marquee-content scroll-left">
            {createMarquee(row1).map((item, i) => (
              <div key={i} className={`grid-box ${item.type === "empty" ? "box-empty" : "box-icon"}`}>
                {item.type === "icon" && (
                  <>
                    {item.icon}
                    <span className="box-tooltip">{item.name}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Track 2 */}
        <div className="grid-marquee-track">
          <div className="grid-marquee-content scroll-right">
            {createMarquee(row2).map((item, i) => (
              <div key={i} className={`grid-box ${item.type === "empty" ? "box-empty" : "box-icon"}`}>
                {item.type === "icon" && (
                  <>
                    {item.icon}
                    <span className="box-tooltip">{item.name}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Track 3 */}
        <div className="grid-marquee-track">
          <div className="grid-marquee-content scroll-left">
            {createMarquee(row3).map((item, i) => (
              <div key={i} className={`grid-box ${item.type === "empty" ? "box-empty" : "box-icon"}`}>
                {item.type === "icon" && (
                  <>
                    {item.icon}
                    <span className="box-tooltip">{item.name}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Track 4 */}
        <div className="grid-marquee-track">
          <div className="grid-marquee-content scroll-right">
            {createMarquee(row4).map((item, i) => (
              <div key={i} className={`grid-box ${item.type === "empty" ? "box-empty" : "box-icon"}`}>
                {item.type === "icon" && (
                  <>
                    {item.icon}
                    <span className="box-tooltip">{item.name}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}