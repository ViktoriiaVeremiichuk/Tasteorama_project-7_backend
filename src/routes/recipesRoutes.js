import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";
import { upload } from "../middleware/upload.js";
import  { celebrate } from "celebrate";

import {
    addFavoriteRecipe,
    createRecipe,
    getRecipeByIdController,
    getOwnRecipes,
} from "../controllers/recipesController.js";

import { recipeQuerySchema } from "../validation/recipesValidation.js";
import { isValidRecipeId } from "../middleware/isValidRecipeId.js";

const router = Router();

router.post(
  "/",
  authenticate,
  upload.single("thumb"),
  createRecipe
);

router.get("/own", authenticate, celebrate(recipeQuerySchema), getOwnRecipes);
router.get("/:recipeId", isValidRecipeId, getRecipeByIdController);
router.post("/favorites/:recipeId", isValidRecipeId, authenticate, addFavoriteRecipe);

export default router;