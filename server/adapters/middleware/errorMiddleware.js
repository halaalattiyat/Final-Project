/**
 * Global Error Handler
 */
export const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'حدث خطأ داخلي في الخادم';

  console.error(`[Error] ${req.method} ${req.url}:`, err);

  // Add handling for validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      status: 400,
      message: 'Validation Error',
      details: err.details || err.message,
    });
  }

  res.status(status).json({
    success: false,
    status,
    message,
    // Only show stack trace in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
