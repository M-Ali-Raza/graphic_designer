import React from 'react'
import Heading from '@/components/Heading'
import EducationGrid from '@/components/EducationGrid'

const page = () => {
  return (
    <div className='px-2 py-20 md:px-5 md:py-20 lg:px-20 lg:py-10 flex flex-col gap-2 md:gap-5 lg:gap-10 max-h-screen overflow-y-auto
    items-center md:items-start text-center md:text-left'>
        <Heading name={process.env.NEXT_PUBLIC_EDUCATION_HEADING} />
        <EducationGrid />
    </div>
  )
}

export default page