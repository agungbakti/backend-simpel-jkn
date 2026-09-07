import Joi from 'joi';

export const createLocationSchema = Joi.object({
  location: Joi.string().required()
});

export const updateLocationSchema = Joi.object({
  location: Joi.string().required()
});