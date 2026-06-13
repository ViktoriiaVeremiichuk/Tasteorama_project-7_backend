import { Recipe } from "../models/recipe.js";

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

      thumb: req.file?.path || "",

      owner: req.user._id,
    });

    res.status(201).json(recipe);
  } catch (err) {
    next(err);
  }
};