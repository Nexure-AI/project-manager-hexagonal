/**
 * ProjectForm Component
 * 
 * Form for creating and editing projects.
 */

import React, { useState } from 'react';
import { Project, ProjectStatus } from '../api/projectsApi';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: {
    name: string;
    description: string;
    status: ProjectStatus;
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const [status, setStatus] = useState<ProjectStatus>(
    project?.status || ProjectStatus.PLANNED
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, status });
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <div className="form-group">
        <label htmlFor="name">Project Name *</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
          placeholder="Enter project name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          disabled={isLoading}
          placeholder="Enter project description"
          rows={4}
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as ProjectStatus)}
          disabled={isLoading}
        >
          <option value={ProjectStatus.PLANNED}>Planned</option>
          <option value={ProjectStatus.IN_PROGRESS}>In Progress</option>
          <option value={ProjectStatus.DONE}>Done</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
        </button>
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
