const propertyService = require('../services/propertyService');
const { User } = require('../models/user');

// Create Property
exports.createProperty = async (req, res) => {
  try {
    const { name, description, city, price, property_type, user_id, square_meter, isForRent } = req.body;

    // Check if user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Call the service to create a property
    const newProperty = await propertyService.createProperty(name, description, city, price, property_type, user_id, square_meter, isForRent);

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
    const { name, description, city, price, property_type, user_id, square_meter, isForRent } = req.body;

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
    const updatedProperty = await propertyService.updateProperty(property_id, name, description, city, price, property_type, user_id, square_meter, isForRent);

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

// Get Land Properties
exports.getLandProperties = async (req, res) => {
  try {
    const properties = await propertyService.getLandProperties();
    res.status(200).json({ properties });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching land properties', error: error.message });
  }
};

// Get House Properties
exports.getHouseProperties = async (req, res) => {
  try {
    const properties = await propertyService.getHouseProperties();
    res.status(200).json({ properties });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching house properties', error: error.message });
  }
};



// Approve Property
exports.approveProperty = async (req, res) => {
  try {
    const { property_id } = req.params;
    const { user_id } = req.body;  // Get user_id from the request body

    // Check if the user exists and if they are an admin
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: 'User is not an admin' });
    }

    // Call the service to approve the property
    const approvedProperty = await propertyService.approveProperty(property_id);

    res.status(200).json({
      message: 'Property approved successfully',
      property: approvedProperty,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error approving property', error: error.message });
  }
};

exports.getPropertiesByLocation = async (req, res) => {
  try {
    const { city } = req.body;  // Use req.body if sending city in the request body

    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }

    // Call the service method to get properties by location
    const properties = await propertyService.getPropertiesByLocation(city);

    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: 'No properties found in this location' });
    }

    res.status(200).json({ properties });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching properties by location', error: error.message });
  }
};


exports.getHousePropertiesByLocation = async (req, res) => {
  try {
    const { city } = req.body;

    // Fetch house properties by location
    const properties = await propertyService.getPropertiesByLocation('house', city);

    if (!properties.length) {
      return res.status(404).json({
        message: 'No house properties found for the given city',
      });
    }

    res.status(200).json({
      message: 'House properties fetched successfully',
      properties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching house properties by location',
      error: error.message,
    });
  }
};

exports.getLandPropertiesByLocation = async (req, res) => {
  try {
    const { city } = req.body;

    // Fetch land properties by location
    const properties = await propertyService.getPropertiesByLocation('land', city);

    if (!properties.length) {
      return res.status(404).json({
        message: 'No land properties found for the given city',
      });
    }

    res.status(200).json({
      message: 'Land properties fetched successfully',
      properties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching land properties by location',
      error: error.message,
    });
  }
};

// Get Properties by User ID
exports.getPropertiesByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;  // Get user_id from URL params

    // Call the service method to get properties by user_id
    const properties = await propertyService.getPropertiesByUserId(user_id);

    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: 'No properties found for this user' });
    }

    res.status(200).json({ properties });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching properties by user ID', error: error.message });
  }
};

