import React from 'react';
import Navbar from './Navbar';

const FullPageRecipe = ({ data }) => {
  return (
    <div className='h-full z-auto w-full absolute top-0 left-0 bg-gray-50 text-black'>
      <Navbar />
      <h1 className='text-2xl font-bold text-center mt-16'>Rezept: {data.title}</h1>
      <p className='text-center w-full px-14 mt-2'>{data.description}</p>

      <div className='mt-12'>
        <h1 className='text-2xl font-bold text-center mb-3'>Zutaten</h1>
        {data.ingredients.map(item => {
          return <p className='w-2/3 border-b-2 relative mx-auto flex justify-between items-center px-12 py-2' key={Math.random()}>{item.name} <span>{item.amount}mg</span></p>
        })}
      </div>
    </div>
  )
}

export default FullPageRecipe