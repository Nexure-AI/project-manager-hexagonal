/**
 * Domain-specific errors
 */

export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ProjectNotFoundError extends DomainError {
  constructor(public readonly projectId: string) {
    super(`Project with id '${projectId}' not found`);
  }
}

export class ProjectAlreadyExistsError extends DomainError {
  constructor(public readonly projectId: string) {
    super(`Project with id '${projectId}' already exists`);
  }
}
