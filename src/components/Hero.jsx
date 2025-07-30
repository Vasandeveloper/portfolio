import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaArrowDown } from 'react-icons/fa';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-dark-bg via-dark-surface to-dark-accent">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient blur background */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-neon-purple/5 to-neon-green/5 blur-3xl"></div>

      <motion.div
        className="container mx-auto px-6 text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="glass-dark rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent"
          >
            Keerthivasan Govindaraju
          </motion.h1>
          
          <motion.h2
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-gray-300"
          >
            ECE Student | Embedded & VLSI Enthusiast
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            I'm a 2nd-year Electronics and Communication Engineering student building 
            real-world projects in embedded systems and semiconductors.
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-6 mb-8"
          >
            <motion.a
              href="https://github.com/Vasandeveloper"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-4 rounded-full text-neon-blue hover:text-neon-purple transition-colors duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub size={32} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/keerthivasan-govindaraju-364076319"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-4 rounded-full text-neon-blue hover:text-neon-purple transition-colors duration-300"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin size={32} />
            </motion.a>
          </motion.div>
          
          <motion.button
            variants={itemVariants}
            onClick={scrollToProjects}
            className="glass-dark px-8 py-4 rounded-full text-lg font-semibold text-neon-blue border border-neon-blue/30 hover:border-neon-purple/50 hover:text-neon-purple transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
            <motion.span
              className="inline-block ml-2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaArrowDown />
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-neon-blue/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-neon-blue rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
