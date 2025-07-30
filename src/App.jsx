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

  // Edit existing skill
  const editSkill = (categoryIndex, skillId, updatedSkill) => {
    const updatedCategories = [...skillCategories]
    const skillIndex = updatedCategories[categoryIndex].skills.findIndex(skill => skill.id === skillId)
    if (skillIndex !== -1) {
      updatedCategories[categoryIndex].skills[skillIndex] = { ...updatedSkill, id: skillId }
      setSkillCategories(updatedCategories)
      localStorage.setItem('portfolioSkills', JSON.stringify(updatedCategories))
    }
  }

  // Delete skill
  const deleteSkill = (categoryIndex, skillId) => {
    const updatedCategories = [...skillCategories]
    updatedCategories[categoryIndex].skills = updatedCategories[categoryIndex].skills.filter(skill => skill.id !== skillId)
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

            {/* Manage Existing Skills */}
            <div className="bg-dark-surface p-6 rounded-xl border border-yellow-500/20 md:col-span-2">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">🛠️ Manage Existing Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {skillCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-2">
                    <h4 className="text-lg font-bold text-neon-blue mb-3">{category.category}</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center justify-between bg-dark-bg p-3 rounded-lg border border-gray-600"
                        >
                          <span className="flex items-center gap-2 text-white">
                            <span className="text-lg">{skill.icon}</span>
                            <span className="text-sm">{skill.name}</span>
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => {
                                const newName = prompt('Edit skill name:', skill.name)
                                const newIcon = prompt('Edit skill icon:', skill.icon)
                                if (newName && newIcon) {
                                  editSkill(categoryIndex, skill.id, { name: newName, icon: newIcon })
                                }
                              }}
                              className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete "${skill.name}"?`)) {
                                  deleteSkill(categoryIndex, skill.id)
                                }
                              }}
                              className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Enhanced scroll tracking with throttling and smooth animations
  useEffect(() => {
    let ticking = false
    let scrollSpeed = 0
    let lastTime = Date.now()

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const currentTime = Date.now()
          const timeDiff = currentTime - lastTime
          
          // Calculate scroll speed
          scrollSpeed = Math.abs(currentScrollY - lastScrollY) / timeDiff
          
          // Update scroll direction
          if (currentScrollY > lastScrollY) {
            setScrollDirection('down')
            document.body.classList.add('scrolling-down')
            document.body.classList.remove('scrolling-up')
          } else if (currentScrollY < lastScrollY) {
            setScrollDirection('up')
            document.body.classList.add('scrolling-up')
            document.body.classList.remove('scrolling-down')
          }
          
          // Add scroll speed class for enhanced animations
          if (scrollSpeed > 0.5) {
            document.body.classList.add('fast-scroll')
          } else {
            document.body.classList.remove('fast-scroll')
          }
          
          setLastScrollY(currentScrollY)
          lastTime = currentTime
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.body.classList.remove('scrolling-down', 'scrolling-up', 'fast-scroll')
    }
  }, [lastScrollY])

  // Enhanced Intersection Observer for smooth fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id
          const element = entry.target
          
          if (entry.isIntersecting) {
            // Section is entering viewport - smooth fade in
            setActiveSection(sectionId)
            setIsVisible(prev => ({ ...prev, [sectionId]: true }))
            
            // Add smooth entrance animations
            element.classList.add('section-visible')
            element.classList.remove('section-hidden')
            
            // ULTRA-FAST staggered fade-in animations for child elements
            const animatedElements = element.querySelectorAll('.animate-on-scroll')
            animatedElements.forEach((el, index) => {
              // Reset any previous animations
              el.classList.remove('animate-in', 'animate-out')
              
              // Add staggered fade-in with ultra-fast delays
              setTimeout(() => {
                el.classList.add('animate-in')
                el.style.transitionDelay = `${index * 0.01}s`
              }, index * 5) // Ultra-fast base delay for staggering
            })
            
            // Add text fade-in effects - ULTRA-FAST
            const textElements = element.querySelectorAll('h1, h2, h3, p')
            textElements.forEach((textEl, index) => {
              setTimeout(() => {
                textEl.classList.add('text-fade-in')
              }, index * 10) // Reduced from 30ms to 10ms
            })
            
            // Add button fade affects - ULTRA-FAST
            const buttons = element.querySelectorAll('button, a')
            buttons.forEach((btn, index) => {
              setTimeout(() => {
                btn.classList.add('button-fade-in')
              }, 50 + (index * 15)) // Reduced from 200+40ms to 50+15ms
            })
            
          } else {
            // Section is leaving viewport - smooth fade out
            const intersectionRatio = entry.intersectionRatio
            
            if (intersectionRatio < 0.1) {
              setIsVisible(prev => ({ ...prev, [sectionId]: false }))
              
              // Add smooth exit animations
              element.classList.add('section-hidden')
              element.classList.remove('section-visible')
              
              // Fade out child elements - ULTRA-FAST
              const animatedElements = element.querySelectorAll('.animate-on-scroll')
              animatedElements.forEach((el, index) => {
                setTimeout(() => {
                  el.classList.add('animate-out')
                  el.classList.remove('animate-in')
                  el.style.transitionDelay = `${index * 0.005}s`
                }, index * 2) // Ultra-fast fade-out timing
              })
              
              // Remove text animations
              const textElements = element.querySelectorAll('h1, h2, h3, p')
              textElements.forEach((textEl) => {
                textEl.classList.remove('text-fade-in')
              })
              
              // Remove button animations
              const buttons = element.querySelectorAll('button, a')
              buttons.forEach((btn) => {
                btn.classList.remove('button-fade-in')
              })
            }
          }
        })
      },
      { 
        threshold: [0.1, 0.2, 0.3, 0.5, 0.7, 0.9],
        rootMargin: '0px 0px 0px 0px' // Immediate triggering for faster loading
      }
    )

    const sections = ['hero', 'projects', 'skills', 'resume', 'contact']
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Enhanced particle animation component with smooth fade effects
  const ParticleField = () => {
    return (
      <div className="particle-field absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-0 parallax-element animate-on-scroll"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#8b5cf6' : '#00ff88',
              animation: `float ${3 + Math.random() * 6}s ease-in-out infinite, contentFadeIn 2s ease-out ${Math.random() * 2}s forwards`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `scale(${0.5 + Math.random() * 1.5})`,
              filter: 'blur(0.5px)',
              transition: 'opacity 1.5s ease-in-out'
            }}
          />
        ))}
        
        {/* Enhanced floating geometric shapes with fade */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute opacity-0 parallax-element animate-on-scroll"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              background: `linear-gradient(45deg, ${
                i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#8b5cf6' : '#00ff88'
              }, transparent)`,
              borderRadius: i % 2 === 0 ? '50%' : '0%',
              animation: `float ${8 + Math.random() * 4}s ease-in-out infinite reverse, contentFadeIn 2.5s ease-out ${Math.random() * 1.5}s forwards`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
              transition: 'opacity 2s ease-in-out, filter 1s ease'
            }}
          />
        ))}
        
        {/* Ambient glow effects */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`glow-${i}`}
            className="absolute opacity-0 animate-on-scroll"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              background: `radial-gradient(circle, ${
                i === 0 ? 'rgba(0,212,255,0.05)' : 
                i === 1 ? 'rgba(139,92,246,0.05)' : 'rgba(0,255,136,0.05)'
              } 0%, transparent 70%)`,
              borderRadius: '50%',
              animation: `parallaxFloat ${15 + Math.random() * 10}s ease-in-out infinite, contentFadeIn 3s ease-out ${i * 0.8}s forwards`,
              filter: 'blur(1px)',
              transition: 'opacity 2.5s ease-in-out'
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
      
      {/* Enhanced Scroll Animation Styles - Optimized for Speed */}
      <style>
        {`
          /* Smooth scroll behavior */
          html {
            scroll-behavior: smooth;
          }
          
          /* ULTRA-FAST section animations */
          .scroll-section {
            transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            will-change: transform, opacity, filter;
            opacity: 0;
            transform: translateY(15px) scale(0.99);
            filter: blur(1px);
          }
          
          .section-visible {
            opacity: 1 !important;
            transform: translateY(0) scale(1) !important;
            filter: blur(0px) !important;
            transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
          }
          
          .section-hidden {
            opacity: 0;
            transform: translateY(10px) scale(0.99);
            filter: blur(0.5px);
            transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          /* ULTRA-FAST directional fade animations */
          .scrolling-down .section-visible {
            animation: quickFadeInFromTop 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          .scrolling-up .section-visible {
            animation: quickFadeInFromBottom 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          /* ULTRA-FAST scroll enhanced effects */
          .fast-scroll .scroll-section {
            transition: all 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
          
          .fast-scroll .section-visible {
            animation: instantFadeIn 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
          
          /* ULTRA-FAST element-level fade animations */
          .animate-on-scroll {
            opacity: 0;
            transform: translateY(10px) scale(0.99);
            filter: blur(0.5px);
            transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            will-change: transform, opacity, filter;
          }
          
          .animate-in {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
            transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          .animate-out {
            opacity: 0;
            transform: translateY(-5px) scale(0.99);
            filter: blur(0.5px);
            transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          /* ULTRA-FAST staggered fade animations for child elements */
          .animate-on-scroll:nth-child(1) { transition-delay: 0.01s; }
          .animate-on-scroll:nth-child(2) { transition-delay: 0.02s; }
          .animate-on-scroll:nth-child(3) { transition-delay: 0.03s; }
          .animate-on-scroll:nth-child(4) { transition-delay: 0.04s; }
          .animate-on-scroll:nth-child(5) { transition-delay: 0.05s; }
          .animate-on-scroll:nth-child(6) { transition-delay: 0.06s; }
          
          /* Optimized navigation fade effects */
          .scrolling-down nav {
            transform: translateX(-50%) translateY(-3px);
            box-shadow: 0 10px 25px rgba(0,212,255,0.15);
            backdrop-filter: blur(20px);
            transition: all 0.3s ease;
          }
          
          .scrolling-up nav {
            transform: translateX(-50%) translateY(3px);
            box-shadow: 0 5px 15px rgba(139,92,246,0.15);
            backdrop-filter: blur(15px);
            transition: all 0.3s ease;
          }
          
          /* ULTRA-FAST keyframe animations */
          @keyframes quickFadeInFromTop {
            0% {
              opacity: 0;
              transform: translateY(-20px) scale(0.98);
              filter: blur(1px);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }
          
          @keyframes quickFadeInFromBottom {
            0% {
              opacity: 0;
              transform: translateY(20px) scale(0.98);
              filter: blur(1px);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }
          
          @keyframes instantFadeIn {
            0% {
              opacity: 0;
              transform: translateY(10px) scale(0.99);
              filter: blur(0.5px);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }
          
          /* ULTRA-FAST text and button animations */
          .text-fade-in {
            animation: quickFadeInFromTop 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          
          .button-fade-in {
            animation: quickFadeInFromBottom 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          
          /* ULTRA-FAST content fade-in */
          @keyframes contentFadeIn {
            0% {
              opacity: 0;
              transform: translateY(5px);
              filter: blur(0.5px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0px);
            }
          }
          
          @keyframes parallaxFloat {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.3;
            }
            50% {
              transform: translateY(-15px) rotate(1deg);
              opacity: 0.5;
            }
          }
          
          /* Faster parallax elements */
          .parallax-element {
            animation: parallaxFloat 4s ease-in-out infinite;
            transition: opacity 0.4s ease;
          }
          
          /* Optimized scroll-triggered particle fade effects */
          .scrolling-down .particle-field::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 100%;
            background: linear-gradient(180deg, transparent 0%, rgba(0,212,255,0.06) 50%, transparent 100%);
            animation: quickParticleFadeDown 0.8s ease-out;
            opacity: 0;
          }
          
          .scrolling-up .particle-field::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 100%;
            background: linear-gradient(0deg, transparent 0%, rgba(139,92,246,0.06) 50%, transparent 100%);
            animation: quickParticleFadeUp 0.8s ease-out;
            opacity: 0;
          }
          
          @keyframes quickParticleFadeDown {
            0% { 
              opacity: 0; 
              transform: translateY(-30px);
              filter: blur(3px);
            }
            100% { 
              opacity: 1; 
              transform: translateY(0);
              filter: blur(0px);
            }
          }
          
          @keyframes quickParticleFadeUp {
            0% { 
              opacity: 0; 
              transform: translateY(30px);
              filter: blur(3px);
            }
            100% { 
              opacity: 1; 
              transform: translateY(0);
              filter: blur(0px);
            }
          }
          
          /* Faster card hover with fade */
          .card-hover {
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            opacity: 0.95;
          }
          
          .card-hover:hover {
            transform: translateY(-15px) scale(1.03) rotateX(5deg);
            box-shadow: 0 30px 60px rgba(0,212,255,0.25);
            opacity: 1;
            filter: brightness(1.05);
          }
          
          /* Faster glow effects with fade */
          .glow-element {
            transition: all 0.4s ease;
          }
          
          .scrolling-down .glow-element {
            animation: quickGlowFadePulse 2s ease-in-out infinite alternate;
          }
          
          @keyframes quickGlowFadePulse {
            0% {
              box-shadow: 0 0 15px rgba(0,212,255,0.2);
              filter: brightness(1);
            }
            100% {
              box-shadow: 0 0 35px rgba(0,212,255,0.5), 0 0 60px rgba(139,92,246,0.3);
              filter: brightness(1.1);
            }
          }
          
          /* Faster text fade-in animations */
          .text-fade-in {
            animation: quickTextFadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          
          @keyframes quickTextFadeIn {
            0% {
              opacity: 0;
              transform: translateY(15px);
              filter: blur(1px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0px);
            }
          }
          
          /* Faster button fade animations */
          .button-fade-in {
            opacity: 0;
            animation: quickButtonFadeIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards;
          }
          
          @keyframes quickButtonFadeIn {
            0% {
              opacity: 0;
              transform: translateY(10px) scale(0.95);
              filter: blur(1px);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }
        `}
      </style>
      
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
          { id: 'resume', label: 'Resume', icon: '📄' },
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
          }}
          className="animate-on-scroll">
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
            opacity: 0
          }}
          className="animate-on-scroll glow-element text-fade-in">
            Keerthivasan Govindaraju
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            marginBottom: '1rem',
            color: '#cccccc',
            fontWeight: '300',
            opacity: 0
          }}
          className="animate-on-scroll text-fade-in">
            🎓 <span style={{ color: '#00d4ff', fontWeight: '600' }}>2nd Year B.Tech ECE</span>
          </p>
          
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            marginBottom: '3rem',
            color: '#888',
            maxWidth: '700px',
            margin: '0 auto 3rem auto',
            lineHeight: '1.6',
            opacity: 0
          }}
          className="animate-on-scroll text-fade-in">
            🚀 Passionate about <span style={{ color: '#8b5cf6', fontWeight: '600' }}>Embedded Systems</span> & <span style={{ color: '#00ff88', fontWeight: '600' }}>VLSI Design</span>
            <br />
            Crafting innovative solutions through cutting-edge technology
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            opacity: 0
          }}
          className="animate-on-scroll button-fade-in">
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
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}
               className="animate-on-scroll">
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
                className="card-hover animate-on-scroll"
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
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}
               className="animate-on-scroll">
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
                className="card-hover animate-on-scroll"
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
                    <div key={skill.id} 
                         className="animate-on-scroll"
                         style={{ 
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '12px',
                      padding: '1rem',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'all 0.3s ease',
                      animationDelay: `${skillIndex * 0.1}s`
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{
                          color: 'white',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.8rem',
                          fontSize: '1rem'
                        }}>
                          <span style={{ fontSize: '1.3rem' }}>{skill.icon}</span>
                          {skill.name}
                        </span>
                        {isAdmin && (
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => {
                                const newName = prompt('Edit skill name:', skill.name)
                                const newIcon = prompt('Edit skill icon:', skill.icon)
                                if (newName && newIcon) {
                                  editSkill(categoryIndex, skill.id, { name: newName, icon: newIcon })
                                }
                              }}
                              style={{
                                background: '#8b5cf6',
                                color: 'white',
                                border: 'none',
                                padding: '0.3rem 0.6rem',
                                borderRadius: '6px',
                                fontSize: '0.7rem',
                                cursor: 'pointer'
                              }}
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Delete this skill?')) {
                                  deleteSkill(categoryIndex, skill.id)
                                }
                              }}
                              style={{
                                background: '#ff6b6b',
                                color: 'white',
                                border: 'none',
                                padding: '0.3rem 0.6rem',
                                borderRadius: '6px',
                                fontSize: '0.7rem',
                                cursor: 'pointer'
                              }}
                            >
                              🗑️
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section 
        id="resume" 
        className={`scroll-section scroll-${scrollDirection}`}
        style={{
          minHeight: '100vh',
          padding: '5rem 2rem',
          background: '#0a0a0a',
          opacity: isVisible.resume ? 1 : 0,
          transform: isVisible.resume
            ? 'translateY(0) scale(1)' 
            : scrollDirection === 'down' 
              ? 'translateY(50px) scale(0.95)' 
              : 'translateY(-50px) scale(0.95)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <ParticleField />
        
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}
               className="animate-on-scroll">
            <h2 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #00ff88 0%, #8b5cf6 50%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem'
            }}>
              📄 Resume
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#888',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Download my complete resume or view it online to learn more about my experience and qualifications
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
          }}
          className="animate-on-scroll">
            {resumeUrl ? (
              <>
                {/* Resume Preview */}
                <div style={{
                  background: 'linear-gradient(145deg, rgba(26,26,26,0.8), rgba(15,15,15,0.8))',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  width: '100%',
                  maxWidth: '800px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    background: 'rgba(0,212,255,0.1)',
                    borderRadius: '15px',
                    padding: '3rem 2rem',
                    border: '2px dashed rgba(0,212,255,0.3)',
                    marginBottom: '2rem'
                  }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📄</div>
                    <h3 style={{
                      color: '#00d4ff',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      marginBottom: '1rem'
                    }}>
                      Resume Available
                    </h3>
                    <p style={{
                      color: '#cccccc',
                      fontSize: '1rem',
                      marginBottom: '2rem'
                    }}>
                      My complete resume is ready for download and viewing
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '1rem',
                      justifyContent: 'center',
                      flexWrap: 'wrap'
                    }}>
                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
                          color: 'white',
                          padding: '1rem 2rem',
                          borderRadius: '15px',
                          textDecoration: 'none',
                          fontWeight: '700',
                          fontSize: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.8rem',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)'
                          e.target.style.boxShadow = '0 15px 30px rgba(0,212,255,0.3)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)'
                          e.target.style.boxShadow = 'none'
                        }}
                      >
                        <span style={{ fontSize: '1.2rem' }}>👁️</span>
                        View Resume
                      </a>
                      <a
                        href={resumeUrl}
                        download="Keerthivasan_Govindaraju_Resume.pdf"
                        style={{
                          background: 'linear-gradient(135deg, #8b5cf6, #00ff88)',
                          color: 'white',
                          padding: '1rem 2rem',
                          borderRadius: '15px',
                          textDecoration: 'none',
                          fontWeight: '700',
                          fontSize: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.8rem',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.05)'
                          e.target.style.boxShadow = '0 15px 30px rgba(139,92,246,0.3)'
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)'
                          e.target.style.boxShadow = 'none'
                        }}
                      >
                        <span style={{ fontSize: '1.2rem' }}>📥</span>
                        Download PDF
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div style={{
                background: 'linear-gradient(145deg, rgba(26,26,26,0.8), rgba(15,15,15,0.8))',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '3rem 2rem',
                border: '1px solid rgba(255,255,255,0.1)',
                width: '100%',
                maxWidth: '600px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>📄</div>
                <h3 style={{
                  color: '#888',
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  Resume Coming Soon
                </h3>
                <p style={{
                  color: '#666',
                  fontSize: '1rem'
                }}>
                  My resume will be available for download shortly. Please check back soon!
                </p>
              </div>
            )}

            {/* Quick Info Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              width: '100%',
              maxWidth: '800px',
              marginTop: '2rem'
            }}>
              {[
                { icon: '🎓', title: 'Education', value: '2nd Year B.Tech ECE' },
                { icon: '⚡', title: 'Specialization', value: 'Embedded Systems & VLSI' },
                { icon: '🏆', title: 'Experience', value: 'Student Projects & Learning' },
                { icon: '🌟', title: 'Status', value: 'Available for Opportunities' }
              ].map((info, index) => (
                <div
                  key={index}
                  style={{
                    background: 'linear-gradient(145deg, rgba(26,26,26,0.6), rgba(15,15,15,0.6))',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '15px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    animation: `slideInUp 0.8s ease-out ${index * 0.1}s both`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>
                    {info.icon}
                  </div>
                  <h4 style={{
                    color: '#00d4ff',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {info.title}
                  </h4>
                  <p style={{
                    color: '#cccccc',
                    fontSize: '0.95rem',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
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
          <div className="animate-on-scroll">
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
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}
          className="animate-on-scroll">
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
                className="card-hover animate-on-scroll"
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
          }}
          className="animate-on-scroll">
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
