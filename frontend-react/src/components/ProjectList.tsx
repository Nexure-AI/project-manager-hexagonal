/**
 * ProjectList Component
 * 
 * Displays a list of projects with actions.
 */

import React from 'react';
import { Project, ProjectStatus } from '../api/projectsApi';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: ProjectStatus) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onEdit,
  onDelete,
  onUpdateStatus,
}) => {
  const getStatusBadgeClass = (status: ProjectStatus): string => {
    switch (status) {
      case ProjectStatus.PLANNED:
        return 'status-badge status-planned';
      case ProjectStatus.IN_PROGRESS:
        return 'status-badge status-in-progress';
      case ProjectStatus.DONE:
        return 'status-badge status-done';
      default:
        return 'status-badge';
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <p>No projects yet. Create your first project to get started!</p>
      </div>
    );
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <div key={project.id} className="project-card">
          <div className="project-header">
            <h3>{project.name}</h3>
            <span className={getStatusBadgeClass(project.status)}>
              {project.status.replace('_', ' ')}
            </span>
          </div>

          <p className="project-description">{project.description}</p>

          <div className="project-meta">
            <span className="project-date">Created: {formatDate(project.createdAt)}</span>
          </div>

          <div className="project-actions">
            <select
              value={project.status}
              onChange={(e) =>
                onUpdateStatus(project.id, e.target.value as ProjectStatus)
              }
              className="status-select"
            >
              <option value={ProjectStatus.PLANNED}>Planned</option>
              <option value={ProjectStatus.IN_PROGRESS}>In Progress</option>
              <option value={ProjectStatus.DONE}>Done</option>
            </select>

            <button
              className="btn btn-small btn-secondary"
              onClick={() => onEdit(project)}
            >
              Edit
            </button>

            <button
              className="btn btn-small btn-danger"
              onClick={() => {
                if (confirm(`Delete project "${project.name}"?`)) {
                  onDelete(project.id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
