import { isValidObjectId } from "mongoose";

export const isValidId = (paramName) => (req, res, next) => {
  const id = req.params[paramName];

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: `${id} is not a valid id`,
    });
  }

  next();
};
