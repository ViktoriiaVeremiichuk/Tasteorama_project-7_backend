import mongoose from "mongoose";
import { Recipe } from "../models/recipe.js";
import { Ingredient } from "../models/ingredient.js";

export const searchRecipesByFilters = async ({
  title,
  category,
  ingredient,
  page,
  limit,
}) => {
  const conditions = [];
  const searchTitle = title.trim();

  if (searchTitle) {
    const matchingIngredients = await Ingredient.find({
      name: { $regex: searchTitle, $options: "i" },
    }).select("_id");

    const textSearchConditions = [
      { title: { $regex: searchTitle, $options: "i" } },
      { category: { $regex: searchTitle, $options: "i" } },
    ];

    if (matchingIngredients.length) {
      textSearchConditions.push({
        "ingredients.id": {
          $in: matchingIngredients.map((item) => item._id),
        },
      });
    }

    conditions.push({ $or: textSearchConditions });
  }

  if (category) {
    conditions.push({ category });
  }

  if (ingredient) {
    if (!mongoose.Types.ObjectId.isValid(ingredient)) {
      return { recipes: [], total: 0, page, limit, totalPages: 0 };
    }

    conditions.push({
      "ingredients.id": new mongoose.Types.ObjectId(ingredient),
    });
  }

  const filter = conditions.length ? { $and: conditions } : {};

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
