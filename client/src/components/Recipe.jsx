import React, { useState } from 'react';

import FullPageRecipe from './FullPageRecipe';

const Recipe = ({ data }) => {

  const [showFullpage, setShowFullpage] = useState(false);

  const toggleFullpage = () => {
    setShowFullpage(!showFullpage);
  }

  return (
    <div onClick={toggleFullpage} className='flex flex-col py-3 border-b-2 justify-center items-center'>
      <h1 className='text-xl font-medium'>{data.title}</h1>

      {showFullpage ? <div>
        <p onClick={toggleFullpage} className='z-10 cursor-pointer absolute top-24 left-1/2 -translate-x-1/2 text-rose-500 h-10 w-12'>Zurück</p>
        <FullPageRecipe data={data} />
      </div> : ''}
    </div>
  )
}

export default Recipe;