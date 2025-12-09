export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  repo: string;
}

export interface Socials {
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  graduationDate: string;
}

export interface PortfolioData {
  fullName: string;
  headline: string;
  bio: string;
  skills: string[];
  projects: Project[];
  socials: Socials;
  theme: string;
  

  experience: Experience[];
  education: Education[];
  layoutStyle: string; 
  seoTitle: string;
  seoDescription: string;
}