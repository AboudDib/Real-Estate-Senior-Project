import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

const AboutUsSection = ({ cards }) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: 4,
        textAlign: "center",
        color: "black",
      }}
    >
      {/* Card Grid */}
      <Grid container spacing={4} justifyContent="center">
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                borderRadius: "16px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                padding: 2,
                minHeight: {
                  xs: "240px", // For mobile, set to 250px
                  sm: "280px", // For small devices and up (tablets), set to 300px
                  md: "320px", // For larger devices (desktop), set to 350px
                },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <img
                  src={card.image}
                  alt={card.title}
                  style={{
                    width: "120px",
                    height: "120px",
                    marginBottom: "20px",
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {card.title}
                </Typography>
                <Typography variant="body2">{card.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AboutUsSection;
