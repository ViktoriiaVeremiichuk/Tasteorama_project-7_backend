import { Joi, Segments } from 'celebrate';

export const recipeIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    recipeId: Joi.string().required(),
  }),
};

export const recipeQuerySchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(50).default(12),
  }),
};

export const createRecipeSchema = { [Segments.BODY]:Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    category: Joi.string().required(),
    instructions: Joi.string().required(),
    time: Joi.number().required(),
    calories: Joi.number().optional(),
  
    ingredients: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          measure: Joi.string().required(),
        })
      )
      .required(),
  }),};

  
export const recipeSearchQuerySchema = {
  [Segments.QUERY]: Joi.object({
    title: Joi.string().trim().allow("").optional(),
    category: Joi.string().trim().allow("").optional(),
    ingredient: Joi.string().trim().allow("").optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(12),
  }),
};
