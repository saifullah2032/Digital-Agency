const Subscription = require('../models/Subscription');

// Subscribe to newsletter
exports.subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address',
      });
    }

    const subscription = new Subscription({
      email: email.trim(),
    });

    await subscription.save();

    res.status(201).json({
      success: true,
      message: 'Subscribed successfully',
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

// Get all subscriptions
exports.getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find().sort({ subscribedAt: -1 });

    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

// Get single subscription
exports.getSubscription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found',
      });
    }

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

// Unsubscribe
exports.unsubscribe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findByIdAndDelete(id);

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Unsubscribed successfully',
    });
  } catch (error) {
    next(error);
  }
};
