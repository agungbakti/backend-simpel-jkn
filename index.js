import pool from './src/config/pool.js';

async function test() {
  try {
    const conn = await pool.getConnection();

    console.log('Berhasil konek!');

    const [rows] = await pool.query('SELECT NOW()');

    console.log(rows);

    conn.release();
  } catch (err) {
    console.log(err);
  }
}

test();
