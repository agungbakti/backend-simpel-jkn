import { nanoid } from 'nanoid';
import { pool } from '../../config/pool.js';
import bcrypt from 'bcrypt';
import AuthenticationError from '../../exceptions/authentication-error.js';
import AuthorizationError from '../../exceptions/authorization-error.js';

class AuthRepositories {
  async createUser({ username, email, password, phone, role }) {
    const id = `USER-${nanoid(16)}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarInitial = username
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const sql = `
      INSERT INTO users (
        id,
        username,
        email,
        password,
        no_hp,
        role,
        avatar_inisial
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      id,
      username,
      email,
      hashedPassword,
      phone,
      role,
      avatarInitial
    ]);

    return { id };
  }

  async getProfile(userId) {
    const [rows] = await pool.query(
      `
      SELECT
        id,
        username,
        avatar_inisial,
        role
      FROM users
      WHERE id = ?
      `,
      [userId]
    );

    return rows[0];
  }

  async verifyUserCredential(username, password) {
    const [rows] = await pool.query(
      `
      SELECT
        id,
        password,
        role
      FROM users
      WHERE username = ?
      `,
      [username]
    );

    if (rows.length === 0) {
      throw new AuthenticationError('Username belum terdaftar');
    }

    const {
      id,
      password: hashedPassword,
      role,
    } = rows[0];

    const isPasswordMatch = await bcrypt.compare(
      password,
      hashedPassword
    );

    if (!isPasswordMatch) {
      throw new AuthenticationError('Password salah');
    }

    return {
      id,
      role,
    };
  }

  async verifyNewUser(username) {
    const [rows] = await pool.query(
      `
      SELECT username
      FROM users
      WHERE username = ?
      `,
      [username]
    );

    return rows.length > 0;
  }

  async verifyEmail(email) {
    const [rows] = await pool.query(
      `
      SELECT email
      FROM users
      WHERE email = ?
      `,
      [email]
    );

    return rows.length > 0;
  }

  async addRefreshToken({ token, userId, expiredAt }) {
    const id = `refresh-token-${nanoid(16)}`;

    await pool.query(
      `
      INSERT INTO tokens (
        id,
        token,
        user_id,
        expired_at
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        id,
        token,
        userId,
        expiredAt,
      ]
    );
  }

  async deleteRefreshToken(token) {
    await pool.query(
      `
      DELETE FROM tokens
      WHERE token = ?
      `,
      [token]
    );
  }

  async verifyRefreshToken(token) {
    const [rows] = await pool.query(
      `
      SELECT
        token,
        user_id,
        expired_at
      FROM tokens
      WHERE token = ?
      `,
      [token]
    );

    if (rows.length === 0) {
      throw new AuthorizationError(
        'Refresh token tidak valid'
      );
    }

    if (new Date() > new Date(rows[0].expired_at)) {
      throw new AuthorizationError(
        'Refresh token telah kedaluwarsa'
      );
    }

    return rows[0];
  }
}

export default new AuthRepositories();