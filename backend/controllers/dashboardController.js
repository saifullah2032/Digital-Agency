const Project = require('../models/Project');
const Client = require('../models/Client');
const Contact = require('../models/Contact');
const Subscription = require('../models/Subscription');
const Message = require('../models/Message');
const File = require('../models/File');
const ClientProject = require('../models/ClientProject');

// Get dashboard overview stats
exports.getAdminStats = async (req, res) => {
  try {
    // Get counts for all collections
    const [projectCount, clientCount, contactCount, subscriptionCount, messageCount, fileCount, clientProjectCount] = await Promise.all([
      Project.countDocuments(),
      Client.countDocuments(),
      Contact.countDocuments(),
      Subscription.countDocuments(),
      Message.countDocuments(),
      File.countDocuments(),
      ClientProject.countDocuments(),
    ]);

    // Get recent contacts (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    // Get recent subscribers (last 7 days)
    const recentSubscribers = await Subscription.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    // Get project status distribution
    const projectsByStatus = await Project.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get client projects status distribution
    const clientProjectsByStatus = await ClientProject.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get contacts trend (last 30 days)
    const contactsTrend = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Get subscribers trend (last 30 days)
    const subscribersTrend = await Subscription.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Get top clients by testimonial rating
    const topClients = await Client.find()
      .sort({ rating: -1 })
      .limit(5)
      .select('name company rating testimonial');

    // Get unread messages count
    const unreadMessages = await Message.countDocuments({ read: false });

    res.json({
      success: true,
      data: {
        overview: {
          totalProjects: projectCount,
          totalClients: clientCount,
          totalContacts: contactCount,
          totalSubscribers: subscriptionCount,
          totalMessages: messageCount,
          totalFiles: fileCount,
          clientProjects: clientProjectCount,
          unreadMessages,
          recentContacts,
          recentSubscribers,
        },
        projectStatus: projectsByStatus || [],
        clientProjectStatus: clientProjectsByStatus || [],
        contactsTrend: contactsTrend || [],
        subscribersTrend: subscribersTrend || [],
        topClients: topClients || [],
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin statistics',
      error: error.message,
    });
  }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: error.message,
    });
  }
};

// Get all subscribers
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscription.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscribers',
      error: error.message,
    });
  }
};
