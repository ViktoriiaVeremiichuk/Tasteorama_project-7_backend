import { Joi, Segments } from 'celebrate';

export const recipeIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    recipeId: Joi.string().required(),
  }),
};