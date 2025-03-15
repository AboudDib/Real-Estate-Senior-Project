const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconfig");
const { User } = require("./user");  // Destructure to access User model

const Property = sequelize.define("Property", {
  property_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id', // Foreign key references the primary key of User model
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  property_type: {
    type: DataTypes.ENUM('house', 'land'),  // Removed apartment and kept only house and land
    allowNull: false,
  },
  square_meter: {
    type: DataTypes.INTEGER,
    allowNull: true,  // Can be null for non-house properties (like land)
    validate: {
      isNumeric: true,  // Ensures the value is numeric if filled
    },
  },
  isForRent: {
    type: DataTypes.BOOLEAN,
    allowNull: true,  // Can be null for non-house properties
    defaultValue: false,  // Default to false (not for rent) for properties other than house
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Default to false, requiring approval
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

// Define associations
Property.belongsTo(User, { foreignKey: 'user_id' , onDelete: 'CASCADE'});
User.hasMany(Property, { foreignKey: 'user_id' });

module.exports = { Property };
