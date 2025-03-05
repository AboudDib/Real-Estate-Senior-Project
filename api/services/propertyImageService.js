const { PropertyImage } = require('../models/propertyImage');

// Add Image to Property
exports.addImage = async (image_url, property_id) => {
  try {
    const image = await PropertyImage.create({
      image_url,
      property_id,
    });
    return image;
  } catch (error) {
    throw new Error('Failed to add image: ' + error.message);
  }
};

// Get Images by Property ID
exports.getImagesByProperty = async (propertyId) => {
  try {
    const images = await PropertyImage.findAll({
      where: { property_id: propertyId },
    });
    return images;
  } catch (error) {
    throw new Error('Failed to retrieve images: ' + error.message);
  }
};

// Delete Image by ID
exports.deleteImage = async (imageId) => {
  try {
    const image = await PropertyImage.findByPk(imageId);
    if (!image) {
      throw new Error('Image not found');
    }
    await image.destroy(); // Delete the image
  } catch (error) {
    throw new Error('Failed to delete image: ' + error.message);
  }
};
