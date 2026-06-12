import { Recipe } from "../models/recipe.js";

export const getFavoriteRecipes = async (req, res, next) => {
    try {
          
   const userId = req.user._id;

    const favoriteRecipes = await Recipe.find({ favorites: userId });
  
    return res.status(200).json(favoriteRecipes);
  } catch (error) {
    next(error);
  }
}