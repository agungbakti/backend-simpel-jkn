import Joi from 'joi';

export const createDataSchema = Joi.object({
  date: Joi.date().required(),
  needId: Joi.string().required(),
  locationId: Joi.string().required(),
  hospitalId: Joi.string().required(),
  name: Joi.string().required(),
  noNik: Joi.string().required().length(16),
  noHp: Joi.string().required(),
  email: Joi.string().required(),
  hospitalReferral: Joi.string().required(),
});

export const updateDataSchema = Joi.object({
  date: Joi.date().required(),
  needId: Joi.string().required(),
  locationId: Joi.string().required(),
  hospitalId: Joi.string().required(),
  name: Joi.string().required(),
  noNik: Joi.string().required(),
  noHp: Joi.string().required(),
  email: Joi.string().required(),
  hospitalReferral: Joi.string().required(),
});

export const getDataQuerySchema = Joi.object({
  tanggal: Joi.date().iso().optional(),
  search: Joi.string().optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(50),
});

export const updateStatusSchema = Joi.object({
  status: Joi.string().valid('waiting', 'success', 'failed').required(),
});

export const updateInformationSchema = Joi.object({
  informationId: Joi.string().required(),
});

export const updateOfficerNameSchema = Joi.object({
  officerName: Joi.string().required(),
});