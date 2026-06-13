import createHttpError from "http-errors";
import { Session } from "../models/session.js";
import { User } from "../models/user.js";

export const authenticate = async (req, res, next) => {
  try {
    const { accessToken, sessionId } = req.cookies;

    if (!accessToken) throw createHttpError(401, "Missing access token");
    if (!sessionId) throw createHttpError(401, "Missing access id");

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
