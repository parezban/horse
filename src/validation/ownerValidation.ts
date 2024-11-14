import Joi from 'joi';

export const createOwnerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
});

export const updateOwnerSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
});
