import Joi from 'joi';

export const createInformationSchema = Joi.object({
  information: Joi.string().required()
});

export const updateInformationSchema = Joi.object({
  information: Joi.string().required()
});