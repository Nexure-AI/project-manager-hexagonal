# Backend - FastAPI

A Python backend implementing hexagonal architecture with FastAPI.

## Architecture

This backend follows hexagonal (ports & adapters) architecture:

- **Domain Layer** (`app/domain/`): Core business logic and entities
- **Application Layer** (`app/application/`): Use cases orchestrating business operations
- **Infrastructure Layer** (`app/infrastructure/`): External concerns (repositories, database)
- **API Layer** (`app/api/`): HTTP interface (FastAPI routers)

## Setup

### Requirements

- Python 3.11+
- pip

### Installation

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Running the Application

```bash
# Development mode with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or using Python directly
python -m app.main
```

The API will be available at `http://localhost:8000`

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Endpoints

- `GET /health` - Health check
- `GET /api/v1/projects` - List all projects
- `GET /api/v1/projects/{id}` - Get project by ID
- `POST /api/v1/projects` - Create new project
- `PUT /api/v1/projects/{id}` - Update project
- `DELETE /api/v1/projects/{id}` - Delete project

## Running Tests

```bash
pytest
```

For verbose output:
```bash
pytest -v
```

## Project Structure

```
backend-fastapi/
├── app/
│   ├── api/v1/           # API routes and controllers
│   ├── application/      # Use cases (business operations)
│   ├── core/             # Configuration
│   ├── domain/           # Entities and domain logic
│   ├── infrastructure/   # Repositories and external services
│   ├── schemas/          # Pydantic models for I/O
│   └── main.py           # Application entry point
├── tests/                # Test suite
└── requirements.txt      # Python dependencies
```
