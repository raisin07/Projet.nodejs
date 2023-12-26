const { Model, DataTypes } = require("sequelize");
const connection = require("./config");
const User = require("./user.js");
const Order = require("./order.js");
const Product = require("./product.js");
const Avis = require("./avis.js");


class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id', 
      }
    }
  },
  {
    sequelize: connection,
  }
);

Order.belongsTo(User, { foreignKey: 'userId' });
Order.hasMany(Avis, { foreignKey: 'orderId' });

module.exports = Order;
