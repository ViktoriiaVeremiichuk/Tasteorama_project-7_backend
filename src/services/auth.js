import crypto from "crypto";
import { FIFTEEN_MINUTES, ONE_DAY } from "../constants/time.js";
import { Session } from "../models/session.js";

export const createSession = async (userId) => {
  const accessToken = crypto.randomBytes(32).toString("hex");
  const refreshToken = crypto.randomBytes(32).toString("hex");

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const setSessionCookies = (res, session) => {
  const base = { httpOnly: true, secure: true, sameSite: "none" };

  res.cookie("accessToken", session.accessToken, {
    ...base,
    maxAge: FIFTEEN_MINUTES,
  });
  res.cookie("refreshToken", session.refreshToken, {
    ...base,
    maxAge: ONE_DAY,
  });
  res.cookie("sessionId", session._id.toString(), { ...base, maxAge: ONE_DAY });
};
