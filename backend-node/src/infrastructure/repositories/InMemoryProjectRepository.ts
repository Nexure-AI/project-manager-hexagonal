/**
 * In-Memory Project Repository Implementation
 * 
 * Simple implementation for demonstration. In production, this would
 * be replaced with a database-backed repository.
 */

import { Project } from '../../domain/Project';
import { ProjectNotFoundError } from '../../domain/DomainError';
import { ProjectRepository } from './ProjectRepository';

export class InMemoryProjectRepository implements ProjectRepository {
  private projects: Map<string, Project> = new Map();

  async findAll(): Promise<Project[]> {
    // Return projects sorted by creation date (newest first)
    return Array.from(this.projects.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async findById(projectId: string): Promise<Project | null> {
    return this.projects.get(projectId) || null;
  }

  async save(project: Project): Promise<Project> {
    this.projects.set(project.id, project);
    return project;
  }

  async delete(projectId: string): Promise<void> {
    if (!this.projects.has(projectId)) {
      throw new ProjectNotFoundError(projectId);
    }
    this.projects.delete(projectId);
  }

  async exists(projectId: string): Promise<boolean> {
    return this.projects.has(projectId);
  }
}
