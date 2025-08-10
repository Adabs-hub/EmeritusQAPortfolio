import Header from '../components/layout/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import TestingExpertise from '../components/sections/TestingExpertise';
import Contact from '../components/sections/Contact';
import Footer from '../components/layout/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <TestingExpertise />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;