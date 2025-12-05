"""
Tests for Projects API.

Uses FastAPI's TestClient to test the API endpoints without running a real server.
"""
import pytest
from fastapi.testclient import TestClient
from uuid import uuid4

from app.main import app
from app.api.v1.projects_router import get_repository
from app.infrastructure.repositories.project_repository import InMemoryProjectRepository


@pytest.fixture
def client():
    """Create a test client with a fresh repository for each test."""
    # Override the repository dependency with a fresh instance
    test_repo = InMemoryProjectRepository()
    app.dependency_overrides[get_repository] = lambda: test_repo
    
    with TestClient(app) as test_client:
        yield test_client
    
    # Clear overrides after test
    app.dependency_overrides.clear()


def test_health_check(client):
    """Test the health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_list_projects_empty(client):
    """Test listing projects when none exist."""
    response = client.get("/api/v1/projects")
    assert response.status_code == 200
    assert response.json() == []


def test_create_project(client):
    """Test creating a new project."""
    project_data = {
        "name": "Test Project",
        "description": "A test project description",
        "status": "PLANNED"
    }
    
    response = client.post("/api/v1/projects", json=project_data)
    assert response.status_code == 201
    
    data = response.json()
    assert data["name"] == project_data["name"]
    assert data["description"] == project_data["description"]
    assert data["status"] == project_data["status"]
    assert "id" in data
    assert "created_at" in data


def test_get_project(client):
    """Test retrieving a specific project."""
    # First create a project
    project_data = {
        "name": "Test Project",
        "description": "A test project description",
        "status": "IN_PROGRESS"
    }
    create_response = client.post("/api/v1/projects", json=project_data)
    project_id = create_response.json()["id"]
    
    # Now retrieve it
    response = client.get(f"/api/v1/projects/{project_id}")
    assert response.status_code == 200
    
    data = response.json()
    assert data["id"] == project_id
    assert data["name"] == project_data["name"]


def test_get_nonexistent_project(client):
    """Test retrieving a project that doesn't exist."""
    fake_id = str(uuid4())
    response = client.get(f"/api/v1/projects/{fake_id}")
    assert response.status_code == 404


def test_update_project(client):
    """Test updating an existing project."""
    # Create a project
    project_data = {
        "name": "Original Name",
        "description": "Original description",
        "status": "PLANNED"
    }
    create_response = client.post("/api/v1/projects", json=project_data)
    project_id = create_response.json()["id"]
    
    # Update it
    update_data = {
        "name": "Updated Name",
        "status": "IN_PROGRESS"
    }
    response = client.put(f"/api/v1/projects/{project_id}", json=update_data)
    assert response.status_code == 200
    
    data = response.json()
    assert data["name"] == "Updated Name"
    assert data["description"] == "Original description"  # Unchanged
    assert data["status"] == "IN_PROGRESS"


def test_delete_project(client):
    """Test deleting a project."""
    # Create a project
    project_data = {
        "name": "To Be Deleted",
        "description": "This project will be deleted",
        "status": "PLANNED"
    }
    create_response = client.post("/api/v1/projects", json=project_data)
    project_id = create_response.json()["id"]
    
    # Delete it
    response = client.delete(f"/api/v1/projects/{project_id}")
    assert response.status_code == 204
    
    # Verify it's gone
    get_response = client.get(f"/api/v1/projects/{project_id}")
    assert get_response.status_code == 404


def test_list_multiple_projects(client):
    """Test listing multiple projects."""
    # Create several projects
    for i in range(3):
        project_data = {
            "name": f"Project {i}",
            "description": f"Description {i}",
            "status": "PLANNED"
        }
        client.post("/api/v1/projects", json=project_data)
    
    # List all
    response = client.get("/api/v1/projects")
    assert response.status_code == 200
    assert len(response.json()) == 3


def test_create_project_with_invalid_data(client):
    """Test that creating a project with empty name fails."""
    project_data = {
        "name": "",  # Invalid - empty name
        "description": "Some description",
        "status": "PLANNED"
    }
    
    response = client.post("/api/v1/projects", json=project_data)
    assert response.status_code == 422  # Validation error
