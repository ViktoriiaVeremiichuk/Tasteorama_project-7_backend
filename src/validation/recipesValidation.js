import { celebrate, Joi, Segments } from "celebrate";

export const createRecipeSchema = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(100).required(),
    description: Joi.string().allow("").max(500),
    category: Joi.string().required(),
    instructions: Joi.string().required(),
    time: Joi.number().integer().positive().required(),
    calories: Joi.number().min(0).optional(),
    ingredients: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          measure: Joi.string().required(),
        })
      )
      .min(1)
      .required(),
  }),
});