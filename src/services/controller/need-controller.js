import NeedRepositories from '../repositories/need-repositories.js';
import InvariantError from '../../exceptions/invariant-error.js';
import NotFoundError from '../../exceptions/not-found-error.js';
import response from '../../utils/response.js';
import { io } from '../../server/index.js';

export const createNeed = async (req, res, next) => {
  try {
    const { need } = req.validated;

    const isNeedExist = await NeedRepositories.cekNeed(need);
    if (isNeedExist) {
      throw new InvariantError('nama keperluan sudah ada');
    }

    const newHospital = await NeedRepositories.createNeed(need);
    if (!newHospital) {
      throw new NotFoundError('nama keperluan gagal ditambahkan');
    }

    io.emit('need:changed', newHospital);
    return response(res, 201, 'nama keperluan berhasil ditambahkan', newHospital);
  } catch (error) {
    console.error('[createNeed]', error);
    return next(error);
  }
};

export const getNeeds = async (req, res, next) => {
  try {
    const { search } = req.query;
    const hospitals = await NeedRepositories.getNeeds(search);
    return response(res, 200, 'Success mengambil data nama keperluan', hospitals);
  } catch (error) {
    console.error('[getNeeds]', error);
    return next(error);
  }
};

export const getNeedById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const need = await NeedRepositories.getNeedById(id);
    if (!need) {
      throw new NotFoundError('nama keperluan tidak ditemukan');
    }
    return response(res, 200, 'Success mengambil data nama keperluan', need);
  } catch (error) {
    console.error('[getNeedById]', error);
    return next(error);
  }
};

export const updateNeed = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { need } = req.validated;

    const isNeedExist = await NeedRepositories.cekNeed(need, id);
    if (isNeedExist) {
      throw new InvariantError('nama keperluan sudah ada');
    }

    const updatedNeed = await NeedRepositories.updateNeed(id, need);
    if (!updatedNeed) {
      throw new NotFoundError('nama keperluan gagal diubah');
    }

    io.emit('need:changed', updatedNeed);
    return response(res, 200, 'nama keperluan berhasil diubah', updatedNeed);
  } catch (error) {
    console.error('[updateNeed]', error);
    return next(error);
  }
};

export const deleteNeed = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedNeed = await NeedRepositories.deleteNeed(id);
    if (!deletedNeed) {
      throw new NotFoundError('nama keperluan gagal dihapus');
    }

    io.emit('need:changed', deletedNeed);
    return response(res, 200, 'nama keperluan berhasil dihapus', deletedNeed);
  } catch (error) {
    console.error('[deleteNeed]', error);
    return next(error);
  }
};