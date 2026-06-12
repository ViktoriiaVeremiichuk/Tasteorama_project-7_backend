import createHttpError from "http-errors";
import { searchRecipesByTitle } from "../services/recipesServices.js";

export const searchRecipes = async (req, res, next) => {
  try {
    const { query = "", search = query, page = 1, limit = 12 } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (Number.isNaN(pageNumber) || pageNumber < 1) {
      throw createHttpError(400, "Page must be a positive number");
    }

    if (Number.isNaN(limitNumber) || limitNumber < 1) {
      throw createHttpError(400, "Limit must be a positive number");
    }

    const result = await searchRecipesByTitle({
      search,
      page: pageNumber,
      limit: limitNumber,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};
