# Argus PV Safety Training - Frontend

Modern React-based user interface for the Pharmacovigilance application.

## Features
- User authentication and registration
- Safety monitoring dashboard with analytics
- Case entry and management
- Adverse event reporting
- MedDRA coding interface
- Advanced case search and filtering
- Responsive Material-UI design

## Setup

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Development Server
```bash
npm start
```

The application will run on `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## Project Structure
- `src/pages/` - Main application pages
- `src/components/` - Reusable React components
- `src/services/` - API service layer
- `src/context/` - React Context for state management
- `public/` - Static assets

## Technologies
- React 18
- Material-UI (MUI)
- React Router
- Axios
- Formik & Yup for form handling
- Chart.js for visualizations
