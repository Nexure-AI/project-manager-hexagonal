"""
Application configuration.

Centralizes configuration settings that might come from
environment variables or config files.
"""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings."""
    
    # API Settings
    app_name: str = "Project Manager API"
    app_version: str = "1.0.0"
    api_v1_prefix: str = "/api/v1"
    
    # CORS Settings
    cors_origins: list[str] = [
        "http://localhost:5173",  # Vite default port
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "https://nexure-ai.github.io",
    ]
    
    # Database Settings (for future use)
    # database_url: str = "sqlite:///./projects.db"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()
