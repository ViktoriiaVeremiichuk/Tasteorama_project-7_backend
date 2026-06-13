import { Readable } from "stream";
import Joi from "joi";

import mongoose from "mongoose";
import createHttpError from "http-errors";

import { User } from "../models/user.js";
import { Recipe } from "../models/recipe.js";
import "../models/ingredient.js";
import "../models/category.js";


import cloudinary from "../utils/cloudinary.js";

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  category: Joi.string().required(),
  instructions: Joi.string().required(),
  time: Joi.number().required(),
  calories: Joi.number().optional(),

  ingredients: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        measure: Joi.string().required(),
      })
    )
    .required(),
});

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

    const { error } = schema.validate({
      title,
      description,
      category,
      instructions,
      time: Number(time),
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
      time: Number(time),
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
