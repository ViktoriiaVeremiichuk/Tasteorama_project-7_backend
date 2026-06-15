import mongoose from "mongoose";
import createHttpError from "http-errors";
import { Session } from "../models/session.js";
import { User } from "../models/user.js";

export const authenticate = async (req, res, next) => {
  try {
    const { accessToken, sessionId } = req.cookies;

    if (!accessToken) throw createHttpError(401, "Missing access token");
    if (!sessionId) throw createHttpError(401, "Missing access id");
    //fix GET /own — fake Cookie → очікується 401, а отримуємо 500
    if (!mongoose.isValidObjectId(sessionId)) {
      throw createHttpError(401, "Session not found");
    }

    const session = await Session.findOne({ _id: sessionId, accessToken });
    if (!session) throw createHttpError(401, "Session not found");
    if (new Date() > session.accessTokenValidUntil)
      throw createHttpError(401, "Access token expired");

    const user = await User.findById(session.userId);
    if (!user) throw createHttpError(401);

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
