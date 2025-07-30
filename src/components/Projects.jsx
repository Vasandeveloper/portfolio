import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaCar, 
  FaEye, 
  FaRadar,
  FaMicrochip,
  FaRobot,
  FaLightbulb,
  FaHome,
  FaHeart,
  FaGamepad,
  FaMobile,
  FaWifi,
  FaBluetooth,
  FaSolarPanel
} from 'react-icons/fa';
import ProjectManager from './ProjectManager';

const Projects = () => {
  const [dynamicProjects, setDynamicProjects] = useState([]);

  // Default/existing projects
  const defaultProjects = [
    {
      id: 'default-1',
      title: "Emergency Braking System (Arduino-based)",
      description: "Real-time obstacle detection using an ultrasonic sensor and Arduino UNO. Applies brakes via a servo motor when objects are detected.",
      iconType: 'FaCar',
      image: "/api/placeholder/400/250", // Placeholder
      technologies: ["Arduino IDE", "Ultrasonic Sensor", "Servo Motor", "L298N Motor Driver"],
      github: "https://github.com/Vasandeveloper/emergency-braking-system",
      demo: "https://github.com/Vasandeveloper/emergency-braking-system",
      category: "Embedded Systems"
    },
    {
      id: 'default-2',
      title: "Blind Man Glasses – Assistive Wearable",
      description: "IR-based obstacle detection with vibration and buzzer alert for visually impaired users. Provides real-time feedback for safe mobility.",
      iconType: 'FaEyeIcon',
      image: "/api/placeholder/400/250", // Placeholder
      technologies: ["IR Sensors", "Buzzer", "Vibrator Motor", "Arduino"],
      github: "https://github.com/Vasandeveloper/blind-man-glasses",
      demo: "https://github.com/Vasandeveloper/blind-man-glasses",
      category: "Embedded Systems"
    },
    {
      id: 'default-3',
      title: "Smart Radar-Based Parking & Obstacle Detection System",
      description: "Radar system using an ultrasonic sensor + servo motor for real-time object scanning. Data visualized using Processing IDE.",
      iconType: 'FaRadar',
      image: "/api/placeholder/400/250", // Placeholder
      technologies: ["Arduino", "Servo Motor", "Processing 4.3", "Ultrasonic Sensor"],
      github: "https://github.com/Vasandeveloper/smart-radar-obstacle-detector",
      demo: "https://github.com/Vasandeveloper/smart-radar-obstacle-detector",
      category: "Embedded Systems"
    }
  ];

  // Combined projects (default + dynamic)
  const allProjects = [...defaultProjects, ...dynamicProjects];

  // Icon mapping for dynamic projects
  const iconComponents = {
    FaCar,
    FaEyeIcon: FaEye,
    FaRadar,
    FaMicrochip,
    FaRobot,
    FaLightbulb,
    FaHome,
    FaHeart,
    FaGamepad,
    FaMobile,
    FaWifi,
    FaBluetooth,
    FaSolarPanel
  };

  const getIconComponent = (iconType) => {
    const IconComponent = iconComponents[iconType] || FaMicrochip;
    const colorMap = {
      FaCar: 'text-neon-green',
      FaEyeIcon: 'text-neon-purple',
      FaRadar: 'text-neon-blue',
      FaMicrochip: 'text-neon-green',
      FaRobot: 'text-neon-purple',
      FaLightbulb: 'text-yellow-400',
      FaHome: 'text-neon-blue',
      FaHeart: 'text-red-400',
      FaGamepad: 'text-neon-purple',
      FaMobile: 'text-neon-green',
      FaWifi: 'text-neon-blue',
      FaBluetooth: 'text-blue-400',
      FaSolarPanel: 'text-yellow-500'
    };
    const colorClass = colorMap[iconType] || 'text-neon-blue';
    return <IconComponent className={colorClass} />;
  };

  const handleProjectsUpdate = (newProjects) => {
    setDynamicProjects(newProjects);
  };

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

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-dark-bg to-dark-surface">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore my hands-on work in embedded systems, circuit design, and electronics engineering.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {allProjects.map((project, index) => (
            <motion.div
              key={project.id || index}
              variants={cardVariants}
              className="group"
            >
              <div className="glass-dark rounded-2xl overflow-hidden h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-neon-blue/20">
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-dark-accent to-dark-surface overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-20">
                      {getIconComponent(project.iconType)}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 text-4xl">
                    {getIconComponent(project.iconType)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-neon-blue/20 text-neon-blue px-2 py-1 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-neon-blue transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="glass px-3 py-1 text-sm rounded-full text-neon-blue border border-neon-blue/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex space-x-4">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 glass px-4 py-2 rounded-lg text-neon-blue hover:text-neon-purple transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaGithub />
                        <span className="text-sm">Code</span>
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 glass px-4 py-2 rounded-lg text-neon-green hover:text-neon-purple transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt />
                        <span className="text-sm">Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">Want to see more of my work?</p>
          <motion.a
            href="https://github.com/Vasandeveloper"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 glass-dark px-6 py-3 rounded-full text-neon-blue border border-neon-blue/30 hover:border-neon-purple/50 hover:text-neon-purple transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub />
            <span>View All Projects</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Project Manager - Admin Feature */}
      <ProjectManager onProjectsUpdate={handleProjectsUpdate} />
    </section>
  );
};

export default Projects;
