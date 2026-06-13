import { Router } from 'express';
import { celebrate } from "celebrate";
import { addFavoriteRecipe, removeFavoriteRecipe } from '../controllers/recipesController.js';
import { authenticate } from "../middleware/authenticate.js";
import { recipeIdParamSchema } from '../validation/recipesValidation.js';

const router = Router();

router.post("/favorites/:recipeId", authenticate, addFavoriteRecipe);
router.delete("/favorites/:recipeId", celebrate(recipeIdParamSchema), authenticate, removeFavoriteRecipe);

export default router;

