import Joi from 'joi';

export const registerPayloadSchema = Joi.object({
  username: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
  role: Joi.string().valid('faskes', 'admin').default('faskes'),
});

export const registerQuerySchema = Joi.object({
  username: Joi.string().allow('').optional(),
  email: Joi.string().allow('').optional(),
});

export const loginPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const logoutSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

