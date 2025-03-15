const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconfig");
const { User } = require("./user");  // Destructure to access User model
const { Property } = require("./property");  // Destructure to access Property model

const Transaction = sequelize.define("Transaction", {
  transaction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  buyer_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  seller_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  property_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Property,
      key: 'property_id',
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed'),
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  timestamps: false,
});

// Associations
Transaction.belongsTo(User, { foreignKey: 'buyer_user_id', as: 'buyer' , onDelete: 'CASCADE' });
Transaction.belongsTo(User, { foreignKey: 'seller_user_id', as: 'seller', onDelete: 'CASCADE'  });
Transaction.belongsTo(Property, { foreignKey: 'property_id', onDelete: 'CASCADE'  });

User.hasMany(Transaction, { foreignKey: 'buyer_user_id', as: 'buyerTransactions' });
User.hasMany(Transaction, { foreignKey: 'seller_user_id', as: 'sellerTransactions' });
Property.hasMany(Transaction, { foreignKey: 'property_id' });

module.exports = { Transaction };
