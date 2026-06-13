import { User } from "../models/user.js";
import { Recipe } from "../models/recipe.js";

import "../models/ingredient.js";
import "../models/category.js";

export const addFavoriteRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;

    const recipe = await Recipe.exists({ _id: recipeId });

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
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
  } catch (error) {
    next(error);
  }
};

export const getRecipeByIdController = async (req, res, next) => {
  try {
    const { recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId)
      .populate("category")
      .populate("ingredients.id");

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};
