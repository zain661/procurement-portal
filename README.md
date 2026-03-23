# Procurement Portal

A full-stack Catalog Management application built with the MEAN stack (MongoDB, Express, Angular, Node.js) using Nx monorepo.

## Tech Stack

- **Monorepo**: Nx.dev
- **Frontend**: Angular 21 + NgRx (state management)
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **CI/CD**: GitHub Actions
- **Containerization**: Docker

## Features

- ✅ Sign up, Sign in, Sign out
- ✅ JWT authentication (8-hour sessions)
- ✅ Protected routes (redirects unauthenticated users)
- ✅ Catalog page with loading, empty, and error states
- ✅ Search/filter catalog items
- ✅ Create new catalog items (form with validation)
- ✅ Automatic list update after item creation
- ✅ MongoDB Atlas integration
- ✅ Docker setup
- ✅ CI/CD pipeline with GitHub Actions

## Project Structure
```
procurement-portal/
├── frontend/          # Angular app
│   └── src/app/
│       ├── core/      # Auth service, guards
│       ├── store/     # NgRx actions, reducer, effects, selectors
│       └── pages/     # Login, Signup, Catalog pages
├── backend/           # Express API
│   └── src/
│       ├── config/    # MongoDB connection
│       ├── models/    # User, CatalogItem schemas
│       ├── routes/    # Auth, Items endpoints
│       └── middleware/# JWT auth middleware
└── .github/workflows/ # CI/CD pipeline
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- MongoDB Atlas account (or local MongoDB)

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

3. Set up environment variables — create `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/procurement?appName=Cluster0
JWT_SECRET=your_jwt_secret_here
PORT=3333
```

### Running the App

**Backend:**
```powershell
# Windows
$env:MONGODB_URI="your_mongodb_uri"
$env:JWT_SECRET="your_jwt_secret"
$env:PORT="3333"
npx nx build backend
node dist/backend/main.js
```

**Frontend:**
```bash
npx nx serve frontend
```

Then open `http://localhost:4200`

### Running with Docker
```bash
docker-compose up --build
```

Then open `http://localhost:80`

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /auth/signup | Register new user | No |
| POST | /auth/signin | Login user | No |
| GET | /items | Get all items | Yes |
| POST | /items | Create new item | Yes |

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

## Assumptions

- Sessions persist for 8 hours via JWT expiry
- MongoDB Atlas is used as the cloud database
- The frontend runs on port 4200 in development, port 80 in Docker
- The backend runs on port 3333

## CI/CD

GitHub Actions runs on every push to `main` or `develop`:
- **Build job**: Builds frontend and backend
- **Style job**: Checks formatting (Prettier) and linting (ESLint)