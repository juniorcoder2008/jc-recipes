/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';

import FullPageRecipe from './FullPageRecipe';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Recipe = ({ data }) => {

  const [showFullpage, setShowFullpage] = useState(false);

  const toggleFullpage = () => {
    setShowFullpage(!showFullpage);
  }

  const deleteRecipe = async () => {
    console.log('Delete recipe request was sended successfully!');
    console.log(data._id);
    await axios.post(`http://localhost:5000/delete-recipes/${data._id}`, { id: data._id }).then(res => {
      console.log(`The recipe ${data.title} was succesfully deleted!`)
      location.reload();
    })
  }

  return (
    <div className='flex py-3 px-5 border-b-2 justify-between items-center'>
      <h1 onClick={toggleFullpage} className='text-xl font-medium'>{data.title}</h1>
      <button onClick={deleteRecipe}><FontAwesomeIcon icon={faTrashCan} color='#f43f5e' /></button>

      {showFullpage ? <div>
        <p onClick={toggleFullpage} className='z-10 cursor-pointer absolute top-24 left-1/2 -translate-x-1/2 text-rose-500 h-10 w-12'>Zurück</p>
        <FullPageRecipe data={data} />
      </div> : ''}
    </div>
  )
}

export default Recipe;