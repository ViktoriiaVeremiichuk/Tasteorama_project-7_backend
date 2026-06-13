import { Ingredient } from "../models/ingredient.js";

export const getIngredientsController = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();

    res.status(200).json({
      status: 200,
      message: "Successfully found ingredients!",
      data: ingredients,
    });
  } catch (error) {
    next(error);
  }
};