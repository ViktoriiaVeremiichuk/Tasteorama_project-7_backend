import { Readable } from "stream";

import mongoose from "mongoose";
import createHttpError from "http-errors";

import { User } from "../models/user.js";
import { Recipe } from "../models/recipe.js";
import { searchRecipesByFilters } from "../services/recipesServices.js";
import "../models/ingredient.js";
import "../models/category.js";
import { recipeJoiSchema } from "../validation/recipesValidation.js";

import cloudinary from "../utils/cloudinary.js";

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "tasteorama-recipes",
      },
      (error, result) => {
        if (error) return reject(error);

        resolve(result);
      }
    );

    Readable.from(buffer).pipe(stream);
  });
};

export const createRecipe = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      instructions,
      time,
      calories,
      ingredients,
    } = req.body;

    const parsedIngredients =
      typeof ingredients === "string"
        ? JSON.parse(ingredients)
        : ingredients;

    const { error } = recipeJoiSchema.validate({
      title,
      description,
      category,
      instructions,
      time,
      calories: calories ? Number(calories) : 0,
      ingredients: parsedIngredients,
    });

    if (error) {
      return next(createHttpError(400, error.details[0].message));
    }

    let thumb = "";

    if (req.file) {
      const uploadedImage = await uploadToCloudinary(req.file.buffer);

      thumb = uploadedImage.secure_url;
    }

    const recipe = await Recipe.create({
      title,
      description,
      category,
      instructions,
      time,
      calories: calories ? Number(calories) : 0,

      ingredients: parsedIngredients,

      thumb,

      owner: req.user._id,
    });

    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
};

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

export const removeFavoriteRecipe = async (req, res, next) => {
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
        $pull: {
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
export const getOwnRecipes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 12 } = req.query;

    const filter = { owner: req.user._id };
    const skip = (page - 1) * perPage;

    const [recipes, totalItems] = await Promise.all([
      Recipe.find(filter)
        .sort({ createdAt: -1, _id: -1 })
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

export const deleteOwnRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      throw createHttpError(404, "Recipe not found");
    }

    if (!recipe.owner.equals(req.user._id)) {
      throw createHttpError(403, "Forbidden");
    }

    await User.updateMany(
      { favorites: recipeId },
      { $pull: { favorites: recipeId } },
    );

    await Recipe.findByIdAndDelete(recipeId);

    res.status(200).json(recipe);
  } catch (err) {
    next(err);  }
};


export const getFavoriteRecipes = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

     const user = await User.findById(userId);
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    const totalRecipes = user.favorites ? user.favorites.length : 0;
    const totalPages = Math.ceil(totalRecipes / limit);

   const userWithFavorites = await User.findById(userId).populate({
      path: "favorites",
      options: { skip: skip, limit: limit }
    });

   return res.status(200).json({
      recipes: userWithFavorites.favorites || [],
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    next(error);
  }
};
