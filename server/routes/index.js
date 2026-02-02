import express from 'express';
const router = express.Router();
import { validateRequest } from '../adapters/middleware/validationMiddleware.js';

// Placeholder for future modular routes
// import authRoutes from './auth.js';
// import bookingRoutes from './bookings.js';
// import hospitalRoutes from './hospitals.js';

/**
 * Health Check Route
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Example route with validation
router.post('/example', validateRequest({
  body: {
    name: { type: 'string', required: true },
    age: { type: 'number', required: true, min: 0 },
  },
  query: {
    token: { type: 'string', required: true },
  },
}), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Request is valid!',
    data: req.body,
  });
});

// router.use('/auth', authRoutes);
// router.use('/bookings', bookingRoutes);
// router.use('/hospitals', hospitalRoutes);

export default router;
