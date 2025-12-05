/**
 * Create Project Use Case
 * 
 * Encapsulates the business logic for creating a new project.
 */

import { Project, ProjectStatus } from '../../domain/Project';
import { ProjectRepository } from '../../infrastructure/repositories/ProjectRepository';

export class CreateProjectUseCase {
  constructor(private readonly repository: ProjectRepository) {}

  async execute(
    name: string,
    description: string,
    status: ProjectStatus = ProjectStatus.PLANNED
  ): Promise<Project> {
    // Create the domain entity (domain validation happens here)
    const project = new Project(name, description, status);

    // Persist the project
    return this.repository.save(project);
  }
}
