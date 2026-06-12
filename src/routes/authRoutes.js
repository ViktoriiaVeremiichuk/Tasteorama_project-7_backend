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
} from "../controllers/authController.js";

const router = Router();

export default router;
