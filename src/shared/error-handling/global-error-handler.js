const errorResponse = require('./response.js').errorResponse;
const AppError = require('./app-error.js');

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status;

  if (err.isOperational) {
    return errorResponse(res, err.statusCode, err.message);
  } else {
    console.error('INTERNAL ERROR:', err);
    return errorResponse(res, err.statusCode, 'something went wrong!');
  }
};

module.exports = globalErrorHandler;