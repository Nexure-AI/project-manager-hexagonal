/**
 * Get Project Use Case
 * 
 * Encapsulates the business logic for retrieving a single project by ID.
 */

import { Project } from '../../domain/Project';
import { ProjectNotFoundError } from '../../domain/DomainError';
import { ProjectRepository } from '../../infrastructure/repositories/ProjectRepository';

export class GetProjectUseCase {
  constructor(private readonly repository: ProjectRepository) {}

  async execute(projectId: string): Promise<Project> {
    const project = await this.repository.findById(projectId);

    if (!project) {
      throw new ProjectNotFoundError(projectId);
    }

    return project;
  }
}
