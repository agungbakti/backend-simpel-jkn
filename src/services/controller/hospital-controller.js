import HospitalRepositories from '../repositories/hospital-repositories.js';
import InvariantError from '../../exceptions/invariant-error.js';
import NotFoundError from '../../exceptions/not-found-error.js';
import response from '../../utils/response.js';
import { io } from '../../server/index.js';

export const createHospital = async (req, res, next) => {
  try {
    const { hospital, districtHospitalId } = req.validated;

    const isHospitalExist = await HospitalRepositories.cekHospital(hospital);
    if (isHospitalExist) {
      throw new InvariantError('rumah sakit sudah ada');
    }

    const newHospital = await HospitalRepositories.createHospital(hospital, districtHospitalId);
    if (!newHospital) {
      throw new NotFoundError('rumah sakit gagal ditambahkan');
    }

    io.emit('hospital:changed', newHospital);
    return response(res, 201, 'rumah sakit berhasil ditambahkan', newHospital);
  } catch (error) {
    console.error('[createHospital]', error);
    return next(error);
  }
};

export const getHospitals = async (req, res, next) => {
  try {
    const { search } = req.query;
    const hospitals = await HospitalRepositories.getHospitals(search);
    return response(res, 200, 'Success mengambil data rumah sakit', hospitals);
  } catch (error) {
    console.error('[getHospital]', error);
    return next(error);
  }
};

export const getHospitalById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const hospital = await HospitalRepositories.getHospitalById(id);
    if (!hospital) {
      throw new NotFoundError('rumah sakit tidak ditemukan');
    }
    return response(res, 200, 'Success mengambil data rumah sakit', hospital);
  } catch (error) {
    console.error('[getHospitalById]', error);
    return next(error);
  }
};

export const updateHospital = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { hospital, districtHospitalId } = req.validated;

    const isHospitalExist = await HospitalRepositories.cekHospital(hospital, id);
    if (isHospitalExist) {
      throw new InvariantError('rumah sakit sudah ada');
    }

    const updatedLocation = await HospitalRepositories.updateHospital(id, hospital, districtHospitalId);
    if (!updatedLocation) {
      throw new NotFoundError('rumah sakit gagal diubah');
    }

    io.emit('hospital:changed', updatedLocation);
    return response(res, 200, 'rumah sakit berhasil diubah', updatedLocation);
  } catch (error) {
    console.error('[updateHospital]', error);
    return next(error);
  }
};

export const deleteHospital = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedLocation = await HospitalRepositories.deleteHospital(id);
    if (!deletedLocation) {
      throw new NotFoundError('rumah sakit gagal dihapus');
    }

    io.emit('hospital:changed', deletedLocation);
    return response(res, 200, 'rumah sakit berhasil dihapus', deletedLocation);
  } catch (error) {
    console.error('[deleteHospital]', error);
    return next(error);
  }
};