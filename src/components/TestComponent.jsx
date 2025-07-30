import React from 'react'

const TestComponent = () => {
  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      color: 'white', 
      padding: '20px', 
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ color: '#00d4ff' }}>Portfolio Test</h1>
      <p>If you can see this, React is working!</p>
    </div>
  )
}

export default TestComponent
