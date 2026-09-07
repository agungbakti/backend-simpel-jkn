import { pool } from '../../config/pool.js';
import { nanoid } from 'nanoid';

class HospitalRepositories {
  async createHospital(hospital, districtHospitalId) {
    const id = `hospital-${nanoid(10)}`;

    const sql = `
      INSERT INTO hospitals (
        id,
        name_hospital,
        district_hospital_id
      )
      VALUES (?, ?, ?)
    `;

    const [result] = await pool.query(sql, [id, hospital, districtHospitalId]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }

  async cekHospital(hospital, hospitalId = null) {
    let sql = `
      SELECT name_hospital
      FROM hospitals
      WHERE name_hospital = ?
    `;

    const values = [hospital];

    if (hospitalId) {
      sql += ` AND id != ?`;
      values.push(hospitalId);
    }

    const [rows] = await pool.query(sql, values);

    return rows.length > 0;
  }

  async getHospitals(search = '') {
    let sql = `
      SELECT 
        hospitals.*, 
        district_hospitals.name_district_hospital
      FROM hospitals
      LEFT JOIN district_hospitals 
        ON hospitals.district_hospital_id = district_hospitals.id
    `;
    const values = [];

    if (search) {
      sql += ' WHERE hospitals.name_hospital LIKE ?';
      values.push(`%${search}%`);
    }

    sql += ' ORDER BY hospitals.name_hospital ASC';

    const [rows] = await pool.query(sql, values);
    return rows;
  }

  async getHospitalById(id) {
    const [rows] = await pool.query(`
      SELECT 
        hospitals.*, 
        district_hospitals.name_district_hospital
      FROM hospitals
      LEFT JOIN district_hospitals 
        ON hospitals.district_hospital_id = district_hospitals.id
      WHERE hospitals.id = ?`,
    [id]);

    return rows[0];
  }

  async updateHospital(id, hospital, districtHospitalId) {
    const sql = `
      UPDATE hospitals
      SET
        name_hospital = ?,
        district_hospital_id = ?
      WHERE id = ?
    `;

    const [result] = await pool.query(sql, [hospital, districtHospitalId, id]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }

  async deleteHospital(id) {
    const [result] = await pool.query('DELETE FROM hospitals WHERE id = ?', [
      id,
    ]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }
}

export default new HospitalRepositories();
