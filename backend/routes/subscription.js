const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Routes
router.post('/', subscriptionController.subscribe);
router.get('/', adminAuth, subscriptionController.getAllSubscriptions);
router.get('/:id', adminAuth, subscriptionController.getSubscription);
router.delete('/:id', adminAuth, subscriptionController.unsubscribe);

module.exports = router;
