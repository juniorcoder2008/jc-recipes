import React from 'react';
import Recipe from './Recipe';

const Recipes = ({ recipeList, setRecipeList }) => {

  return (
    <div className='mt-10'>
      <h1 className='text-2xl font-bold'>Recipes</h1>

      {recipeList.map(() => {
        return <Recipe key={Math.random()} />
      })}
    </div>
  )
}

export default Recipes;