import { pool } from '../../config/pool.js';

class DashboardRepositories {
  async getSummary(userId = null, role = null) {
    let whereClause = '';
    const values = [];

    if (role !== 'admin' && userId) {
      whereClause = ' WHERE user_id = ?';
      values.push(userId);
    }

    const sql = `
      SELECT
        COUNT(*) AS total_data,
        SUM(CASE WHEN status = 'waiting' THEN 1 ELSE 0 END) AS total_menunggu,
        SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) AS total_berhasil,
        SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) AS total_gagal
      FROM data_simpel_jkn
      ${whereClause}
    `;

    const [rows] = await pool.query(sql, values);

    return rows[0];
  }

  async getChart(userId = null, role = null) {
    let whereClause = ' WHERE date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)';
    const values = [];

    if (role !== 'admin' && userId) {
      whereClause += ' AND user_id = ?';
      values.push(userId);
    }

    const sql = `
      SELECT
        DATE_FORMAT(date, '%Y-%m-%d') AS tanggal,
        COUNT(*) AS jumlah
      FROM data_simpel_jkn
      ${whereClause}
      GROUP BY date
      ORDER BY date
    `;

    const [rows] = await pool.query(sql, values);

    return rows;
  }

  async getRecent(userId = null, role = null) {
    let whereClause = '';
    const values = [];

    if (role !== 'admin' && userId) {
      whereClause = ' WHERE dsj.user_id = ?';
      values.push(userId);
    }

    const sql = `
      SELECT
        dsj.date,
        dsj.name,
        h.name_hospital AS rumah_sakit,
        dsj.status,
        i.name_information AS informasi
      FROM data_simpel_jkn dsj
      LEFT JOIN hospitals h
        ON dsj.hospital_id = h.id
      LEFT JOIN informations i
        ON dsj.information_id = i.id
      ${whereClause}
      ORDER BY dsj.date DESC
      LIMIT 5
    `;

    const [rows] = await pool.query(sql, values);

    return rows;
  }
}

export default new DashboardRepositories();