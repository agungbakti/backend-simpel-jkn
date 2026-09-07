import { nanoid } from 'nanoid';
import { pool } from '../../config/pool.js';
import bcrypt from 'bcrypt';

class UserRepositories {
  async createUser(username, email, password, noHp, role) {
    const id = `user-${nanoid(10)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarInisial = username
      .toUpperCase()
      .split(' ')
      .map(word => word.charAt(0))
      .join('');

    const sql = `
      INSERT INTO users (
        id,
        username,
        email,
        password,
        no_hp,
        avatar_inisial,
        role
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(sql, [
      id,
      username,
      email,
      hashedPassword,
      noHp,
      avatarInisial,
      role,
    ]);

    if (result.affectedRows === 0) return null;

    return { id };
  }

  async verifyEmail(email, excludeUserId = null) {
    let sql = `
      SELECT email
      FROM users
      WHERE LOWER(email) = LOWER(?)
    `;

    const values = [email];

    if (excludeUserId) {
      sql += ` AND id != ?`;
      values.push(excludeUserId);
    }

    const [rows] = await pool.query(sql, values);

    return rows.length > 0;
  }

  async verifyUsername(username, excludeUserId = null) {
    let sql = `
      SELECT username
      FROM users
      WHERE LOWER(username) = LOWER(?)
    `;

    const values = [username];

    if (excludeUserId) {
      sql += ` AND id != ?`;
      values.push(excludeUserId);
    }

    const [rows] = await pool.query(sql, values);

    return rows.length > 0;
  }

  async getUsers(username) {
    let sql = `
      SELECT
        id,
        username,
        email,
        no_hp,
        avatar_inisial,
        role
      FROM users
      WHERE 1=1
    `;

    const values = [];

    if (username) {
      sql += ` AND LOWER(username) LIKE ?`;
      values.push(`%${username.toLowerCase()}%`);
    }

    sql += ` ORDER BY username ASC`;

    const [rows] = await pool.query(sql, values);

    return rows;
  }

  async getUserById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    return rows[0];
  }

  async updateUser(id, username, email, noHp, role) {
    const avatarInisial = username
      .toUpperCase()
      .split(' ')
      .map(word => word.charAt(0))
      .join('');

    const sql = `
      UPDATE users
      SET
        username = ?,
        email = ?,
        no_hp = ?,
        role = ?,
        avatar_inisial = ?
      WHERE id = ?
    `;

    const [result] = await pool.query(sql, [
      username,
      email,
      noHp,
      role,
      avatarInisial,
      id,
    ]);

    if (result.affectedRows === 0) return null;

    return { id };
  }

  async deleteUser(id) {
    const [result] = await pool.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) return null;

    return { id };
  }

  async changePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [result] = await pool.query(
      `
      UPDATE users
      SET password = ?
      WHERE id = ?
      `,
      [hashedPassword, id]
    );

    if (result.affectedRows === 0) return null;

    return { id };
  }
}

export default new UserRepositories();