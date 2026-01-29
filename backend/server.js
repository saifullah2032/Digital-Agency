const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
require('express-async-errors');

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const projectsRouter = require('./routes/projects');
const clientsRouter = require('./routes/clients');
const contactRouter = require('./routes/contact');
const subscriptionRouter = require('./routes/subscription');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve uploads folder as static
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/v1/projects', projectsRouter);
app.use('/api/v1/clients', clientsRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/subscribe', subscriptionRouter);

// 404 Not Found
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║     Digital Agency Backend Server Running                 ║
║     Server: http://localhost:${PORT}                    ║
║     Environment: ${process.env.NODE_ENV || 'development'}                    ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
