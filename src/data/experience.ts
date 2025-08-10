import { Experience } from '../types';

export const experienceData: Experience[] = [
  {
    id: 'adansi-travels',
    company: 'Adansi Travels',
    position: 'Full Stack Developer',
    startDate: '2024-10',
    description: 'Developing and maintaining web applications with focus on quality assurance and automated testing implementation.',
    achievements: [
      'Implemented comprehensive testing strategy reducing bugs by 70%',
      'Built automated CI/CD pipeline with integrated testing',
      'Developed responsive web applications using React and TypeScript',
      'Established code review processes and quality gates'
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Jest', 'Cypress'],
    projects: ['travel-booking-system', 'admin-dashboard']
  },
  {
    id: 'tudu-technologies',
    company: 'Tudu Technologies',
    position: 'QA Engineer',
    startDate: '2021-08',
    endDate: '2024-10',
    description: 'Led quality assurance initiatives for multiple web and mobile applications, focusing on test automation and process improvement.',
    achievements: [
      'Increased test coverage from 45% to 85% across all projects',
      'Reduced critical bugs in production by 60% through rigorous testing',
      'Designed and implemented automated testing frameworks',
      'Mentored 3 junior QA engineers in testing best practices',
      'Established bug triage process improving resolution time by 40%'
    ],
    technologies: ['Selenium', 'Cypress', 'Postman', 'JIRA', 'TestNG', 'Python'],
    projects: ['e-commerce-platform', 'mobile-banking-app', 'crm-system']
  },
  {
    id: 'npontu-technologies',
    company: 'Npontu Technologies',
    position: 'QA Officer',
    startDate: '2020-02',
    endDate: '2021-08',
    description: 'Responsible for manual testing, test case creation, and quality assurance processes for web applications.',
    achievements: [
      'Created comprehensive test documentation and procedures',
      'Performed thorough manual testing for 5+ web applications',
      'Identified and documented 200+ bugs with detailed reproduction steps',
      'Collaborated with development team to improve product quality',
      'Initiated transition from manual to automated testing processes'
    ],
    technologies: ['Manual Testing', 'Test Case Design', 'Bug Reporting', 'JIRA', 'Excel'],
    projects: ['inventory-management', 'hr-portal', 'customer-service-app']
  }
];