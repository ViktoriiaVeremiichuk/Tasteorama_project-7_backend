import { Router } from "express";
import { getRecipeByIdController } from "../controllers/recipesController.js";

const router = Router();

router.get("/:recipeId", getRecipeByIdController);

export default router;
