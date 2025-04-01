const propertyImageService = require('../services/propertyImageService'); // Use the service instead of direct DB calls

const attachImagesToProperties = async (properties) => {
  return await Promise.all(
    properties.map(async (property) => {
      // Use property_id instead of id if that's the key used in your database
      const images = await propertyImageService.getImagesByProperty(property.property_id);

      // Attach images (image_url array) to each property
      return {
        ...property.toJSON(),  // Convert Sequelize model to plain object
        images: images.map(img => img.image_url),  // Map image URLs
      };
    })
  );
};

module.exports = { attachImagesToProperties };
