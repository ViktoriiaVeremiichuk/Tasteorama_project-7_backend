import { Router } from 'express';
import { celebrate } from "celebrate";
import { deleteRecipe } from '../controllers/recipesController.js';
import { authenticate } from "../middleware/authenticate.js";
import {recipeIdParamSchema} from "../validations/recipesValidation.js";

const router = Router();

router.delete("/api/recipes/favorites/:recipeId", celebrate(recipeIdParamSchema), authenticate, deleteRecipe);

export default router;