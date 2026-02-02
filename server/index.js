
import app from './app.js';
import config from './config/env.js';

/**
 * Bootstrap the Server
 */
const startServer = () => {
  try {
    app.listen(config.PORT, () => {
      console.log(`
      --------------------------------------------------
      تباشير خير | Tabasheer Khair Backend
      Status: Active
      Port: ${config.PORT}
      Mode: ${config.NODE_ENV}
      Identity: Jordan Flag Green (#007A3D)
      --------------------------------------------------
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
