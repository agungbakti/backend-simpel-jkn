import { pool } from '../../config/pool.js';
import { nanoid } from 'nanoid';

class NeedRepositories {
  async createNeed(need) {
    const id = `need-${nanoid(10)}`;

    const sql = `
      INSERT INTO needs (
        id,
        name_need
      )
      VALUES (?, ?)
    `;

    const [result] = await pool.query(sql, [id, need]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }

  async cekNeed(need, needId = null) {
    let sql = `
      SELECT name_need
      FROM needs
      WHERE name_need = ?
    `;

    const values = [need];

    if (needId) {
      sql += ` AND id != ?`;
      values.push(needId);
    }

    const [rows] = await pool.query(sql, values);

    return rows.length > 0;
  }

  async getNeeds(search = '') {
    let sql = 'SELECT * FROM needs';
    const values = [];

    if (search) {
      sql += ' WHERE name_need LIKE ?';
      values.push(`%${search}%`);
    }

    sql += ' ORDER BY name_need ASC';

    const [rows] = await pool.query(sql, values);
    return rows;
  }

  async getNeedById(id) {
    const [rows] = await pool.query('SELECT * FROM needs WHERE id = ?', [
      id,
    ]);

    return rows[0];
  }

  async updateNeed(id, need) {
    const sql = `
      UPDATE needs
      SET
        name_need = ?
      WHERE id = ?
    `;

    const [result] = await pool.query(sql, [need, id]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }

  async deleteNeed(id) {
    const [result] = await pool.query('DELETE FROM needs WHERE id = ?', [
      id,
    ]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }
}

export default new NeedRepositories();
