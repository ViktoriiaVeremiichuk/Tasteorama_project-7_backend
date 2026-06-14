import { Router } from "express";
import { celebrate } from "celebrate";
import {
  getRecipeByIdController,
  addFavoriteRecipe,
  deleteOwnRecipe,
  getOwnRecipes,
} from "../controllers/recipesController.js";
import { authenticate } from "../middleware/authenticate.js";
import { isValidRecipeId } from "../middleware/isValidRecipeId.js";
import { recipeQuerySchema } from "../validations/recipesValidation.js";

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
  "/:recipeId",
  isValidRecipeId,
  authenticate,
  deleteOwnRecipe,
);

export default router;
