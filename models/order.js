const { Model, DataTypes } = require("sequelize");
const connection = require("./config.js");
const bcrypt = require("bcryptjs");

class Order extends Model {}

Order.init(
  {
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  },
  {
    sequelize: connection,
  }
);

// Association avec Utilisateur
Order.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });

module.exports = Order;
