"""
Pydantic schemas for API request/response models.

These act as DTOs (Data Transfer Objects) at the API boundary,
separate from domain entities.
"""
from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field

from app.domain.entities import ProjectStatus


class ProjectBase(BaseModel):
    """Base schema with common project fields."""
    name: str = Field(..., min_length=1, max_length=200, description="Project name")
    description: str = Field(..., min_length=1, max_length=2000, description="Project description")
    status: ProjectStatus = Field(..., description="Project status")


class ProjectCreateRequest(ProjectBase):
    """Schema for creating a new project."""
    status: ProjectStatus = Field(default=ProjectStatus.PLANNED, description="Initial project status")


class ProjectUpdateRequest(BaseModel):
    """Schema for updating an existing project. All fields are optional."""
    name: Optional[str] = Field(None, min_length=1, max_length=200, description="New project name")
    description: Optional[str] = Field(None, min_length=1, max_length=2000, description="New project description")
    status: Optional[ProjectStatus] = Field(None, description="New project status")


class ProjectResponse(ProjectBase):
    """Schema for project response."""
    id: UUID = Field(..., description="Project unique identifier")
    created_at: datetime = Field(..., description="Project creation timestamp")
    
    class Config:
        from_attributes = True  # Allows creation from ORM models or dataclasses


class HealthResponse(BaseModel):
    """Schema for health check response."""
    status: str = Field(..., description="Service health status")
