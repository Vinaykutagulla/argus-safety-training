# Argus PV Safety Training - Development Guide

## Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- Git
- npm or yarn

## Local Development Setup

### Option 1: Manual Setup (Recommended for Development)

#### Backend Setup
1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update MongoDB connection in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/argus-pv
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
```

5. Start MongoDB locally or use MongoDB Atlas

6. Run development server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

#### Frontend Setup
1. In a new terminal, navigate to frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

### Option 2: Docker Setup (Recommended for Production-like Environment)

1. Make sure Docker and Docker Compose are installed

2. From project root:
```bash
docker-compose up
```

This will:
- Start MongoDB on port 27017
- Start backend on port 5000
- Start frontend on port 3000

### Option 3: Docker Individual Services

#### Start MongoDB
```bash
docker run -d -p 27017:27017 --name argus-mongo mongo
```

#### Build Backend Image
```bash
docker build -t argus-backend ./backend
docker run -p 5000:5000 --env-file backend/.env argus-backend
```

#### Build Frontend Image
```bash
docker build -t argus-frontend ./frontend
docker run -p 3000:3000 argus-frontend
```

## Database Seeding

To seed the database with sample data:

```bash
# From backend directory
npm run seed
```

## API Testing

### Using Postman
1. Import API endpoints from backend README
2. Use JWT token from login endpoint for authenticated requests

### Using cURL
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Get token from response and use for subsequent requests
```

## Development Tips

### Debugging Backend
- Use `console.log()` or install node debugger
- Check logs in terminal where `npm run dev` is running
- MongoDB queries are logged via Mongoose

### Debugging Frontend
- Use React Developer Tools browser extension
- Chrome DevTools (F12)
- Check Network tab for API requests

### Code Style
- Backend: Follow Express.js conventions
- Frontend: Follow React best practices and Material-UI patterns

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in `.env`
- For Atlas, whitelist IP address

### CORS Error
- Ensure backend is running on http://localhost:5000
- Check REACT_APP_API_URL in frontend `.env`
- Backend already has CORS enabled

### Port Already in Use
```bash
# Find process on port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### npm Dependencies Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Frontend Folder Structure

```
src/
├── pages/           # Full page components
│   ├── Login.js
│   ├── Dashboard.js
│   ├── CaseEntry.js
│   ├── CaseSearch.js
│   ├── CaseDetails.js
│   └── MedDRACoding.js
├── components/      # Reusable components
│   ├── Navigation.js
│   └── PrivateRoute.js
├── services/        # API integration
│   └── api.js
├── context/         # Global state
│   └── AuthContext.js
├── App.js          # Main component
└── index.js        # Entry point
```

## Backend Folder Structure

```
src/
├── server.js              # Express entry point
├── config/
│   └── database.js
├── models/
│   ├── User.js
│   ├── Case.js
│   ├── AdverseEvent.js
│   └── MedDRA.js
├── controllers/
│   ├── authController.js
│   ├── caseController.js
│   ├── adverseEventController.js
│   ├── meddraController.js
│   └── dashboardController.js
├── routes/
│   ├── authRoutes.js
│   ├── caseRoutes.js
│   ├── adverseEventRoutes.js
│   ├── meddraRoutes.js
│   └── dashboardRoutes.js
└── middleware/
    └── auth.js
```

## Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

## Environment Configuration

### Development
- Use `NODE_ENV=development`
- MongoDB local or Atlas dev instance
- Looser validation, more logging

### Production
- Set `NODE_ENV=production`
- Use strong JWT_SECRET
- Enable HTTPS
- Configure proper database replicas
- Set up error tracking (Sentry, etc.)

## Documentation

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB/Mongoose Documentation](https://mongoosejs.com/)
- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
