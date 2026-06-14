import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const recipeIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    recipeId: Joi.string().required(),
  }),
};