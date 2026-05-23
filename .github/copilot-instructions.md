# Argus PV Safety Training Application

Full-stack MERN pharmacovigilance application with case entry, adverse event reporting, MedDRA coding, case search, and safety monitoring dashboard.

## Project Structure
- **Backend**: Node.js + Express API with MongoDB
- **Frontend**: React with Material-UI
- **Database**: MongoDB with Mongoose ODM

## Key Features
1. User authentication and role-based access control
2. Case entry and management
3. Adverse event reporting
4. MedDRA coding interface
5. Advanced case search and filtering
6. Safety monitoring dashboard with analytics
7. Reporting and export functionality

## Development Status
- [x] Project scaffolding
- [x] Backend setup (Express + MongoDB + Models + Controllers + Routes)
- [x] Frontend setup (React + Material-UI + Components + Pages)
- [x] Database configuration and models
- [x] API development (20 endpoints)
- [x] UI components and pages
- [x] Authentication and authorization
- [x] Documentation (README, Development, Deployment guides)
- [ ] Testing (unit and integration tests)
- [ ] Production deployment

## Quick Start

### Option 1: Quick Start Script (Recommended)
```bash
# Windows
quick-start.bat

# Mac/Linux  
bash quick-start.sh
```

### Option 2: Manual Setup
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (new terminal)
cd frontend && npm install && npm start
```

### Option 3: Docker
```bash
docker-compose up
```

## Default Credentials
- Email: admin@argus.com
- Password: demo123

## Documentation
- See [README.md](../../README.md) for overview
- See [DEVELOPMENT.md](../../DEVELOPMENT.md) for development guide
- See [DEPLOYMENT.md](../../DEPLOYMENT.md) for deployment guide
- See [backend/README.md](../../backend/README.md) for API documentation
- See [frontend/README.md](../../frontend/README.md) for frontend guide

## Stack
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Frontend**: React, React Router, Material-UI, Axios, Chart.js
- **DevOps**: Docker, Docker Compose, Git

## Next Steps
1. Run `quick-start.bat` (Windows) or `bash quick-start.sh` (Mac/Linux)
2. Start MongoDB locally or use MongoDB Atlas
3. Run `npm run seed` in backend to populate sample data
4. Start backend: `cd backend && npm run dev`
5. Start frontend: `cd frontend && npm start`
6. Access application at http://localhost:3000
