/**
 * Application configuration
 * 
 * Centralizes configuration settings that might come from
 * environment variables or config files.
 */

export const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  corsOrigins: [
    'http://localhost:5173', // Vite default port
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
  ],
};
