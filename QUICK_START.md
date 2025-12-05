# Quick Start Guide
 
Get the Project Manager monorepo running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Python 3.11+ installed
- ✅ Node.js 18+ installed
- ✅ npm or yarn installed

## Option A: FastAPI + React (Recommended for first try)

### Step 1: Start FastAPI Backend

```bash
cd backend-fastapi

# Create and activate virtual environment
python -m venv venv

# On macOS/Linux:
source venv/bin/activate

# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn app.main:app --reload --port 8000
```

Expected output: `Uvicorn running on http://0.0.0.0:8000`

### Step 2: Start React Frontend

Open a new terminal:

```bash
cd frontend-react

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the development server
npm run dev
```

Expected output: `Local: http://localhost:5173/`

### Step 3: Open Your Browser

Navigate to: **http://localhost:5173**

You should see the Project Manager interface!

---

## Option B: Node.js + React

### Step 1: Start Node.js Backend

```bash
cd backend-node

# Install dependencies
npm install

# Start the development server
npm run dev
```

Expected output: `Server running on port 3000`

### Step 2: Start React Frontend

Open a new terminal:

```bash
cd frontend-react

# Install dependencies (if not already done)
npm install

# Edit .env to point to Node.js backend
echo "VITE_API_BASE_URL=http://localhost:3000" > .env

# Start the development server
npm run dev
```

Expected output: `Local: http://localhost:5173/`

### Step 3: Open Your Browser

Navigate to: **http://localhost:5173**

---

## Quick Test

Once everything is running:

1. Click "**+ New Project**" button
2. Fill in:
   - Name: "Test Project"
   - Description: "My first project"
   - Status: "Planned"
3. Click "**Create Project**"
4. Your project appears in the list!

Try editing, changing status, and deleting projects.

---

## Testing the Backends

### FastAPI Tests

```bash
cd backend-fastapi
pytest -v
```

### Manual API Testing

```bash
# Health check (FastAPI)
curl http://localhost:8000/health

# Health check (Node.js)
curl http://localhost:3000/health

# Create a project
curl -X POST http://localhost:8000/api/v1/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"API Test","description":"Testing via curl","status":"PLANNED"}'

# List all projects
curl http://localhost:8000/api/v1/projects
```

---

## Troubleshooting

### Port Already in Use

**Backend port conflict:**
- FastAPI: Change port in command: `uvicorn app.main:app --reload --port 8001`
- Node.js: Set in `.env` or change `config.ts`

**Frontend port conflict:**
- Vite usually auto-increments to 5174, 5175, etc.

### Module Not Found (Python)

Make sure virtual environment is activated:
```bash
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

### CORS Errors

Both backends are pre-configured for `localhost:5173`. If you change the frontend port, update:
- **FastAPI**: `backend-fastapi/app/core/config.py`
- **Node.js**: `backend-node/src/core/config.ts`

### TypeScript Errors (Node.js)

```bash
cd backend-node
npm install
# If still errors, try:
npm install --force
```

---

## API Documentation

### FastAPI (Swagger UI)

Visit: **http://localhost:8000/docs**

Interactive API documentation with try-it-now functionality!

### Node.js

No built-in docs, but endpoints are identical to FastAPI.

---

## Next Steps

1. ✅ Explore the code structure (see `FILE_STRUCTURE.md`)
2. ✅ Read the architecture documentation in main `README.md`
3. ✅ Modify a use case and see changes in action
4. ✅ Try switching between FastAPI and Node.js backends
5. ✅ Extend with your own features!

---

## Architecture Deep Dive

Want to understand the hexagonal architecture?

1. Start with: `backend-fastapi/app/domain/entities.py` (or `backend-node/src/domain/Project.ts`)
2. Then: Look at use cases in `application/` folder
3. Then: Check repository pattern in `infrastructure/`
4. Finally: See how HTTP is handled in `api/` folder

Each layer is independent and testable!

---

Happy coding! 🚀
