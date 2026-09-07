import { pool } from '../../config/pool.js';
import { nanoid } from 'nanoid';

function maskField(value) {
  if (!value) return value;

  const str = String(value);
  const visibleChars = str.slice(0, 2);
  const maskedLength = str.length - 2;

  return visibleChars + '*'.repeat(Math.max(maskedLength, 0));
}

class DataRepositories {
  async createData(
    userId,
    date,
    needId,
    locationId,
    hospitalId,
    name,
    noNik,
    noHp,
    email,
    hospitalReferral
  ) {
    const id = `data-${nanoid(10)}`;

    const sql = `
    INSERT INTO data_simpel_jkn (
      id,
      user_id,
      date,
      need_id,
      location_id,
      hospital_id,
      name,
      no_nik,
      no_hp,
      email,
      hospital_referral
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    await pool.query(sql, [
      id,
      userId,
      date,
      needId,
      locationId,
      hospitalId,
      name,
      noNik,
      noHp,
      email,
      hospitalReferral,
    ]);

    return { id };
  }

  async cekNoHp(noHp, dataId = null) {
    let sql = `
      SELECT no_hp
      FROM data_simpel_jkn
      WHERE no_hp = ?
    `;

    const values = [noHp];

    if (dataId) {
      sql += ` AND id != ?`;
      values.push(dataId);
    }

    const [rows] = await pool.query(sql, values);

    return rows.length > 0;
  }

  async updateStatus(id, status) {
    const sql = `
    UPDATE data_simpel_jkn
    SET status = ?
    WHERE id = ?
  `;

    const [result] = await pool.query(sql, [status, id]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }

  async updateInformation(id, informationId) {
    const sql = `
    UPDATE data_simpel_jkn
    SET information_id = ?
    WHERE id = ?
  `;

    const [result] = await pool.query(sql, [informationId, id]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }

  async updateOfficerName(id, officerName) {
    const sql = `
    UPDATE data_simpel_jkn
    SET officer_name = ?
    WHERE id = ?
  `;

    const [result] = await pool.query(sql, [officerName, id]);

    if (result.affectedRows === 0) {
      return null;
    }

    return { id };
  }

  async updateData(
    id,
    userId,
    date,
    needId,
    locationId,
    hospitalId,
    name,
    noNik,
    noHp,
    email,
    hospitalReferral
  ) {
    const sql = `
    UPDATE data_simpel_jkn
    SET
      user_id = ?,
      date = ?,
      need_id = ?,
      location_id = ?,
      hospital_id = ?,
      name = ?,
      no_nik = ?,
      no_hp = ?,
      email = ?,
      hospital_referral = ?
    WHERE id = ?
  `;

    const [result] = await pool.query(sql, [
      userId,
      date,
      needId,
      locationId,
      hospitalId,
      name,
      noNik,
      noHp,
      email,
      hospitalReferral,
      id
    ]);

    if (result.affectedRows === 0) return null;

    return { id };
  }

  async getDatas(tanggal, search = '', page = 1, limit = 50, userId = null, role = null) {
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.max(1, Number(limit) || 50);
    const offset = (safePage - 1) * safeLimit;

    const filterTanggal =
      tanggal ||
      new Date().toLocaleDateString('en-CA', {
        timeZone: 'Asia/Jakarta',
      });

    let whereClause = ' WHERE 1=1';
    const values = [];

    whereClause += ' AND dsj.date = ?';
    values.push(filterTanggal);

    // Faskes (non-admin) hanya bisa lihat data miliknya sendiri
    if (role !== 'admin' && userId) {
      whereClause += ' AND dsj.user_id = ?';
      values.push(userId);
    }

    if (search) {
      whereClause += `
        AND (
          dsj.name LIKE ?
          OR dsj.email LIKE ?
          OR h.name_hospital LIKE ?
        )
      `;

      const keyword = `%${search}%`;

      values.push(
        keyword,
        keyword,
        keyword
      );
    }

    const dataSql = `
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
        i.id AS id_keterangan,
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
      ${whereClause}
      ORDER BY dsj.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const countSql = `
      SELECT COUNT(*) AS total
      FROM data_simpel_jkn dsj
      LEFT JOIN hospitals h
        ON dsj.hospital_id = h.id
      ${whereClause}
    `;

    const [rows] = await pool.query(
      dataSql,
      [...values, safeLimit, offset]
    );

    const [countRows] = await pool.query(
      countSql,
      values
    );

    const total = Number(countRows[0].total);

    // Masking data sensitif untuk faskes (non-admin)
    const maskedRows = role !== 'admin'
      ? rows.map((row) => ({
          ...row,
          no_nik: maskField(row.no_nik),
          no_hp: maskField(row.no_hp),
          email: maskField(row.email),
        }))
      : rows;

    return {
      data: maskedRows,
      total,
      totalPage: Math.ceil(total / safeLimit),
      currentPage: safePage,
      limit: safeLimit,
    };
  }

  async getSummary(tanggal, userId = null, role = null) {
    const filterTanggal =
      tanggal ||
      new Date().toLocaleDateString('en-CA', {
        timeZone: 'Asia/Jakarta',
      });

    let whereClause = ' WHERE dsj.date = ?';
    const values = [filterTanggal];

    if (role !== 'admin' && userId) {
      whereClause += ' AND dsj.user_id = ?';
      values.push(userId);
    }

    const sql = `
      SELECT
        COUNT(*) AS total_data,
        SUM(CASE WHEN dsj.status='waiting' THEN 1 ELSE 0 END) AS total_menunggu,
        SUM(CASE WHEN dsj.status='success' THEN 1 ELSE 0 END) AS total_berhasil,
        SUM(CASE WHEN dsj.status='failed' THEN 1 ELSE 0 END) AS total_gagal
      FROM data_simpel_jkn dsj
      ${whereClause}
    `;

    const [rows] = await pool.query(sql, values);

    return rows[0];
  }

  async getDataById(id) {
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
      WHERE dsj.id = ?
    `;

    const [rows] = await pool.query(sql, [id]);

    return rows[0] || null;
  }

  async deleteData(id) {
    const [result] = await pool.query('DELETE FROM data_simpel_jkn WHERE id = ?', [id]);

    if (result.affectedRows === 0) return null;

    return { id };
  }
}

export default new DataRepositories();