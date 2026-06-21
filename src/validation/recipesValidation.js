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

const ingredientItemSchema = Joi.object({
  id: Joi.string().required(),
  measure: Joi.string().max(10).required(),
});

const ingredientsArraySchema = Joi.array()
  .items(ingredientItemSchema)
  .min(2)
  .max(16)
  .required();

export const recipeJoiSchema = Joi.object({
    title: Joi.string().max(64).required(),
    description: Joi.string().max(200).required(),
    category: Joi.string().required(),
    instructions: Joi.string().max(1200).required(),
    time: Joi.string().required(),
    calories: Joi.number().integer().min(1).max(10000).optional(),

    ingredients: Joi.custom((value, helpers) => {
      let parsed = value;

      if (typeof value === "string") {
        try {
          parsed = JSON.parse(value);
        } catch {
          return helpers.error("any.invalid");
        }
      }

      const { error, value: validated } =
        ingredientsArraySchema.validate(parsed);

      if (error) {
        return helpers.message(error.details[0].message);
      }

      return validated;
    }).required(),
  });

export const createRecipeSchema = {
  [Segments.BODY]: recipeJoiSchema,
};

  
export const recipeSearchQuerySchema = {
  [Segments.QUERY]: Joi.object({
    title: Joi.string().trim().allow("").optional(),
    category: Joi.string().trim().allow("").optional(),
    ingredient: Joi.string().trim().allow("").optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(12),
  }),
};
