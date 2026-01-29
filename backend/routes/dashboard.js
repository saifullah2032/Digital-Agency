const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { adminAuth } = require('../middleware/auth');

// All dashboard routes require admin authentication
router.use(adminAuth);

// Dashboard stats
router.get('/stats', dashboardController.getAdminStats);

// Contacts and subscribers
router.get('/contacts', dashboardController.getAllContacts);
router.get('/subscribers', dashboardController.getAllSubscribers);

module.exports = router;
