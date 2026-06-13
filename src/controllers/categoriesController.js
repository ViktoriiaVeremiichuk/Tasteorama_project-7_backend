import { Category } from "../models/category.js";

export const getCategories = async (req, res, next) => {
    try{
        const categories = await Category.find();

        res.status(200).json({
            status: 200,
            data: categories, 
        });
    } catch (error) {
        next(error);
    }
};