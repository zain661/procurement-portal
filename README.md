# Procurement Portal

A full-stack Catalog Management application built with the MEAN stack using Nx monorepo.

## Live Demo

- **Frontend**: https://frontend-748526391537.us-central1.run.app
- **Backend API**: https://backend-748526391537.us-central1.run.app

## Tech Stack

- **Monorepo**: Nx.dev
- **Frontend**: Angular 21 + NgRx (state management)
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Deployment**: Google Cloud Run (GCP)

## Features

- ✅ Sign up, Sign in, Sign out
- ✅ JWT authentication (8-hour sessions)
- ✅ Protected routes (redirects unauthenticated users)
- ✅ Catalog page with loading, empty, and error states
- ✅ Search/filter catalog items by title, category, description
- ✅ Create new catalog items with form validation
- ✅ Automatic list update after item creation
- ✅ MongoDB Atlas integration
- ✅ Docker setup
- ✅ CI/CD pipeline with GitHub Actions
- ✅ Deployment to GCP Cloud Run

## Project Structure
```
procurement-portal/
├── frontend/                      # Angular app
│   ├── src/app/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   │   └── auth.service.ts    # Auth logic + JWT storage
│   │   │   └── guards/
│   │   │       └── auth.guard.ts      # Route protection
│   │   ├── store/                     # NgRx state management
│   │   │   ├── items.actions.ts
│   │   │   ├── items.reducer.ts
│   │   │   ├── items.effects.ts
│   │   │   └── items.selectors.ts
│   │   └── pages/
│   │       ├── login/                 # Login page
│   │       ├── signup/                # Signup page
│   │       └── catalog/               # Protected catalog page
│   └── src/environments/
│       ├── environment.ts             # Development config
│       └── environment.prod.ts        # Production config
├── backend/                       # Express API
│   └── src/
│       ├── config/
│       │   └── db.ts                  # MongoDB connection
│       ├── models/
│       │   ├── user.model.ts          # User schema
│       │   └── item.model.ts          # CatalogItem schema
│       ├── routes/
│       │   ├── auth.routes.ts         # /auth/signup, /auth/signin
│       │   └── items.routes.ts        # /items GET, POST
│       └── middleware/
│           └── auth.middleware.ts     # JWT verification
├── .github/
│   └── workflows/
│       ├── ci.yml                     # Build + Lint pipeline
│       └── cd.yml                     # Deploy to GCP pipeline
├── backend/Dockerfile
├── frontend/Dockerfile
└── docker-compose.yml
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- MongoDB Atlas account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zain661/procurement-portal.git
cd procurement-portal
```

2. Install dependencies:
```bash
npm install
```

3. Create `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/procurement?appName=Cluster0
JWT_SECRET=your_jwt_secret_here
PORT=3333
```

### Running Locally

**Backend** (PowerShell):
```powershell
$env:MONGODB_URI="your_mongodb_uri"
$env:JWT_SECRET="your_jwt_secret"
$env:PORT="3333"
npx nx build backend
node dist/backend/main.js
```

**Frontend**:
```bash
npx nx serve frontend
```

Open `http://localhost:4200`

### Running with Docker
```bash
docker-compose up --build
```

Open `http://localhost:80`

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /auth/signup | Register new user | No |
| POST | /auth/signin | Login user | No |
| GET | /items | Get all catalog items | Yes |
| POST | /items | Create new catalog item | Yes |

## Data Models

**User:**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "passwordHash": "string",
  "createdAt": "date"
}
```

**CatalogItem:**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "category": "string",
  "price": "number",
  "createdBy": "User",
  "createdAt": "date"
}
```

## CI/CD Pipeline

### CI (on every push)
- **Build job**: Builds frontend and backend
- **Style job**: Checks formatting (Prettier) and linting (ESLint)

### CD (on push to main)
- **Deploy Backend**: Builds Docker image → pushes to GCP Artifact Registry → deploys to Cloud Run
- **Deploy Frontend**: Builds Docker image → pushes to GCP Artifact Registry → deploys to Cloud Run

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB Atlas connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `PORT` | Backend server port (default: 3333) | No |

## Assumptions

- Sessions persist for 8 hours via JWT token expiry
- MongoDB Atlas is used as the cloud database
- Frontend runs on port 4200 in development, port 80 in Docker
- Backend runs on port 3333 in development
- Production frontend uses GCP Cloud Run URL for API calls
- Authentication uses Bearer token in Authorization header