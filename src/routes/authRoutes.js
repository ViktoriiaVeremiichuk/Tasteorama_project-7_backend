import { Router } from "express";
import {
  registerUserSchema,
  loginUserSchema,
} from "../validation/authValidation.js";

import {
  registerUser,
  loginUser,
  logout,
  refreshUserSession,
} from "../controllers/authController.js";
import { validateRefreshToken } from "../middleware/validateRefreshToken.js";

const router = Router();

router.post(
  "/register",
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Register user'
    #swagger.description = 'Endpoint for user registration'
  */
  registerUserSchema,
  registerUser
);

router.post(
  "/login",
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Login user'
    #swagger.description = 'Endpoint for user login'
  */
  loginUserSchema,
  loginUser
);

router.post(
  "/refresh",
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Refresh session'
    #swagger.description = 'Refresh access token'

    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  validateRefreshToken,
  refreshUserSession
);

router.post(
  "/logout",
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Logout user'
    #swagger.description = 'Logout current user'

    #swagger.security = [{
      "bearerAuth": []
    }]
  */
  logout
);

export default router;