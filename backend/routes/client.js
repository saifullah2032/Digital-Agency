const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Dashboard stats
router.get('/stats', clientController.getDashboardStats);

// Projects
router.get('/projects', clientController.getClientProjects);

// Messages
router.get('/messages', clientController.getClientMessages);
router.post('/messages', clientController.sendMessage);
router.patch('/messages/:id/read', clientController.markMessageAsRead);

// Files
router.get('/files', clientController.getClientFiles);
router.post('/files', clientController.uploadFile);
router.delete('/files/:id', clientController.deleteFile);

// Email notifications
router.post('/welcome-email', clientController.sendWelcomeEmail);

module.exports = router;
