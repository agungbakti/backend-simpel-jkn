import laporanRepositories from '../repositories/laporan-repositories.js';
import response from '../../utils/response.js';

export const getLaporan = async (req, res) => {
  try {
    const { start_date, end_date, information, status } = req.query;

    const [summary, chart, kategoriChart] = await Promise.all([
      laporanRepositories.getSummary(
        start_date,
        end_date,
        information,
        status
      ),
      laporanRepositories.getChart(
        start_date,
        end_date,
        information,
        status
      ),
      laporanRepositories.getinformation(
        start_date,
        end_date,
        information,
        status
      ),
    ]);

    return response(res, 200, 'Success', {
      summary,
      chart,
      information: kategoriChart,
    });
  } catch (error) {
    return response(res, 500, error.message);
  }
};

export const getDetailLaporan = async (req, res) => {
  try {
    const {
      start_date,
      end_date,
      information,
      status,
      page = 1,
      limit = 10,
    } = req.query;

    const data = await laporanRepositories.getDetail(
      start_date,
      end_date,
      information,
      status,
      Number(page),
      Number(limit)
    );

    return response(res, 200, 'Success', data);
  } catch (error) {
    return response(res, 500, error.message);
  }
};

export const exportLaporan = async (req, res) => {
  try {
    const { start_date, end_date, information, status } = req.query;

    const data = await laporanRepositories.exportData(
      start_date,
      end_date,
      information,
      status
    );

    return response(res, 200, 'Success', data);
  } catch (error) {
    return response(res, 500, error.message);
  }
};