import { Router } from "express";
import {
  searchRecipes,
  addFavoriteRecipe,
} from "../controllers/recipesController.js";
import { authenticate } from "../middleware/authenticate.js";

const recipesRouter = Router();

recipesRouter.get("/search", searchRecipes);
recipesRouter.post("/favorites/:recipeId", authenticate, addFavoriteRecipe);

export default recipesRouter;
