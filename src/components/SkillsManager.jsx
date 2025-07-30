import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSave, 
  FaTimes, 
  FaCogs,
  FaMicrochip,
  FaCode,
  FaTools
} from 'react-icons/fa';
import { SiArduino, SiMatlab, SiVscode } from 'react-icons/si';

const SkillsManager = ({ onSkillsUpdate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [customSkills, setCustomSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    level: 80,
    description: '',
    category: '🔧 Hardware & Embedded',
    iconType: 'FaMicrochip'
  });

  // Available icons for skills
  const availableIcons = {
    FaMicrochip: { icon: FaMicrochip, label: 'Microchip/Hardware' },
    SiArduino: { icon: SiArduino, label: 'Arduino' },
    FaCogs: { icon: FaCogs, label: 'Mechanical/Systems' },
    FaTools: { icon: FaTools, label: 'Tools/Equipment' },
    FaCode: { icon: FaCode, label: 'Programming/Software' },
    SiMatlab: { icon: SiMatlab, label: 'MATLAB' },
    SiVscode: { icon: SiVscode, label: 'Development Environment' }
  };

  const categories = [
    '🔧 Hardware & Embedded',
    '💻 Software & Tools',
    '⚙️ Core Tech'
  ];

  // Load custom skills from localStorage
  useEffect(() => {
    const savedSkills = localStorage.getItem('portfolioCustomSkills');
    if (savedSkills) {
      const parsedSkills = JSON.parse(savedSkills);
      setCustomSkills(parsedSkills);
      if (onSkillsUpdate) {
        onSkillsUpdate(parsedSkills);
      }
    }
  }, [onSkillsUpdate]);

  // Save skills to localStorage whenever they change
  useEffect(() => {
    if (customSkills.length > 0) {
      localStorage.setItem('portfolioCustomSkills', JSON.stringify(customSkills));
      if (onSkillsUpdate) {
        onSkillsUpdate(customSkills);
      }
    }
  }, [customSkills, onSkillsUpdate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description) {
      alert('Please fill in skill name and description');
      return;
    }

    const newSkill = {
      ...formData,
      id: editingSkill ? editingSkill.id : Date.now(),
      createdAt: editingSkill ? editingSkill.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingSkill) {
      setCustomSkills(prev => prev.map(skill => 
        skill.id === editingSkill.id ? newSkill : skill
      ));
    } else {
      setCustomSkills(prev => [...prev, newSkill]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      level: 80,
      description: '',
      category: '🔧 Hardware & Embedded',
      iconType: 'FaMicrochip'
    });
    setShowForm(false);
    setEditingSkill(null);
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      level: skill.level,
      description: skill.description,
      category: skill.category,
      iconType: skill.iconType
    });
    setShowForm(true);
  };

  const handleDelete = (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      setCustomSkills(prev => prev.filter(skill => skill.id !== skillId));
    }
  };

  const renderIcon = (iconType) => {
    const IconComponent = availableIcons[iconType]?.icon || FaMicrochip;
    return <IconComponent className="text-neon-blue" />;
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-neon-purple hover:bg-neon-green text-white p-3 rounded-full shadow-lg transition-colors duration-300"
          title="Manage Skills"
        >
          <FaCogs size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-dark-surface rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neon-purple">Skills Manager</h2>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Add New Skill Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 flex items-center space-x-2 bg-neon-purple hover:bg-neon-blue text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            <FaPlus />
            <span>Add New Skill</span>
          </button>
        )}

        {/* Skill Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="mb-8 glass-dark rounded-lg p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-neon-green">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Skill Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full bg-dark-bg border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-purple focus:outline-none"
                    placeholder="e.g., ESP32 Programming"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Skill Level (%) *</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.level}
                    onChange={(e) => handleInputChange('level', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-neon-purple font-bold">{formData.level}%</div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full bg-dark-bg border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-purple focus:outline-none"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Skill Icon</label>
                  <select
                    value={formData.iconType}
                    onChange={(e) => handleInputChange('iconType', e.target.value)}
                    className="w-full bg-dark-bg border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-purple focus:outline-none"
                  >
                    {Object.entries(availableIcons).map(([key, { label }]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full bg-dark-bg border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-purple focus:outline-none"
                    rows="3"
                    placeholder="Describe your experience and proficiency with this skill..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
                >
                  <FaTimes />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-neon-purple hover:bg-neon-blue text-white rounded-lg transition-colors duration-300"
                >
                  <FaSave />
                  <span>{editingSkill ? 'Update' : 'Add'} Skill</span>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Skills List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Custom Skills ({customSkills.length})</h3>
          {customSkills.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No custom skills added yet. Click "Add New Skill" to get started!</p>
          ) : (
            customSkills.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-dark rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">
                    {renderIcon(skill.iconType)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{skill.name}</h4>
                    <p className="text-gray-400 text-sm">{skill.category} • {skill.level}%</p>
                    <p className="text-gray-500 text-xs">{skill.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-2 text-neon-purple hover:text-neon-blue transition-colors duration-300"
                    title="Edit Skill"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors duration-300"
                    title="Delete Skill"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsManager;
