/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
 
const Form = ({ recipeList, setRecipeList }) => {

  const [ingredientsCount, setIngredientsCount] = useState(1);
  const [ingredientsArr, setIngredientsArr] = useState([]);
  const [showIngredients, setShowIngredients] = useState(false);

  const [ingredients, setIngredients] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  let recipeData = {
    title: '',
    description: '',
    ingredients: ingredients,
  };

  const createRecipe = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/create-recipes', {title: title, description: description, ingredients: ingredients}).then(res => {
      location.reload();
    });
  }

  const checkIngredient = (ingredient, amount) => {
    setIngredients([ingredients, { name: ingredient.value, amount: amount.value }]);
  }

  return (
    <div className='mt-5'>
      <h1 className='text-2xl font-bold'>Create new recipe</h1>
      <form className='flex flex-col gap-3 mt-3' onSubmit={createRecipe}>
        <input type="text" placeholder='Recipe Name' className='w-4/6 bg-gray-200 px-3 py-2 rounded-lg outline-none focus:text-indigo-500' />
        <input type="text" placeholder='Recipe Description' className='w-4/6 bg-gray-200 px-3 py-2 rounded-lg outline-none focus:text-indigo-500' />

        <div className='flex gap-4'>
          <input type="number" value={ingredientsCount} onChange={e => setIngredientsCount(e.target.value)} min={1} placeholder='How many ingredients?' max={60} className='w-7/12 bg-gray-200 px-3 py-2 rounded-lg outline-none invalid:text-rose-500 focus:text-indigo-500 focus:invalid:text-rose-500' />
          <button><FontAwesomeIcon icon={faArrowRight} onClick={e => {
            e.preventDefault();
            let temp = [];
            for(let i = 0; i < ingredientsCount; i++) {
              temp = [...temp, i+1];
            }

            setIngredientsArr(temp);
            console.log(ingredientsArr)
            setShowIngredients(true);
          }} /></button>
        </div>

        {showIngredients ? <div>
          <h2 className='text-xl font-bold mt-6 mb-3'>Ingredients</h2>
          <div className='flex flex-col gap-3'>
            {ingredientsArr.map(item => {
              return (
                <div className={`flex gap-2 ing-${ingredientsArr.indexOf(item)}`} key={Math.random()}>
                  <input onChange={e => setTitle(e.target.value)} value={title} type="text" required id="ing" placeholder='Ingredient' className='w-7/12 bg-gray-200 px-3 py-2 rounded-lg outline-none focus:text-indigo-500' />
                  <input onChange={e => setDescription(e.target.value)} value={description} type="number" required id="amount" placeholder='mg' className='w-16 text-center bg-gray-200 px-3 py-2 rounded-lg outline-none focus:text-indigo-500' />
                  <button onClick={e => {
                    e.preventDefault();
                    checkIngredient(document.querySelector(`.ing-${ingredientsArr.indexOf(item)} #ing`), document.querySelector(`.ing-${ingredientsArr.indexOf(item)} #amount`))
                    document.querySelector(`.ing-${ingredientsArr.indexOf(item)} #amount`).classList.add('hidden');
                    document.querySelector(`.ing-${ingredientsArr.indexOf(item)} #ing`).classList.add('hidden');
                  }}><FontAwesomeIcon icon={faCheck} className='ml-4' color='#10b981' /></button>
                </div>
              )
            })}
          </div>

          <button className='bg-teal-500 text-white font-medium py-2 px-6 rounded-lg mt-6'>Save Recipe</button>
        </div> : ''}
      </form>
    </div>
  )
}

export default Form;