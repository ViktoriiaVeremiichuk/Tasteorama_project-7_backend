import mongoose from "mongoose";
import createHttpError from "http-errors";
import { Session } from "../models/session.js";

export const validateRefreshToken = async (req, res, next) => {
  try {
    const { sessionId, refreshToken } = req.cookies;

    if (!refreshToken) throw createHttpError(401, "Missing refresh token");
    if (!sessionId) throw createHttpError(401, "Missing session id");

    if (!mongoose.isValidObjectId(sessionId)) {
      throw createHttpError(401, "Session not found");
    }

    const session = await Session.findOne({ _id: sessionId, refreshToken });
    if (!session) throw createHttpError(401, "Session not found");

    if (new Date() > session.refreshTokenValidUntil) {
      await Session.findByIdAndDelete(sessionId);
      res.clearCookie("sessionId");
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      throw createHttpError(401, "Session token expired");
    }

    req.session = session;
    next();
  } catch (err) {
    next(err);
  }
};
