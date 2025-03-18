import http from "../http-common";
import handleApiError from "../utils/apiErrorHandler";  // Import the reusable error handler

// Add Image to Property
const addPropertyImage = async (imageUrl, propertyId) => {
  try {
    const response = await http.post("/property-images/add", { image_url: imageUrl, property_id: propertyId });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Images for Property
const getPropertyImages = async (propertyId) => {
  try {
    const response = await http.get(`/property-images/${propertyId}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete Image
const deletePropertyImage = async (imageId) => {
  try {
    const response = await http.delete(`/property-images/${imageId}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Export the service methods
const PropertyImageService = {
  addPropertyImage,
  getPropertyImages,
  deletePropertyImage,
};

export default PropertyImageService;
