/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect } from 'react';
import Recipe from './Recipe';

const Recipes = ({ recipeList, setRecipeList }) => {

  useEffect(() => {
    axios.get('http://localhost:5000/get-recipes').then(data => {
      setRecipeList(data.data);
    }).catch(err => console.log(err.message));
  }, []);

  return (
    <div className='mt-10'>
      <h1 className='text-2xl font-bold'>Rezepte</h1>

      <div className='flex flex-col mt-3'>
        {recipeList.map(recipe => {
          return <Recipe key={Math.random()} data={recipe} />
        })}
      </div>

    </div>
  )
}

export default Recipes;