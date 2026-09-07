import DataRepositories from '../repositories/data-repositories.js';
import InvariantError from '../../exceptions/invariant-error.js';
import response from '../../utils/response.js';
import NotFoundError from '../../exceptions/not-found-error.js';
import { io } from '../../server/index.js';

export const createData = async (req, res, next) => {
  try {
    const {
      date,
      needId,
      locationId,
      hospitalId,
      name,
      noNik,
      noHp,
      email,
      hospitalReferral
    } = req.validated;

    const userId = req.user.id;

    const isNoHpExist = await DataRepositories.cekNoHp(noHp);
    if (isNoHpExist) {
      return next(new InvariantError('Nomor HP sudah dipakai'));
    }

    const data = await DataRepositories.createData(
      userId,
      date,
      needId,
      locationId,
      hospitalId,
      name,
      noNik,
      noHp,
      email,
      hospitalReferral
    );

    if (!data) {
      return next(new InvariantError('Gagal membuat data'));
    }

    io.emit('data:changed', data);

    return response(res, 201, 'Success membuat data', data);

  } catch (error) {
    console.error('[createData]', error);
    return next(error);
  }
};

export const getDatas = async (req, res, next) => {
  try {
    let { tanggal, search = '', page = 1, limit = 50 } = req.query;
    const { id: userId, role } = req.user;

    const [
      { data: data, total, totalPage, currentPage },
      summary,
    ] = await Promise.all([
      DataRepositories.getDatas(
        tanggal,
        search,
        page,
        limit,
        userId,
        role
      ),
      DataRepositories.getSummary(tanggal, userId, role),
    ]);

    return response(res, 200, 'Success mengambil data data', {
      summary,
      data,
      total,
      totalPage,
      currentPage,
    });
  } catch (error) {
    console.error('[getDatas]', error);
    return next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await DataRepositories.updateStatus(id, status);
    if (!data) {
      return next(new NotFoundError('data not found'));
    }

    io.emit('data:changed', data);

    return response(res, 200, 'Success update status', data);

  } catch (error) {
    console.error('[updateStatus]', error);
    return next(error);
  }
};

export const updateInformation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { informationId } = req.body;
    const data = await DataRepositories.updateInformation(id, informationId);
    if (!data) {
      return next(new NotFoundError('data not found'));
    }

    io.emit('data:changed', data);

    return response(res, 200, 'Success update information', data);

  } catch (error) {
    console.error('[updateInformation]', error);
    return next(error);
  }
};

export const updateOfficerName = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { officerName } = req.body;
    const data = await DataRepositories.updateOfficerName(id, officerName);
    if (!data) {
      return next(new NotFoundError('data not found'));
    }

    io.emit('data:changed', data);

    return response(res, 200, 'Success update officer name', data);

  } catch (error) {
    console.error('[updateOfficerName]', error);
    return next(error);
  }
};

export const updateData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const {
      date,
      needId,
      locationId,
      hospitalId,
      name,
      noNik,
      noHp,
      email,
      hospitalReferral,
    } = req.validated;

    const isNoHpExist = await DataRepositories.cekNoHp(noHp, id);
    if (isNoHpExist) {
      return next(new InvariantError('Nomor HP sudah dipakai'));
    }

    const data = await DataRepositories.updateData(
      id,
      userId,
      date,
      needId,
      locationId,
      hospitalId,
      name,
      noNik,
      noHp,
      email,
      hospitalReferral
    );

    if (!data) {
      return next(new NotFoundError('data not found'));
    }

    io.emit('data:changed', data);

    return response(res, 200, 'Success update data', data);

  } catch (error) {
    console.error('[updateData]', error);
    return next(error);
  }
};

export const getDataById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await DataRepositories.getDataById(id);
    if (!data) {
      return next(new NotFoundError('data not found'));
    }
    return response(res, 200, 'Success mengambil data data', data);

  } catch (error) {
    console.error('[getAntrianById]', error);
    return next(error);
  }
};

export const deleteData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await DataRepositories.deleteData(id);
    if (!data) {
      return next(new NotFoundError('data not found'));
    }

    io.emit('data:changed', data);

    return response(res, 200, 'Success delete data', data);

  } catch (error) {
    console.error('[deleteAntrian]', error);
    return next(error);
  }
};