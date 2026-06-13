import { Readable } from "stream";
import Joi from "joi";
import createHttpError from "http-errors";

import cloudinary from "../utils/cloudinary.js";
import { Recipe } from "../models/recipe.js";

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