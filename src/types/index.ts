export interface Skill {
  id: string;
  name: string;
  category: 'qa' | 'development' | 'tools' | 'soft';
  proficiency: number;
  yearsOfExperience: number;
  certifications?: Certification[];
  projects?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'qa' | 'web' | 'mobile' | 'opensource';
  description: string;
  technologies: string[];
  features: string[];
  metrics: {
    testCoverage?: number;
    performanceScore?: number;
    bugsFound?: number;
    automationRoi?: string;
  };
  links: {
    demo?: string;
    github?: string;
    documentation?: string;
  };
  images: string[];
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  technologies: string[];
  projects: string[];
}

export interface TestMetrics {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  coverage: number;
  executionTime: string;
  lastRun: Date;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Gallery types
export * from './gallery';

export interface PortfolioStore {
  activeSection: string;
  isMenuOpen: boolean;
  theme: 'light' | 'dark';
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  isLoading: boolean;
  
  setActiveSection: (section: string) => void;
  toggleMenu: () => void;
  toggleTheme: () => void;
  loadPortfolioData: () => Promise<void>;
  filterProjects: (category: string) => Project[];
  sendContactMessage: (data: ContactForm) => Promise<void>;
}