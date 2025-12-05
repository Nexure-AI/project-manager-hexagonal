"""
Delete Project Use Case - Application layer.

Encapsulates the business logic for deleting a project.
"""
from uuid import UUID

from app.domain.exceptions import ProjectNotFoundException
from app.infrastructure.repositories.project_repository import ProjectRepository


class DeleteProjectUseCase:
    """
    Use case for deleting a project.
    
    Coordinates the removal of a project from persistence.
    """
    
    def __init__(self, repository: ProjectRepository):
        self.repository = repository
    
    def execute(self, project_id: UUID) -> None:
        """
        Execute the use case.
        
        Args:
            project_id: The UUID of the project to delete.
            
        Raises:
            ProjectNotFoundException: If the project doesn't exist.
        """
        # The repository's delete method will raise ProjectNotFoundException
        # if the project doesn't exist
        self.repository.delete(project_id)
