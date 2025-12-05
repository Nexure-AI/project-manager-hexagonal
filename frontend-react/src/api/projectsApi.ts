/**
 * Projects API
 * 
 * Functions for interacting with the projects API.
 */

import { apiClient, ApiResponse } from './client';

export enum ProjectStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  status: ProjectStatus;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  status?: ProjectStatus;
}

export const projectsApi = {
  /**
   * Get all projects
   */
  getProjects: (): Promise<ApiResponse<Project[]>> => {
    return apiClient.get<Project[]>('/api/v1/projects');
  },

  /**
   * Get a single project by ID
   */
  getProject: (id: string): Promise<ApiResponse<Project>> => {
    return apiClient.get<Project>(`/api/v1/projects/${id}`);
  },

  /**
   * Create a new project
   */
  createProject: (project: CreateProjectRequest): Promise<ApiResponse<Project>> => {
    return apiClient.post<Project>('/api/v1/projects', project);
  },

  /**
   * Update an existing project
   */
  updateProject: (
    id: string,
    updates: UpdateProjectRequest
  ): Promise<ApiResponse<Project>> => {
    return apiClient.put<Project>(`/api/v1/projects/${id}`, updates);
  },

  /**
   * Delete a project
   */
  deleteProject: (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/api/v1/projects/${id}`);
  },
};
