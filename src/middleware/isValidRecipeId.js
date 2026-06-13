import { isValidObjectId } from "mongoose";

export const isValidRecipeId = (req, res, next) => {
  const { recipeId } = req.params;

  if (!isValidObjectId(recipeId)) {
    return res.status(400).json({
      message: `${recipeId} is not a valid id`,
    });
  }

  next();
};
