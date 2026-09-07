import { pool } from '../../config/pool.js';

class LaporanRepositories {
  buildWhere(startDate, endDate, information, status) {
    const values = [];
    const conditions = [];

    if (startDate) {
      conditions.push('dsj.date >= ?');
      values.push(startDate);
    }

    if (endDate) {
      conditions.push('dsj.date <= ?');
      values.push(endDate);
    }

    if (information) {
      conditions.push('dsj.information_id = ?');
      values.push(information);
    }

    if (status) {
      conditions.push('dsj.status = ?');
      values.push(status);
    }

    return {
      where: conditions.length ? `WHERE ${conditions.join(' AND ')}` : '',
      values,
    };
  }

  async getSummary(startDate, endDate, information, status) {
    const { where, values } = this.buildWhere(
      startDate,
      endDate,
      information,
      status,
    );

    const sql = `
    SELECT
      COUNT(*) AS total_data_simpel_jkn,

      SUM(CASE WHEN status='waiting' THEN 1 ELSE 0 END) AS total_menunggu,

      SUM(CASE WHEN status='success' THEN 1 ELSE 0 END) AS total_berhasil,

      SUM(CASE WHEN status='failed' THEN 1 ELSE 0 END) AS total_gagal

    FROM data_simpel_jkn dsj
    ${where}
  `;

    const [rows] = await pool.query(sql, values);

    return rows[0];
  }

  async getChart(startDate, endDate, information, status) {
    const { where, values } = this.buildWhere(
      startDate,
      endDate,
      information,
      status,
    );

    const sql = `
    SELECT
      DATE_FORMAT(dsj.date, '%Y-%m-%d') AS tanggal,
      COUNT(*) AS jumlah
    FROM data_simpel_jkn dsj
    ${where}
    GROUP BY dsj.date
    ORDER BY dsj.date
  `;

    const [rows] = await pool.query(sql, values);

    return rows;
  }

  async getinformation(startDate, endDate, information, status) {
    const { where, values } = this.buildWhere(
      startDate,
      endDate,
      information,
      status,
    );

    const sql = `
    SELECT
      i.name_information AS name,
      COUNT(*) AS jumlah
    FROM data_simpel_jkn dsj
    LEFT JOIN informations i
      ON i.id = dsj.information_id
    ${where}
    GROUP BY i.name_information
    ORDER BY jumlah DESC
  `;

    const [rows] = await pool.query(sql, values);

    return rows;
  }

  async getDetail(startDate, endDate, information, status, page = 1, limit = 10) {
    const { where, values } = this.buildWhere(
      startDate,
      endDate,
      information,
      status,
    );

    const [countRows] = await pool.query(
      `
    SELECT COUNT(*) AS total
    FROM data_simpel_jkn dsj
    ${where}
    `,
      values,
    );

    const total = Number(countRows[0].total);
    const totalPage = Math.ceil(total / limit);
    const offset = (page - 1) * limit;

    const sql = `
    SELECT
      dsj.id,
      DATE_FORMAT(dsj.date, '%Y-%m-%d') AS tanggal,
      dsj.name AS nama_peserta,
      n.name_need AS keperluan,
      h.name_hospital AS rumah_sakit,
      dsj.status,
      i.name_information AS keterangan,
      dsj.officer_name AS nama_petugas
    FROM data_simpel_jkn dsj
    LEFT JOIN needs n
      ON dsj.need_id = n.id
    LEFT JOIN hospitals h
      ON dsj.hospital_id = h.id
    LEFT JOIN informations i
      ON dsj.information_id = i.id
    ${where}
    ORDER BY dsj.date DESC
    LIMIT ?
    OFFSET ?
  `;

    const [rows] = await pool.query(sql, [...values, Number(limit), offset]);

    return {
      data: rows,
      total,
      totalPage,
      currentPage: Number(page),
      limit: Number(limit),
    };
  }

  async exportData(startDate, endDate, information, status) {
    const { where, values } = this.buildWhere(
      startDate,
      endDate,
      information,
      status,
    );

    const sql = `
      SELECT
        dsj.id,
        DATE_FORMAT(dsj.date, '%Y-%m-%d') AS tanggal,
        n.name_need AS keperluan,
        l.name_location AS lokasi,
        h.name_hospital AS rumah_sakit,
        dh.name_district_hospital AS kabupaten_fktp,
        dsj.name AS nama_peserta,
        dsj.no_nik,
        dsj.no_hp,
        dsj.email,
        dsj.hospital_referral AS rujuk,
        dsj.status,
        i.name_information AS keterangan,
        dsj.officer_name AS nama_petugas
      FROM data_simpel_jkn dsj
      LEFT JOIN needs n
        ON dsj.need_id = n.id
      LEFT JOIN locations l
        ON dsj.location_id = l.id
      LEFT JOIN hospitals h
        ON dsj.hospital_id = h.id
      LEFT JOIN district_hospitals dh
        ON h.district_hospital_id = dh.id
      LEFT JOIN informations i
        ON dsj.information_id = i.id
      ${where}
      ORDER BY dsj.date ASC
  `;

    const [rows] = await pool.query(sql, values);

    return rows;
  }
}

export default new LaporanRepositories();
