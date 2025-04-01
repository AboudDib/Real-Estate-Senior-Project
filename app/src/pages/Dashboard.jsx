import React, { useState, useEffect } from "react";
import PropertyService from "../services/PropertyService"; // Import the PropertyService
import PropertyCard from "../components/PropertyCard";
import {
  Grid,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  Paper,
  Collapse,
  Slider,
} from "@mui/material";
import imageLinks from "../assets/ImageLinks"; // Import image links
import SearchBar from "../components/SearchBar"; // Import the SearchBar component

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [category, setCategory] = useState("Rental");
  const [type, setType] = useState("Apartment");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newly-listed");
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState([50000, 400000]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      const requestBody = {
        isRent: category === "Rental",
        sortBy: sortBy || "newly-listed",
        sortOrder: sortOrder || "asc",
        propertyType: type || "Apartment",
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      };

      if (searchQuery.trim()) {
        requestBody.city = searchQuery;
      }

      try {
        const response = await PropertyService.getPropertiesDynamic({
          method: "POST",
          data: requestBody,
        });

        if (Array.isArray(response)) {
          setProperties(response);
        } else {
          setError("Failed to load properties. Please try again later.");
        }
      } catch (error) {
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [category, type, searchQuery, sortBy, sortOrder, priceRange]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* Outer Full Screen Box */}
      <Box sx={{ height: "100%", width: "100%", bgcolor: "#f8f9fa", position: "relative" }}>
        {/* Box containing Logo and Buttons */}
        <Paper
          elevation={3}
          sx={{
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            zIndex: 1100,
            backgroundColor: "white",
          }}
        >
          {imageLinks?.BlackLRELogo ? (
            <img
              src={imageLinks.BlackLRELogo}
              alt="Logo"
              style={{ height: 60, marginRight: 16, marginLeft: 10 }}
            />
          ) : (
            <Typography variant="h6" color="error">
              Logo Not Found
            </Typography>
          )}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              size="small"
            // Add marginRight here
            >
              <MenuItem value="Rental">Rental</MenuItem>
              <MenuItem value="Sale">Sale</MenuItem>
            </Select>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              size="small"
              sx={{ marginRight: 5 }}  // Add marginRight here
            >
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="Villa">Villa</MenuItem>
            </Select>
          </Box>

        </Paper>

        {/* Main content area, below the logo and buttons */}
        <Box sx={{ paddingTop: "100px", padding: "16px" }}>
          {/* Search Bar */}
          <Box sx={{ marginTop: '70px', padding: 0, width: "100%" }}>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </Box>

          {/* Sorting & Filters */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
    variant="outlined"
    onClick={() => setShowFilters(!showFilters)}
    sx={{
      borderColor: "#9b87f5",
      color: "#9b87f5",
      borderRadius: "8px",
      marginTop: '-10px',
      marginLeft: 2,
      fontSize: { xs: "0.75rem", sm: "1rem" },  // Smaller font size on small screens
      padding: { xs: "4px 8px", sm: "6px 12px" },  // Smaller padding on small screens
      "&:hover": { borderColor: "#8a74ef", bgcolor: "rgba(155, 135, 245, 0.04)" },
    }}
  >
    More Filters
  </Button>
            <Box sx={{ marginTop: '-10px', display: "flex", gap: 2 }}>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} size="small" sx={{ minWidth: 70 }}>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="newly-listed">Date</MenuItem>
              </Select>
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                size="small"
                sx={{ minWidth: 120  ,marginRight: 2}}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </Box>
          </Box>

          {/* More Filters Section */}
          <Collapse in={showFilters}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: "12px",
                bgcolor: "white",
                transition: "max-height 0.3s ease-out",
                maxHeight: showFilters ? "400px" : "0", // Control max-height for smooth expansion
                overflow: "hidden",
                marginTop:'20px'
              }}
            >
              <Typography variant="h6" fontWeight="600" sx={{ mb: 2, color: "#333" }}>
                Price Range
              </Typography>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `$${value.toLocaleString()}`}
                min={50000}
                max={400000}
                step={5000}
                sx={{ mb: 3, color: "#9b87f5" }}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", px: 3 }}>
                <Typography variant="body1" fontWeight="500" color="text.secondary">
                  ${priceRange[0].toLocaleString()}
                </Typography>
                <Typography variant="body1" fontWeight="500" color="text.secondary">
                  ${priceRange[1].toLocaleString()}
                </Typography>
              </Box>
            </Paper>
          </Collapse>

          {/* Error Message */}
          {error && (
            <Typography variant="h6" color="error" sx={{ textAlign: "center", mt: 5 }}>
              {error}
            </Typography>
          )}

          {/* Properties Grid */}
          <Box sx={{ maxWidth: "100%", mx: "auto", padding: "16px" }}>
            <Grid container spacing={3} sx={{ minHeight: "auto" }}>
              {properties.length > 0 ? (
                properties.map((property) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={property.property_id} sx={{ minHeight: 400 }}>
                    <PropertyCard property={property} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} sx={{ minHeight: 400 }}>
                  <Typography variant="h6" sx={{ textAlign: "center", width: "100%", mt: 5 }}>
                    No properties found.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
