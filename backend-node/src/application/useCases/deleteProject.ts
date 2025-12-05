/**
 * Delete Project Use Case
 * 
 * Encapsulates the business logic for deleting a project.
 */

import { ProjectRepository } from '../../infrastructure/repositories/ProjectRepository';

export class DeleteProjectUseCase {
  constructor(private readonly repository: ProjectRepository) {}

  async execute(projectId: string): Promise<void> {
    // The repository's delete method will throw ProjectNotFoundError
    // if the project doesn't exist
    await this.repository.delete(projectId);
  }
}
