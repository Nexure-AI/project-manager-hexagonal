"""
Domain-specific exceptions.
"""


class DomainException(Exception):
    """Base exception for domain errors."""
    pass


class ProjectNotFoundException(DomainException):
    """Raised when a project is not found."""
    
    def __init__(self, project_id: str):
        self.project_id = project_id
        super().__init__(f"Project with id '{project_id}' not found")


class ProjectAlreadyExistsException(DomainException):
    """Raised when attempting to create a project that already exists."""
    
    def __init__(self, project_id: str):
        self.project_id = project_id
        super().__init__(f"Project with id '{project_id}' already exists")
