import { motion } from 'framer-motion';
import { FaDownload, FaEye, FaFileAlt } from 'react-icons/fa';

const Resume = () => {
  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Keerthivasan_Govindaraju_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    // Open resume in new tab for preview
    window.open('/resume.pdf', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-dark-bg to-dark-surface">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
            Resume
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Download or preview my detailed resume to learn more about my academic background and project experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-dark rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Resume Preview/Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="glass p-4 rounded-full">
                    <FaFileAlt className="text-3xl text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Keerthivasan Govindaraju
                    </h3>
                    <p className="text-gray-400">
                      Electronics & Communication Engineering Student
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                    <span className="text-gray-300">2nd Year B.Tech ECE Student</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-neon-purple rounded-full"></div>
                    <span className="text-gray-300">Embedded Systems Enthusiast</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                    <span className="text-gray-300">VLSI Design Specialist</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                    <span className="text-gray-300">Circuit Design & Implementation</span>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6 mt-6">
                  <h4 className="text-lg font-semibold text-neon-blue mb-3">
                    What you'll find in my resume:
                  </h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>• Academic achievements and coursework</li>
                    <li>• Detailed project descriptions and outcomes</li>
                    <li>• Technical skills and proficiencies</li>
                    <li>• Relevant certifications and learning</li>
                  </ul>
                </div>
              </div>

              {/* Resume Actions */}
              <div className="space-y-6">
                {/* Resume Preview Thumbnail */}
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="glass-dark rounded-xl p-8 mb-6 aspect-[3/4] flex items-center justify-center bg-gradient-to-br from-dark-accent to-dark-surface">
                    <div className="text-center">
                      <FaFileAlt className="text-6xl text-neon-blue/50 mb-4 mx-auto" />
                      <p className="text-gray-400 text-sm">Resume Preview</p>
                      <p className="text-gray-500 text-xs mt-2">Click preview to view</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <motion.button
                      onClick={handlePreview}
                      className="w-full glass-dark px-6 py-3 rounded-xl text-neon-blue border border-neon-blue/30 hover:border-neon-blue/50 hover:bg-neon-blue/5 transition-all duration-300 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaEye />
                      <span>Preview Resume</span>
                    </motion.button>
                    
                    <motion.button
                      onClick={handleDownload}
                      className="w-full bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3 rounded-xl text-white font-semibold hover:from-neon-purple hover:to-neon-green transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-neon-blue/20"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaDownload />
                      <span>Download Resume</span>
                    </motion.button>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="glass rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Quick Stats
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-blue">3+</div>
                      <div className="text-sm text-gray-400">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-purple">2nd</div>
                      <div className="text-sm text-gray-400">Year</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-green">6+</div>
                      <div className="text-sm text-gray-400">Skills</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-blue">ECE</div>
                      <div className="text-sm text-gray-400">Major</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Note about resume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            Note: Please ensure you have a PDF viewer installed to open the resume. 
            The resume is regularly updated with my latest projects and achievements.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
