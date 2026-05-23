# Argus PV Project File Index

## Root Level Files
- `README.md` - Main project documentation and overview
- `DEVELOPMENT.md` - Development setup and local environment guide
- `DEPLOYMENT.md` - Production deployment guide
- `PROJECT_COMPLETION_SUMMARY.md` - Detailed summary of what was built
- `docker-compose.yml` - Docker Compose for full stack
- `quick-start.bat` - Windows quick start script
- `quick-start.sh` - Mac/Linux quick start script
- `.gitignore` - Git ignore rules

## Backend Directory (`/backend`)

### Configuration Files
- `package.json` - Dependencies and scripts
- `.env` - Environment variables (local development)
- `.env.example` - Environment template
- `Dockerfile` - Docker build configuration
- `.gitignore` - Backend specific git ignore
- `README.md` - Backend documentation

### Source Code (`/src`)
- `server.js` - Express server entry point

#### Config (`/src/config`)
- `database.js` - MongoDB connection

#### Models (`/src/models`)
- `User.js` - User schema
- `Case.js` - Pharmacovigilance case schema
- `AdverseEvent.js` - Adverse event schema
- `MedDRA.js` - MedDRA code schema

#### Controllers (`/src/controllers`)
- `authController.js` - Authentication logic
- `caseController.js` - Case management logic
- `adverseEventController.js` - Adverse event logic
- `meddraController.js` - MedDRA code logic
- `dashboardController.js` - Dashboard statistics logic

#### Routes (`/src/routes`)
- `authRoutes.js` - Auth endpoints
- `caseRoutes.js` - Case endpoints
- `adverseEventRoutes.js` - Adverse event endpoints
- `meddraRoutes.js` - MedDRA endpoints
- `dashboardRoutes.js` - Dashboard endpoints

#### Middleware (`/src/middleware`)
- `auth.js` - JWT authentication & authorization

### Scripts (`/scripts)
- `seedDatabase.js` - Database seeding script for sample data

## Frontend Directory (`/frontend`)

### Configuration Files
- `package.json` - Dependencies and scripts
- `.env` - Environment variables (local development)
- `.env.example` - Environment template
- `Dockerfile` - Docker build configuration
- `tsconfig.json` - TypeScript configuration
- `.gitignore` - Frontend specific git ignore
- `README.md` - Frontend documentation

### Public Directory (`/public`)
- `index.html` - Main HTML file

### Source Code (`/src`)
- `App.js` - Main React component with routing
- `index.js` - React DOM entry point
- `index.css` - Global styles

#### Pages (`/src/pages)
- `Login.js` - Login page
- `Register.js` - User registration page
- `Dashboard.js` - Safety monitoring dashboard
- `CaseEntry.js` - New case entry form
- `CaseSearch.js` - Case search and list
- `CaseDetails.js` - Case details and adverse events
- `MedDRACoding.js` - MedDRA code search interface

#### Components (`/src/components)
- `Navigation.js` - Main navigation bar
- `PrivateRoute.js` - Protected route wrapper

#### Services (`/src/services)
- `api.js` - Axios HTTP client and API services

#### Context (`/src/context)
- `AuthContext.js` - Global authentication context

## GitHub Directory (`/.github`)
- `copilot-instructions.md` - Project instructions for AI assistants

---

## Summary Statistics

### Backend
- 1 Server file
- 1 Config file
- 4 Model files
- 5 Controller files
- 5 Route files
- 1 Middleware file
- 1 Seed script
- **Total: 18 backend source files**

### Frontend
- 1 App entry point
- 6 Page components
- 2 UI components
- 1 API service file
- 1 Context provider
- **Total: 11 frontend source files**

### Configuration
- 2 package.json files
- 2 .env files + 2 .env.example files
- 2 Dockerfile files
- 1 docker-compose.yml
- 2 .gitignore files
- 1 tsconfig.json
- **Total: 11 configuration files**

### Documentation
- 1 Main README
- 1 Backend README
- 1 Frontend README
- 1 Development guide
- 1 Deployment guide
- 1 Project completion summary
- 1 File index (this file)
- **Total: 7 documentation files**

### Scripts
- 1 Backend seed script
- 1 Windows quick start
- 1 Mac/Linux quick start
- **Total: 3 script files**

## File Counts by Category

| Category | Count |
|----------|-------|
| Backend Source | 18 |
| Frontend Source | 11 |
| Configuration | 11 |
| Documentation | 7 |
| Scripts | 3 |
| **TOTAL** | **50+** |

## Technology References

### Backend Technologies
- Express.js (Web framework)
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- bcryptjs (Password hashing)

### Frontend Technologies
- React 18 (UI library)
- Material-UI (Component library)
- React Router (Navigation)
- Axios (HTTP client)
- Formik & Yup (Form handling)
- Chart.js (Data visualization)

### DevOps
- Docker (Containerization)
- Docker Compose (Container orchestration)
- Git (Version control)

## API Endpoints Reference

### Authentication: 3 endpoints
### Cases: 5 endpoints
### Adverse Events: 4 endpoints
### MedDRA: 3 endpoints
### Dashboard: 3 endpoints
**Total: 20 API endpoints**

## Database Collections

1. **users** - User accounts and roles
2. **cases** - Pharmacovigilance cases
3. **adverseevents** - Adverse event reports
4. **meddras** - MedDRA code database

## User Roles

1. Admin - Full system access
2. Pharmacist - Case and event management
3. Physician - Case creation and reporting
4. Viewer - Read-only access

---

**Project Generated**: April 30, 2026
**Status**: ✅ Complete and Ready for Use
