import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CaseEntry from './pages/CaseEntry';
import CaseSearch from './pages/CaseSearch';
import CaseDetails from './pages/CaseDetails';
import MedDRACoding from './pages/MedDRACoding';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <Navigation />
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/cases/new" element={<CaseEntry />} />
                    <Route path="/cases" element={<CaseSearch />} />
                    <Route path="/cases/:id" element={<CaseDetails />} />
                    <Route path="/meddra" element={<MedDRACoding />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
