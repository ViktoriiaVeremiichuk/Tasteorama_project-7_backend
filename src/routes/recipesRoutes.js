import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { getOwnRecipes } from '../controllers/recipesController.js';
import { getOwnRecipesSchema } from '../validations/recipesValidation.js';

const router = Router();

// Приватний ендпоінт: отримання всіх власних рецептів
router.get('/own', authenticate, celebrate(getOwnRecipesSchema), getOwnRecipes);

export default router;
