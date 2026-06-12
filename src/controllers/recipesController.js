import { User } from "../models/user.js"; 

export const getFavoriteRecipes = async (req, res, next) => {
  try {
    const userId = req.user._id;


    const userWithFavorites = await User.findById(userId).populate("favorites");

    if (!userWithFavorites) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(userWithFavorites.favorites);
  } catch (error) {
    next(error);
  }
};