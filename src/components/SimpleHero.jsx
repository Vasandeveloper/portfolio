const SimpleHero = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1>Keerthivasan Govindaraju</h1>
        <p>ECE Student | Embedded Systems | VLSI Enthusiast</p>
        <div style={{ marginTop: '2rem' }}>
          <a 
            href="https://github.com/Vasandeveloper" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: '#00d4ff', 
              textDecoration: 'none', 
              margin: '0 10px',
              fontSize: '1.1rem'
            }}
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com/in/keerthivasan-govindaraju-b82162295" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: '#00d4ff', 
              textDecoration: 'none', 
              margin: '0 10px',
              fontSize: '1.1rem'
            }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

export default SimpleHero
