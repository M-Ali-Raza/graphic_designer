import React from 'react'
import Capsule from './Capsule'
import { getEducationData } from '@/lib/getData'

const EducationGrid = () => {
  const educations:any[]=getEducationData()
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {educations.map((education, index) => (
              <div key={index} className="flex flex-col gap-5">
                <Capsule name={education.subject} />
                <h4 className="text-sm lg:text-base font-bold">{education.institution}</h4>
                <p className="text-xs md:text-sm lg:text-base">{education.details}</p>
              </div>
            ))}
          </div>
  )
}

export default EducationGrid