const { Property } = require('../models/property');
const { User } = require('../models/user');

// Create Property
exports.createProperty = async (name, description, city, price, property_type, user_id) => {
  // Check if property with the same name exists for this user
  const existingProperty = await Property.findOne({ where: { name, user_id } });
  if (existingProperty) {
    throw new Error('Property with this name already exists for this user');
  }

  // Create the property with default values for isApproved and created_at
  return await Property.create({
    user_id, 
    name, 
    description, 
    city, 
    price, 
    property_type, 
    isApproved: false,  // Default value for isApproved
    created_at: new Date()  // Default value for created_at
  });
};

// Update Property
exports.updateProperty = async (property_id, name, description, city, price, property_type, user_id) => {
  const property = await Property.findByPk(property_id);
  if (!property) {
    throw new Error('Property not found');
  }

  // Update only the fields provided in the request body
  await property.update({
    name, 
    description, 
    city, 
    price, 
    property_type, 
    user_id
  });

  return property;
};

// Delete Property
exports.deleteProperty = async (property_id) => {
  const property = await Property.findByPk(property_id);
  if (!property) {
    throw new Error('Property not found');
  }

  await property.destroy();
};

// Get Property by ID
exports.getPropertyById = async (property_id) => {
  const property = await Property.findByPk(property_id);
  if (!property) {
    throw new Error('Property not found');
  }
  return property;
};

// Get Approved Properties
exports.getApprovedProperties = async () => {
  return await Property.findAll({
    where: { isApproved: true },
    order: [['created_at', 'DESC']]
  });
};

// Get Non-Approved Properties
exports.getNonApprovedProperties = async () => {
  return await Property.findAll({
    where: { isApproved: false },
    order: [['created_at', 'DESC']]
  });
};

// Get Land Properties
exports.getLandProperties = async () => {
  return await Property.findAll({
    where: { property_type: 'land' },
    order: [['created_at', 'DESC']]
  });
};

// Get House Properties
exports.getHouseProperties = async () => {
  return await Property.findAll({
    where: { property_type: 'house' },
    order: [['created_at', 'DESC']]
  });
};

// Approve Property
exports.approveProperty = async (property_id) => {
  // Find the property by ID
  const property = await Property.findByPk(property_id);
  if (!property) {
    throw new Error('Property not found');
  }

  // Change isApproved to true
  property.isApproved = true;
  await property.save();

  return property;
};


exports.getPropertiesByLocation = async (propertyType, city) => {
  try {
    // Query the properties by type and location (city)
    const properties = await Property.findAll({
      where: {
        property_type: propertyType,
        city: city,
      },
    });

    return properties;
  } catch (error) {
    console.error('Error fetching properties by location:', error);
    throw new Error('Error fetching properties by location');
  }
};

// Get Properties by User ID
exports.getPropertiesByUserId = async (user_id) => {
  try {
    // Find properties associated with a particular user
    const properties = await Property.findAll({
      where: { user_id },
      order: [['created_at', 'DESC']],
    });

    return properties;
  } catch (error) {
    console.error('Error fetching properties by user ID:', error);
    throw new Error('Error fetching properties by user ID');
  }
};
