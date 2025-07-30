import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isVisible, setIsVisible] = useState({})
  const [scrollDirection, setScrollDirection] = useState('down')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [showAdmin, setShowAdmin] = useState(false)
  
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Emergency Braking System (Arduino-based)",
      description: "🚗 Real-time obstacle detection using ultrasonic sensor and Arduino UNO. Implements autonomous emergency braking via servo motor control system.",
      tech: ["Arduino IDE", "Ultrasonic Sensor", "Servo Motor", "L298N Motor Driver"],
      features: ["Real-time Detection", "Autonomous Braking", "Servo Control", "Safety System"],
      github: "https://github.com/Vasandeveloper/emergency-braking-system",
      gradient: "linear-gradient(135deg, #ff6b6b, #ff8e8e)"
    },
    {
      id: 2,
      title: "Blind Man Glasses – Assistive Wearable",
      description: "👓 Revolutionary IR-based obstacle detection system with haptic feedback. Provides real-time vibration and audio alerts for enhanced mobility assistance.",
      tech: ["IR Sensors", "Buzzer", "Vibrator Motor", "Arduino"],
      features: ["Haptic Feedback", "Audio Alerts", "Wearable Design", "Mobility Assistance"],
      github: "https://github.com/Vasandeveloper/blind-man-glasses",
      gradient: "linear-gradient(135deg, #00d4ff, #0099cc)"
    },
    {
      id: 3,
      title: "Smart Radar-Based Parking & Obstacle Detection System",
      description: "📡 Advanced radar scanning system using servo-controlled ultrasonic sensor. Features real-time visualization through Processing IDE interface.",
      tech: ["Arduino", "Servo Motor", "Processing 4.3", "Ultrasonic Sensor"],
      features: ["Radar Scanning", "Real-time Visualization", "Servo Control", "Processing Interface"],
      github: "https://github.com/Vasandeveloper/smart-radar-obstacle-detector",
      gradient: "linear-gradient(135deg, #8b5cf6, #a855f7)"
    }
  ])
  
  const [skillCategories, setSkillCategories] = useState([
    {
      category: "🔧 Hardware & Embedded",
      skills: [
        { id: 1, name: "Embedded Systems Basics", level: 85, icon: "🔌" },
        { id: 2, name: "Arduino & Sensor Interfacing", level: 90, icon: "📡" },
        { id: 3, name: "Digital Logic Design", level: 88, icon: "🔢" },
        { id: 4, name: "Circuit Debugging", level: 82, icon: "🔍" }
      ]
    },
    {
      category: "💻 Software & Tools",
      skills: [
        { id: 5, name: "MATLAB (Simulation, Plotting)", level: 75, icon: "📊" },
        { id: 6, name: "GitHub", level: 80, icon: "🔗" },
        { id: 7, name: "VS Code", level: 92, icon: "⚙️" }
      ]
    },
    {
      category: "⚙️ Core Tech",
      skills: [
        { id: 8, name: "Basic VLSI (Verilog HDL – Beginner)", level: 65, icon: "🔬" },
        { id: 9, name: "PCB Soldering & Debugging", level: 85, icon: "🛠️" },
        { id: 10, name: "Microcontroller Programming (Arduino)", level: 88, icon: "🎛️" }
      ]
    }
  ])
  
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeUrl, setResumeUrl] = useState(localStorage.getItem('resumeUrl') || null)

  // Admin authentication
  const handleAdminLogin = () => {
    if (adminPassword === 'keerthi2025admin') {
      setIsAdmin(true)
      setShowAdmin(true)
      setAdminPassword('')
    } else {
      alert('❌ Invalid password! Access denied.')
      setAdminPassword('')
    }
  }

  // Add new project
  const addProject = (newProject) => {
    const project = {
      ...newProject,
      id: Date.now(),
      gradient: `linear-gradient(135deg, ${newProject.color1}, ${newProject.color2})`
    }
    setProjects([...projects, project])
    localStorage.setItem('portfolioProjects', JSON.stringify([...projects, project]))
  }

  // Add new skill
  const addSkill = (categoryIndex, newSkill) => {
    const updatedCategories = [...skillCategories]
    updatedCategories[categoryIndex].skills.push({
      ...newSkill,
      id: Date.now()
    })
    setSkillCategories(updatedCategories)
    localStorage.setItem('portfolioSkills', JSON.stringify(updatedCategories))
  }

  // Handle resume upload
  const handleResumeUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file)
      setResumeUrl(url)
      localStorage.setItem('resumeUrl', url)
      setResumeFile(file)
      alert('✅ Resume uploaded successfully!')
    } else {
      alert('❌ Please upload a PDF file only.')
    }
  }

  // Load saved data on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolioProjects')
    const savedSkills = localStorage.getItem('portfolioSkills')
    
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
    if (savedSkills) {
      setSkillCategories(JSON.parse(savedSkills))
    }
  }, [])

  // Admin Panel Component
  const AdminPanel = () => {
    const [newProject, setNewProject] = useState({
      title: '',
      description: '',
      tech: '',
      features: '',
      color1: '#00d4ff',
      color2: '#8b5cf6'
    })
    
    const [newSkill, setNewSkill] = useState({
      name: '',
      level: 90,
      icon: '🔌'
    })
    
    const [selectedCategory, setSelectedCategory] = useState(0)
    
    const availableIcons = [
      '🔌', '📡', '🔢', '🔍', '📊', '🔗', '⚙️', '🔬', '🛠️', '🎛️',
      '🚀', '💻', '🔧', '⚡', '🌐', '📱', '🖥️', '🔋', '🎯', '💡'
    ]

    const handleProjectSubmit = (e) => {
      e.preventDefault()
      if (newProject.title && newProject.description) {
        addProject({
          ...newProject,
          tech: newProject.tech.split(',').map(t => t.trim()),
          features: newProject.features.split(',').map(f => f.trim())
        })
        setNewProject({
          title: '',
          description: '',
          tech: '',
          features: '',
          color1: '#00d4ff',
          color2: '#8b5cf6'
        })
        alert('✅ Project added successfully!')
      }
    }

    const handleSkillSubmit = (e) => {
      e.preventDefault()
      if (newSkill.name) {
        addSkill(selectedCategory, newSkill)
        setNewSkill({
          name: '',
          level: 90,
          icon: '🔌'
        })
        alert('✅ Skill added successfully!')
      }
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-neon-blue">🔐 Admin Panel</h2>
            <button
              onClick={() => setShowAdmin(false)}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Add Project */}
            <div className="bg-dark-surface p-6 rounded-xl border border-neon-blue/20">
              <h3 className="text-xl font-bold text-neon-green mb-4">➕ Add New Project</h3>
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="w-full p-3 bg-dark-bg border border-neon-blue/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                  required
                />
                <textarea
                  placeholder="Project Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full p-3 bg-dark-bg border border-neon-blue/30 rounded-lg text-white focus:border-neon-blue focus:outline-none h-24"
                  required
                />
                <input
                  type="text"
                  placeholder="Technologies (comma-separated)"
                  value={newProject.tech}
                  onChange={(e) => setNewProject({...newProject, tech: e.target.value})}
                  className="w-full p-3 bg-dark-bg border border-neon-blue/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Features (comma-separated)"
                  value={newProject.features}
                  onChange={(e) => setNewProject({...newProject, features: e.target.value})}
                  className="w-full p-3 bg-dark-bg border border-neon-blue/30 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                />
                <div className="flex gap-4">
                  <div>
                    <label className="block text-neon-purple mb-2">Color 1</label>
                    <input
                      type="color"
                      value={newProject.color1}
                      onChange={(e) => setNewProject({...newProject, color1: e.target.value})}
                      className="w-20 h-10 rounded-lg border border-neon-blue/30"
                    />
                  </div>
                  <div>
                    <label className="block text-neon-purple mb-2">Color 2</label>
                    <input
                      type="color"
                      value={newProject.color2}
                      onChange={(e) => setNewProject({...newProject, color2: e.target.value})}
                      className="w-20 h-10 rounded-lg border border-neon-blue/30"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-neon-blue to-neon-green text-black font-bold rounded-lg hover:shadow-lg hover:shadow-neon-blue/50 transform hover:scale-105 transition-all"
                >
                  🚀 Add Project
                </button>
              </form>
            </div>

            {/* Add Skill */}
            <div className="bg-dark-surface p-6 rounded-xl border border-neon-green/20">
              <h3 className="text-xl font-bold text-neon-purple mb-4">⚡ Add New Skill</h3>
              <form onSubmit={handleSkillSubmit} className="space-y-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
                  className="w-full p-3 bg-dark-bg border border-neon-green/30 rounded-lg text-white focus:border-neon-green focus:outline-none"
                >
                  {skillCategories.map((category, index) => (
                    <option key={index} value={index}>{category.category}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Skill Name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                  className="w-full p-3 bg-dark-bg border border-neon-green/30 rounded-lg text-white focus:border-neon-green focus:outline-none"
                  required
                />
                <div>
                  <label className="block text-neon-blue mb-2">Skill Level: {newSkill.level}%</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                    className="w-full accent-neon-green"
                  />
                </div>
                <div>
                  <label className="block text-neon-purple mb-2">Icon</label>
                  <select
                    value={newSkill.icon}
                    onChange={(e) => setNewSkill({...newSkill, icon: e.target.value})}
                    className="w-full p-3 bg-dark-bg border border-neon-green/30 rounded-lg text-white focus:border-neon-green focus:outline-none"
                  >
                    {availableIcons.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-neon-green to-neon-purple text-black font-bold rounded-lg hover:shadow-lg hover:shadow-neon-green/50 transform hover:scale-105 transition-all"
                >
                  ⚡ Add Skill
                </button>
              </form>
            </div>

            {/* Resume Upload */}
            <div className="bg-dark-surface p-6 rounded-xl border border-neon-purple/20 md:col-span-2">
              <h3 className="text-xl font-bold text-neon-blue mb-4">📄 Update Resume</h3>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  className="flex-1 p-3 bg-dark-bg border border-neon-purple/30 rounded-lg text-white focus:border-neon-purple focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-neon-purple file:text-black file:font-bold"
                />
                {resumeUrl && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-blue text-black font-bold rounded-lg hover:shadow-lg hover:shadow-neon-purple/50 transform hover:scale-105 transition-all"
                  >
                    👁️ Preview
                  </a>
                )}
              </div>
              {resumeFile && (
                <p className="mt-2 text-neon-green">✅ Current: {resumeFile.name}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else {
        setScrollDirection('up')
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id
          if (entry.isIntersecting) {
            setActiveSection(sectionId)
            setIsVisible(prev => ({ ...prev, [sectionId]: true }))
          }
        })
      },
      { threshold: 0.3, rootMargin: '-50px 0px' }
    )

    const sections = ['hero', 'projects', 'skills', 'contact']
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Particle animation component
  const ParticleField = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif'
    }}>
      
      {/* Floating Navigation */}
      <nav style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'linear-gradient(145deg, rgba(26,26,26,0.95), rgba(15,15,15,0.95))',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,212,255,0.3)',
        borderRadius: '50px',
        padding: '1rem 2rem',
        display: 'flex',
        gap: '1.5rem',
        animation: 'slideDown 0.8s ease-out'
      }}>
        {[
          { id: 'hero', label: 'Home', icon: '🏠' },
          { id: 'projects', label: 'Projects', icon: '🚀' },
          { id: 'skills', label: 'Skills', icon: '🧠' },
          { id: 'contact', label: 'Contact', icon: '🌐' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            style={{
              background: activeSection === item.id 
                ? 'linear-gradient(135deg, #00d4ff, #8b5cf6)' 
                : 'transparent',
              color: activeSection === item.id ? 'white' : '#cccccc',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
              transform: activeSection === item.id ? 'scale(1.05)' : 'scale(1)'
            }}
            onMouseEnter={(e) => {
              if (activeSection !== item.id) {
                e.target.style.background = 'rgba(0,212,255,0.2)'
                e.target.style.color = '#00d4ff'
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== item.id) {
                e.target.style.background = 'transparent'
                e.target.style.color = '#cccccc'
              }
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
        
        {/* Admin Login Button */}
        <button
          onClick={() => {
            const password = prompt('🔐 Enter admin password:')
            if (password) {
              setAdminPassword(password)
              if (password === 'keerthi2025admin') {
                setIsAdmin(true)
                setShowAdmin(true)
              } else {
                alert('❌ Invalid password! Access denied.')
              }
            }
          }}
          style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
            color: 'white',
            border: 'none',
            padding: '0.8rem 1.5rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)'
            e.target.style.boxShadow = '0 8px 20px rgba(255,107,107,0.3)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)'
            e.target.style.boxShadow = 'none'
          }}
        >
          <span>🔐</span>
          Admin
        </button>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className={`scroll-section scroll-${scrollDirection}`}
        style={{
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          opacity: isVisible.hero ? 1 : 0,
          transform: isVisible.hero
            ? 'translateY(0) scale(1)' 
            : scrollDirection === 'down' 
              ? 'translateY(50px) scale(0.95)' 
              : 'translateY(-50px) scale(0.95)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <ParticleField />
        
        <div style={{ 
          position: 'relative', 
          zIndex: 10, 
          maxWidth: '1000px', 
          padding: '0 2rem' 
        }}>
          {/* Animated Background Elements */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'pulse 4s ease-in-out infinite',
            zIndex: -1
          }} />
          
          <div style={{
            position: 'absolute',
            top: '30%',
            right: '10%',
            width: '200px',
            height: '200px',
            background: 'linear-gradient(45deg, #8b5cf6, transparent)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite',
            opacity: 0.3,
            zIndex: -1
          }} />
          
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '15%',
            width: '150px',
            height: '150px',
            background: 'linear-gradient(45deg, #00ff88, transparent)',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite reverse',
            opacity: 0.2,
            zIndex: -1
          }} />
          
          <div style={{ 
            fontSize: '5rem', 
            marginBottom: '1rem',
            animation: 'glow 2s ease-in-out infinite alternate'
          }}>
            ⚡
          </div>
          
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #00d4ff 0%, #8b5cf6 50%, #00ff88 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            animation: 'slideInUp 1s ease-out 0.2s both'
          }}>
            Keerthivasan Govindaraju
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            marginBottom: '1rem',
            color: '#cccccc',
            fontWeight: '300',
            animation: 'slideInUp 1s ease-out 0.4s both'
          }}>
            🎓 <span style={{ color: '#00d4ff', fontWeight: '600' }}>2nd Year B.Tech ECE</span>
          </p>
          
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            marginBottom: '3rem',
            color: '#888',
            maxWidth: '700px',
            margin: '0 auto 3rem auto',
            lineHeight: '1.6',
            animation: 'slideInUp 1s ease-out 0.6s both'
          }}>
            🚀 Passionate about <span style={{ color: '#8b5cf6', fontWeight: '600' }}>Embedded Systems</span> & <span style={{ color: '#00ff88', fontWeight: '600' }}>VLSI Design</span>
            <br />
            Crafting innovative solutions through cutting-edge technology
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            animation: 'slideInUp 1s ease-out 0.8s both'
          }}>
            <button
              onClick={() => scrollToSection('projects')}
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
                color: 'white',
                padding: '1.2rem 2.5rem',
                borderRadius: '50px',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.05)'
                e.target.style.boxShadow = '0 20px 40px rgba(0,212,255,0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)'
                e.target.style.boxShadow = 'none'
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>🚀</span>
              Explore Projects
            </button>
            
            <button
              onClick={() => scrollToSection('contact')}
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(0,255,136,0.2))',
                color: '#cccccc',
                padding: '1.2rem 2.5rem',
                borderRadius: '50px',
                border: '2px solid rgba(139,92,246,0.5)',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.05)'
                e.target.style.background = 'linear-gradient(135deg, #8b5cf6, #00ff88)'
                e.target.style.color = 'white'
                e.target.style.borderColor = 'transparent'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)'
                e.target.style.background = 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(0,255,136,0.2))'
                e.target.style.color = '#cccccc'
                e.target.style.borderColor = 'rgba(139,92,246,0.5)'
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>💬</span>
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className={`scroll-section scroll-${scrollDirection}`}
        style={{
          minHeight: '100vh',
          padding: '5rem 2rem',
          background: '#0a0a0a',
          opacity: isVisible.projects ? 1 : 0,
          transform: isVisible.projects
            ? 'translateY(0) scale(1)' 
            : scrollDirection === 'down' 
              ? 'translateY(50px) scale(0.95)' 
              : 'translateY(-50px) scale(0.95)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <ParticleField />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #00d4ff 0%, #8b5cf6 50%, #00ff88 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem'
            }}>
              🚀 Featured Projects
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#888',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Innovative embedded systems projects showcasing my technical expertise and problem-solving abilities
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            justifyItems: 'center'
          }}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                style={{
                  background: 'linear-gradient(145deg, rgba(26,26,26,0.8), rgba(15,15,15,0.8))',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  maxWidth: '400px',
                  width: '100%',
                  transition: 'all 0.5s ease',
                  animation: `slideInUp 0.8s ease-out ${index * 0.2}s both`,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,212,255,0.3)'
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: project.gradient,
                  borderRadius: '20px 20px 0 0'
                }} />
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  gap: '1rem'
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    background: project.gradient,
                    borderRadius: '12px',
                    padding: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    🔧
                  </div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: 'white',
                    margin: 0,
                    lineHeight: '1.3'
                  }}>
                    {project.title}
                  </h3>
                </div>
                
                <p style={{
                  color: '#cccccc',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6',
                  fontSize: '0.95rem'
                }}>
                  {project.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  {project.tech?.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      style={{
                        background: 'rgba(139,92,246,0.2)',
                        color: '#8b5cf6',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        border: '1px solid rgba(139,92,246,0.3)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {project.features && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{
                      color: '#00ff88',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '0.8rem'
                    }}>
                      ⚡ Key Features:
                    </h4>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.5rem'
                    }}>
                      {project.features.slice(0, 4).map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          style={{
                            color: '#aaa',
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <span style={{ color: '#00ff88', fontSize: '0.7rem' }}>●</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {project.github && (
                  <button
                    onClick={() => window.open(project.github, '_blank')}
                    style={{
                      background: project.gradient,
                      color: 'white',
                      border: 'none',
                      padding: '0.8rem 1.5rem',
                      borderRadius: '25px',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)'
                      e.target.style.boxShadow = '0 8px 20px rgba(0,212,255,0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    <span>🔗</span>
                    View on GitHub
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        className={`scroll-section scroll-${scrollDirection}`}
        style={{
          minHeight: '100vh',
          padding: '5rem 2rem',
          background: '#0a0a0a',
          opacity: isVisible.skills ? 1 : 0,
          transform: isVisible.skills
            ? 'translateY(0) scale(1)' 
            : scrollDirection === 'down' 
              ? 'translateY(50px) scale(0.95)' 
              : 'translateY(-50px) scale(0.95)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <ParticleField />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #00ff88 50%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem'
            }}>
              🧠 Technical Skills
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#888',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Expertise in embedded systems, VLSI design, and modern development tools
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            justifyItems: 'center'
          }}>
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                style={{
                  background: 'linear-gradient(145deg, rgba(26,26,26,0.8), rgba(15,15,15,0.8))',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  maxWidth: '400px',
                  width: '100%',
                  animation: `slideInUp 0.8s ease-out ${categoryIndex * 0.2}s both`
                }}
              >
                <h3 style={{
                  color: '#00d4ff',
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem'
                }}>
                  {category.category}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.id} style={{ marginBottom: '1rem' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{
                          color: 'white',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span style={{ fontSize: '1.2rem' }}>{skill.icon}</span>
                          {skill.name}
                        </span>
                        <span style={{
                          color: '#00ff88',
                          fontWeight: '700',
                          fontSize: '0.9rem'
                        }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        height: '8px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          background: 'linear-gradient(90deg, #00d4ff, #8b5cf6, #00ff88)',
                          height: '100%',
                          width: `${skill.level}%`,
                          borderRadius: '10px',
                          transition: 'width 1s ease-out',
                          animation: `skillBar 2s ease-out ${skillIndex * 0.1}s both`
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className={`scroll-section scroll-${scrollDirection}`}
        style={{
          minHeight: '100vh',
          padding: '5rem 2rem',
          background: '#0a0a0a',
          opacity: isVisible.contact ? 1 : 0,
          transform: isVisible.contact
            ? 'translateY(0) scale(1)' 
            : scrollDirection === 'down' 
              ? 'translateY(50px) scale(0.95)' 
              : 'translateY(-50px) scale(0.95)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <ParticleField />
        
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem'
          }}>
            🌐 Let's Connect
          </h2>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#888',
            marginBottom: '3rem',
            lineHeight: '1.6'
          }}>
            Ready to collaborate on exciting embedded systems projects? Let's build the future together!
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {[
              { icon: '📧', label: 'Email', value: 'keerthivasangovindaraju@gmail.com', link: 'mailto:keerthivasangovindaraju@gmail.com' },
              { icon: '📱', label: 'Phone', value: '+91 8610084011', link: 'tel:+918610084011' },
              { icon: '🔗', label: 'LinkedIn', value: 'LinkedIn Profile', link: 'https://linkedin.com/in/keerthivasan-govindaraju-b82162295' },
              { icon: '💻', label: 'GitHub', value: 'GitHub Profile', link: 'https://github.com/Vasandeveloper' }
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.link}
                target={contact.link.startsWith('http') ? '_blank' : '_self'}
                rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
                style={{
                  background: 'linear-gradient(145deg, rgba(26,26,26,0.8), rgba(15,15,15,0.8))',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'block',
                  animation: `slideInUp 0.8s ease-out ${index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,212,255,0.2)'
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>
                  {contact.icon}
                </div>
                <h3 style={{ color: '#00d4ff', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: '600' }}>
                  {contact.label}
                </h3>
                <p style={{ color: '#cccccc', fontSize: '0.9rem', margin: 0 }}>
                  {contact.value}
                </p>
              </a>
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => window.open('mailto:keerthivasangovindaraju@gmail.com', '_blank')}
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
                color: 'white',
                padding: '1.2rem 2.5rem',
                borderRadius: '15px',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)'
                e.target.style.boxShadow = '0 15px 30px rgba(0,212,255,0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.boxShadow = 'none'
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>🚀</span>
              Launch Email
            </button>
            
            <button
              onClick={() => window.open('https://linkedin.com/in/keerthivasan-govindaraju-b82162295', '_blank')}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
                color: 'white',
                padding: '1.2rem 2.5rem',
                borderRadius: '15px',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)'
                e.target.style.boxShadow = '0 15px 30px rgba(139,92,246,0.4)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.boxShadow = 'none'
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>🔗</span>
              Connect Network
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#0a0a0a', 
        padding: '60px 20px 40px', 
        textAlign: 'center',
        borderTop: '1px solid rgba(0,212,255,0.3)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>⚡</div>
        
        <p style={{ 
          color: '#888', 
          marginBottom: '2rem',
          fontSize: '1.1rem',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          © 2025 <span style={{ color: '#00d4ff', fontWeight: 'bold' }}>Keerthivasan Govindaraju</span>
          <br />
          <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>
            🚀 Crafted with React & fueled by passion for embedded systems innovation
          </span>
        </p>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '2rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {[
            { icon: '📧', link: 'mailto:keerthivasangovindaraju@gmail.com' },
            { icon: '🔗', link: 'https://linkedin.com/in/keerthivasan-govindaraju-b82162295' },
            { icon: '💻', link: 'https://github.com/Vasandeveloper' }
          ].map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '1.5rem',
                color: '#888',
                transition: 'all 0.3s ease',
                padding: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#00d4ff'
                e.target.style.transform = 'scale(1.2)'
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#888'
                e.target.style.transform = 'scale(1)'
              }}
            >
              {social.icon}
            </a>
          ))}
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, rgba(26,26,26,0.5), rgba(15,15,15,0.5))',
          backdropFilter: 'blur(10px)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '1px solid rgba(0,212,255,0.2)',
          maxWidth: '500px',
          margin: '0 auto',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ 
            color: '#cccccc', 
            fontSize: '0.9rem',
            margin: 0,
            lineHeight: '1.6'
          }}>
            🔮 <strong>Next-Gen Portfolio</strong> • Built with cutting-edge web technologies
            <br />
            <span style={{ color: '#00d4ff' }}>React</span> • 
            <span style={{ color: '#8b5cf6' }}> Vite</span> • 
            <span style={{ color: '#00ff88' }}> Futuristic Design</span>
          </p>
        </div>
      </footer>
      
      {/* Admin Panel */}
      {showAdmin && <AdminPanel />}
    </div>
  )
}

export default App
