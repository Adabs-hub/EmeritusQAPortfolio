import { usePortfolioStore } from '../../stores/portfolioStore';

const Experience = () => {
  const { experience } = usePortfolioStore();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <section id="experience" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My journey through quality assurance and software development, 
            building expertise in testing automation and delivering high-quality solutions.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800"></div>

          {experience.map((exp, index) => (
            <div key={exp.id} className={`relative flex items-center mb-12 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}>
              <div className={`w-full md:w-1/2 ${
                index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
              }`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ml-12 md:ml-0">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {exp.position}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium">
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </p>
                    </div>
                    <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 p-2 rounded-lg">
                      {index === 0 ? '💼' : index === 1 ? '🧪' : '📋'}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li 
                          key={achIndex} 
                          className="text-sm text-gray-600 dark:text-gray-300 flex items-start"
                        >
                          <span className="text-accent-qa mr-2 mt-1">✓</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Technologies Used:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {exp.projects.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Notable Projects:
                      </h4>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {exp.projects.join(' • ')}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center z-10">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary-50 to-accent-qa/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent-qa mb-2">
                {new Date().getFullYear() - 2020}+
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Years in QA
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                From manual testing to automation expert
              </div>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-accent-dev mb-2">
                3
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Companies
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Diverse experience across different domains
              </div>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">
                15+
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                Major Projects
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Web, mobile, and API testing projects
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;