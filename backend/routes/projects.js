const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const projectController = require('../controllers/projectController');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const mimetype = allowed.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'));
    }
  },
});

// Middleware to process image
const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads', { recursive: true });
    }

    const filename = `project-${Date.now()}.webp`;
    const filepath = path.join('uploads', filename);

    // Resize and convert image using sharp
    await sharp(req.file.buffer)
      .resize(450, 350, {
        fit: 'cover',
        position: 'center',
      })
      .webp({ quality: 80 })
      .toFile(filepath);

    req.file.path = filepath;
    next();
  } catch (error) {
    next(error);
  }
};

// Routes
router.get('/', projectController.getAllProjects);
router.post('/', adminAuth, upload.single('image'), processImage, projectController.createProject);
router.get('/:id', projectController.getProject);
router.delete('/:id', adminAuth, projectController.deleteProject);

module.exports = router;
