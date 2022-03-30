import express from "express";
import { deleteRecipe } from "../controllers/recipes.js";

const router = express.Router();

router.post('/', deleteRecipe);

export default router;