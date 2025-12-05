# Project Manager - Hexagonal Architecture Monorepo

A showcase of **hexagonal (clean) architecture** with two backend implementations and a React frontend.

This repository demonstrates:
- ✅ Clean separation of concerns (domain, application, infrastructure, API layers)
- ✅ **Two backend implementations**: FastAPI (Python) and Node.js (TypeScript)
- ✅ A React frontend that can connect to either backend
- ✅ Production-ready structure and patterns
- ✅ Full CRUD operations for a simple project management system

## 📁 Repository Structure

```
project-manager-monorepo/
├── backend-fastapi/      # Python backend with FastAPI
├── backend-node/         # Node.js backend with TypeScript
├── frontend-react/       # React frontend with TypeScript
└── README.md            # This file
```

## 🏗️ Architecture Overview

Both backends follow **hexagonal (ports & adapters) architecture**:

```
┌─────────────────────────────────────────────┐
│           API Layer (HTTP)                  │
│  FastAPI / Express Routes & Controllers     │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│     Application Layer (Use Cases)           │
│  Business logic orchestration               │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         Domain Layer (Entities)             │
│  Pure business logic & domain rules         │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│    Infrastructure Layer (Repositories)      │
│  Data persistence & external services       │
└─────────────────────────────────────────────┘
```

### Key Principles

1. **Domain Layer**: Pure business logic, no framework dependencies
2. **Application Layer**: Use cases orchestrate domain objects
3. **Infrastructure Layer**: Implements ports (interfaces) for external concerns
4. **API Layer**: Thin controllers that delegate to use cases

## 📋 Domain Model

**Entity**: Project
- `id` (UUID/string)
- `name` (string)
- `description` (string)
- `status` (enum: PLANNED, IN_PROGRESS, DONE)
- `created_at` (datetime)

**Operations**:
- List all projects
- Get project by ID
- Create project
- Update project
- Delete project

## 🚀 Getting Started

### Prerequisites

- **For FastAPI backend**: Python 3.11+
- **For Node.js backend**: Node.js 20+
- **For React frontend**: Node.js 18+

### Quick Start

Choose one backend to run, then start the frontend:

#### Option 1: FastAPI Backend

```bash
# Terminal 1 - Start FastAPI backend
cd backend-fastapi
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Terminal 2 - Start React frontend
cd frontend-react
npm install
cp .env.example .env  # Configure API URL
npm run dev
```

#### Option 2: Node.js Backend

```bash
# Terminal 1 - Start Node.js backend
cd backend-node
npm install
npm run dev

# Terminal 2 - Start React frontend
cd frontend-react
npm install
# Edit .env to use: VITE_API_BASE_URL=http://localhost:3000
npm run dev
```

Then open `http://localhost:5173` in your browser.

## 🔧 Backend Details

### FastAPI Backend (`backend-fastapi/`)

**Tech Stack**:
- FastAPI for web framework
- Pydantic for validation
- In-memory repository (easily swappable with SQLAlchemy)
- pytest for testing

**Key Files**:
- `app/domain/entities.py` - Project entity & Status enum
- `app/application/use_cases/` - Business operations
- `app/infrastructure/repositories/` - Repository interface & implementation
- `app/api/v1/projects_router.py` - HTTP endpoints
- `app/main.py` - Application entry point

**Run**:
```bash
cd backend-fastapi
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Test**:
```bash
pytest
```

**API Documentation**: `http://localhost:8000/docs`

### Node.js Backend (`backend-node/`)

**Tech Stack**:
- Express for web framework
- TypeScript for type safety
- In-memory repository
- Clean architecture pattern

**Key Files**:
- `src/domain/Project.ts` - Project entity & Status enum
- `src/application/useCases/` - Business operations
- `src/infrastructure/repositories/` - Repository interface & implementation
- `src/api/routes/projectsRouter.ts` - HTTP endpoints
- `src/server.ts` - Application entry point

**Run**:
```bash
cd backend-node
npm install
npm run dev
```

**API Base**: `http://localhost:3000`

## 🎨 Frontend Details

### React Frontend (`frontend-react/`)

**Tech Stack**:
- React 18 with TypeScript
- Vite for build tooling
- Fetch API for HTTP requests
- Clean component architecture

**Key Files**:
- `src/api/` - API client and type definitions
- `src/components/` - Reusable UI components
- `src/pages/ProjectsPage.tsx` - Main application page
- `src/App.tsx` - Root component

**Configuration**:

The frontend can connect to either backend by changing the `.env` file:

```env
# For FastAPI (default)
VITE_API_BASE_URL=http://localhost:8000

# For Node.js
VITE_API_BASE_URL=http://localhost:3000
```

**Run**:
```bash
cd frontend-react
npm install
npm run dev
```

**Access**: `http://localhost:5173`

## 📚 API Endpoints

Both backends expose identical REST APIs:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/v1/projects` | List all projects |
| GET | `/api/v1/projects/{id}` | Get project by ID |
| POST | `/api/v1/projects` | Create new project |
| PUT | `/api/v1/projects/{id}` | Update project |
| DELETE | `/api/v1/projects/{id}` | Delete project |

## 🧪 Testing

### FastAPI Tests

```bash
cd backend-fastapi
pytest -v
```

### Manual API Testing

```bash
# Health check
curl http://localhost:8000/health

# Create a project
curl -X POST http://localhost:8000/api/v1/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Project",
    "description": "Project description",
    "status": "PLANNED"
  }'

# List projects
curl http://localhost:8000/api/v1/projects
```

## 🎯 Why Hexagonal Architecture?

This architecture provides:

1. **Testability**: Domain logic can be tested without frameworks
2. **Flexibility**: Easy to swap infrastructure (e.g., change databases)
3. **Maintainability**: Clear separation of concerns
4. **Scalability**: Each layer can evolve independently
5. **Clean Code**: Business logic is not polluted with technical details

## 📖 Learning Resources

- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Ports and Adapters Pattern](https://herbertograca.com/2017/09/14/ports-adapters-architecture/)

## 🤝 Contributing

This is a demonstration repository. Feel free to:
- Fork it for your own learning
- Use it as a template for new projects
- Adapt the architecture to your needs

## 📝 License

MIT License - feel free to use this code in your projects.

## 🎓 Notes for Learners

This repository is intentionally kept simple to focus on architecture patterns:

- **In-memory repositories**: Easy to understand, but would be database-backed in production
- **No authentication**: Would add JWT/OAuth in real applications
- **Minimal error handling**: Production apps need comprehensive error handling
- **No logging**: Production systems need structured logging
- **Single entity**: Real apps have multiple entities with relationships

The goal is to showcase **clean architecture principles**, not every production feature.

---

Built with ❤️ to demonstrate hexagonal architecture patterns.
