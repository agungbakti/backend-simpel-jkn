import UserRepositories from '../repositories/user-repositories.js';
import InvariantError from '../../exceptions/invariant-error.js';
import response from '../../utils/response.js';
import NotFoundError from '../../exceptions/not-found-error.js';
import { io } from '../../server/index.js';

export const createUser = async (req, res, next) => {
  const {
    username,
    email,
    password,
    noHp,
    role,
  } = req.validated;

  try {
    const isNameExist = await UserRepositories.verifyUsername(username);
    if (isNameExist) {
      return next(new InvariantError('Username sudah ada'));
    }

    const isEmailExist = await UserRepositories.verifyEmail(email);
    if (isEmailExist) {
      return next(new InvariantError('Email sudah ada'));
    }

    const user = await UserRepositories.createUser(username, email, password, noHp, role);
    if (!user) {
      return next(new InvariantError('User gagal ditambahkan'));
    }

    io.emit('user:changed', user);

    response(res, 201, 'User berhasil ditambahkan', user);
  } catch (error) {
    console.error('[createUser]', error);
    return next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserRepositories.getUserById(id);
    if (!user) {
      return next(new NotFoundError('User not found'));
    }
    response(res, 200, 'Success mengambil data user', user);
  } catch (error) {
    console.error('[getUserById]', error);
    return next(error);
  }
};

export const getUsers = async (req, res, next) => {
  const { username } = req.query;

  try {
    const users = await UserRepositories.getUsers(username);
    response(res, 200, 'Success mengambil data user', users);
  } catch (error) {
    console.error('[getUsers]', error);
    return next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const {
    username,
    email,
    noHp,
    role,
  } = req.validated;

  try {
    const { id } = req.params;

    const isNameExist = await UserRepositories.verifyUsername(username, id);
    if (isNameExist) {
      return next(new InvariantError('Username sudah ada'));
    }

    const isEmailExist = await UserRepositories.verifyEmail(email, id);
    if (isEmailExist) {
      return next(new InvariantError('Email sudah ada'));
    }

    const user = await UserRepositories.updateUser(id, username, email, noHp, role);
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    io.emit('user:changed', user);

    response(res, 200, 'User berhasil diubah', user);

  } catch (error) {
    console.error('[updateUser]', error);
    return next(error);
  }
};

export const changePassword = async (req, res, next) => {
  const { id } = req.params;
  const { newPassword } = req.validated;

  try {
    const user = await UserRepositories.changePassword(id, newPassword);
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    io.emit('user:changed', user);

    response(res, 200, 'Password berhasil diubah', user);
  } catch (error) {
    console.error('[changePassword]', error);
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserRepositories.deleteUser(id);
    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    io.emit('user:changed', user);

    response(res, 200, 'User berhasil dihapus', user);
  } catch (error) {
    console.error('[deleteUser]', error);
    return next(error);
  }
};