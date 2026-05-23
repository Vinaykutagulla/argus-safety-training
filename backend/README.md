# Argus PV Safety Training - Backend API

Express.js backend API for the Pharmacovigilance application with MongoDB integration.

## Features
- RESTful API endpoints
- JWT authentication and authorization
- Role-based access control (RBAC)
- Case management system
- Adverse event tracking
- MedDRA code database
- Safety monitoring analytics
- MongoDB with Mongoose ODM

## Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/argus-pv
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
```

### Development Server
```bash
npm run dev
```

The API will run on `http://localhost:5000`

### Production
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires auth)

### Cases
- `GET /api/cases` - List all cases (paginated)
- `GET /api/cases/search` - Search cases
- `GET /api/cases/:id` - Get case details
- `POST /api/cases` - Create new case
- `PUT /api/cases/:id` - Update case

### Adverse Events
- `GET /api/adverse-events/case/:caseId` - Get events for a case
- `POST /api/adverse-events` - Create adverse event
- `PUT /api/adverse-events/:id` - Update event
- `DELETE /api/adverse-events/:id` - Delete event

### MedDRA
- `GET /api/meddra/search` - Search MedDRA codes
- `GET /api/meddra/code/:code` - Get MedDRA details
- `GET /api/meddra/socs/list` - Get system organ classes

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/timeline` - Get cases timeline
- `GET /api/dashboard/adverse-events-report` - Get AE report

## Project Structure
- `src/server.js` - Express app entry point
- `src/config/` - Configuration files (database)
- `src/models/` - Mongoose schemas
- `src/controllers/` - Route handlers
- `src/routes/` - API route definitions
- `src/middleware/` - Custom middleware (auth, etc.)

## Technologies
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Default Roles
- `admin` - Full system access
- `pharmacist` - Case and event management
- `physician` - Case creation and reporting
- `viewer` - Read-only access
