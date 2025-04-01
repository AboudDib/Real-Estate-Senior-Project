const { Property } = require("../models/property");
const { User } = require("../models/user");
const propertyBuilder = require('../helper/propertyBuilder'); // Import the function


exports.createProperty = async (name, description, city, price, property_type, bedrooms, bathrooms, living_rooms, balconies, parking_spaces, square_meter, user_id, isForRent) => {
  // Check if property with the same name exists for this user
  const existingProperty = await Property.findOne({ where: { name, user_id } });
  if (existingProperty) {
    throw new Error("Property with this name already exists for this user");
  }
  console.log(property_type);

  // Create the property with all relevant fields including square_meter and isForRent
  return await Property.create({
    user_id,
    name,
    description,
    city,
    price,
    property_type,
    bedrooms,
    bathrooms,
    living_rooms,
    balconies,
    parking_spaces,
    square_meter,  // Added square_meter here
    isForRent, // Added isForRent here
    isApproved: false, // Default value
    created_at: new Date(),
  });
};


// Update Property
exports.updateProperty = async (property_id, name, description, city, price, property_type, bedrooms, bathrooms, living_rooms, balconies, parking_spaces) => {
  const property = await Property.findByPk(property_id);
  if (!property) {
    throw new Error("Property not found");
  }

  // Update only the fields provided
  await property.update({
    name,
    description,
    city,
    price,
    property_type,
    bedrooms,
    bathrooms,
    living_rooms,
    balconies,
    parking_spaces,
  });

  return property;
};

// Delete Property
exports.deleteProperty = async (property_id) => {
  const property = await Property.findByPk(property_id);
  if (!property) {
    throw new Error("Property not found");
  }

  await property.destroy();
};

// Get Property by ID
exports.getPropertyById = async (property_id) => {
  const property = await Property.findByPk(property_id);
  if (!property) {
    throw new Error("Property not found");
  }
  return property;
};

// Get Approved Properties
exports.getApprovedProperties = async () => {
  return await Property.findAll({
    where: { isApproved: true },
    order: [["created_at", "DESC"]],
  });
};

// Get Non-Approved Properties
exports.getNonApprovedProperties = async () => {
  return await Property.findAll({
    where: { isApproved: false },
    order: [["created_at", "DESC"]],
  });
};

// Get Properties by Type
exports.getPropertiesByType = async (propertyType) => {
  return await Property.findAll({
    where: { property_type: propertyType },
    order: [["created_at", "DESC"]],
  });
};

// Get Properties by Location
exports.getPropertiesByLocation = async (propertyType, city) => {
  try {
    return await Property.findAll({
      where: {
        property_type: propertyType,
        city: city,
      },
      order: [["created_at", "DESC"]],
    });
  } catch (error) {
    console.error("Error fetching properties by location:", error);
    throw new Error("Error fetching properties by location");
  }
};

// Get Properties by User ID
exports.getPropertiesByUserId = async (user_id) => {
  try {
    return await Property.findAll({
      where: { user_id },
      order: [["created_at", "DESC"]],
    });
  } catch (error) {
    console.error("Error fetching properties by user ID:", error);
    throw new Error("Error fetching properties by user ID");
  }
};

// Approve Property
exports.approveProperty = async (property_id) => {
  const property = await Property.findByPk(property_id);
  if (!property) {
    throw new Error("Property not found");
  }

  property.isApproved = true;
  await property.save();

  return property;
};
exports.getPropertiesDynamic = async (isRent = null, sortBy, city = null, propertyType = null) => {
  console.log("Fetching properties with the following parameters:");
  console.log("isRent:", isRent);
  console.log("sortBy:", sortBy);
  console.log("city:", city);
  console.log("propertyType:", propertyType);

  // Build the order array based on the sortBy parameter
  const order = buildOrder(sortBy);  
  console.log("Built order array:", order); // Log the order array for debugging

  const whereCondition = { isApproved: true };
  
  // Dynamically add conditions based on input parameters
  if (isRent !== null) whereCondition.isForRent = isRent;
  if (city) whereCondition.city = city;
  if (propertyType) whereCondition.property_type = propertyType;

  console.log("Final whereCondition:", whereCondition); // Log the final where condition for debugging

  try {
    // Fetch properties from the database
    let properties = await Property.findAll({
      where: whereCondition,
      order: order,
    });

    console.log("Properties fetched from database:", properties); // Log the properties before attaching images

    // Attach images to the properties
    properties = await propertyBuilder.attachImagesToProperties(properties); 

    console.log("Properties with images attached:", properties); // Log the properties after attaching images
    return properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw new Error("Error fetching properties");
  }
};

// Helper function to build the order array for sorting
const buildOrder = (sortBy) => {
  const order = [];
  console.log("Building order based on sortBy:", sortBy);  // Log the sortBy value
  
  // Add the correct ordering based on the sortBy value
  if (sortBy === 'price_asc') {
    order.push(['price', 'ASC']);
  } else if (sortBy === 'price_desc') {
    order.push(['price', 'DESC']);
  } else if (sortBy === 'date_asc') {
    order.push(['created_at', 'ASC']);
  } else if (sortBy === 'date_desc') {
    order.push(['created_at', 'DESC']);
  }

  console.log("Final order array:", order); // Log the final order array
  return order;
};
