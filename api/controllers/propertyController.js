const propertyService = require('../services/propertyService');
const { User } = require('../models/user');

// Create Property
exports.createProperty = async (req, res) => {
  try {
    const { 
      name, description, city, price, property_type, 
      bedrooms, bathrooms, living_rooms, balconies, 
      parking_spaces, square_meter, user_id, isForRent 
    } = req.body;

    // Check if user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create property and pass isForRent
    const newProperty = await propertyService.createProperty(
      name, description, city, price, property_type, 
      bedrooms, bathrooms, living_rooms, balconies, 
      parking_spaces, square_meter, user_id, isForRent
    );

    res.status(201).json({ message: 'Property created successfully', property: newProperty });
  } catch (error) {
    res.status(400).json({ message: 'Error creating property', error: error.message });
  }
};


// Update Property
exports.updateProperty = async (req, res) => {
  try {
    const { property_id } = req.params;
    const { name, description, city, price, property_type, bedrooms, bathrooms, living_rooms, balconies, parking_spaces } = req.body;

    const updatedProperty = await propertyService.updateProperty(property_id, name, description, city, price, property_type, bedrooms, bathrooms, living_rooms, balconies, parking_spaces);
    res.status(200).json({ message: 'Property updated successfully', property: updatedProperty });
  } catch (error) {
    res.status(400).json({ message: 'Error updating property', error: error.message });
  }
};

// Delete Property
exports.deleteProperty = async (req, res) => {
  try {
    const { property_id } = req.params;
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
    const property = await propertyService.getPropertyById(property_id);
    res.status(200).json({ property });
  } catch (error) {
    res.status(404).json({ message: 'Property not found', error: error.message });
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

// Controller
exports.getPropertiesDynamic = async (req, res) => {
  try {
    const { isRent, sortBy, city, propertyType } = req.body; // Get parameters from the request body
    console.log(req.body)
    // Call the service function to get properties
    const properties = await propertyService.getPropertiesDynamic(isRent, sortBy, city, propertyType);
    
    // Return the response with the fetched properties
    res.status(200).json(properties);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching properties', error: error.message });
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

// Get Properties by Type
exports.getPropertiesByType = async (req, res) => {
  try {
    const { property_type } = req.query;
    const properties = await propertyService.getPropertiesByType(property_type);
    res.status(200).json({ properties });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching properties by type', error: error.message });
  }
};

// Get Properties by Location
exports.getPropertiesByLocation = async (req, res) => {
  try {
    const { property_type, city } = req.query;
    const properties = await propertyService.getPropertiesByLocation(property_type, city);
    res.status(200).json({ properties });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching properties by location', error: error.message });
  }
};

// Get Properties by User ID
exports.getPropertiesByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const properties = await propertyService.getPropertiesByUserId(user_id);
    res.status(200).json({ properties });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching properties by user ID', error: error.message });
  }
};

// Approve Property
exports.approveProperty = async (req, res) => {
  try {
    const { property_id } = req.params;
    const { user_id } = req.body;

    const user = await User.findByPk(user_id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'User is not authorized to approve properties' });
    }

    const approvedProperty = await propertyService.approveProperty(property_id);
    res.status(200).json({ message: 'Property approved successfully', property: approvedProperty });
  } catch (error) {
    res.status(400).json({ message: 'Error approving property', error: error.message });
  }
};
