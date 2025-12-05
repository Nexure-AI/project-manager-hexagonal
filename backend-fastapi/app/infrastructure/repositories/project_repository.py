"""
Project repository - Infrastructure layer.

Defines the repository interface (port) and provides an in-memory implementation.
This can be easily swapped with a database implementation later.
"""
from abc import ABC, abstractmethod
from typing import List, Optional
from uuid import UUID

from app.domain.entities import Project
from app.domain.exceptions import ProjectNotFoundException, ProjectAlreadyExistsException


class ProjectRepository(ABC):
    """
    Abstract repository interface (Port).
    
    This defines the contract for project persistence without
    coupling to any specific storage implementation.
    """
    
    @abstractmethod
    def find_all(self) -> List[Project]:
        """Retrieve all projects."""
        pass
    
    @abstractmethod
    def find_by_id(self, project_id: UUID) -> Optional[Project]:
        """Find a project by its ID."""
        pass
    
    @abstractmethod
    def save(self, project: Project) -> Project:
        """Save a new project or update an existing one."""
        pass
    
    @abstractmethod
    def delete(self, project_id: UUID) -> None:
        """Delete a project by its ID."""
        pass
    
    @abstractmethod
    def exists(self, project_id: UUID) -> bool:
        """Check if a project exists."""
        pass


class InMemoryProjectRepository(ProjectRepository):
    """
    In-memory implementation of ProjectRepository.
    
    Simple implementation for demonstration. In production, this would
    be replaced with a database-backed repository (e.g., SQLAlchemy).
    """
    
    def __init__(self):
        self._projects: dict[UUID, Project] = {}
    
    def find_all(self) -> List[Project]:
        """Return all projects sorted by creation date."""
        return sorted(
            self._projects.values(),
            key=lambda p: p.created_at,
            reverse=True
        )
    
    def find_by_id(self, project_id: UUID) -> Optional[Project]:
        """Find project by ID, return None if not found."""
        return self._projects.get(project_id)
    
    def save(self, project: Project) -> Project:
        """
        Save a project. If it already exists, update it.
        In a real implementation, this might be split into separate
        create/update methods.
        """
        self._projects[project.id] = project
        return project
    
    def delete(self, project_id: UUID) -> None:
        """
        Delete a project. Raises ProjectNotFoundException if not found.
        """
        if project_id not in self._projects:
            raise ProjectNotFoundException(str(project_id))
        
        del self._projects[project_id]
    
    def exists(self, project_id: UUID) -> bool:
        """Check if a project with given ID exists."""
        return project_id in self._projects
