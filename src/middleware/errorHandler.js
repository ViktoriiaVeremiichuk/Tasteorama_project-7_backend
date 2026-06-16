import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  const isProd = process.env.NODE_ENV === "production";

  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: isProd
      ? "Something went wrong. Please try again later."
      : err.message,
  });
};