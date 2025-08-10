import { useState } from 'react';
import { usePortfolioStore } from '../../stores/portfolioStore';

const Contact = () => {
  const { sendContactMessage, isLoading } = usePortfolioStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await sendContactMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (status !== 'idle') {
      setStatus('idle');
    }
  };

  const contactMethods = [
    {
      icon: '✉️',
      title: 'Email',
      value: 'adabogoemmanuel@gmail.com',
      link: 'mailto:adabogoemmanuel@gmail.com',
      description: 'Send me an email for project inquiries'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'linkedin.com/in/adabogoemmanuel',
      link: 'https://linkedin.com/in/adabogoemmanuel',
      description: 'Connect with me professionally'
    },
    {
      icon: '🐙',
      title: 'GitHub',
      value: 'github.com/adabogoemmanuel',
      link: 'https://github.com/adabogoemmanuel',
      description: 'Check out my code repositories'
    },
    {
      icon: '📞',
      title: 'Phone',
      value: '+233 XX XXX XXXX',
      link: 'tel:+233XXXXXXXX',
      description: 'Available for urgent discussions'
    }
  ];

  const availabilityStatus = {
    status: 'Available',
    message: 'Open to new opportunities and freelance projects',
    responseTime: 'Usually responds within 24 hours'
  };

  return (
    <section id="contact" className="section-padding bg-white dark:bg-dark-bg">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ready to discuss your QA needs or explore collaboration opportunities? 
            I'd love to hear about your project and how I can help ensure its quality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Get In Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Whether you need QA consultation, test automation setup, or want to discuss 
                a full-time opportunity, I'm here to help. Let's build something amazing together!
              </p>

              <div className="bg-gradient-to-r from-accent-qa/10 to-primary-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {availabilityStatus.status}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {availabilityStatus.message}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {availabilityStatus.responseTime}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : '_self'}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                      {method.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {method.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {method.value}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Based in Accra, Ghana 🇬🇭
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Available for remote work globally and local projects in Ghana. 
                Open to both full-time opportunities and freelance collaborations.
              </p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Send a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors ${
                    errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <option value="">Select a subject</option>
                  <option value="QA Consultation">QA Consultation</option>
                  <option value="Test Automation">Test Automation Project</option>
                  <option value="Full-time Position">Full-time Position</option>
                  <option value="Freelance Project">Freelance Project</option>
                  <option value="Collaboration">Collaboration Opportunity</option>
                  <option value="Other">Other</option>
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-vertical transition-colors ${
                    errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Tell me about your project or opportunity..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formData.message.length}/500 characters
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  isLoading
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'button-primary'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-top-transparent mr-2"></div>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>

              {status === 'success' && (
                <div className="mt-6 p-4 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-green-600 dark:text-green-400 mr-2">✅</span>
                    <p className="text-green-800 dark:text-green-200 font-medium">
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mt-6 p-4 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-red-600 dark:text-red-400 mr-2">❌</span>
                    <p className="text-red-800 dark:text-red-200 font-medium">
                      Failed to send message. Please try again or contact me directly.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-accent-qa/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Ready to Ensure Quality?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's work together to build robust testing strategies, implement automation frameworks, 
              and deliver software that exceeds quality expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:adabogoemmanuel@gmail.com"
                className="button-primary"
              >
                Start a Conversation
              </a>
              <a
                href="/resume.pdf"
                download
                className="button-secondary"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;