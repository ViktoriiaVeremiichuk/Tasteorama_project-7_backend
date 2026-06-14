import { Router } from "express";
import { celebrate } from "celebrate";
import {
  addFavoriteRecipe,
  removeFavoriteRecipe,
  getRecipeByIdController,
  deleteOwnRecipe,
  getOwnRecipes,
  getFavoriteRecipes,
} from "../controllers/recipesController.js";
import { authenticate } from "../middleware/authenticate.js";
import { isValidRecipeId } from "../middleware/isValidRecipeId.js";

import { recipeIdParamSchema, recipeQuerySchema } from "../validation/recipesValidation.js";


const router = Router();

router.get("/own", authenticate, celebrate(recipeQuerySchema), getOwnRecipes);

router.get("/favorite", authenticate, getFavoriteRecipes);

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

router.delete(
  "/:recipeId",
  isValidRecipeId,
  authenticate,
  deleteOwnRecipe,
);


router.get("/:recipeId", isValidRecipeId, getRecipeByIdController);

export default router;
