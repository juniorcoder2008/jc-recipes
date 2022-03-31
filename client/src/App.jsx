/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Form from './components/Form';
import Navbar from './components/Navbar';
import Recipes from './components/Recipes';

const App = () => {

  const [recipeList, setRecipeList] = useState();

  const [load, setLoad] = useState(true);

  useEffect(() => {
    axios.get('https://jc-recipes-backend.herokuapp.com/get-recipes').then(data => {
      setRecipeList(data.data);
      setLoad(false);
    }).catch(err => console.log(err.message));
  }, []);

  return (
    <div>
      {!load ? <div>
          <Navbar />
        <div className='px-8'>
          <Form recipeList={recipeList} setRecipeList={v => setRecipeList(v)} />
          <Recipes recipeList={recipeList} setRecipeList={v => setRecipeList(v)} />
        </div>
      </div> : <h1 className='text-3xl text-stone-400 uppercase font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Loading</h1> }
      
    </div>
  )
}

export default App