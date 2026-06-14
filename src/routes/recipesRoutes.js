import { Router } from "express";
import { celebrate } from "celebrate";

import {
  addFavoriteRecipe,
  removeFavoriteRecipe,
  getRecipeByIdController,
  getOwnRecipes,
  getFavoriteRecipes,
} from "../controllers/recipesController.js";

import { authenticate } from "../middleware/authenticate.js";
import { isValidRecipeId } from "../middleware/isValidRecipeId.js";
import { recipeIdParamSchema } from "../validation/recipesValidation.js";
import { recipeQuerySchema } from "../validations/recipesValidation.js";


const router = Router();

router.get("/own", authenticate, celebrate(recipeQuerySchema), getOwnRecipes);

router.get("/favorite", authenticate, getFavoriteRecipes);

router.get("/:recipeId", isValidRecipeId, getRecipeByIdController);

router.post(
  "/favorites/:recipeId",
  isValidRecipeId,
  authenticate,
  addFavoriteRecipe,
);

router.delete(
  "/favorites/:recipeId",
  authenticate,
  celebrate(recipeIdParamSchema),
  removeFavoriteRecipe,
);


export default router;