import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { User } from "../models/user.js";
import { Session } from "../models/session.js";
import { createSession, setSessionCookies } from "../services/auth.js";
// import { sendEmail } from "../utils/sendMail.js";

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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw createHttpError(401, "Invalid credentials");

    await Session.deleteMany({ userId: user._id });
    const session = await createSession(user._id);
    setSessionCookies(res, session);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//NOTE - /auth/logout
export const logout = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;
    if (sessionId) await Session.findByIdAndDelete(sessionId);

    res.clearCookie("sessionId");
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
