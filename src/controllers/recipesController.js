import { Readable } from "stream";
import cloudinary from "../utils/cloudinary.js";
import { Recipe } from "../models/recipe.js";

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

      ingredients:
        typeof ingredients === "string"
          ? JSON.parse(ingredients)
          : ingredients,

      thumb,

      owner: req.user._id,
    });

    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
};