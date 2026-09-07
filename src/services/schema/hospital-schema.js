import Joi from 'joi';

export const createHospitalSchema = Joi.object({
  hospital: Joi.string().required(),
  districtHospitalId: Joi.string().required()
});

export const updateHospitalSchema = Joi.object({
  hospital: Joi.string().required(),
  districtHospitalId: Joi.string().required()
});