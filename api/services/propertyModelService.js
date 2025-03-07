const { PropertyModel } = require('../models/propertyModel');
const { Property } = require('../models/property');

// Create Property Model
exports.createPropertyModel = async (property_id, model_url, format) => {
  // Check if the property exists
  const property = await Property.findByPk(property_id);
  if (!property) {
    throw new Error('Property not found');
  }

  // Validate model_url and format
  if (!model_url || !format) {
    throw new Error('Both model_url and format are required');
  }

  // Create and return the new property model
  return await PropertyModel.create({ property_id, model_url, format });
};

// Get Property Model by ID
exports.getPropertyModelById = async (model_id) => {
  const propertyModel = await PropertyModel.findByPk(model_id);
  if (!propertyModel) {
    throw new Error('3D Property Model not found');
  }
  return propertyModel;
};

// Get Property Models by Property ID
exports.getPropertyModelsByPropertyId = async (property_id) => {
  // Check if the property exists
  const property = await Property.findByPk(property_id);
  if (!property) {
    throw new Error('Property not found');
  }

  // Fetch and return all property models for this property
  const propertyModels = await PropertyModel.findAll({
    where: { property_id },
  });
  return propertyModels;
};

// Delete Property Model
exports.deletePropertyModel = async (model_id) => {
  const propertyModel = await PropertyModel.findByPk(model_id);
  if (!propertyModel) {
    throw new Error('3D Property Model not found');
  }

  // Delete the property model and return the deleted data for confirmation
  const deletedModel = await propertyModel.destroy();
  return deletedModel;
};
