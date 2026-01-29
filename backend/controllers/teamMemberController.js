const TeamMember = require('../models/TeamMember');
const ClientProject = require('../models/ClientProject');

// Get all team members
exports.getAll = async (req, res) => {
  try {
    const { role, status, projectId } = req.query;
    let query = {};

    if (role) query.role = role;
    if (status) query.status = status;

    let teamMembers = await TeamMember.find(query)
      .populate('assignedProjects', 'title')
      .sort({ joinDate: -1 });

    if (projectId) {
      teamMembers = teamMembers.filter(member =>
        member.assignedProjects.some(p => p._id.toString() === projectId)
      );
    }

    res.status(200).json({
      success: true,
      data: teamMembers,
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching team members',
      error: error.message,
    });
  }
};

// Get single team member
exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await TeamMember.findById(id)
      .populate('assignedProjects', 'title description');

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    res.status(200).json({
      success: true,
      data: teamMember,
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching team member',
      error: error.message,
    });
  }
};

// Create team member
exports.create = async (req, res) => {
  try {
    const { name, email, role, department, phone, bio, skills, assignedProjects } = req.body;

    // Check if email already exists
    const existingMember = await TeamMember.findOne({ email });
    if (existingMember) {
      return res.status(409).json({
        success: false,
        message: 'Team member with this email already exists',
      });
    }

    const teamMember = new TeamMember({
      name,
      email,
      role,
      department,
      phone,
      bio,
      skills: skills || [],
      assignedProjects: assignedProjects || [],
    });

    await teamMember.save();

    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: teamMember,
    });
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating team member',
      error: error.message,
    });
  }
};

// Update team member
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const teamMember = await TeamMember.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).populate('assignedProjects', 'title description');

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team member updated successfully',
      data: teamMember,
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating team member',
      error: error.message,
    });
  }
};

// Update permissions
exports.updatePermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const { permissions } = req.body;

    const teamMember = await TeamMember.findByIdAndUpdate(
      id,
      { permissions, updatedAt: new Date() },
      { new: true }
    );

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Permissions updated successfully',
      data: teamMember,
    });
  } catch (error) {
    console.error('Error updating permissions:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating permissions',
      error: error.message,
    });
  }
};

// Assign to project
exports.assignToProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectId } = req.body;

    const teamMember = await TeamMember.findById(id);
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    if (!teamMember.assignedProjects.includes(projectId)) {
      teamMember.assignedProjects.push(projectId);
      await teamMember.save();
    }

    await teamMember.populate('assignedProjects', 'title description');

    res.status(200).json({
      success: true,
      message: 'Team member assigned to project',
      data: teamMember,
    });
  } catch (error) {
    console.error('Error assigning team member:', error);
    res.status(500).json({
      success: false,
      message: 'Error assigning team member',
      error: error.message,
    });
  }
};

// Remove from project
exports.removeFromProject = async (req, res) => {
  try {
    const { id, projectId } = req.params;

    const teamMember = await TeamMember.findByIdAndUpdate(
      id,
      { $pull: { assignedProjects: projectId }, updatedAt: new Date() },
      { new: true }
    ).populate('assignedProjects', 'title description');

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team member removed from project',
      data: teamMember,
    });
  } catch (error) {
    console.error('Error removing team member:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing team member',
      error: error.message,
    });
  }
};

// Delete team member
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const teamMember = await TeamMember.findByIdAndDelete(id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team member deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting team member',
      error: error.message,
    });
  }
};

// Get team statistics
exports.getStats = async (req, res) => {
  try {
    const stats = {
      total: await TeamMember.countDocuments(),
      byRole: await TeamMember.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } },
      ]),
      byStatus: await TeamMember.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      active: await TeamMember.countDocuments({ status: 'active' }),
      onLeave: await TeamMember.countDocuments({ status: 'on_leave' }),
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching team statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching team statistics',
      error: error.message,
    });
  }
};
