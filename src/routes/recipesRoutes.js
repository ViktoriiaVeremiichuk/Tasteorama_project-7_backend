import { Router } from "express";
import { celebrate } from "celebrate";
import {
  searchRecipes,
  addFavoriteRecipe,
  getOwnRecipes,
} from "../controllers/recipesController.js";
import { authenticate } from "../middleware/authenticate.js";
import { recipeQuerySchema } from "../validations/recipesValidation.js";

const recipesRouter = Router();

recipesRouter.get("/search", searchRecipes);
recipesRouter.post("/favorites/:recipeId", authenticate, addFavoriteRecipe);
recipesRouter.get("/own", authenticate, celebrate(recipeQuerySchema), getOwnRecipes);

export default recipesRouter;
