import { motion } from 'framer-motion';
import { 
  FaMicrochip, 
  FaCode, 
  FaTools, 
  FaCogs, 
  FaTerminal, 
  FaEye, 
  FaGitAlt,
  FaEdit,
  FaSave,
  FaTimes
} from 'react-icons/fa';
import { SiArduino, SiMatlab, SiVscode } from 'react-icons/si';
import { useState } from 'react';
import SkillsManager from './SkillsManager';

const Skills = () => {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [customDescription, setCustomDescription] = useState(
    "I'm passionate about embedded systems and VLSI design, with hands-on experience in hardware interfacing, circuit debugging, and microcontroller programming. Always eager to learn and implement cutting-edge technologies in the field of electronics."
  );
  const [tempDescription, setTempDescription] = useState(customDescription);
  const [customSkills, setCustomSkills] = useState([]);

  const skillCategories = [
    {
      title: "🔧 Hardware & Embedded",
      icon: <FaMicrochip className="text-neon-blue" />,
      skills: [
        { name: "Embedded Systems Basics", icon: <FaMicrochip />, level: 85, description: "Fundamentals of embedded system design and architecture" },
        { name: "Arduino & Sensor Interfacing", icon: <SiArduino />, level: 90, description: "Hands-on experience with various sensors and actuators" },
        { name: "Digital Logic Design", icon: <FaCogs />, level: 88, description: "Boolean algebra, combinational and sequential circuits" },
        { name: "Circuit Debugging", icon: <FaTools />, level: 82, description: "Troubleshooting and analyzing electronic circuits" }
      ]
    },
    {
      title: "💻 Software & Tools",
      icon: <FaCode className="text-neon-green" />,
      skills: [
        { name: "MATLAB (Simulation, Plotting)", icon: <SiMatlab />, level: 75, description: "Signal processing, data analysis, and visualization" },
        { name: "GitHub", icon: <FaGitAlt />, level: 80, description: "Version control and collaborative development" },
        { name: "VS Code", icon: <SiVscode />, level: 92, description: "Primary development environment and extensions" }
      ]
    },
    {
      title: "⚙️ Core Tech",
      icon: <FaCogs className="text-neon-purple" />,
      skills: [
        { name: "Basic VLSI (Verilog HDL – Beginner)", icon: <FaMicrochip />, level: 65, description: "Hardware description language for digital circuits" },
        { name: "PCB Soldering & Debugging", icon: <FaTerminal />, level: 85, description: "Component placement, soldering techniques, and PCB troubleshooting" },
        { name: "Microcontroller Programming (Arduino)", icon: <SiArduino />, level: 88, description: "C/C++ programming for Arduino platforms and libraries" }
      ]
    }
  ];

  const handleSaveDescription = () => {
    setCustomDescription(tempDescription);
    setIsEditingDescription(false);
  };

  const handleCancelEdit = () => {
    setTempDescription(customDescription);
    setIsEditingDescription(false);
  };

  const handleSkillsUpdate = (newSkills) => {
    setCustomSkills(newSkills);
  };

  // Icon mapping for custom skills
  const iconComponents = {
    FaMicrochip,
    SiArduino,
    FaCogs,
    FaTools,
    FaCode,
    SiMatlab,
    SiVscode,
    FaGitAlt,
    FaTerminal
  };

  const getIconComponent = (iconType) => {
    const IconComponent = iconComponents[iconType] || FaMicrochip;
    return <IconComponent />;
  };

  // Process skills with custom skills added to appropriate categories
  const processedSkillCategories = skillCategories.map(category => {
    const categoryCustomSkills = customSkills.filter(skill => skill.category === category.title);
    const customSkillsFormatted = categoryCustomSkills.map(skill => ({
      name: skill.name,
      icon: getIconComponent(skill.iconType),
      level: skill.level,
      description: skill.description
    }));
    
    return {
      ...category,
      skills: [...category.skills, ...customSkillsFormatted]
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

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
            Technical Skills
          </h2>
          
          {/* Customizable Description Section */}
          <div className="max-w-4xl mx-auto">
            {!isEditingDescription ? (
              <div className="relative group">
                <p className="text-xl text-gray-400 leading-relaxed">
                  {customDescription}
                </p>
                <button
                  onClick={() => setIsEditingDescription(true)}
                  className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-neon-blue hover:text-neon-purple p-2"
                  title="Edit Description"
                >
                  <FaEdit />
                </button>
              </div>
            ) : (
              <div className="glass-dark rounded-lg p-4">
                <textarea
                  value={tempDescription}
                  onChange={(e) => setTempDescription(e.target.value)}
                  className="w-full bg-transparent text-gray-300 text-lg resize-none border-2 border-neon-blue/30 rounded p-3 focus:border-neon-blue focus:outline-none"
                  rows="4"
                  placeholder="Describe your skills and expertise..."
                />
                <div className="flex justify-end space-x-3 mt-3">
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors duration-300"
                  >
                    <FaTimes />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSaveDescription}
                    className="flex items-center space-x-2 px-4 py-2 bg-neon-blue hover:bg-neon-purple rounded-lg transition-colors duration-300"
                  >
                    <FaSave />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {processedSkillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="glass-dark rounded-2xl p-6 h-full"
            >
              <div className="flex items-center mb-6">
                <div className="text-3xl mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-neon-blue group-hover:text-neon-purple transition-colors duration-300">
                          {skill.icon}
                        </span>
                        <span className="text-gray-300 font-medium">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="glass rounded-full h-2 overflow-hidden mb-2">
                      <motion.div
                        className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                    
                    <p className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {skill.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-dark rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-neon-blue">
              What I Bring to the Table
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center group cursor-pointer">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🔬</div>
                <p className="text-gray-400 group-hover:text-neon-blue transition-colors duration-300">Research & Analysis</p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">⚡</div>
                <p className="text-gray-400 group-hover:text-neon-green transition-colors duration-300">Circuit Design</p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">🛠️</div>
                <p className="text-gray-400 group-hover:text-neon-purple transition-colors duration-300">Hands-on Implementation</p>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">📊</div>
                <p className="text-gray-400 group-hover:text-neon-blue transition-colors duration-300">Problem Solving</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Skills Manager - Admin Feature */}
      <SkillsManager onSkillsUpdate={handleSkillsUpdate} />
    </section>
  );
};

export default Skills;
