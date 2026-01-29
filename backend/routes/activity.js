const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// Get all activities for a client
router.get('/', activityController.getClientActivities);

// Get activities for a specific project
router.get('/project/:projectId', activityController.getProjectActivities);

// Get activity statistics
router.get('/stats', activityController.getActivityStats);

// Delete old activities (admin only)
router.delete('/cleanup', activityController.deleteOldActivities);

module.exports = router;
