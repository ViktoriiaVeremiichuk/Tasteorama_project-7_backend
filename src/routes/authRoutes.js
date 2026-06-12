import { Router } from "express";
import { celebrate, Segments } from "celebrate";
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

router.post(
  "/register",
  celebrate({ [Segments.BODY]: registerUserSchema }),
  registerUser,
);
router.post(
  "/login",
  celebrate({ [Segments.BODY]: loginUserSchema }),
  loginUser,
);
router.post("/refresh", refreshUserSession);
router.post("/logout", logout);

export default router;
