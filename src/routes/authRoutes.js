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

const router = Router();

router.post("/register", registerUserSchema, registerUser);
router.post("/login", loginUserSchema, loginUser);
router.post("/refresh", refreshUserSession);
router.post("/logout", logout);

export default router;
