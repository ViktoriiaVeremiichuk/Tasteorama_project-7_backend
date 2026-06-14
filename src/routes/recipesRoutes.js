import { Router } from "express";
<<<<<<< HEAD
import { celebrate } from "celebrate";
import {
  addFavoriteRecipe,
  removeFavoriteRecipe,
} from "../controllers/recipesController.js";
import { authenticate } from "../middleware/authenticate.js";
import { recipeIdParamSchema } from "../validation/recipesValidation.js";

const router = Router();

router.post("/favorites/:recipeId", authenticate, addFavoriteRecipe);
router.delete(
  "/favorites/:recipeId",
  authenticate,
  celebrate(recipeIdParamSchema),
  removeFavoriteRecipe,
);
=======

import { celebrate } from "celebrate";

import {
  getRecipeByIdController,
  addFavoriteRecipe,
  getOwnRecipes,
} from "../controllers/recipesController.js";

import { authenticate } from "../middleware/authenticate.js";
import { isValidRecipeId } from "../middleware/isValidRecipeId.js";
import { recipeQuerySchema } from "../validations/recipesValidation.js";

const router = Router();

router.get("/own", authenticate, celebrate(recipeQuerySchema), getOwnRecipes);
router.get("/:recipeId", isValidRecipeId, getRecipeByIdController);
router.post("/favorites/:recipeId", isValidRecipeId, authenticate, addFavoriteRecipe);
>>>>>>> 754f4512cfc1bfc074a387ce1250130fe7fe582c

export default router;
