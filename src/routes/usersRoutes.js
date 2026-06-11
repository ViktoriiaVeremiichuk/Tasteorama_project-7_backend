
import { Router } from 'express';
import { getCurrentUser } from '../controllers/usersController.js';
//import { authenticate } from '../middleware/authenticate.js';

const router = Router();

// router.get('/current', authenticate, getCurrentUser);
router.get('/current', getCurrentUser);

export default router;