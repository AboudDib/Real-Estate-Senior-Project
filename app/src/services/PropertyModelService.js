// services/propertyModelService.js
import http from "../http-common";
import handleApiError from "../utils/apiErrorHandler";  // Import the reusable error handler

// Create Property Model
const createPropertyModel = async (propertyModelData) => {
  try {
    const response = await http.post("/property-model/add", propertyModelData);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Property Model by ID
const getPropertyModelById = async (modelId) => {
  try {
    const response = await http.get(`/property-model/${modelId}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Property Models by Property ID
const getPropertyModelsByPropertyId = async (propertyId) => {
  try {
    const response = await http.get(`/property-model/property/${propertyId}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete Property Model
const deletePropertyModel = async (modelId) => {
  try {
    const response = await http.delete(`/property-model/${modelId}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Export the service methods
const PropertyModelService = {
  createPropertyModel,
  getPropertyModelById,
  getPropertyModelsByPropertyId,
  deletePropertyModel,
};

export default PropertyModelService;
