import React from 'react'

const EducationIcon = () => {
  return (
    <div>
      {/* Option 1: Set fill on the SVG element (overrides all child fills) */}
      <svg 
    width={24} 
    height={24} 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    // className={className}
    style={{ background: 'transparent' }}
  >
    {/* Graduation cap base */}
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="black"/>
  </svg>
    </div>
  )
}

export default EducationIcon