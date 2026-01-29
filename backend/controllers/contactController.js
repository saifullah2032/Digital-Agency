const Contact = require('../models/Contact');

// Submit contact form
exports.submitContact = async (req, res, next) => {
  try {
    const { fullName, email, mobileNumber, city } = req.body;

    const contact = new Contact({
      fullName: fullName?.trim(),
      email: email?.trim(),
      mobileNumber: mobileNumber?.trim(),
      city: city?.trim(),
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// Get all contact submissions
exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

// Get single contact
exports.getContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// Delete contact
exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
