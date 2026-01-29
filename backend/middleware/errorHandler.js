// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    err = {
      statusCode: 400,
      message,
    };
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err = {
      statusCode: 400,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
    };
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    err = {
      statusCode: 400,
      message: 'Invalid ID format',
    };
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { error: err }),
  });
};

module.exports = errorHandler;
