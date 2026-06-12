import { Recipe } from "../models/recipe.js";

export const addToFavoritesController = async (
  req,
  res,
) => {
  const { recipeId } = req.params;

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    return res.status(404).json({
      message: "Recipe not found",
    });
  }

  // TODO:
  // отримати користувача після реалізації authenticate middleware
  // перевірити чи рецепт вже є в favorites
  // додати рецепт до favorites
  // зберегти користувача

  res.status(200).json({
    message: "Controller stub is ready",
  });
};