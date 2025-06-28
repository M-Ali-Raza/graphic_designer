import React from 'react'
interface Props{
    name?:string;
}

const Heading = (props:Props) => {
  const {
    name
  } = props
    return (
    <div className='flex items-center gap-3'>
        {/* <Direction /> */}
        <h1 className='text-4xl md:text-6xl lg:text-8xl font-black'>{name}</h1>
    </div>
  )
}

export default Heading