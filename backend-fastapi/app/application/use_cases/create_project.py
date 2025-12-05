"""
Create Project Use Case - Application layer.

Encapsulates the business logic for creating a new project.
"""
from app.domain.entities import Project, ProjectStatus
from app.infrastructure.repositories.project_repository import ProjectRepository


class CreateProjectUseCase:
    """
    Use case for creating a new project.
    
    This coordinates the creation of a project entity and its persistence.
    Domain validation happens in the Project entity itself.
    """
    
    def __init__(self, repository: ProjectRepository):
        self.repository = repository
    
    def execute(
        self,
        name: str,
        description: str,
        status: ProjectStatus = ProjectStatus.PLANNED,
    ) -> Project:
        """
        Execute the use case.
        
        Args:
            name: Project name.
            description: Project description.
            status: Project status (defaults to PLANNED).
            
        Returns:
            The newly created project.
            
        Raises:
            ValueError: If validation fails (handled by Project entity).
        """
        # Create the domain entity (domain validation happens here)
        project = Project(
            name=name,
            description=description,
            status=status,
        )
        
        # Persist the project
        return self.repository.save(project)
