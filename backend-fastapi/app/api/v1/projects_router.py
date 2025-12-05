"""
Projects API Router - Interface/API layer.

This module contains HTTP endpoints for project operations.
Controllers are kept thin - they handle HTTP concerns and delegate
business logic to use cases.
"""
from typing import List
from uuid import UUID

from fastapi import APIRouter, HTTPException, status, Depends

from app.domain.entities import Project
from app.domain.exceptions import ProjectNotFoundException
from app.schemas.project_schemas import (
    ProjectCreateRequest,
    ProjectUpdateRequest,
    ProjectResponse,
)
from app.application.use_cases.list_projects import ListProjectsUseCase
from app.application.use_cases.get_project import GetProjectUseCase
from app.application.use_cases.create_project import CreateProjectUseCase
from app.application.use_cases.update_project import UpdateProjectUseCase
from app.application.use_cases.delete_project import DeleteProjectUseCase
from app.infrastructure.repositories.project_repository import (
    ProjectRepository,
    InMemoryProjectRepository,
)


router = APIRouter(prefix="/api/v1/projects", tags=["projects"])


# Dependency injection - provides repository to endpoints
# In a real application, this would use a proper DI container
def get_repository() -> ProjectRepository:
    """
    Dependency that provides the project repository.
    
    In production, this would be configured to return the appropriate
    repository implementation (e.g., database-backed).
    """
    # For now, we use a singleton pattern for the in-memory repository
    if not hasattr(get_repository, "_instance"):
        get_repository._instance = InMemoryProjectRepository()
    return get_repository._instance


def _project_to_response(project: Project) -> ProjectResponse:
    """Helper to convert domain entity to response DTO."""
    return ProjectResponse(
        id=project.id,
        name=project.name,
        description=project.description,
        status=project.status,
        created_at=project.created_at,
    )


@router.get("", response_model=List[ProjectResponse], status_code=status.HTTP_200_OK)
def list_projects(repository: ProjectRepository = Depends(get_repository)):
    """
    List all projects.
    
    Returns projects sorted by creation date (newest first).
    """
    use_case = ListProjectsUseCase(repository)
    projects = use_case.execute()
    return [_project_to_response(p) for p in projects]


@router.get("/{project_id}", response_model=ProjectResponse, status_code=status.HTTP_200_OK)
def get_project(project_id: UUID, repository: ProjectRepository = Depends(get_repository)):
    """
    Get a specific project by ID.
    
    Args:
        project_id: The UUID of the project.
        
    Returns:
        The project details.
        
    Raises:
        404: If the project is not found.
    """
    use_case = GetProjectUseCase(repository)
    
    try:
        project = use_case.execute(project_id)
        return _project_to_response(project)
    except ProjectNotFoundException as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
def create_project(
    request: ProjectCreateRequest,
    repository: ProjectRepository = Depends(get_repository),
):
    """
    Create a new project.
    
    Args:
        request: Project creation data.
        
    Returns:
        The created project.
        
    Raises:
        400: If validation fails.
    """
    use_case = CreateProjectUseCase(repository)
    
    try:
        project = use_case.execute(
            name=request.name,
            description=request.description,
            status=request.status,
        )
        return _project_to_response(project)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.put("/{project_id}", response_model=ProjectResponse, status_code=status.HTTP_200_OK)
def update_project(
    project_id: UUID,
    request: ProjectUpdateRequest,
    repository: ProjectRepository = Depends(get_repository),
):
    """
    Update an existing project.
    
    Args:
        project_id: The UUID of the project to update.
        request: Update data (all fields optional).
        
    Returns:
        The updated project.
        
    Raises:
        404: If the project is not found.
        400: If validation fails.
    """
    use_case = UpdateProjectUseCase(repository)
    
    try:
        project = use_case.execute(
            project_id=project_id,
            name=request.name,
            description=request.description,
            status=request.status,
        )
        return _project_to_response(project)
    except ProjectNotFoundException as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    project_id: UUID,
    repository: ProjectRepository = Depends(get_repository),
):
    """
    Delete a project.
    
    Args:
        project_id: The UUID of the project to delete.
        
    Raises:
        404: If the project is not found.
    """
    use_case = DeleteProjectUseCase(repository)
    
    try:
        use_case.execute(project_id)
    except ProjectNotFoundException as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )
