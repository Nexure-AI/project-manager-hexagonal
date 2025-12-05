"""
Domain entities - Core business objects independent of frameworks.
"""
from datetime import datetime
from enum import Enum
from typing import Optional
from uuid import UUID, uuid4


class ProjectStatus(str, Enum):
    """Project status enumeration."""
    PLANNED = "PLANNED"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"


class Project:
    """
    Project entity - represents the core domain concept.
    
    This is a pure domain object with no dependencies on infrastructure
    or frameworks. It encapsulates business rules and validations.
    """
    
    def __init__(
        self,
        name: str,
        description: str,
        status: ProjectStatus,
        id: Optional[UUID] = None,
        created_at: Optional[datetime] = None,
    ):
        if not name or not name.strip():
            raise ValueError("Project name cannot be empty")
        
        if not description or not description.strip():
            raise ValueError("Project description cannot be empty")
        
        self.id = id or uuid4()
        self.name = name.strip()
        self.description = description.strip()
        self.status = status
        self.created_at = created_at or datetime.utcnow()
    
    def update(
        self,
        name: Optional[str] = None,
        description: Optional[str] = None,
        status: Optional[ProjectStatus] = None,
    ) -> None:
        """Update project fields with validation."""
        if name is not None:
            if not name.strip():
                raise ValueError("Project name cannot be empty")
            self.name = name.strip()
        
        if description is not None:
            if not description.strip():
                raise ValueError("Project description cannot be empty")
            self.description = description.strip()
        
        if status is not None:
            self.status = status
    
    def __repr__(self) -> str:
        return f"Project(id={self.id}, name='{self.name}', status={self.status})"
