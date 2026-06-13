import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const recipeIdParamSchema ={
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required(),
    measure: Joi.string().required(),
    title: Joi.string().required(),
    category: Joi.string().required(),
    owner: Joi.string().required(),
    area: Joi.string(),
    instructions: Joi.string().required(),
    description: Joi.string(),
    thumb: Joi.string(),
    time: Joi.number().required(),
    calories: Joi.number(),
    ingredients: Joi.array().items(Joi.object({
      id: Joi.string().required(),
      measure: Joi.string().required(),
    })),
    timestamps: Joi.date(),
  })
};