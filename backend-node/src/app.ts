/**
 * Express Application Setup
 * 
 * Configures Express middleware and routes.
 */

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { config } from './core/config';
import { InMemoryProjectRepository } from './infrastructure/repositories/InMemoryProjectRepository';
import { createProjectsRouter, errorHandler } from './api/routes/projectsRouter';

export function createApp(): Application {
  const app = express();

  // Middleware
  app.use(cors({ origin: config.corsOrigins }));
  app.use(express.json());

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  // Initialize repository
  // In a real application, this would be managed by a DI container
  const projectRepository = new InMemoryProjectRepository();

  // Register routes
  app.use('/api/v1/projects', createProjectsRouter(projectRepository));

  // Error handling
  app.use(errorHandler);

  return app;
}
