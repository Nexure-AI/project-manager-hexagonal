/**
 * Projects API Router
 * 
 * HTTP endpoints for project operations. Controllers are kept thin -
 * they handle HTTP concerns and delegate business logic to use cases.
 */

import { Router, Request, Response, NextFunction } from 'express';
import { ProjectRepository } from '../../infrastructure/repositories/ProjectRepository';
import { ListProjectsUseCase } from '../../application/useCases/listProjects';
import { GetProjectUseCase } from '../../application/useCases/getProject';
import { CreateProjectUseCase } from '../../application/useCases/createProject';
import { UpdateProjectUseCase } from '../../application/useCases/updateProject';
import { DeleteProjectUseCase } from '../../application/useCases/deleteProject';
import { ProjectNotFoundError } from '../../domain/DomainError';
import { ProjectStatus } from '../../domain/Project';

export function createProjectsRouter(repository: ProjectRepository): Router {
  const router = Router();

  /**
   * List all projects
   */
  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const useCase = new ListProjectsUseCase(repository);
      const projects = await useCase.execute();

      res.json(
        projects.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description,
          status: p.status,
          createdAt: p.createdAt.toISOString(),
        }))
      );
    } catch (error) {
      next(error);
    }
  });

  /**
   * Get a specific project by ID
   */
  router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const useCase = new GetProjectUseCase(repository);
      const project = await useCase.execute(req.params.id);

      res.json({
        id: project.id,
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt.toISOString(),
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * Create a new project
   */
  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, description, status = ProjectStatus.PLANNED } = req.body;

      // Basic validation
      if (!name || !description) {
        return res.status(400).json({
          error: 'Name and description are required',
        });
      }

      const useCase = new CreateProjectUseCase(repository);
      const project = await useCase.execute(name, description, status);

      res.status(201).json({
        id: project.id,
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt.toISOString(),
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * Update an existing project
   */
  router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, description, status } = req.body;
      const updates: any = {};

      if (name !== undefined) updates.name = name;
      if (description !== undefined) updates.description = description;
      if (status !== undefined) updates.status = status;

      const useCase = new UpdateProjectUseCase(repository);
      const project = await useCase.execute(req.params.id, updates);

      res.json({
        id: project.id,
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt.toISOString(),
      });
    } catch (error) {
      next(error);
    }
  });

  /**
   * Delete a project
   */
  router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const useCase = new DeleteProjectUseCase(repository);
      await useCase.execute(req.params.id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  return router;
}

/**
 * Error handling middleware for domain errors
 */
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ProjectNotFoundError) {
    return res.status(404).json({ error: error.message });
  }

  // Generic error for validation and other domain errors
  if (error.message.includes('cannot be empty')) {
    return res.status(400).json({ error: error.message });
  }

  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
}
