import http from "../http-common";
import handleApiError from "../utils/apiErrorHandler";  // Reusable error handler

// Function to get the token
const getToken = () => {
  return localStorage.getItem("token");  // Assuming token is stored in localStorage
};

// Create Property
const createProperty = async (propertyData) => {
  try {
    const token = getToken();
    const response = await http.post("/property/create", propertyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update Property
const updateProperty = async (propertyId, propertyData) => {
  try {
    const token = getToken();
    const response = await http.put(`/property/update/${propertyId}`, propertyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete Property
const deleteProperty = async (propertyId) => {
  try {
    const token = getToken();
    const response = await http.delete(`/property/delete/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Property by ID
const getPropertyById = async (propertyId) => {
  try {
    const token = getToken();
    const response = await http.get(`/property/get/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Properties by User ID
const getPropertiesByUserId = async (userId) => {
  try {
    const token = getToken();
    const response = await http.get(`/property/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Approved Properties
const getApprovedProperties = async () => {
  try {
    const token = getToken();
    const response = await http.get("/property/approved", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Non-Approved Properties
const getNonApprovedProperties = async () => {
  try {
    const token = getToken();
    const response = await http.get("/property/non-approved", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Approve Property
const approveProperty = async (propertyId) => {
  try {
    const token = getToken();
    const response = await http.put(`/property/approve/${propertyId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Properties by Type (apartments, villas)
const getPropertiesByType = async (propertyType) => {
  try {
    const token = getToken();
    const response = await http.get(`/property/type/${propertyType}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Properties by Location (filtered by type and city)
const getPropertiesByLocation = async (propertyType, city) => {
  try {
    const token = getToken();
    const response = await http.get("/property/location", {
      params: { propertyType, city },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

const getPropertiesDynamic = async ({ isRent, sortBy, city, propertyType }) => {
  try {
    const token = getToken();
    console.log("Token:", token);  // Debugging token

    const response = await http.post("/property/dynamic", {
      isRent,
      sortBy,
      city,
      propertyType,
    }, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token in headers
      },
    });

    return response.data;  // Return only the data part of the response
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
  getPropertiesByType,
  getPropertiesByLocation,
  getPropertiesDynamic,
};

export default PropertyService;
``
