/**
 * Server Entry Point
 * 
 * Starts the Express server.
 */

import { createApp } from './app';
import { config } from './core/config';

const app = createApp();

app.listen(config.port, () => {
  console.log(`
    🚀 Server running on port ${config.port}
    📝 Environment: ${config.env}
    🔗 Health check: http://localhost:${config.port}/health
    📚 API docs: http://localhost:${config.port}/api/v1/projects
  `);
});
