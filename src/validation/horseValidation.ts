import Joi from 'joi';
import { validHealthStatuses } from '../models/horse';

export const createHorseSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  age: Joi.number().integer().min(1).max(30).required(),
  breed: Joi.string().min(3).max(30).required(),
  healthStatus: Joi.string().valid(...validHealthStatuses).required(),
  owner: Joi.string().length(20).required(),
});

export const filterHorsesSchema = Joi.object({
  age: Joi.number().integer().min(1).max(30),
  breed: Joi.string().min(3).max(30),
  healthStatus: Joi.string().valid(...validHealthStatuses),
});

export const updateHealthStatusSchema = Joi.object({
  healthStatus: Joi.string().valid(...validHealthStatuses).required(),
});

export const updateHorseSchema = Joi.object({
  name: Joi.string().optional(),
  age: Joi.number().integer().min(0).optional(),
  breed: Joi.string().optional(),
  healthStatus: Joi.string()
    .valid(...validHealthStatuses)
    .optional(),
  owner: Joi.string().optional(),
}).or('name', 'age', 'breed', 'healthStatus', 'owner');
