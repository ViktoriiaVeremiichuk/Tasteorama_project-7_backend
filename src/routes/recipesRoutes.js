import { Router } from 'express';
import { deleteRecipe } from '../controllers/recipesController.js';

const router = Router();

router.delete("/api/recipes/favorites/:recipeId", deleteRecipe);

export default router;