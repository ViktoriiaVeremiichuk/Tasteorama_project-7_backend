import { Router } from "express";

import { celebrate } from "celebrate";

import {
  searchRecipes,
  getRecipeByIdController,
  addFavoriteRecipe,
  getOwnRecipes,
} from "../controllers/recipesController.js";

import { authenticate } from "../middleware/authenticate.js";
import { isValidRecipeId } from "../middleware/isValidRecipeId.js";
import { recipeQuerySchema } from "../validations/recipesValidation.js";

const recipesRouter = Router();

recipesRouter.get("/search", searchRecipes);
recipesRouter.get("/own", authenticate, celebrate(recipeQuerySchema), getOwnRecipes);
recipesRouter.get("/:recipeId", isValidRecipeId, getRecipeByIdController);
recipesRouter.post(
  "/favorites/:recipeId",
  isValidRecipeId,
  authenticate,
  addFavoriteRecipe,
);

export default recipesRouter;
