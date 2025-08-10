const About = () => {
  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              About <span className="text-gradient">Me</span>
            </h2>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                I'm a passionate <strong className="text-accent-qa">QA Automation Engineer</strong> and 
                Full Stack Developer with {new Date().getFullYear() - 2020}+ years of experience in 
                software quality assurance and testing automation. My journey began in IT support, 
                evolved through manual testing, and now focuses on building robust automation frameworks.
              </p>
              
              <p>
                Currently working at <strong className="text-primary-600 dark:text-primary-400">Adansi Travels</strong> 
                as a Full Stack Developer, where I combine development skills with quality assurance expertise 
                to deliver high-quality software solutions. I hold a BSc in Telecommunication Engineering 
                from Ghana Communication Technology University.
              </p>
              
              <p>
                My passion lies in <strong className="text-accent-dev">automation frameworks</strong>, 
                API testing, and implementing comprehensive testing strategies that reduce bugs by up to 70%. 
                I'm particularly interested in robotics, AI, and FinTech applications.
              </p>
              
              <p>
                When I'm not testing or coding, you'll find me exploring the latest testing tools, 
                contributing to open-source projects, or mentoring fellow QA engineers in 
                best practices and automation techniques.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="text-accent-qa text-3xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Focus</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Dedicated to delivering bug-free software through meticulous testing strategies
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="text-accent-dev text-3xl mb-2">🤖</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Automation Expert</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Building efficient automation frameworks that save time and improve accuracy
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-accent-qa/20 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 transform rotate-3">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 transform -rotate-3 shadow-lg">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary-200 dark:border-primary-700 shadow-lg">
                    <img 
                      src="/images/emma.jpeg" 
                      alt="Adabogo Emmanuel - QA Automation Engineer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Adabogo Emmanuel</h3>
                    <p className="text-accent-qa font-medium">QA Automation Engineer</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Accra, Ghana 🇬🇭</p>
                    
                    <div className="flex justify-center space-x-4 pt-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">BSc</div>
                        <div className="text-xs text-gray-500">Telecom Eng.</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent-qa">500+</div>
                        <div className="text-xs text-gray-500">Bugs Found</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent-dev">85%</div>
                        <div className="text-xs text-gray-500">Coverage</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;