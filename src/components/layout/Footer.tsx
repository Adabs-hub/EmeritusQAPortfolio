const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/adabogoemmanuel',
      icon: '💼'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/adabogoemmanuel',
      icon: '🐙'
    },
    {
      name: 'Email',
      url: 'mailto:adabogoemmanuel@gmail.com',
      icon: '✉️'
    }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">Adabogo Emmanuel</h3>
            <p className="text-gray-400 mb-4">
              QA Automation Engineer passionate about delivering high-quality software solutions
              through comprehensive testing strategies and automation frameworks.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:scale-110 transition-transform duration-200"
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#skills" className="text-gray-400 hover:text-white transition-colors">Skills</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">QA Expertise</h4>
            <ul className="space-y-2 text-gray-400">
              <li>• Test Automation</li>
              <li>• Manual Testing</li>
              <li>• API Testing</li>
              <li>• Performance Testing</li>
              <li>• Cross-browser Testing</li>
              <li>• Mobile Testing</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Adabogo Emmanuel. Built with React, TypeScript, and Tailwind CSS.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Designed and developed with ❤️ for quality and user experience.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;