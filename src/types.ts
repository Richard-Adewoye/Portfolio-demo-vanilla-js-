export type CategoryType = 'all' | 'fullstack' | 'frontend' | 'ai' | 'mobile' | 'design';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: CategoryType;
  image: string;
  tags: string[];
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  metrics?: { label: string; value: string }[];
  keyFeatures: string[];
  hasInteractiveDemo?: boolean;
  demoType?: 'ai-prompt' | 'palette-generator' | 'component-builder' | 'analytics-chart';
  completionYear: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: 'full-time' | 'contract' | 'education' | 'certification';
  period: string;
  description: string;
  highlights: string[];
  skillsUsed: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'design' | 'tools';
  proficiency: number; // 0 to 100
  level: 'Expert' | 'Advanced' | 'Proficient';
  yearsExperience: number;
  iconName: string;
  isTopSkill?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number; // 1-5
  projectWorkedOn?: string;
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  deliverables: string[];
  startingPrice?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  email: string;
  phone: string;
  location: string;
  availabilityStatus: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    dribbble: string;
  };
  stats: {
    yearsExperience: number;
    projectsCompleted: number;
    happyClients: number;
    codeCommitsThisYear: number;
  };
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  budget: string;
  message: string;
  createdAt: string;
}

export type ThemeMode = 'dark' | 'light' | 'emerald' | 'amber';
