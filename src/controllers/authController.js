import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "node:fs/promises";
import Handlebars from "handlebars";
import createHttpError from "http-errors";
import { Session } from "//";

//NOTE -  auth/register
export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });

    if (existing) throw createHttpError(400, "Email in use");

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });
    const session = await createSession(user._id);
    setSessionCookies(res, session);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//NOTE - /auth/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw createHttpError(401, "Invalid credentials");

    await Session.deleteMany({ userId: user._id });
    const session = await createSession(user._id);
    setSessionCookies(res, session);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//NOTE - /auth/request-reset-email
export const logout = async (req, res, next) => {
  try {
    const { sessionId } = req.cookie;
    if (sessionId) await Session.findByIdAndDelete(sessionId);

    res.clearCookie("sessionId");
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
