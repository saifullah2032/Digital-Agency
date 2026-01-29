const Activity = require('../models/Activity');

// Get all activities for a client
exports.getClientActivities = async (req, res) => {
  try {
    const { email } = req.query;
    const { limit = 50, page = 1, projectId = null } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Client email is required',
      });
    }

    const skip = (page - 1) * limit;
    let query = { clientEmail: email };

    if (projectId) {
      query.projectId = projectId;
    }

    const activities = await Activity.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Activity.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        activities,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching activities',
      error: error.message,
    });
  }
};

// Get activities for a specific project
exports.getProjectActivities = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Client email is required',
      });
    }

    const activities = await Activity.find({
      clientEmail: email,
      projectId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (error) {
    console.error('Error fetching project activities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching project activities',
      error: error.message,
    });
  }
};

// Create activity (called by other routes)
exports.createActivity = async (activityData) => {
  try {
    const activity = new Activity({
      ...activityData,
      createdAt: new Date(),
    });
    await activity.save();
    return activity;
  } catch (error) {
    console.error('Error creating activity:', error);
    throw error;
  }
};

// Get activity statistics for dashboard
exports.getActivityStats = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Client email is required',
      });
    }

    const stats = {
      totalActivities: await Activity.countDocuments({ clientEmail: email }),
      lastWeek: await Activity.countDocuments({
        clientEmail: email,
        createdAt: {
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      }),
      byType: await Activity.aggregate([
        { $match: { clientEmail: email } },
        { $group: { _id: '$type', count: { $sum: 1 } } },
      ]),
      recentActivities: await Activity.find({ clientEmail: email })
        .sort({ createdAt: -1 })
        .limit(10),
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching activity stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching activity stats',
      error: error.message,
    });
  }
};

// Delete old activities (cleanup)
exports.deleteOldActivities = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const result = await Activity.deleteMany({ createdAt: { $lt: thirtyDaysAgo } });

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} old activities`,
    });
  } catch (error) {
    console.error('Error deleting old activities:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting old activities',
      error: error.message,
    });
  }
};
