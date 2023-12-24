const { Model, DataTypes } = require("sequelize");
const connection = require("./config");

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }
  },
  {
    sequelize: connection,
  }
);

module.exports = Product;
