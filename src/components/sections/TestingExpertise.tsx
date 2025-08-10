import { useState } from 'react';

const TestingExpertise = () => {
  const [activeTab, setActiveTab] = useState('methodologies');

  const testingMethodologies = [
    {
      id: 'manual',
      title: 'Manual Testing',
      icon: '👁️',
      description: 'Comprehensive manual testing strategies for thorough quality validation',
      techniques: ['Exploratory Testing', 'User Acceptance Testing', 'Regression Testing', 'Smoke Testing'],
      metrics: { experience: '5+ years', projects: '15+' }
    },
    {
      id: 'automation',
      title: 'Test Automation',
      icon: '🤖',
      description: 'Building robust automation frameworks for efficient and reliable testing',
      techniques: ['Selenium WebDriver', 'Cypress E2E', 'API Automation', 'CI/CD Integration'],
      metrics: { coverage: '85%', roi: '60% time saved' }
    },
    {
      id: 'api',
      title: 'API Testing',
      icon: '🔗',
      description: 'Comprehensive API testing ensuring data integrity and service reliability',
      techniques: ['REST API Testing', 'GraphQL Testing', 'Contract Testing', 'Load Testing'],
      metrics: { endpoints: '100+', bugs: '45 found' }
    },
    {
      id: 'performance',
      title: 'Performance Testing',
      icon: '⚡',
      description: 'Load and performance testing to ensure optimal application performance',
      techniques: ['Load Testing', 'Stress Testing', 'Volume Testing', 'Spike Testing'],
      metrics: { throughput: '1000 req/sec', response: '<2s avg' }
    }
  ];

  const testingTools = [
    { name: 'Selenium WebDriver', proficiency: 90, category: 'Automation', color: 'bg-green-500' },
    { name: 'Cypress', proficiency: 85, category: 'E2E Testing', color: 'bg-blue-500' },
    { name: 'Postman', proficiency: 90, category: 'API Testing', color: 'bg-orange-500' },
    { name: 'JMeter', proficiency: 75, category: 'Performance', color: 'bg-red-500' },
    { name: 'Playwright', proficiency: 80, category: 'Cross-browser', color: 'bg-purple-500' },
    { name: 'TestNG', proficiency: 75, category: 'Framework', color: 'bg-yellow-500' },
    { name: 'Jest', proficiency: 80, category: 'Unit Testing', color: 'bg-pink-500' },
    { name: 'JIRA', proficiency: 85, category: 'Management', color: 'bg-indigo-500' }
  ];

  const bugCategories = [
    { type: 'Functional Bugs', count: 180, percentage: 40, color: 'bg-red-400' },
    { type: 'UI/UX Issues', count: 90, percentage: 20, color: 'bg-orange-400' },
    { type: 'Performance Issues', count: 72, percentage: 16, color: 'bg-yellow-400' },
    { type: 'API Bugs', count: 54, percentage: 12, color: 'bg-blue-400' },
    { type: 'Security Issues', count: 36, percentage: 8, color: 'bg-purple-400' },
    { type: 'Compatibility Issues', count: 18, percentage: 4, color: 'bg-green-400' }
  ];

  const tabs = [
    { id: 'methodologies', label: 'Testing Methodologies', icon: '🧪' },
    { id: 'tools', label: 'Tools & Frameworks', icon: '🛠️' },
    { id: 'metrics', label: 'Quality Metrics', icon: '📊' },
    { id: 'process', label: 'QA Process', icon: '⚙️' }
  ];

  const qaProcess = [
    {
      phase: 'Planning',
      icon: '📋',
      activities: ['Test Strategy Definition', 'Test Case Design', 'Resource Planning', 'Risk Assessment'],
      deliverables: ['Test Plan', 'Test Cases', 'Test Environment Setup']
    },
    {
      phase: 'Execution',
      icon: '🚀',
      activities: ['Test Execution', 'Bug Reporting', 'Regression Testing', 'Progress Tracking'],
      deliverables: ['Test Results', 'Bug Reports', 'Test Coverage Report']
    },
    {
      phase: 'Analysis',
      icon: '📈',
      activities: ['Results Analysis', 'Quality Assessment', 'Process Improvement', 'Lessons Learned'],
      deliverables: ['Quality Report', 'Process Improvements', 'Best Practices']
    }
  ];

  return (
    <section id="testing" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            QA <span className="text-gradient">Testing Expertise</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Deep expertise in quality assurance methodologies, automation frameworks, 
            and testing best practices accumulated over {new Date().getFullYear() - 2020}+ years.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {activeTab === 'methodologies' && (
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {testingMethodologies.map((method) => (
                  <div
                    key={method.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-4">{method.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {method.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {method.description}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Key Techniques:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {method.techniques.map((technique) => (
                          <span
                            key={technique}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                          >
                            {technique}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(method.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-accent-qa">
                            {value}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testingTools.map((tool) => (
                  <div
                    key={tool.name}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {tool.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {tool.proficiency}%
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${tool.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${tool.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Bug Discovery Analysis
                  </h3>
                  <div className="space-y-4">
                    {bugCategories.map((bug) => (
                      <div key={bug.type} className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {bug.type}
                          </span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {bug.count} bugs
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${bug.color} transition-all duration-1000 ease-out`}
                            style={{ width: `${bug.percentage}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {bug.percentage}% of total bugs found
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Testing Achievements
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center bg-gradient-to-br from-accent-qa/10 to-accent-qa/20 rounded-lg p-6">
                      <div className="text-4xl font-bold text-accent-qa mb-2">
                        85%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Average Test Coverage
                      </div>
                    </div>
                    <div className="text-center bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 rounded-lg p-6">
                      <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                        450+
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Total Bugs Found
                      </div>
                    </div>
                    <div className="text-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-lg p-6">
                      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        60%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Time Saved via Automation
                      </div>
                    </div>
                    <div className="text-center bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-lg p-6">
                      <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                        98%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Bug Resolution Rate
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                My QA Testing Process
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {qaProcess.map((phase, index) => (
                  <div key={phase.phase} className="relative">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 h-full">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">{phase.icon}</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          {phase.phase}
                        </h4>
                      </div>

                      <div className="mb-6">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Key Activities:
                        </h5>
                        <ul className="space-y-2">
                          {phase.activities.map((activity) => (
                            <li key={activity} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                              <span className="text-accent-qa mr-2 mt-1">▸</span>
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                          Deliverables:
                        </h5>
                        <div className="space-y-2">
                          {phase.deliverables.map((deliverable) => (
                            <div
                              key={deliverable}
                              className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full inline-block mr-2 mb-2"
                            >
                              {deliverable}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {index < qaProcess.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                          →
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-accent-qa/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Quality Assurance Philosophy
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto italic">
              "Quality is not an act, it is a habit. My approach to QA combines systematic testing methodologies 
              with innovative automation solutions to ensure software excellence at every stage of development."
            </p>
            <div className="mt-6 text-accent-qa font-medium">
              - Adabogo Emmanuel, QA Automation Engineer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestingExpertise;