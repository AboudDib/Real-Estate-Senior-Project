require("dotenv").config();  // Load environment variables from .env file
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/dbconfig");  // Sequelize DB configuration

// Import models
const { User } = require("./models/user");
const { Property } = require("./models/property");
const { Transaction } = require("./models/transaction");
const { PropertyImage } = require("./models/propertyImage");  // Correct model name

const app = express();
const port = process.env.PORT || 3001;  // Default to port 3001 if not provided in .env

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes setup
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const propertyRoutes = require('./routes/propertyRoutes');
app.use('/api/properties', propertyRoutes);

const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);

// Database Sync
sequelize
  .sync({ force: false }) // Sync all models, but don't drop tables
  .then(() => {
    console.log("Database has been synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error syncing the database:", err);
  });

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
