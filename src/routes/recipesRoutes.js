import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";
import { upload } from "../middleware/upload.js";
import  { celebrate } from "celebrate";

import {
  addFavoriteRecipe,
  createRecipe,
} from "../controllers/recipesController.js";

import { recipeQuerySchema } from "../validation/recipesValidation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  upload.single("thumb"),
  createRecipe
);


router.post("/favorites/:recipeId", authenticate, addFavoriteRecipe);

export default router;
