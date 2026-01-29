const ClientProject = require('../models/ClientProject');
const Message = require('../models/Message');
const File = require('../models/File');
const Client = require('../models/Client');
const { sendEmail, emailTemplates } = require('../config/email');

// Get client projects
exports.getClientProjects = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Client email is required',
      });
    }

    const projects = await ClientProject.find({ clientEmail: email }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Error fetching client projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
      error: error.message,
    });
  }
};

// Get client messages
exports.getClientMessages = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Client email is required',
      });
    }

    const messages = await Message.find({ clientEmail: email }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
      error: error.message,
    });
  }
};

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const { clientEmail, subject, message, sender, senderName } = req.body;

    if (!clientEmail || !subject || !message || !sender || !senderName) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const newMessage = await Message.create({
      clientEmail,
      subject,
      message,
      sender,
      senderName,
    });

    // Send email notification
    if (sender === 'admin') {
      const emailContent = emailTemplates.newMessage(
        clientEmail.split('@')[0],
        subject,
        senderName
      );
      await sendEmail({
        to: clientEmail,
        ...emailContent,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage,
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message,
    });
  }
};

// Mark message as read
exports.markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark message as read',
      error: error.message,
    });
  }
};

// Get client files
exports.getClientFiles = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Client email is required',
      });
    }

    const files = await File.find({ clientEmail: email }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: files.length,
      data: files,
    });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch files',
      error: error.message,
    });
  }
};

// Upload file
exports.uploadFile = async (req, res) => {
  try {
    const { clientEmail, fileName, fileUrl, fileType, fileSize, uploadedBy, uploadedByName, description } = req.body;

    if (!clientEmail || !fileName || !fileUrl || !fileType || !fileSize || !uploadedBy || !uploadedByName) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
      });
    }

    const newFile = await File.create({
      clientEmail,
      fileName,
      fileUrl,
      fileType,
      fileSize,
      uploadedBy,
      uploadedByName,
      description,
    });

    // Send email notification
    if (uploadedBy === 'admin') {
      const emailContent = emailTemplates.fileUploaded(
        clientEmail.split('@')[0],
        fileName,
        uploadedByName
      );
      await sendEmail({
        to: clientEmail,
        ...emailContent,
      });
    }

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: newFile,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload file',
      error: error.message,
    });
  }
};

// Delete file
exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findByIdAndDelete(id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    res.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete file',
      error: error.message,
    });
  }
};

// Get client dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Client email is required',
      });
    }

    const [projects, messages, files] = await Promise.all([
      ClientProject.countDocuments({ clientEmail: email, status: { $ne: 'completed' } }),
      Message.countDocuments({ clientEmail: email, read: false }),
      File.countDocuments({ clientEmail: email }),
    ]);

    // Get unique team members
    const projectsData = await ClientProject.find({ clientEmail: email });
    const teamMembers = new Set();
    projectsData.forEach(project => {
      project.team?.forEach(member => teamMembers.add(member.name));
    });

    res.json({
      success: true,
      data: {
        activeProjects: projects,
        unreadMessages: messages,
        totalFiles: files,
        teamMembers: teamMembers.size,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
      error: error.message,
    });
  }
};

// Send welcome email to new client
exports.sendWelcomeEmail = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email and name are required',
      });
    }

    const emailContent = emailTemplates.welcome(name);
    const result = await sendEmail({
      to: email,
      ...emailContent,
    });

    res.json({
      success: result.success,
      message: result.success ? 'Welcome email sent successfully' : 'Failed to send email',
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send welcome email',
      error: error.message,
    });
  }
};

// Get all clients (testimonials)
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: clients.length,
      data: clients,
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch clients',
      error: error.message,
    });
  }
};

// Get client by ID
exports.getClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    res.json({
      success: true,
      data: client,
    });
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch client',
      error: error.message,
    });
  }
};

// Create client
exports.createClient = async (req, res) => {
  try {
    const { name, designation, description, imageUrl } = req.body;

    if (!name || !designation || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name, designation, and description are required',
      });
    }

    const newClient = await Client.create({
      name,
      designation,
      description,
      imageUrl: imageUrl || 'https://i.pravatar.cc/150?img=1',
    });

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: newClient,
    });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create client',
      error: error.message,
    });
  }
};

// Delete client
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    res.json({
      success: true,
      message: 'Client deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete client',
      error: error.message,
    });
  }
};
