import createHttpError from "http-errors";
import { Recipe } from "../models/recipe.js";
import { User } from "../models/user.js";

export const addFavoriteRecipe = async (req, res) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.exists({ _id: recipeId });

  if (!recipe) {
    throw createHttpError(404, "Recipe not found");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {
        favorites: recipeId,
      },
    },
    { new: true },
  );
  res.status(200).json({ favorites: user.favorites });
};
