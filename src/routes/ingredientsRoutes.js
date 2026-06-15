import { Router } from "express";
import { getIngredientsController } from "../controllers/ingredientsController.js";

const router = Router();

router.get(
  "/",
  /*
    #swagger.tags = ['Ingredients']
    #swagger.summary = 'Get all ingredients'
    #swagger.description = 'Returns list of ingredients'
  */
  getIngredientsController
);

export default router;