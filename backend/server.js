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
const clientRouter = require('./routes/client');
const dashboardRouter = require('./routes/dashboard');
const activityRouter = require('./routes/activity');
const teamMembersRouter = require('./routes/teamMembers');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    process.env.FRONTEND_URL
  ].filter(Boolean),
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
app.use('/api/v1/client', clientRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/activities', activityRouter);
app.use('/api/v1/team-members', teamMembersRouter);

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
const server = app.listen(PORT, () => {
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

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received. Closing server gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});
