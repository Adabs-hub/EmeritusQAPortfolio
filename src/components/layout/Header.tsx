import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePortfolioStore } from '../../stores/portfolioStore';

const Header = () => {
  const { activeSection, setActiveSection, isMenuOpen, toggleMenu, toggleTheme, theme } = usePortfolioStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'hero', label: 'Home', route: '/' },
    { id: 'about', label: 'About', route: '/' },
    { id: 'skills', label: 'Skills', route: '/' },
    { id: 'experience', label: 'Experience', route: '/' },
    { id: 'projects', label: 'Projects', route: '/' },
    { id: 'testing', label: 'QA Expertise', route: '/' },
    { id: 'gallery', label: 'Gallery', route: '/gallery' },
    { id: 'contact', label: 'Contact', route: '/' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (item: { id: string; label: string; route: string }) => {
    if (item.route === '/gallery') {
      navigate('/gallery');
      setActiveSection('gallery');
    } else if (item.route === '/') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(item.id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(item.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setActiveSection(item.id);
    }
    if (isMenuOpen) toggleMenu();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-glass shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-max">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation({ id: 'hero', label: 'Home', route: '/' })}
              className="text-2xl font-bold text-gradient"
            >
              AE
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`nav-link ${
                  (activeSection === item.id) || (location.pathname === '/gallery' && item.id === 'gallery') ? 'nav-link-active' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <span className={`block w-4 h-0.5 bg-current transform transition ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                <span className={`block w-4 h-0.5 bg-current transition ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-4 h-0.5 bg-current transform transition ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-dark-bg shadow-lg border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`text-left px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    (activeSection === item.id) || (location.pathname === '/gallery' && item.id === 'gallery') ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;