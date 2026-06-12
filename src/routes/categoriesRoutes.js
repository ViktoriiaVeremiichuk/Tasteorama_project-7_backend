import { Router } from 'express';
import { getCategories } from '../controllers/categoriesController.js';

const router = Router();

router.get("/api/categories", getCategories);

export default router;