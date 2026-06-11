import { Router } from 'express';
import { getFavoriteRecipes } from "../controllers/recipesController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.get("/favorite", authenticate,  celebrate(getFavoriteSchema), 
  getFavoriteRecipes);

export default router;