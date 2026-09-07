import response from '../utils/response.js';

function authorizeRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return response(res, 401, 'Unauthorized', null);
    }

    if (!roles.includes(req.user.role)) {
      return response(res, 403, 'Forbidden', null);
    }

    next();
  };
}

export default authorizeRole;