"""
List Projects Use Case - Application layer.

Encapsulates the business logic for retrieving all projects.
"""
from typing import List

from app.domain.entities import Project
from app.infrastructure.repositories.project_repository import ProjectRepository


class ListProjectsUseCase:
    """
    Use case for listing all projects.
    
    Follows the single responsibility principle - this class has one job:
    coordinate the retrieval of all projects.
    """
    
    def __init__(self, repository: ProjectRepository):
        self.repository = repository
    
    def execute(self) -> List[Project]:
        """
        Execute the use case.
        
        Returns:
            List of all projects, typically sorted by creation date.
        """
        return self.repository.find_all()
