import { pool } from '../../config/pool.js';
import { nanoid } from 'nanoid';

class InformationRepositories {
  async createInformation(information) {
    const id = `information-${nanoid(10)}`;

    const sql = `
      INSERT INTO informations (
        id,
        name_information
      )
      VALUES (?, ?)
    `;

    const [result] = await pool.query(sql, [id, information]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }

  async cekInformation(information, informationId = null) {
    let sql = `
      SELECT name_information
      FROM informations
      WHERE name_information = ?
    `;

    const values = [information];

    if (informationId) {
      sql += ` AND id != ?`;
      values.push(informationId);
    }

    const [rows] = await pool.query(sql, values);

    return rows.length > 0;
  }

  async getInformations(search = '') {
    let sql = 'SELECT * FROM informations';
    const values = [];

    if (search) {
      sql += ' WHERE name_information LIKE ?';
      values.push(`%${search}%`);
    }

    sql += ' ORDER BY name_information ASC';

    const [rows] = await pool.query(sql, values);
    return rows;
  }

  async getInformationById(id) {
    const [rows] = await pool.query('SELECT * FROM informations WHERE id = ?', [
      id,
    ]);

    return rows[0];
  }

  async updateInformation(id, information) {
    const sql = `
      UPDATE informations
      SET
        name_information = ?
      WHERE id = ?
    `;

    const [result] = await pool.query(sql, [information, id]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }

  async deleteInformation(id) {
    const [result] = await pool.query('DELETE FROM informations WHERE id = ?', [
      id,
    ]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }
}

export default new InformationRepositories();
