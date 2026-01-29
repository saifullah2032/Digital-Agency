const express = require('express');
const contactController = require('../controllers/contactController');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Routes
router.post('/', contactController.submitContact);
router.get('/', adminAuth, contactController.getAllContacts);
router.get('/:id', adminAuth, contactController.getContact);
router.delete('/:id', adminAuth, contactController.deleteContact);

module.exports = router;
