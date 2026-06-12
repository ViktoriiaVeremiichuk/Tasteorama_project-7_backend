import { Recipe } from "../models/recipe.js";

export const searchRecipesByTitle = async ({ search, page, limit }) => {
  const searchQuery = search.trim();

  const filter = {};

  if (searchQuery) {
    filter.title = { $regex: searchQuery, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const recipes = await Recipe.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Recipe.countDocuments(filter);

  return {
    recipes,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
