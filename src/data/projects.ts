import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "khethub",
    number: "01",
    title: "KhetHub",
    category: "AGRITECH / STARTUP",
    year: "2026 — PRESENT",
    description:
      "Building technology-driven solutions to make farming smarter, more connected and more manageable.",
    longDescription:
      "KhetHub is an AgriTech startup focused on smart farming and farm management. The platform brings together crop monitoring, agricultural technology, IoT-based concepts and digital farm operations.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AI/ML",
      "IoT",
    ],
    role: "Founder & Lead Developer",
    status: "ONGOING",
    coverImage: "/images/projects/khethub.jpg",
    website: "https://khethub.com",
    github: "https://github.com/ankitsinghtanwar2008/KhetHub",
    featured: true,
  },

  {
    slug: "gharse",
    number: "02",
    title: "GharSe",
    category: "FOODTECH / FULL STACK",
    year: "2026",
    description:
      "Connecting local home cooks with students and people living away from home.",
    longDescription:
      "GharSe is a full-stack food delivery concept designed around homemade food. It focuses on connecting local home cooks with customers through a digital platform.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
    ],
    role: "Full Stack Developer",
    status: "DEVELOPED",
    coverImage: "/images/projects/gharse.jpg",
    featured: true,
  },

  {
    slug: "trapla",
    number: "03",
    title: "TRAPLA",
    category: "EDTECH / WEB EXPERIENCE",
    year: "2026",
    description:
      "A digital experience designed for a training and placement ecosystem.",
    longDescription:
      "Designed and developed a responsive website for TRAPLA, focusing on accessible information, structured content and an engaging web experience.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
    ],
    role: "Frontend Developer",
    status: "DEVELOPED",
    coverImage: "/images/projects/trapla.jpg",
    featured: true,
  },

  {
    slug: "atm-management",
    number: "04",
    title: "ATM Management System",
    category: "JAVA / DATABASE",
    year: "2025",
    description:
      "A Java-based ATM application featuring authentication and transaction management.",
    longDescription:
      "Developed a secure ATM management application with user authentication, transaction handling and database operations using Java and MySQL.",
    technologies: ["Java", "OOP", "MySQL"],
    role: "Java Developer",
    status: "COMPLETED",
    coverImage: "/images/projects/atm.jpg",
    featured: false,
  },

  {
    slug: "krishna-tent-house",
    number: "05",
    title: "Krishna Tent House",
    category: "CLIENT PROJECT / WEBSITE",
    year: "2024",
    description:
      "A responsive business website developed for a local business.",
    longDescription:
      "Designed and developed a business website with responsive layouts, clean presentation and mobile-friendly functionality.",
    technologies: ["HTML", "CSS", "JavaScript"],
    role: "Frontend Developer",
    status: "COMPLETED",
    coverImage: "/images/projects/krishna-tent-house.jpg",
    featured: false,
  },
];