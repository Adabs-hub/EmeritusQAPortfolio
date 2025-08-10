import { useState } from 'react';
import { usePortfolioStore } from '../../stores/portfolioStore';

const Projects = () => {
  const { projects } = usePortfolioStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'qa'>('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filters = [
    { id: 'all' as const, label: 'All Projects', icon: '🎯' },
    { id: 'qa' as const, label: 'QA Projects', icon: '🧪' },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'qa': return '🧪';
      case 'web': return '🌐';
      case 'mobile': return '📱';
      case 'opensource': return '🔓';
      default: return '💻';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'qa': return 'bg-accent-qa/10 text-accent-qa border-accent-qa/20';
      case 'web': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800';
      case 'mobile': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-800';
      case 'opensource': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  return (
    <section id="projects" className="section-padding bg-white dark:bg-dark-bg">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            My <span className="text-gradient">QA Projects</span> & Portfolio
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of quality assurance projects, automation frameworks, and testing solutions 
            that demonstrate my expertise in ensuring software quality.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                activeFilter === filter.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
              {activeFilter === filter.id && (
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  {filteredProjects.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {featuredProjects.length > 0 && (
          <>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="mr-2">⭐</span> Featured Projects
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">
                          {getCategoryIcon(project.category)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {project.title}
                          </h3>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                            {project.category.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      {project.featured && (
                        <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Key Features:
                      </h4>
                      <ul className="space-y-1">
                        {project.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                            <span className="text-accent-qa mr-2 mt-1">▸</span>
                            {feature}
                          </li>
                        ))}
                        {project.features.length > 3 && (
                          <li className="text-sm text-gray-500 dark:text-gray-400">
                            +{project.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Technologies:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {Object.keys(project.metrics).length > 0 && (
                      <div className="mb-4 bg-white dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Project Metrics:
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {project.metrics.testCoverage && (
                            <div className="text-center">
                              <div className="text-2xl font-bold text-accent-qa">
                                {project.metrics.testCoverage}%
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-300">
                                Test Coverage
                              </div>
                            </div>
                          )}
                          {project.metrics.bugsFound && (
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-500">
                                {project.metrics.bugsFound}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-300">
                                Bugs Found
                              </div>
                            </div>
                          )}
                          {project.metrics.performanceScore && (
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-500">
                                {project.metrics.performanceScore}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-300">
                                Performance Score
                              </div>
                            </div>
                          )}
                          {project.metrics.automationRoi && (
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-500">
                                {project.metrics.automationRoi}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-300">
                                ROI Achievement
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-3">
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors"
                          >
                            <span>🐙</span>
                            <span>Code</span>
                          </a>
                        )}
                        {project.links.demo && (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors"
                          >
                            <span>🚀</span>
                            <span>Demo</span>
                          </a>
                        )}
                        {project.links.documentation && (
                          <a
                            href={project.links.documentation}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors"
                          >
                            <span>📚</span>
                            <span>Docs</span>
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors"
                      >
                        {selectedProject === project.id ? 'Show Less' : 'Learn More'}
                      </button>
                    </div>

                    {selectedProject === project.id && (
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                          All Features:
                        </h4>
                        <ul className="space-y-2">
                          {project.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                              <span className="text-accent-qa mr-2 mt-1">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {otherProjects.length > 0 && (
          <>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Other Projects
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-2xl">
                      {getCategoryIcon(project.category)}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                      {project.category.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                        >
                          🐙
                        </a>
                      )}
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                        >
                          🚀
                        </a>
                      )}
                    </div>

                    {project.metrics.testCoverage && (
                      <div className="text-xs text-accent-qa font-medium">
                        {project.metrics.testCoverage}% coverage
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 dark:text-gray-400">
              No projects found for the selected filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;