const propertyService = require('../services/propertyService');
const { User } = require('../models/user');

// Create Property
exports.createProperty = async (req, res) => {
  try {
    const { name, description, city, price, property_type, user_id } = req.body;

    // Check if user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Call the service to create a property
    const newProperty = await propertyService.createProperty(name, description, city, price, property_type, user_id);

    res.status(201).json({
      message: 'Property created successfully',
      property: newProperty,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating property', error: error.message });
  }
};

// Update Property
exports.updateProperty = async (req, res) => {
  try {
    const { property_id } = req.params;
    const { name, description, city, price, property_type, user_id } = req.body;

    // Check if the property exists
    const property = await propertyService.getPropertyById(property_id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if the user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Call the service to update the property
    const updatedProperty = await propertyService.updateProperty(property_id, name, description, city, price, property_type, user_id);

    res.status(200).json({
      message: 'Property updated successfully',
      property: updatedProperty,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error updating property', error: error.message });
  }
};

// Delete Property
exports.deleteProperty = async (req, res) => {
  try {
    const { property_id } = req.params;
    
    // Check if the property exists
    const property = await propertyService.getPropertyById(property_id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Call the service to delete the property
    await propertyService.deleteProperty(property_id);

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting property', error: error.message });
  }
};

// Get Property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const { property_id } = req.params;

    // Check if the property exists
    const property = await propertyService.getPropertyById(property_id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ property });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching property', error: error.message });
  }
};

// Get Approved Properties
exports.getApprovedProperties = async (req, res) => {
  try {
    const properties = await propertyService.getApprovedProperties();
    res.status(200).json({ properties });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching approved properties', error: error.message });
  }
};

// Get Non-Approved Properties
exports.getNonApprovedProperties = async (req, res) => {
  try {
    const properties = await propertyService.getNonApprovedProperties();
    res.status(200).json({ properties });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching non-approved properties', error: error.message });
  }
};
