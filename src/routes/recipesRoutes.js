import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";
import { upload } from "../middleware/upload.js";

import { createRecipe } from "../controllers/recipesController.js";

const router = Router();

router.post(
  "/",
  authenticate,
  upload.single("thumb"),
  createRecipe
);

export default router;