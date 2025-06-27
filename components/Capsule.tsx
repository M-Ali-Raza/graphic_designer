import React from 'react'
interface Props{
    name?:string;
    size?:boolean;
}

const Capsule = (props:Props) => {
  const {
    name,
    size
  } = props
    return (
        <h3 className={`py-2 px-5 bg-primary rounded-3xl text-base md:text-lg lg:text-xl font-bold ${size ? 'w-56' : ''} 
        flex justify-center`}>
        {name}
      </h3>
  )
}

export default Capsule