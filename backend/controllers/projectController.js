const Project = require('../models/Project');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// Get all projects
exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new project
exports.createProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image',
      });
    }

    if (!title || !description) {
      if (req.file) {
        require('fs').unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'Please provide title and description',
      });
    }

    // Upload image to cloudinary
    const { url: imageUrl } = await uploadToCloudinary(req.file.path, 'digital-agency/projects');

    const project = new Project({
      title: title.trim(),
      description: description.trim(),
      imageUrl,
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  } catch (error) {
    if (req.file && require('fs').existsSync(req.file.path)) {
      require('fs').unlinkSync(req.file.path);
    }
    next(error);
  }
};

// Get single project
exports.getProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// Delete project
exports.deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
