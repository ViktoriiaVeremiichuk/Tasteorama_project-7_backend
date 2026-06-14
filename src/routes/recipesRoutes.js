import { Router } from "express";
import { celebrate } from "celebrate";

import {
  searchRecipes,
  addFavoriteRecipe,
  removeFavoriteRecipe,
  getRecipeByIdController,
  getOwnRecipes,
  getFavoriteRecipes,
} from "../controllers/recipesController.js";

import { authenticate } from "../middleware/authenticate.js";
import { isValidRecipeId } from "../middleware/isValidRecipeId.js";
import {
  recipeIdParamSchema,
  recipeQuerySchema,
  recipeSearchQuerySchema,
} from "../validation/recipesValidation.js";

const recipesRouter = Router();

recipesRouter.get("/search", celebrate(recipeSearchQuerySchema), searchRecipes);
recipesRouter.get("/own", authenticate, celebrate(recipeQuerySchema), getOwnRecipes);
recipesRouter.get("/favorite", authenticate, getFavoriteRecipes);
recipesRouter.get("/:recipeId", isValidRecipeId, getRecipeByIdController);
recipesRouter.post(
  "/favorites/:recipeId",
  isValidRecipeId,
  authenticate,
  addFavoriteRecipe,
);
recipesRouter.delete(
  "/favorites/:recipeId",
  authenticate,
  celebrate(recipeIdParamSchema),
  removeFavoriteRecipe,
);

export default recipesRouter;
