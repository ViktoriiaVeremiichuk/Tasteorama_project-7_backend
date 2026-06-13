import { Router } from 'express';
import { celebrate } from "celebrate";
import { deleteRecipe, addFavoriteRecipe } from '../controllers/recipesController.js';
import { authenticate } from "../middleware/authenticate.js";
import { recipeIdParamSchema } from '../validation/recipesValidation.js';

const router = Router();

router.post("/favorites/:recipeId", authenticate, addFavoriteRecipe);
router.delete("/favorites/:recipeId", celebrate(recipeIdParamSchema), authenticate, deleteRecipe);

export default router;

