import AuthRepositories from '../repositories/auth-repositories.js';
import InvariantError from '../../exceptions/invariant-error.js';
import ClientError from '../../exceptions/client-error.js';
import response from '../../utils/response.js';
import NotFoundError from '../../exceptions/not-found-error.js';
import TokenManager from '../../security/token-manager.js';

export const register = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      phone,
      role
    } = req.validated;

    const isNameExist = await AuthRepositories.verifyNewUser(username);

    if (isNameExist) {
      throw new InvariantError('username sudah digunakan', 422);
    }

    const isEmailExist = await AuthRepositories.verifyEmail(email);

    if (isEmailExist) {
      return next(new InvariantError('email sudah terdaftar', 422));
    }

    const user = await AuthRepositories.createUser({
      username,
      email,
      password,
      phone,
      role
    });

    if (!user) {
      return next(new InvariantError('user gagal ditambahkan'));
    }

    return response(res, 201, 'user berhasil ditambahkan', {
      id: user.id
    });
  } catch (error) {
    console.error('[register]', error);
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.validated;

    const user = await AuthRepositories.verifyUserCredential(
      username,
      password
    );

    if (!user) {
      return next(new NotFoundError('user tidak ditemukan'));
    }

    const accessToken = TokenManager.generateAccessToken({
      id: user.id,
      role: user.role
    });

    const refreshToken = TokenManager.generateRefreshToken({
      id: user.id,
      role: user.role
    });

    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 3);

    await AuthRepositories.addRefreshToken({
      token: refreshToken,
      userId: user.id,
      expiredAt,
    });

    return response(res, 200, 'login berhasil', {
      accessToken,
      refreshToken,
    });
  } catch (error) {
    if (!(error instanceof ClientError)) {
      console.error('[login]', error);  // cuma log kalau bukan ClientError (error tak terduga)
    }
    return next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await AuthRepositories.getProfile(userId);

    if (!user) {
      return response(res, 404, 'User tidak ditemukan');
    }

    const tanggal = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jakarta',
    }).format(new Date());

    return response(res, 200, 'Success mengambil profile', {
      tanggal,
      user,
    });
  } catch (error) {
    console.error('[getProfile]', error);
    return next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.validated;

    await AuthRepositories.verifyRefreshToken(refreshToken);

    const { id } = TokenManager.verifyRefreshToken(refreshToken);

    const accessToken = TokenManager.generateAccessToken({
      id
    });

    return response(res, 200, 'access token berhasil diperbarui', {
      accessToken
    });
  } catch (error) {
    console.error('[refreshAccessToken]', error);
    return next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.validated;

    await AuthRepositories.verifyRefreshToken(refreshToken);
    await AuthRepositories.deleteRefreshToken(refreshToken);

    return response(res, 200, 'berhasil logout');
  } catch (error) {
    console.error('[logout]', error);
    return next(error);
  }
};