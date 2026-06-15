import { Router } from "express";
import { getCurrentUser } from "../controllers/usersController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.get(
  "/current",
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Get current user'
    #swagger.description = 'Returns current authenticated user'

    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  authenticate,
  getCurrentUser
);

export default router;