import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSave, 
  FaTimes, 
  FaEye, 
  FaEyeSlash,
  FaCar,
  FaEye as FaEyeIcon,
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

const ProjectManager = ({ onProjectsUpdate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [],
    github: '',
    demo: '',
    iconType: 'FaCar',
    category: 'Embedded Systems'
  });

  // Available icons for projects
  const availableIcons = {
    FaCar: { icon: FaCar, color: 'text-neon-green', label: 'Automotive' },
    FaEyeIcon: { icon: FaEyeIcon, color: 'text-neon-purple', label: 'Vision/Accessibility' },
    FaRadar: { icon: FaRadar, color: 'text-neon-blue', label: 'Radar/Sensing' },
    FaMicrochip: { icon: FaMicrochip, color: 'text-neon-green', label: 'Hardware/IC' },
    FaRobot: { icon: FaRobot, color: 'text-neon-purple', label: 'Robotics' },
    FaLightbulb: { icon: FaLightbulb, color: 'text-yellow-400', label: 'Innovation' },
    FaHome: { icon: FaHome, color: 'text-neon-blue', label: 'Home Automation' },
    FaHeart: { icon: FaHeart, color: 'text-red-400', label: 'Health/Medical' },
    FaGamepad: { icon: FaGamepad, color: 'text-neon-purple', label: 'Gaming' },
    FaMobile: { icon: FaMobile, color: 'text-neon-green', label: 'Mobile/IoT' },
    FaWifi: { icon: FaWifi, color: 'text-neon-blue', label: 'Wireless/Connectivity' },
    FaBluetooth: { icon: FaBluetooth, color: 'text-blue-400', label: 'Bluetooth' },
    FaSolarPanel: { icon: FaSolarPanel, color: 'text-yellow-500', label: 'Solar/Green Energy' }
  };

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setProjects(parsedProjects);
      if (onProjectsUpdate) {
        onProjectsUpdate(parsedProjects);
      }
    }
  }, [onProjectsUpdate]);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('portfolioProjects', JSON.stringify(projects));
      if (onProjectsUpdate) {
        onProjectsUpdate(projects);
      }
    }
  }, [projects, onProjectsUpdate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTechnologiesChange = (value) => {
    const techArray = value.split(',').map(tech => tech.trim()).filter(tech => tech !== '');
    setFormData(prev => ({
      ...prev,
      technologies: techArray
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      alert('Please fill in title and description');
      return;
    }

    const newProject = {
      ...formData,
      id: editingProject ? editingProject.id : Date.now(),
      createdAt: editingProject ? editingProject.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingProject) {
      setProjects(prev => prev.map(project => 
        project.id === editingProject.id ? newProject : project
      ));
    } else {
      setProjects(prev => [...prev, newProject]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: [],
      github: '',
      demo: '',
      iconType: 'FaCar',
      category: 'Embedded Systems'
    });
    setShowForm(false);
    setEditingProject(null);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      github: project.github || '',
      demo: project.demo || '',
      iconType: project.iconType || 'FaCar',
      category: project.category || 'Embedded Systems'
    });
    setShowForm(true);
  };

  const handleDelete = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(project => project.id !== projectId));
    }
  };

  const renderIcon = (iconType) => {
    const IconComponent = availableIcons[iconType]?.icon || FaCar;
    const colorClass = availableIcons[iconType]?.color || 'text-neon-blue';
    return <IconComponent className={colorClass} />;
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-neon-blue hover:bg-neon-purple text-white p-3 rounded-full shadow-lg transition-colors duration-300"
          title="Manage Projects"
        >
          <FaEdit size={20} />
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
        className="bg-dark-surface rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neon-blue">Project Manager</h2>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Add New Project Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 flex items-center space-x-2 bg-neon-green hover:bg-neon-blue text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            <FaPlus />
            <span>Add New Project</span>
          </button>
        )}

        {/* Project Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="mb-8 glass-dark rounded-lg p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-neon-purple">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Project Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full bg-dark-bg border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:outline-none"
                    placeholder="e.g., Smart Home Security System"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full bg-dark-bg border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:outline-none"
                  >
                    <option value="Embedded Systems">Embedded Systems</option>
                    <option value="IoT">IoT</option>
                    <option value="Robotics">Robotics</option>
                    <option value="VLSI">VLSI</option>
                    <option value="Signal Processing">Signal Processing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full bg-dark-bg border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:outline-none"
                    rows="3"
                    placeholder="Describe your project, its functionality, and key features..."
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Technologies (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.technologies.join(', ')}
                    onChange={(e) => handleTechnologiesChange(e.target.value)}
                    className="w-full bg-dark-bg border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:outline-none"
                    placeholder="Arduino, ESP32, Python, React"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Project Icon</label>
                  <select
                    value={formData.iconType}
                    onChange={(e) => handleInputChange('iconType', e.target.value)}
                    className="w-full bg-dark-bg border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:outline-none"
                  >
                    {Object.entries(availableIcons).map(([key, { label }]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">GitHub Repository</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    className="w-full bg-dark-bg border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:outline-none"
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Demo Link</label>
                  <input
                    type="url"
                    value={formData.demo}
                    onChange={(e) => handleInputChange('demo', e.target.value)}
                    className="w-full bg-dark-bg border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-neon-blue focus:outline-none"
                    placeholder="https://demo-link.com"
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
                  className="flex items-center space-x-2 px-4 py-2 bg-neon-blue hover:bg-neon-purple text-white rounded-lg transition-colors duration-300"
                >
                  <FaSave />
                  <span>{editingProject ? 'Update' : 'Add'} Project</span>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Projects List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Current Projects ({projects.length})</h3>
          {projects.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No projects added yet. Click "Add New Project" to get started!</p>
          ) : (
            projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-dark rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">
                    {renderIcon(project.iconType)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{project.title}</h4>
                    <p className="text-gray-400 text-sm">{project.category}</p>
                    <p className="text-gray-500 text-xs">
                      {project.technologies.join(', ')}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-neon-blue hover:text-neon-purple transition-colors duration-300"
                    title="Edit Project"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors duration-300"
                    title="Delete Project"
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

export default ProjectManager;
