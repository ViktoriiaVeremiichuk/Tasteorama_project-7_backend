import { Router } from 'express';
import { getFavoriteRecipes } from "../controllers/recipesController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();


router.get("/favorite", authenticate, celebrate(getFavoriteRecipes), 
  getFavoriteRecipes);

export default router;