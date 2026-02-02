
import express from 'express';
import cors from 'cors';
// Note: In a standard Node environment we'd use helmet, but for this context 
// we focus on the architectural structure.
import config from './config/env.js';
import { errorMiddleware } from './adapters/middleware/errorMiddleware.js';
import apiRouter from './routes/index.js';

const app = express();

// Global Middlewares
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Documentation/Health Check
app.get('/', (req, res) => {
  res.json({
    name: 'Tabasheer Khair API',
    version: '1.0.0',
    status: 'Running',
    identity: 'Jordanian Medical Tourism Excellence'
  });
});

// Primary API Router
app.use(config.API_PREFIX, apiRouter);

// Error Handling (Must be last)
app.use(errorMiddleware);

export default app;
