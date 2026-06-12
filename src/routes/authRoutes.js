import { Router } from "express";
import { celebrate } from "celebrate";
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

const router = Router();

router.post("/register", celebrate(registerUserSchema), registerUser);
router.post("/login", celebrate(loginUserSchema), loginUser);
router.post("/refresh", refreshUserSession);
router.post("/logout", logout);

export default router;
