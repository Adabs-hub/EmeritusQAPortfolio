import { useState, useEffect } from 'react';

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = [
    'QA Automation Engineer',
    'Full Stack Developer',
    'Quality Assurance Expert',
    'Test Automation Specialist'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-dark-bg dark:via-gray-900 dark:to-dark-bg relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-200"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float animation-delay-400"></div>
      </div>

      <div className="container-max section-padding relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block text-gray-900 dark:text-white">Hi, I'm</span>
              <span className="block text-gradient">Adabogo Emmanuel</span>
            </h1>
            
            <div className="h-16 flex items-center justify-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                <span className="typewriter">{roles[currentRoleIndex]}</span>
              </h2>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Passionate about delivering high-quality software through comprehensive testing strategies, 
            automation frameworks, and innovative QA solutions. With {new Date().getFullYear() - 2020}+ years 
            of experience in quality assurance and full-stack development.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={scrollToProjects}
              className="button-primary group"
            >
              View QA Projects
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
            
            <button
              onClick={scrollToContact}
              className="button-secondary"
            >
              Get In Touch
            </button>

            <a
              href="/resume.pdf"
              download
              className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
            >
              <span>📄</span>
              <span>Download Resume</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-accent-qa mb-1">{new Date().getFullYear() - 2020}+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-accent-dev mb-1">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Bugs Found</div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-accent-design mb-1">85%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Test Coverage</div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-primary-600 mb-1">15+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">QA Projects</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;