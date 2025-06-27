import React from 'react'

const AboutIcon = () => {
  return (
    <div>
        <svg 
    width={24} 
    height={24} 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    // className={className}
    style={{ background: 'transparent' }}
  >
    {/* Head/Circle */}
    <circle cx="12" cy="8" r="4" fill="black"/>
    
    {/* Body/Lower part */}
    <path d="M12 14c-5.33 0-8 2.67-8 6v2h16v-2c0-3.33-2.67-6-8-6z" fill="black"/>
  </svg>
    </div>
  )
}

export default AboutIcon