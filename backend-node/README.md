# Backend - Node.js (TypeScript)

A Node.js/TypeScript backend implementing hexagonal architecture with Express.

## Architecture

This backend follows hexagonal (ports & adapters) architecture:

- **Domain Layer** (`src/domain/`): Core business logic and entities
- **Application Layer** (`src/application/`): Use cases orchestrating business operations
- **Infrastructure Layer** (`src/infrastructure/`): External concerns (repositories, database)
- **API Layer** (`src/api/`): HTTP interface (Express routers)

## Setup

### Requirements

- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

## Running the Application

```bash
# Development mode with auto-reload
npm run dev
```

The API will be available at `http://localhost:3000`

### Build and Run Production

```bash
# Build TypeScript to JavaScript
npm run build

# Run the compiled code
npm start
```

## Endpoints

- `GET /health` - Health check
- `GET /api/v1/projects` - List all projects
- `GET /api/v1/projects/:id` - Get project by ID
- `POST /api/v1/projects` - Create new project
- `PUT /api/v1/projects/:id` - Update project
- `DELETE /api/v1/projects/:id` - Delete project

## Project Structure

```
backend-node/
├── src/
│   ├── api/routes/       # HTTP routes and controllers
│   ├── application/      # Use cases (business operations)
│   ├── core/             # Configuration
│   ├── domain/           # Entities and domain logic
│   ├── infrastructure/   # Repositories and external services
│   ├── app.ts            # Express app configuration
│   └── server.ts         # Server entry point
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Testing the API

You can test the API using curl:

```bash
# Health check
curl http://localhost:3000/health

# List projects
curl http://localhost:3000/api/v1/projects

# Create a project
curl -X POST http://localhost:3000/api/v1/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Project","description":"A test","status":"PLANNED"}'
```
