import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";
import { upload } from "../middleware/upload.js";

import { createRecipe } from "../controllers/recipesController.js";

import { createRecipeSchema } from "../validation/recipesValidation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  upload.single("thumb"),
  createRecipeSchema,
  createRecipe
);

export default router;