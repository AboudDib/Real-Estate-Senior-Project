// services/propertyService.js
import http from "../http-common";
import handleApiError from "../utils/apiErrorHandler";  // Import the reusable error handler

// Create Property
const createProperty = async (propertyData) => {
  try {
    const response = await http.post("/properties/create", propertyData);
    return response;
  } catch (error) {
    return handleApiError(error);  
  }
};

// Update Property
const updateProperty = async (propertyId, propertyData) => {
  try {
    const response = await http.put(`/properties/update/${propertyId}`, propertyData);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete Property
const deleteProperty = async (propertyId) => {
  try {
    const response = await http.delete(`/properties/delete/${propertyId}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Property by ID
const getPropertyById = async (propertyId) => {
  try {
    const response = await http.get(`/properties/get/${propertyId}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Properties by User ID
const getPropertiesByUserId = async (userId) => {
  try {
    const response = await http.get(`/properties/user/${userId}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Approved Properties
const getApprovedProperties = async () => {
  try {
    const response = await http.get("/properties/approved");
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Non-Approved Properties
const getNonApprovedProperties = async () => {
  try {
    const response = await http.get("/properties/non-approved");
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Approve Property
const approveProperty = async (propertyId) => {
  try {
    const response = await http.put(`/properties/approve/${propertyId}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Land Properties
const getLandProperties = async () => {
  try {
    const response = await http.get("/properties/land");
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get House Properties
const getHouseProperties = async () => {
  try {
    const response = await http.get("/properties/house");
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Properties by Location
const getPropertiesByLocation = async (locationData) => {
  try {
    const response = await http.get("/properties/location", { params: locationData });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get House Properties by Location
const getHousePropertiesByLocation = async (locationData) => {
  try {
    const response = await http.get("/properties/location/house", { params: locationData });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Land Properties by Location
const getLandPropertiesByLocation = async (locationData) => {
  try {
    const response = await http.get("/properties/location/land", { params: locationData });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Export the service methods
const PropertyService = {
  createProperty,
  updateProperty,
  deleteProperty,
  getPropertyById,
  getPropertiesByUserId,
  getApprovedProperties,
  getNonApprovedProperties,
  approveProperty,
  getLandProperties,
  getHouseProperties,
  getPropertiesByLocation,
  getHousePropertiesByLocation,
  getLandPropertiesByLocation,
};

export default PropertyService;
