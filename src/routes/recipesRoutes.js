import { Router } from "express";
import { celebrate } from "celebrate";
import {
  addFavoriteRecipe,
  removeFavoriteRecipe,
  getRecipeByIdController,
  deleteOwnRecipe,
  getOwnRecipes,
} from "../controllers/recipesController.js";
import { authenticate } from "../middleware/authenticate.js";
import { isValidRecipeId } from "../middleware/isValidRecipeId.js";
import { recipeIdParamSchema } from "../validation/recipesValidation.js";
import { recipeQuerySchema } from "../validation/recipesOwnValidation.js";

const router = Router();

router.get("/own", authenticate, celebrate(recipeQuerySchema), getOwnRecipes);

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

router.delete(
  "/:recipeId",
  isValidRecipeId,
  authenticate,
  deleteOwnRecipe,
);

export default router;
