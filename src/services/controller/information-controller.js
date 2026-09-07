import InformationRepositories from '../repositories/information-repositories.js';
import InvariantError from '../../exceptions/invariant-error.js';
import NotFoundError from '../../exceptions/not-found-error.js';
import response from '../../utils/response.js';
import { io } from '../../server/index.js';

export const createInformation = async (req, res, next) => {
  try {
    const { information } = req.validated;

    const isInformationExist = await InformationRepositories.cekInformation(information);
    if (isInformationExist) {
      throw new InvariantError('nama informasi sudah ada');
    }

    const newInformation = await InformationRepositories.createInformation(information);
    if (!newInformation) {
      throw new NotFoundError('nama informasi gagal ditambahkan');
    }

    io.emit('information:changed', newInformation);
    return response(res, 201, 'nama informasi berhasil ditambahkan', newInformation);
  } catch (error) {
    console.error('[createInformation]', error);
    return next(error);
  }
};

export const getInformations = async (req, res, next) => {
  try {
    const { search } = req.query;
    const informations = await InformationRepositories.getInformations(search);
    return response(res, 200, 'Success mengambil data nama informasi', informations);
  } catch (error) {
    console.error('[getInformations]', error);
    return next(error);
  }
};

export const getInformationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const information = await InformationRepositories.getInformationById(id);
    if (!information) {
      throw new NotFoundError('nama informasi tidak ditemukan');
    }
    return response(res, 200, 'Success mengambil data nama informasi', information);
  } catch (error) {
    console.error('[getInformationById]', error);
    return next(error);
  }
};

export const updateInformation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { information } = req.validated;

    const isInformationExist = await InformationRepositories.cekInformation(information, id);
    if (isInformationExist) {
      throw new InvariantError('nama informasi sudah ada');
    }

    const updatedInformation = await InformationRepositories.updateInformation(id, information);
    if (!updatedInformation) {
      throw new NotFoundError('nama informasi gagal diubah');
    }

    io.emit('information:changed', updatedInformation);
    return response(res, 200, 'nama informasi berhasil diubah', updatedInformation);
  } catch (error) {
    console.error('[updateInformation]', error);
    return next(error);
  }
};

export const deleteInformation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedInformation = await InformationRepositories.deleteInformation(id);
    if (!deletedInformation) {
      throw new NotFoundError('nama informasi gagal dihapus');
    }

    io.emit('information:changed', deletedInformation);
    return response(res, 200, 'nama informasi berhasil dihapus', deletedInformation);
  } catch (error) {
    console.error('[deleteInformation]', error);
    return next(error);
  }
};