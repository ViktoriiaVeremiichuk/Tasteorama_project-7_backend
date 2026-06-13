import mongoose from "mongoose";
import createHttpError from "http-errors";
import { Recipe } from "../models/recipe.js";
import { User } from "../models/user.js";
import { searchRecipesByFilters } from "../services/recipesServices.js";

export const searchRecipes = async (req, res, next) => {
  try {
    const {
      title = "",
      category = "",
      ingredient = "",
      page = 1,
      limit = 12,
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (Number.isNaN(pageNumber) || pageNumber < 1) {
      throw createHttpError(400, "Page must be a positive number");
    }

    if (Number.isNaN(limitNumber) || limitNumber < 1) {
      throw createHttpError(400, "Limit must be a positive number");
    }

    const result = await searchRecipesByFilters({
      title,
      category,
      ingredient,
      page: pageNumber,
      limit: limitNumber,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const addFavoriteRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;

    if (!mongoose.isValidObjectId(recipeId)) {
      throw createHttpError(400, "Invalid recipe ID format");
    }

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
  } catch (error) {
    next(error);
  }
};
