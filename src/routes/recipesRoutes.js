import { Router } from "express";
import { addFavoriteRecipe } from "../controllers/recipesController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post("/favorites/:recipeId", authenticate, addFavoriteRecipe);

export default router;
