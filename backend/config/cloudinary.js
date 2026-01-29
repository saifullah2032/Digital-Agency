const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload file to cloudinary
const uploadToCloudinary = async (filePath, folder = 'digital-agency') => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto',
      width: 450,
      height: 350,
      crop: 'fill',
      quality: 'auto',
    });

    // Delete local file after upload
    fs.unlinkSync(filePath);

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    // Clean up file if it exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};

// Delete file from cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error.message);
  }
};

module.exports = { uploadToCloudinary, deleteFromCloudinary };
