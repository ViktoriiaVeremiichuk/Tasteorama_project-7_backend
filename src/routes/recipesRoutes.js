import { Router } from "express";
import {
  getRecipeByIdController,
  addFavoriteRecipe,
} from "../controllers/recipesController.js";

import { authenticate } from "../middleware/authenticate.js";
import { isValidRecipeId } from "../middleware/isValidRecipeId.js";

const router = Router();

router.post(
  "/favorites/:recipeId",
  isValidRecipeId,
  authenticate,
  addFavoriteRecipe,
);

router.get("/:recipeId", isValidRecipeId, getRecipeByIdController);

export default router;
