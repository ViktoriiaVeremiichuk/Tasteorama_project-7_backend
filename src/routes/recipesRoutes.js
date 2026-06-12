import { Router } from "express";
import { addToFavoritesController } from "../controllers/recipesController.js";

const router = Router();

router.post(
  "/favorites/:recipeId",
  addToFavoritesController
);

export default router;