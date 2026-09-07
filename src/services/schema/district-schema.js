import Joi from 'joi';

export const createDistrictSchema = Joi.object({
  district: Joi.string().required()
});

export const updateDistrictSchema = Joi.object({
  district: Joi.string().required()
});