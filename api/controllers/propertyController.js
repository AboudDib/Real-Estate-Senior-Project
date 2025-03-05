const propertyService = require('../services/propertyService');

exports.createProperty = async (req, res) => {
  try {
    const { name, description, city, price, property_type, user_id } = req.body;
    const newProperty = await propertyService.createProperty(name, description, city, price, property_type, user_id);
    res.status(201).json({
      message: 'Property created successfully',
      property: newProperty,
    });
  } catch (error) {
    res.status(400).json({ message: 'Property creation failed', error: error.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const { property_id } = req.params;
    const { name, description, city, price, property_type } = req.body;
    const updatedProperty = await propertyService.updateProperty(property_id, name, description, city, price, property_type);
    res.status(200).json({
      message: 'Property updated successfully',
      property: updatedProperty,
    });
  } catch (error) {
    res.status(400).json({ message: 'Property update failed', error: error.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const { property_id } = req.params;
    await propertyService.deleteProperty(property_id);
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Property deletion failed', error: error.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const { property_id } = req.params;
    const property = await propertyService.getPropertyById(property_id);
    res.status(200).json({ property });
  } catch (error) {
    res.status(400).json({ message: 'Property not found', error: error.message });
  }
};
