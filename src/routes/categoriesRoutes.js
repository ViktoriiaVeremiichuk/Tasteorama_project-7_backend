import { Router } from "express";
import { getCategories } from "../controllers/categoriesController.js";

const router = Router();

router.get(
  "/",
  /* 
    #swagger.tags = ['Categories']
    #swagger.summary = 'Get all categories'
    #swagger.description = 'Returns list of recipe categories'
  */
  getCategories
);

export default router;