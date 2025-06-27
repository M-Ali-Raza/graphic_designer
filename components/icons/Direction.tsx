import React from 'react'

const Direction = () => {
  return (
    <div className='relative w-14 md:w-20 lg:w-28 h-3 flex items-center'>
            <span className='bg-black w-full h-1 block '></span>
            <span className='absolute right-0 inset-y-0 h-3 w-3 rounded-full bg-black'></span>
        </div>
  )
}

export default Direction