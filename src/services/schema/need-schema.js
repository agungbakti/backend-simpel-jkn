import Joi from 'joi';

export const createNeedSchema = Joi.object({
  need: Joi.string().required()
});

export const updateNeedSchema = Joi.object({
  need: Joi.string().required()
});