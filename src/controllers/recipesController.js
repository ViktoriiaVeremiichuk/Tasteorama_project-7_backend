import { Recipe } from "../models/recipe.js";

import "../models/ingredient.js";
import "../models/category.js";
export const getRecipeByIdController = async (req, res, next) => {
  try {
    const { recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId)
      .populate("category")
      .populate("ingredients.id");

    if (!recipe) {
      return res.status(404).json({
        status: 404,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      status: 200,
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};
