import { Joi, Segments } from "celebrate";

//Валідація query-параметрів для GET /api/recipes/own.
export const recipeQuerySchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(50).default(12),
  }),
};
