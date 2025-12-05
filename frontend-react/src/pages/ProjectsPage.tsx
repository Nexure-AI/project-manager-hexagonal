/**
 * ProjectsPage Component
 * 
 * Main page for managing projects.
 */

import React, { useState, useEffect } from 'react';
import {
  Project,
  ProjectStatus,
  projectsApi,
  CreateProjectRequest,
} from '../api/projectsApi';
import { ProjectList } from '../components/ProjectList';
import { ProjectForm } from '../components/ProjectForm';

type ViewMode = 'list' | 'create' | 'edit';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load projects on mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    setError(null);

    const response = await projectsApi.getProjects();

    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setProjects(response.data);
    }

    setIsLoading(false);
  };

  const handleCreateProject = async (data: CreateProjectRequest) => {
    setIsLoading(true);
    setError(null);

    const response = await projectsApi.createProject(data);

    if (response.error) {
      setError(response.error);
    } else {
      await loadProjects();
      setViewMode('list');
    }

    setIsLoading(false);
  };

  const handleUpdateProject = async (data: CreateProjectRequest) => {
    if (!selectedProject) return;

    setIsLoading(true);
    setError(null);

    const response = await projectsApi.updateProject(selectedProject.id, data);

    if (response.error) {
      setError(response.error);
    } else {
      await loadProjects();
      setViewMode('list');
      setSelectedProject(null);
    }

    setIsLoading(false);
  };

  const handleDeleteProject = async (id: string) => {
    setError(null);

    const response = await projectsApi.deleteProject(id);

    if (response.error) {
      setError(response.error);
    } else {
      await loadProjects();
    }
  };

  const handleUpdateStatus = async (id: string, status: ProjectStatus) => {
    setError(null);

    const response = await projectsApi.updateProject(id, { status });

    if (response.error) {
      setError(response.error);
    } else {
      await loadProjects();
    }
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setViewMode('edit');
  };

  const handleCancel = () => {
    setViewMode('list');
    setSelectedProject(null);
    setError(null);
  };

  return (
    <div className="projects-page">
      {error && (
        <div className="error-banner">
          <p>❌ {error}</p>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {viewMode === 'list' && (
        <>
          <div className="page-header">
            <h2>Projects</h2>
            <button
              className="btn btn-primary"
              onClick={() => setViewMode('create')}
            >
              + New Project
            </button>
          </div>

          {isLoading ? (
            <div className="loading">Loading projects...</div>
          ) : (
            <ProjectList
              projects={projects}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              onUpdateStatus={handleUpdateStatus}
            />
          )}
        </>
      )}

      {viewMode === 'create' && (
        <>
          <div className="page-header">
            <h2>Create New Project</h2>
          </div>
          <ProjectForm
            onSubmit={handleCreateProject}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </>
      )}

      {viewMode === 'edit' && selectedProject && (
        <>
          <div className="page-header">
            <h2>Edit Project</h2>
          </div>
          <ProjectForm
            project={selectedProject}
            onSubmit={handleUpdateProject}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};
