import { pool } from '../../config/pool.js';
import { nanoid } from 'nanoid';

class LocationRepositories {
  async createLocation(location) {
    const id = `location-${nanoid(10)}`;

    const sql = `
      INSERT INTO locations (
        id,
        name_location
      )
      VALUES (?, ?)
    `;

    const [result] = await pool.query(sql, [
      id,
      location,
    ]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }

  async cekLocation(location, locationId = null) {
    let sql = `
      SELECT name_location
      FROM locations
      WHERE name_location = ?
    `;

    const values = [location];

    if (locationId) {
      sql += ` AND id != ?`;
      values.push(locationId);
    }

    const [rows] = await pool.query(sql, values);

    return rows.length > 0;
  }

  async getLocations(search = '') {
    let sql = 'SELECT * FROM locations';
    const values = [];

    if (search) {
      sql += ' WHERE name_location LIKE ?';
      values.push(`%${search}%`);
    }

    sql += ' ORDER BY name_location ASC';

    const [rows] = await pool.query(sql, values);
    return rows;
  }

  async getLocationById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM locations WHERE id = ?',
      [id]
    );

    return rows[0];
  }

  async updateLocation(id, location) {

    const sql = `
      UPDATE locations
      SET
        name_location = ?
      WHERE id = ?
    `;

    const [result] = await pool.query(sql, [
      location,
      id,
    ]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }

  async deleteLocation(id) {
    const [result] = await pool.query(
      'DELETE FROM locations WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }
}

export default new LocationRepositories();