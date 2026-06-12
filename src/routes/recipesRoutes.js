import { Router } from "express";
import { searchRecipes } from "../controllers/recipesController.js";

const recipesRouter = Router();

recipesRouter.get("/search", searchRecipes);

export default recipesRouter;
