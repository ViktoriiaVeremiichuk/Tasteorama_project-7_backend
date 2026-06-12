import { Recipe } from "../models/recipe.js";
import "../models/category.js";
import "../models/ingredient.js";

export const getOwnRecipes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 12 } = req.query;

    const filter = { owner: req.user._id };
    const skip = (page - 1) * perPage;

    // Паралельний запит
    const [recipes, totalItems] = await Promise.all([
      Recipe.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage)
        .populate("category", "name")
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
