import { pool } from '../../config/pool.js';
import { nanoid } from 'nanoid';

class DistrictHospitalRepositories {
  async createDistrictHospital(district) {
    const id = `district-${nanoid(10)}`;

    const sql = `
      INSERT INTO district_hospitals (
        id,
        name_district_hospital
      )
      VALUES (?, ?)
    `;

    const [result] = await pool.query(sql, [id, district]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }

  async cekDistrictHospital(district, districtId = null) {
    let sql = `
      SELECT name_district_hospital
      FROM district_hospitals
      WHERE name_district_hospital = ?
    `;

    const values = [district];

    if (districtId) {
      sql += ` AND id != ?`;
      values.push(districtId);
    }

    const [rows] = await pool.query(sql, values);

    return rows.length > 0;
  }

  async getDistrictHospitals(search = '') {
    let sql = 'SELECT * FROM district_hospitals';
    const values = [];

    if (search) {
      sql += ' WHERE name_district_hospital LIKE ?';
      values.push(`%${search}%`);
    }

    sql += ' ORDER BY name_district_hospital ASC';

    const [rows] = await pool.query(sql, values);
    return rows;
  }

  async getDistrictHospitalById(id) {
    const [rows] = await pool.query('SELECT * FROM district_hospitals WHERE id = ?', [
      id,
    ]);

    return rows[0];
  }

  async updateDistrictHospital(id, district) {
    const sql = `
      UPDATE district_hospitals
      SET
        name_district_hospital = ?
      WHERE id = ?
    `;

    const [result] = await pool.query(sql, [district, id]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }

  async deleteDistrictHospital(id) {
    const [result] = await pool.query('DELETE FROM district_hospitals WHERE id = ?', [
      id,
    ]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }
}

export default new DistrictHospitalRepositories();
