import { Router } from "express";
import { celebrate } from "celebrate";

import {
  createRecipe,
  searchRecipes,
  addFavoriteRecipe,
  removeFavoriteRecipe,
  getRecipeByIdController,
  deleteOwnRecipe,
  getOwnRecipes,
  getFavoriteRecipes,
} from "../controllers/recipesController.js";

import { authenticate } from "../middleware/authenticate.js";
import { upload } from "../middleware/upload.js";
import { isValidRecipeId } from "../middleware/isValidRecipeId.js";

import {
  recipeIdParamSchema,
  recipeQuerySchema,
  createRecipeSchema,
  recipeSearchQuerySchema,
} from "../validation/recipesValidation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  upload.single("thumb"),
  createRecipe
);

router.get("/search", celebrate(recipeSearchQuerySchema), searchRecipes);
router.get("/own", authenticate, celebrate(recipeQuerySchema), getOwnRecipes);
router.get("/favorite", authenticate, getFavoriteRecipes);

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


router.get("/:recipeId", isValidRecipeId, getRecipeByIdController);

export default router;
