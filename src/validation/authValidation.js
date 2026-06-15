import { celebrate, Joi, Segments } from "celebrate";

export const registerUserSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(16).required(),
    email: Joi.string().email().max(128).required(),
    password: Joi.string().min(8).max(128).pattern(/^\S+$/).required(),
  }),
});

export const loginUserSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
