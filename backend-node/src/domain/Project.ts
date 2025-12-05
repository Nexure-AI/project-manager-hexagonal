/**
 * Project Domain Entity
 * 
 * Core business object independent of frameworks and infrastructure.
 */

export enum ProjectStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class Project {
  public readonly id: string;
  public name: string;
  public description: string;
  public status: ProjectStatus;
  public readonly createdAt: Date;

  constructor(
    name: string,
    description: string,
    status: ProjectStatus,
    id?: string,
    createdAt?: Date
  ) {
    // Validation - domain rules enforced here
    if (!name || name.trim().length === 0) {
      throw new Error('Project name cannot be empty');
    }

    if (!description || description.trim().length === 0) {
      throw new Error('Project description cannot be empty');
    }

    this.id = id || this.generateId();
    this.name = name.trim();
    this.description = description.trim();
    this.status = status;
    this.createdAt = createdAt || new Date();
  }

  /**
   * Update project fields with validation.
   */
  public update(updates: {
    name?: string;
    description?: string;
    status?: ProjectStatus;
  }): void {
    if (updates.name !== undefined) {
      if (!updates.name.trim()) {
        throw new Error('Project name cannot be empty');
      }
      this.name = updates.name.trim();
    }

    if (updates.description !== undefined) {
      if (!updates.description.trim()) {
        throw new Error('Project description cannot be empty');
      }
      this.description = updates.description.trim();
    }

    if (updates.status !== undefined) {
      this.status = updates.status;
    }
  }

  /**
   * Generate a unique ID (simple UUID v4 implementation).
   */
  private generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
