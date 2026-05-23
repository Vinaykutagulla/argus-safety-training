const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/authRoutes');
const caseRoutes = require('./routes/caseRoutes');
const adverseEventRoutes = require('./routes/adverseEventRoutes');
const meddraRoutes = require('./routes/meddraRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/adverse-events', adverseEventRoutes);
app.use('/api/meddra', meddraRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
