export interface Project {
  slug: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  technologies: string[];
  role: string;
  status: string;
  coverImage: string;
  website?: string;
  github?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  category: string;
  description: string;
  highlights: string[];
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  category: string;
}

export interface SkillGroup {
  title: string;
  number: string;
  skills: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
}