export interface Skill {
  name: string;
  image: string;
  level?: number;
  category: 'frontend' | 'backend' | 'tools';
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string[];
  current?: boolean;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category?: 'web' | 'mobile' | 'api' | 'tools';
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Certification {
  name: string;
  image: string;
  issuer?: string;
  date?: string;
  credentialId?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  cgpa?: string;
  description?: string;
  achievements?: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  email: string;
  linkedin: string;
  github?: string;
  phone?: string;
  location?: string;
  resumeUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  publishDate: string;
  readTime: number;
  tags: string[];
  category: string;
  featured?: boolean;
  likes?: number;
  views?: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export interface Portfolio {
  personalInfo: PersonalInfo;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  education: Education[];
  blogPosts: BlogPost[];
}
