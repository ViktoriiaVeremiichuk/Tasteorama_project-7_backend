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
    title: Joi.string().max(64).required(),
    description: Joi.string().max(200).required(),
    category: Joi.string().required(),
    instructions: Joi.string().max(2000).required(),
    time: Joi.string().required(),
    calories: Joi.number().integer().min(1).optional(),
  
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
