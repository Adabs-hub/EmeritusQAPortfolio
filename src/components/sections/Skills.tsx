import { useEffect, useRef, useState } from 'react';
import { usePortfolioStore } from '../../stores/portfolioStore';

const Skills = () => {
  const { skills } = usePortfolioStore();
  const [activeCategory, setActiveCategory] = useState<'all' | 'qa' | 'development' | 'tools' | 'soft'>('all');
  const [animateSkills, setAnimateSkills] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all' as const, label: 'All Skills', icon: '🎯' },
    { id: 'qa' as const, label: 'QA & Testing', icon: '🧪' },
    { id: 'tools' as const, label: 'Tools & Frameworks', icon: '🛠️' },
    { id: 'development' as const, label: 'Development', icon: '💻' },
    { id: 'soft' as const, label: 'Soft Skills', icon: '🤝' },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateSkills(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'qa': return 'from-accent-qa to-emerald-600';
      case 'development': return 'from-accent-dev to-purple-600';
      case 'tools': return 'from-accent-design to-orange-600';
      case 'soft': return 'from-blue-500 to-blue-600';
      default: return 'from-primary-500 to-primary-600';
    }
  };

  return (
    <section id="skills" className="section-padding bg-white dark:bg-dark-bg" ref={sectionRef}>
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            My <span className="text-gradient">Skills</span> & Expertise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit of QA automation skills, development technologies, 
            and testing frameworks built over {new Date().getFullYear() - 2020}+ years of experience.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
              {activeCategory === category.id && (
                <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                  {filteredSkills.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              style={{
                animationDelay: animateSkills ? `${index * 100}ms` : '0ms'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {skill.name}
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {skill.yearsOfExperience}y
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Proficiency
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {skill.proficiency}%
                  </span>
                </div>
                <div className="skill-bar">
                  <div
                    className={`skill-progress bg-gradient-to-r ${getCategoryColor(skill.category)}`}
                    style={{
                      width: animateSkills ? `${skill.proficiency}%` : '0%',
                      transitionDelay: `${index * 100}ms`
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  skill.category === 'qa' ? 'bg-accent-qa/10 text-accent-qa' :
                  skill.category === 'development' ? 'bg-accent-dev/10 text-accent-dev' :
                  skill.category === 'tools' ? 'bg-accent-design/10 text-accent-design' :
                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                }`}>
                  {skill.category.toUpperCase()}
                </span>

                {skill.projects && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {skill.projects.length} projects
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 dark:text-gray-400">
              No skills found for the selected category.
            </p>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-primary-50 to-accent-qa/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Continuous Learning Journey
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm constantly expanding my skill set and staying updated with the latest 
              testing technologies, automation frameworks, and industry best practices.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <div className="text-accent-qa text-3xl mb-2">📚</div>
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Learning</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Currently exploring AI in testing and advanced Playwright features
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <div className="text-accent-dev text-3xl mb-2">🏆</div>
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Certifications</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Data Analytics Certificate from Coursera, working on ISTQB
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <div className="text-accent-design text-3xl mb-2">🎯</div>
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Goals</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Becoming a Senior QA Lead and contributing more to open source
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;