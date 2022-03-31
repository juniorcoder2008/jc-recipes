/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
 
const Form = ({ recipeList, setRecipeList }) => {

  const [ingredientsCount, setIngredientsCount] = useState();
  const [ingredientsArr, setIngredientsArr] = useState([]);
  const [showIngredients, setShowIngredients] = useState(false);

  let ingredientArr = [];

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('https://jc-recipes-backend.herokuapp.com/get-recipes').then(data => {
      setRecipeList(data.data);
    }).catch(err => console.log(err.message));
  }, []);

  const createRecipe = async e => {
    e.preventDefault();
    console.log(title);
    console.log(description);
    console.log(ingredientArr);
    await axios.post('https://jc-recipes-backend.herokuapp.com/create-recipes', {title: title, description: description, ingredients: ingredientArr}).then(res => {
      location.reload();
    });
  }

  return (
    <div className='mt-5'>
      <h1 className='text-2xl font-bold'>Neues Rezept</h1>
      <form className='flex flex-col gap-3 mt-3' onSubmit={createRecipe}>
        <input type="text" onChange={e => setTitle(e.target.value)} value={title} placeholder='Rezept Titel' className='w-4/6 bg-gray-200 px-3 py-2 rounded-lg outline-none focus:text-indigo-500' />
        <input type="text" onChange={e => setDescription(e.target.value)} value={description} placeholder='Rezept Beschreibung' className='w-4/6 bg-gray-200 px-3 py-2 rounded-lg outline-none focus:text-indigo-500' />

        <div className='flex gap-4'>
          <input type="number" value={ingredientsCount} onChange={e => setIngredientsCount(e.target.value)} min={1} placeholder='Anzahl der Zutaten' max={60} className='w-7/12 bg-gray-200 px-3 py-2 rounded-lg outline-none invalid:text-rose-500 focus:text-indigo-500 focus:invalid:text-rose-500' />
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
          <h2 className='text-xl font-bold mt-6 mb-3'>Zutaten</h2>
          <div className='flex flex-col gap-3'>
            {ingredientsArr.map(item => {
              return (
                <div className={`flex gap-2 ing-${ingredientsArr.indexOf(item)}`} key={Math.random()}>
                  <input type="text" required id="ing" placeholder='Zutat' className='w-7/12 bg-gray-200 px-3 py-2 rounded-lg outline-none focus:text-indigo-500' />
                  <input type="number" required id="amount" placeholder='mg' className='w-16 text-center bg-gray-200 px-3 py-2 rounded-lg outline-none focus:text-indigo-500' />
                  <button onClick={e => {
                    console.log(document.querySelector(`.ing-${ingredientsArr.indexOf(item)}`));
                    e.preventDefault();
                    console.log('test');

                    const ready = document.createElement('p');
                    ready.innerHTML = `${document.querySelector(`.ing-${ingredientsArr.indexOf(item)} #ing`).value}: ${document.querySelector(`.ing-${ingredientsArr.indexOf(item)} #amount`).value}mg`;
                    console.log(ready);
                    document.querySelector(`.ing-${ingredientsArr.indexOf(item)}`).appendChild(ready);

                    ingredientArr = [...ingredientArr, { name: document.querySelector(`.ing-${ingredientsArr.indexOf(item)} #ing`).value, amount: document.querySelector(`.ing-${ingredientsArr.indexOf(item)} #amount`).value }];
                    document.querySelector(`.ing-${ingredientsArr.indexOf(item)} #amount`).remove();
                    document.querySelector(`.ing-${ingredientsArr.indexOf(item)} #ing`).remove();
                    document.querySelector(`.ing-${ingredientsArr.indexOf(item)} button`).remove();


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