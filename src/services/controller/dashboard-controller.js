import dashboardRepositories from '../repositories/dashboard-repositories.js';
import response from '../../utils/response.js';

export const getDashboard = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;

    const [summary, chart, recent] = await Promise.all([
      dashboardRepositories.getSummary(userId, role),
      dashboardRepositories.getChart(userId, role),
      dashboardRepositories.getRecent(userId, role),
    ]);

    response(res, 200, 'Success mengambil data dashboard', {
      summary,
      chart,
      recent,
    });
  } catch (error) {
    console.error('[getDashboard]', error);
    return next(error);
  }
};