import { create } from 'zustand';
import { PortfolioStore, ContactForm } from '../types';
import { skillsData } from '../data/skills';
import { projectsData } from '../data/projects';
import { experienceData } from '../data/experience';

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  activeSection: 'hero',
  isMenuOpen: false,
  theme: 'light',
  projects: [],
  skills: [],
  experience: [],
  isLoading: false,

  setActiveSection: (section: string) => set({ activeSection: section }),
  
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    return { theme: newTheme };
  }),

  loadPortfolioData: async () => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      set({
        projects: projectsData,
        skills: skillsData,
        experience: experienceData,
        isLoading: false
      });
    } catch (error) {
      console.error('Failed to load portfolio data:', error);
      set({ isLoading: false });
    }
  },

  filterProjects: (category: string) => {
    const { projects } = get();
    if (category === 'all') return projects;
    return projects.filter(project => project.category === category);
  },

  sendContactMessage: async (data: ContactForm) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Contact message sent:', data);
      set({ isLoading: false });
    } catch (error) {
      console.error('Failed to send message:', error);
      set({ isLoading: false });
      throw error;
    }
  }
}));