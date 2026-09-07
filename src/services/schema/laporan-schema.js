import Joi from 'joi';

const baseSchema = {
  start_date: Joi.date().required(),

  end_date: Joi.date()
    .required()
    .min(Joi.ref('start_date')),

  information: Joi.string().allow('', null),

  status: Joi.string()
    .valid('waiting', 'called', 'done', 'canceled')
    .allow('', null),
};

export const laporanSchema = Joi.object(baseSchema);

export const detailSchema = Joi.object({
  ...baseSchema,

  page: Joi.number().integer().min(1).default(1),

  limit: Joi.number().integer().min(1).max(100).default(10),
});