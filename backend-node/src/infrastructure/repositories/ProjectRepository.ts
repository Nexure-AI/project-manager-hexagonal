/**
 * Project Repository Interface (Port)
 * 
 * Defines the contract for project persistence without coupling
 * to any specific storage implementation.
 */

import { Project } from '../domain/Project';

export interface ProjectRepository {
  /**
   * Retrieve all projects.
   */
  findAll(): Promise<Project[]>;

  /**
   * Find a project by its ID.
   */
  findById(projectId: string): Promise<Project | null>;

  /**
   * Save a new project or update an existing one.
   */
  save(project: Project): Promise<Project>;

  /**
   * Delete a project by its ID.
   */
  delete(projectId: string): Promise<void>;

  /**
   * Check if a project exists.
   */
  exists(projectId: string): Promise<boolean>;
}
