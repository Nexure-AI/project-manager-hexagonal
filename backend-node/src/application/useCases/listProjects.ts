/**
 * List Projects Use Case
 * 
 * Encapsulates the business logic for retrieving all projects.
 */

import { Project } from '../../domain/Project';
import { ProjectRepository } from '../../infrastructure/repositories/ProjectRepository';

export class ListProjectsUseCase {
  constructor(private readonly repository: ProjectRepository) {}

  async execute(): Promise<Project[]> {
    return this.repository.findAll();
  }
}
