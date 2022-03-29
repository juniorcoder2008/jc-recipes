import React from 'react'
import JcLogo from '../assets/JcLogo';

const Navbar = () => {
  return (
    <header className='w-full py-4 px-8 bg-gray-50 border-b-2 flex justify-center'>
      <div className='flex items-center gap-3'>
        <JcLogo />
        <div className='h-8 w-1 bg-stone-700'></div>
        <h1 className='text-3xl uppercase font-black text-black'>Recipes</h1>
      </div>
    </header>
  )
}

export default Navbar