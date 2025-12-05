/**
 * Update Project Use Case
 * 
 * Encapsulates the business logic for updating an existing project.
 */

import { Project, ProjectStatus } from '../../domain/Project';
import { ProjectNotFoundError } from '../../domain/DomainError';
import { ProjectRepository } from '../../infrastructure/repositories/ProjectRepository';

export class UpdateProjectUseCase {
  constructor(private readonly repository: ProjectRepository) {}

  async execute(
    projectId: string,
    updates: {
      name?: string;
      description?: string;
      status?: ProjectStatus;
    }
  ): Promise<Project> {
    // Retrieve the existing project
    const project = await this.repository.findById(projectId);

    if (!project) {
      throw new ProjectNotFoundError(projectId);
    }

    // Update using domain logic (validation happens in entity)
    project.update(updates);

    // Persist the changes
    return this.repository.save(project);
  }
}
