import Joi from 'joi';
import { validHealthStatuses } from '../models/horse';

export const createHorseSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  age: Joi.number().integer().min(1).max(30).required(),
  breed: Joi.string().min(3).max(30).required(),
  healthStatus: Joi.string().valid(...validHealthStatuses).required(),
  owner: Joi.string().uuid().required(),
});

export const filterHorsesSchema = Joi.object({
  age: Joi.number().integer().min(1).max(30),
  breed: Joi.string().min(3).max(30),
  healthStatus: Joi.string().valid(...validHealthStatuses),
});

export const updateHealthStatusSchema = Joi.object({
  healthStatus: Joi.string().valid(...validHealthStatuses).required(),
});
