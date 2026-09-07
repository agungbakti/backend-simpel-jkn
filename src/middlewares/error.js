import response from '../utils/response.js';
import { ClientError } from '../exceptions/index.js';

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof ClientError) {
    return response(res, err.statusCode, err.message, null);
  }

  if (err.isJoi) {
    return response(res, 400, err.details[0].message, null);
  }

  console.error('Unhandled error:', err);

  const status = err.statusCode || err.status || 500;
  const message = status === 500 ? 'Terjadi kesalahan pada server' : (err.message || 'Terjadi kesalahan');

  return response(res, status, message, null);
};

export default ErrorHandler;