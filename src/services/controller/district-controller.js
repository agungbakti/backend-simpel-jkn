import DistrictHospitalRepositories from '../repositories/district-repositories.js';
import InvariantError from '../../exceptions/invariant-error.js';
import NotFoundError from '../../exceptions/not-found-error.js';
import response from '../../utils/response.js';
import { io } from '../../server/index.js';

export const createDistrictHospital = async (req, res, next) => {
  try {
    const { district } = req.validated;

    const isDistrictExist = await DistrictHospitalRepositories.cekDistrictHospital(district);
    if (isDistrictExist) {
      throw new InvariantError('nama kabupaten sudah ada');
    }

    const newDistrict = await DistrictHospitalRepositories.createDistrictHospital(district);
    if (!newDistrict) {
      throw new NotFoundError('nama kabupaten gagal ditambahkan');
    }

    io.emit('district:changed', newDistrict);
    return response(res, 201, 'nama kabupaten berhasil ditambahkan', newDistrict);
  } catch (error) {
    console.error('[createDistrictHospital]', error);
    return next(error);
  }
};

export const getDistrictHospitals = async (req, res, next) => {
  try {
    const { search } = req.query;
    const districts = await DistrictHospitalRepositories.getDistrictHospitals(search);
    return response(res, 200, 'Success mengambil data nama kabupaten', districts);
  } catch (error) {
    console.error('[getDistrictHospitals]', error);
    return next(error);
  }
};

export const getDistrictHospitalById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const district = await DistrictHospitalRepositories.getDistrictHospitalById(id);
    if (!district) {
      throw new NotFoundError('nama kabupaten tidak ditemukan');
    }
    return response(res, 200, 'Success mengambil data nama kabupaten', district);
  } catch (error) {
    console.error('[getDistrictHospitalById]', error);
    return next(error);
  }
};

export const updateDistrictHospital = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { district } = req.validated;

    const isDistrictExist = await DistrictHospitalRepositories.cekDistrictHospital(district, id);
    if (isDistrictExist) {
      throw new InvariantError('nama kabupaten sudah ada');
    }

    const updatedNeed = await DistrictHospitalRepositories.updateDistrictHospital(id, district);
    if (!updatedNeed) {
      throw new NotFoundError('nama kabupaten gagal diubah');
    }

    io.emit('district:changed', updatedNeed);
    return response(res, 200, 'nama kabupaten berhasil diubah', updatedNeed);
  } catch (error) {
    console.error('[updateDistrictHospital]', error);
    return next(error);
  }
};

export const deleteDistrictHospital = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedDistrict = await DistrictHospitalRepositories.deleteDistrictHospital(id);
    if (!deletedDistrict) {
      throw new NotFoundError('nama kabupaten gagal dihapus');
    }

    io.emit('district:changed', deletedDistrict);
    return response(res, 200, 'nama kabupaten berhasil dihapus', deletedDistrict);
  } catch (error) {
    console.error('[deleteDistrictHospital]', error);
    return next(error);
  }
};