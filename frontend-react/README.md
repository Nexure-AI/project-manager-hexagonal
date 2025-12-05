# Frontend - React (TypeScript)

A React frontend application that consumes the backend APIs.

## Features

- List, create, edit, and delete projects
- Update project status
- Clean, minimal UI
- TypeScript for type safety
- Built with Vite for fast development

## Setup

### Requirements

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` to point to your backend:

```env
# For FastAPI backend (default)
VITE_API_BASE_URL=http://localhost:8000

# For Node.js backend
# VITE_API_BASE_URL=http://localhost:3000
```

## Running the Application

```bash
# Development mode with hot reload
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
frontend-react/
├── src/
│   ├── api/              # API client and functions
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── App.tsx           # Main app component
│   ├── App.css           # Global styles
│   └── main.tsx          # Entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Using the Application

1. Make sure either the FastAPI or Node.js backend is running
2. Start the frontend development server
3. Open `http://localhost:5173` in your browser
4. Create, edit, and manage projects

## API Integration

The frontend can connect to either backend implementation:

- **FastAPI** (default): `http://localhost:8000`
- **Node.js**: `http://localhost:3000`

Change the `VITE_API_BASE_URL` in your `.env` file to switch backends.
