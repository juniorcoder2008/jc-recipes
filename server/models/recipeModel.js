import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  title: String,
  description: String,
  ingredients: [{
    name: String,
    amount: Number
  }],
  uuid: String,
});

const Recipe = mongoose.model('RecipeSchema', recipeSchema);

export default Recipe;