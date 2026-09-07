import Joi from 'joi';

export const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  noHp: Joi.string().required(),
  role: Joi.string().default('faskes').valid('admin', 'faskes')
});

export const updateUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
  noHp: Joi.string().required(),
  role: Joi.string().required().valid('admin', 'faskes')
});

export const getUserQuerySchema = Joi.object({
  username: Joi.string().optional(),
});

export const updatePasswordSchema = Joi.object({
  newPassword: Joi.string().required(),
});