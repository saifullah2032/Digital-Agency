const express = require('express');
const router = express.Router();
const teamMemberController = require('../controllers/teamMemberController');

// Get all team members with filters
router.get('/', teamMemberController.getAll);

// Get team statistics
router.get('/stats', teamMemberController.getStats);

// Get single team member
router.get('/:id', teamMemberController.getOne);

// Create team member
router.post('/', teamMemberController.create);

// Update team member
router.patch('/:id', teamMemberController.update);

// Update permissions
router.patch('/:id/permissions', teamMemberController.updatePermissions);

// Assign to project
router.post('/:id/assign-project', teamMemberController.assignToProject);

// Remove from project
router.delete('/:id/project/:projectId', teamMemberController.removeFromProject);

// Delete team member
router.delete('/:id', teamMemberController.delete);

module.exports = router;
