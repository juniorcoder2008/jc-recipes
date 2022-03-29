import Recipe from '../models/recipeModel.js';

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();

    res.status(200).json(recipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createRecipe = async (req, res) => {
  const recipe = req.body;

  console.log(recipe);

  const newRecipe = new Recipe(recipe);

  try {
    await newRecipe.save();

    res.json(newRecipe)
  } catch (error) {
    res.json({ message: error.message });
  }
}