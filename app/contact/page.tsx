import React from 'react'
import Heading from '@/components/Heading'
import BodyContent from '@/components/BodyContent'
import { getContactData } from '@/lib/getData'
import { getContent } from '@/lib/markdown'
import { Services } from '@/types/types'

const page = () => {
  const contacts:Services[]= getContactData()
  const {contact_line}=getContent()
  const lineList=contact_line.split(' ')
  const firstNormalFont= lineList.shift()
  const boldFont= lineList.shift()
  const lastNormalFont=lineList.join().replaceAll(',', ' ')
  return (
    <div className='px-2 py-20 md:px-5 md:py-20 lg:px-20 lg:py-10 flex flex-col gap-2 md:gap-5 lg:gap-10 max-h-screen overflow-y-auto
    items-center md:items-start text-center md:text-left'>
        <Heading name={process.env.NEXT_PUBLIC_CONTACT_HEADING} />
        <BodyContent data={contacts} firstNormalFont={firstNormalFont} boldFont={boldFont} lastNormalFont={lastNormalFont} />
    </div>
  )
}

export default page