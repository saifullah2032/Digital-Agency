// Admin authentication middleware
const adminAuth = (req, res, next) => {
  try {
    const adminToken = req.headers['x-admin-token'];
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!adminToken) {
      return res.status(401).json({
        success: false,
        message: 'Admin token is required',
      });
    }

    if (adminToken !== expectedPassword) {
      return res.status(403).json({
        success: false,
        message: 'Invalid admin credentials',
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: error.message,
    });
  }
};

module.exports = { adminAuth };
