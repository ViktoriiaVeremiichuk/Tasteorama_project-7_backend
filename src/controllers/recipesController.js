import mongoose from "mongoose";
import createHttpError from "http-errors";
import { Recipe } from "../models/recipe.js";
import { User } from "../models/user.js";
import "../models/ingredient.js";

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

export const getOwnRecipes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 12 } = req.query;

    const filter = { owner: req.user._id };
    const skip = (page - 1) * perPage;

    const [recipes, totalItems] = await Promise.all([
      Recipe.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage)
        .populate("ingredients.id", "name"),
      Recipe.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / perPage);

    res.status(200).json({
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
      recipes,
    });
  } catch (err) {
    next(err);
  }
};
