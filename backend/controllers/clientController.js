const Client = require('../models/Client');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// Get all clients
exports.getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new client
exports.createClient = async (req, res, next) => {
  try {
    const { name, designation, description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image',
      });
    }

    if (!name || !designation || !description) {
      if (req.file) {
        require('fs').unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Upload image to cloudinary
    const { url: imageUrl } = await uploadToCloudinary(req.file.path, 'digital-agency/clients');

    const client = new Client({
      name: name.trim(),
      designation: designation.trim(),
      description: description.trim(),
      imageUrl,
    });

    await client.save();

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: client,
    });
  } catch (error) {
    if (req.file && require('fs').existsSync(req.file.path)) {
      require('fs').unlinkSync(req.file.path);
    }
    next(error);
  }
};

// Get single client
exports.getClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
};

// Delete client
exports.deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Client deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
