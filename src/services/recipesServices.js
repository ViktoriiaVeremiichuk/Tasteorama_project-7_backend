import mongoose from "mongoose";
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
    if (!mongoose.Types.ObjectId.isValid(ingredient)) {
      return { recipes: [], total: 0, page, limit, totalPages: 0 };
    }

    filter["ingredients.id"] = new mongoose.Types.ObjectId(ingredient);
  }

  const skip = (page - 1) * limit;

  const [recipes, total] = await Promise.all([
    Recipe.find(filter).skip(skip).limit(limit).sort({ createdAt: -1, _id: -1 }),
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
