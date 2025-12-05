"""
Get Project Use Case - Application layer.

Encapsulates the business logic for retrieving a single project by ID.
"""
from uuid import UUID

from app.domain.entities import Project
from app.domain.exceptions import ProjectNotFoundException
from app.infrastructure.repositories.project_repository import ProjectRepository


class GetProjectUseCase:
    """
    Use case for retrieving a specific project by ID.
    """
    
    def __init__(self, repository: ProjectRepository):
        self.repository = repository
    
    def execute(self, project_id: UUID) -> Project:
        """
        Execute the use case.
        
        Args:
            project_id: The UUID of the project to retrieve.
            
        Returns:
            The project with the given ID.
            
        Raises:
            ProjectNotFoundException: If the project doesn't exist.
        """
        project = self.repository.find_by_id(project_id)
        
        if project is None:
            raise ProjectNotFoundException(str(project_id))
        
        return project
