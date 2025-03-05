const { Property } = require('../models/property');

// Create Property
exports.createProperty = async (user_id, name, description, city, price, property_type) => {
  // Check if property with the same name exists for this user
  const existingProperty = await Property.findOne({ where: { name, user_id } });
  if (existingProperty) {
    throw new Error('Property with this name already exists for this user.');
  }

  // Create new property
  return await Property.create({ user_id, name, description, city, price, property_type });
};

// Get Property by ID
exports.getPropertyById = async (property_id) => {
  const property = await Property.findByPk(property_id);
  if (!property) {
    throw new Error('Property not found');
  }
  return property;
};

// Get All Properties
exports.getAllProperties = async () => {
  return await Property.findAll();
};

// Update Property
exports.updateProperty = async (property_id, updates) => {
  const property = await Property.findByPk(property_id);
  if (!property) {
    throw new Error('Property not found');
  }

  // Update only the fields that are provided in the updates object
  await property.update(updates);
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
