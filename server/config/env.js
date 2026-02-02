
/**
 * Environment Configuration
 * Centralizes all process.env variables with defaults and validation.
 */
const config = {
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_PREFIX: '/api/v1',
  JWT_SECRET: process.env.JWT_SECRET || 'tabasheer_khair_secret_key_2024',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  // In a real app, database credentials would be here
  DB_FILE: './server/infrastructure/database/data.json'
};

export default config;
