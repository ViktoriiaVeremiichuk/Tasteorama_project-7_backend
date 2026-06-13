import { Router } from "express";
import { celebrate } from "celebrate";
import {
  addFavoriteRecipe,
  getOwnRecipes,
} from "../controllers/recipesController.js";
import { authenticate } from "../middleware/authenticate.js";
import { recipeQuerySchema } from "../validations/recipesValidation.js";

const router = Router();

router.get("/own", authenticate, celebrate(recipeQuerySchema), getOwnRecipes);
router.post("/favorites/:recipeId", authenticate, addFavoriteRecipe);

export default router;
