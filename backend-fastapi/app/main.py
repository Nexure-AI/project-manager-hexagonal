"""
FastAPI Application Entry Point.

This module initializes and configures the FastAPI application,
sets up middleware, and registers routers.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.v1.projects_router import router as projects_router
from app.schemas.project_schemas import HealthResponse


# Create FastAPI application instance
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="A showcase of hexagonal architecture with FastAPI",
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthResponse, tags=["health"])
def health_check():
    """
    Health check endpoint.
    
    Returns the service status. Useful for monitoring and container orchestration.
    """
    return HealthResponse(status="ok")


# Register routers
app.include_router(projects_router)


if __name__ == "__main__":
    import uvicorn
    
    # Run the application
    # For development only - in production, use: uvicorn app.main:app
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
