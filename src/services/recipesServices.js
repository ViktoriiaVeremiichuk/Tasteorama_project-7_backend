import { Recipe } from "../models/recipe.js";

export const searchRecipesByFilters = async ({
  title,
  category,
  ingredient,
  page,
  limit,
}) => {
  const filter = {};

  const searchTitle = title.trim();

  if (searchTitle) {
    filter.title = { $regex: searchTitle, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  if (ingredient) {
    filter["ingredients.id"] = ingredient;
  }

  const skip = (page - 1) * limit;

  const [recipes, total] = await Promise.all([
    Recipe.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
    Recipe.countDocuments(filter),
  ]);

  return {
    recipes,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
