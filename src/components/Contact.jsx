import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaPaperPlane, FaUser, FaComment } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Using Formspree to handle form submissions
      // Replace YOUR_FORM_ID with your actual Formspree form ID
      const response = await fetch('https://formspree.io/f/xpwllpvq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback: Open email client with pre-filled message
      const subject = encodeURIComponent('Portfolio Contact Form Message');
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.open(`mailto:keerthivasangc@gmail.com?subject=${subject}&body=${body}`, '_blank');
      
      setSubmitStatus('fallback');
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'keerthivasangc@gmail.com',
      href: 'mailto:keerthivasangc@gmail.com',
      color: 'text-neon-blue'
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '+91 8610084011',
      href: 'tel:+918610084011',
      color: 'text-neon-green'
    },
    {
      icon: <FaPhone />,
      label: 'Phone (Alt)',
      value: '+91 9894851320',
      href: 'tel:+919894851320',
      color: 'text-neon-green'
    },
    {
      icon: <FaGithub />,
      label: 'GitHub',
      value: 'github.com/Vasandeveloper',
      href: 'https://github.com/Vasandeveloper',
      color: 'text-neon-purple'
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      value: 'keerthivasan-govindaraju-364076319',
      href: 'https://www.linkedin.com/in/keerthivasan-govindaraju-364076319',
      color: 'text-neon-blue'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-dark-surface to-dark-bg">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have a project in mind? Want to collaborate? Or just want to say hello? 
            I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-dark rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Get in Touch
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                I'm always open to discussing new opportunities, projects, or just 
                chatting about electronics and embedded systems. Feel free to reach out 
                through any of the channels below.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : '_self'}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="flex items-center space-x-4 glass rounded-xl p-4 hover:bg-white/5 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`text-2xl ${info.color} group-hover:scale-110 transition-transform duration-300`}>
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <p className="text-gray-400 mb-4">Connect with me on social media:</p>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://github.com/Vasandeveloper"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-3 rounded-full text-neon-blue hover:text-neon-purple transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub size={24} />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/keerthivasan-govindaraju-364076319"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-3 rounded-full text-neon-blue hover:text-neon-purple transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaLinkedin size={24} />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass-dark rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Send a Message
              </h3>

              <div className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <label htmlFor="name" className="block text-gray-400 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-blue" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full glass rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 border border-gray-600 focus:border-neon-blue focus:outline-none transition-colors duration-300"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label htmlFor="email" className="block text-gray-400 mb-2">
                    Your Email
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-blue" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full glass rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 border border-gray-600 focus:border-neon-blue focus:outline-none transition-colors duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label htmlFor="message" className="block text-gray-400 mb-2">
                    Your Message
                  </label>
                  <div className="relative">
                    <FaComment className="absolute left-4 top-4 text-neon-blue" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full glass rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 border border-gray-600 focus:border-neon-blue focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Tell me about your project or just say hello!"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-xl text-white font-semibold hover:from-neon-purple hover:to-neon-green transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-neon-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {/* Submit Status */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400"
                  >
                    ✅ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-red-400"
                  >
                    ❌ Sorry, there was an error sending your message. Please try again or email me directly.
                  </motion.div>
                )}
                
                {submitStatus === 'fallback' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-yellow-400"
                  >
                    📧 Opening your default email client to send the message...
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
