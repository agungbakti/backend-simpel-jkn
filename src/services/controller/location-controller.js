import LocationRepositories from '../repositories/location-repositories.js';
import InvariantError from '../../exceptions/invariant-error.js';
import NotFoundError from '../../exceptions/not-found-error.js';
import response from '../../utils/response.js';
import { io } from '../../server/index.js';

export const createLocation = async (req, res, next) => {
  try {
    const { location } = req.validated;

    const isLocationExist = await LocationRepositories.cekLocation(location);
    if (isLocationExist) {
      throw new InvariantError('lokasi sudah ada');
    }

    const newLocation = await LocationRepositories.createLocation(location);
    if (!newLocation) {
      throw new NotFoundError('lokasi gagal ditambahkan');
    }

    io.emit('location:changed', newLocation);
    return response(res, 201, 'lokasi berhasil ditambahkan', newLocation);
  } catch (error) {
    console.error('[createLocation]', error);
    return next(error);
  }
};

export const getLocations = async (req, res, next) => {
  try {
    const { search } = req.query;
    const location = await LocationRepositories.getLocations(search);
    return response(res, 200, 'Success mengambil data lokasi', location);
  } catch (error) {
    console.error('[getHospital]', error);
    return next(error);
  }
};

export const getLocationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const location = await LocationRepositories.getLocationById(id);
    if (!location) {
      throw new NotFoundError('lokasi tidak ditemukan');
    }
    return response(res, 200, 'Success mengambil data lokasi', location);
  } catch (error) {
    console.error('[getLocationById]', error);
    return next(error);
  }
};

export const updateLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { location } = req.validated;

    const isLocationExist = await LocationRepositories.cekLocation(location, id);
    if (isLocationExist) {
      throw new InvariantError('lokasi sudah ada');
    }

    const updatedLocation = await LocationRepositories.updateLocation(id, location);
    if (!updatedLocation) {
      throw new NotFoundError('lokasi gagal diubah');
    }

    io.emit('location:changed', updatedLocation);
    return response(res, 200, 'lokasi berhasil diubah', updatedLocation);
  } catch (error) {
    console.error('[updateLocation]', error);
    return next(error);
  }
};

export const deleteLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedLocation = await LocationRepositories.deleteLocation(id);
    if (!deletedLocation) {
      throw new NotFoundError('lokasi gagal dihapus');
    }

    io.emit('location:changed', deletedLocation);
    return response(res, 200, 'lokasi berhasil dihapus', deletedLocation);
  } catch (error) {
    console.error('[deleteLocation]', error);
    return next(error);
  }
};