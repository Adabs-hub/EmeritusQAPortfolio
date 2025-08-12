import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'selenium-automation-framework',
    title: 'Selenium Automation Framework',
    category: 'qa',
    description: 'Comprehensive test automation framework built with Selenium WebDriver, TestNG, and Maven. Features data-driven testing, parallel execution, and detailed reporting.',
    technologies: ['Selenium WebDriver', 'Java', 'TestNG', 'Maven', 'ExtentReports'],
    features: [
      'Page Object Model implementation',
      'Data-driven testing with Excel/CSV',
      'Parallel test execution',
      'Cross-browser compatibility',
      'Detailed HTML reports',
      'Screenshot capture on failure'
    ],
    metrics: {
      testCoverage: 85,
      automationRoi: '60% reduction in testing time'
    },
    links: {
      github: 'https://github.com/Adabs-hub/selenium-framework'
    },
    images: ['selenium-framework.png'],
    featured: true
  },
  {
    id: 'cypress-e2e-testing',
    title: 'Cypress E2E Testing Suite',
    category: 'qa',
    description: 'Modern end-to-end testing suite using Cypress for web application testing with real-time browser preview and time-travel debugging.',
    technologies: ['Cypress', 'JavaScript', 'Mocha', 'Chai'],
    features: [
      'Real-time browser preview',
      'Time-travel debugging',
      'Automatic waiting',
      'Network traffic control',
      'Visual testing integration',
      'CI/CD pipeline integration'
    ],
    metrics: {
      testCoverage: 78,
      performanceScore: 95
    },
    links: {
      github: 'https://github.com/Adabs-hub/cypress-testing'
    },
    images: ['cypress-testing.png'],
    featured: true
  },
  {
    id: 'api-testing-postman',
    title: 'API Testing with Postman',
    category: 'qa',
    description: 'Comprehensive API testing collection with automated tests, environment management, and integration with CI/CD pipelines.',
    technologies: ['Postman', 'Newman', 'JavaScript', 'JSON'],
    features: [
      'Automated API test collections',
      'Environment variable management',
      'Pre-request and test scripts',
      'Data validation and assertions',
      'Integration with Jenkins',
      'Detailed test reports'
    ],
    metrics: {
      bugsFound: 45,
      testCoverage: 92
    },
    links: {
      github: 'https://github.com/Adabs-hub/api-testing-postman'
    },
    images: ['postman-testing.png'],
    featured: true
  },
  {
    id: 'performance-testing-jmeter',
    title: 'JMeter Performance Testing',
    category: 'qa',
    description: 'Load and performance testing framework using Apache JMeter for web applications with detailed performance analysis.',
    technologies: ['Apache JMeter', 'Java', 'CSV', 'HTML Reports'],
    features: [
      'Load testing scenarios',
      'Stress testing implementation',
      'Performance monitoring',
      'Response time analysis',
      'Throughput measurement',
      'Resource utilization tracking'
    ],
    metrics: {
      performanceScore: 88
    },
    links: {
      github: 'https://github.com/Adabs-hub/jmeter-testing'
    },
    images: ['jmeter-testing.png'],
    featured: false
  },
  {
    id: 'playwright-testing-suite',
    title: 'Playwright Cross-Browser Testing',
    category: 'qa',
    description: 'Modern cross-browser automation testing suite using Playwright with support for Chromium, Firefox, and WebKit.',
    technologies: ['Playwright', 'TypeScript', 'Node.js', 'GitHub Actions'],
    features: [
      'Cross-browser automation',
      'Mobile device emulation',
      'Auto-waiting for elements',
      'Network interception',
      'Visual comparison testing',
      'Parallel execution'
    ],
    metrics: {
      testCoverage: 82,
      performanceScore: 91
    },
    links: {
      github: 'https://github.com/Adabs-hub/playwright-testing'
    },
    images: ['playwright-testing.png'],
    featured: true
  },
  {
    id: 'mobile-testing-appium',
    title: 'Mobile App Testing with Appium',
    category: 'qa',
    description: 'Mobile application testing framework using Appium for both Android and iOS platforms with automated test scenarios.',
    technologies: ['Appium', 'Java', 'TestNG', 'Android Studio', 'Xcode'],
    features: [
      'Cross-platform mobile testing',
      'Native and hybrid app support',
      'Gestures and touch actions',
      'Real device testing',
      'Emulator/simulator support',
      'Parallel device execution'
    ],
    metrics: {
      testCoverage: 75,
      bugsFound: 28
    },
    links: {
      github: 'https://github.com/Adabs-hub/appium-testing'
    },
    images: ['appium-testing.png'],
    featured: false
  },
  {
    id: 'test-data-management',
    title: 'Test Data Management System',
    category: 'qa',
    description: 'Automated test data generation and management system for maintaining consistent test environments.',
    technologies: ['Python', 'SQLite', 'Faker', 'JSON', 'CSV'],
    features: [
      'Dynamic test data generation',
      'Database seeding scripts',
      'Data anonymization',
      'Environment synchronization',
      'Backup and restore functionality',
      'API integration for data setup'
    ],
    metrics: {
      automationRoi: '40% faster test setup'
    },
    links: {
      github: 'https://github.com/Adabs-hub/test-data-management'
    },
    images: ['test-data-management.png'],
    featured: false
  }
];