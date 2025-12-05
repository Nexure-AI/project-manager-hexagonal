"""
Update Project Use Case - Application layer.

Encapsulates the business logic for updating an existing project.
"""
from typing import Optional
from uuid import UUID

from app.domain.entities import Project, ProjectStatus
from app.domain.exceptions import ProjectNotFoundException
from app.infrastructure.repositories.project_repository import ProjectRepository


class UpdateProjectUseCase:
    """
    Use case for updating an existing project.
    
    This retrieves the project, applies updates using domain logic,
    and persists the changes.
    """
    
    def __init__(self, repository: ProjectRepository):
        self.repository = repository
    
    def execute(
        self,
        project_id: UUID,
        name: Optional[str] = None,
        description: Optional[str] = None,
        status: Optional[ProjectStatus] = None,
    ) -> Project:
        """
        Execute the use case.
        
        Args:
            project_id: The UUID of the project to update.
            name: New name (optional).
            description: New description (optional).
            status: New status (optional).
            
        Returns:
            The updated project.
            
        Raises:
            ProjectNotFoundException: If the project doesn't exist.
            ValueError: If validation fails.
        """
        # Retrieve the existing project
        project = self.repository.find_by_id(project_id)
        
        if project is None:
            raise ProjectNotFoundException(str(project_id))
        
        # Update using domain logic (validation happens in entity)
        project.update(name=name, description=description, status=status)
        
        # Persist the changes
        return self.repository.save(project)
