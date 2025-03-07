const { validationResult } = require('express-validator');
const propertyModelService = require('../services/propertyModelService');

// Create Property Model
exports.createPropertyModel = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { property_id, model_url, format } = req.body;
    const newPropertyModel = await propertyModelService.createPropertyModel(property_id, model_url, format);
    res.status(201).json({ message: '3D Property Model created successfully', propertyModel: newPropertyModel });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create 3D property model', error: error.message });
  }
};

// Get Property Model by ID
exports.getPropertyModelById = async (req, res) => {
  try {
    const { id } = req.params;
    const propertyModel = await propertyModelService.getPropertyModelById(id);
    res.status(200).json({ propertyModel });
  } catch (error) {
    res.status(400).json({ message: '3D property model not found', error: error.message });
  }
};

// Get Property Models by Property ID
exports.getPropertyModelsByPropertyId = async (req, res) => {
  try {
    const { property_id } = req.params;
    const propertyModels = await propertyModelService.getPropertyModelsByPropertyId(property_id);
    res.status(200).json({ propertyModels });
  } catch (error) {
    res.status(400).json({ message: '3D property models not found', error: error.message });
  }
};

// Delete Property Model
exports.deletePropertyModel = async (req, res) => {
  try {
    const { id } = req.params;
    await propertyModelService.deletePropertyModel(id);
    res.status(200).json({ message: '3D Property Model deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete 3D property model', error: error.message });
  }
};
