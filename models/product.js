const { Model, DataTypes } = require("sequelize");
const connection = require("./config");
const Order = require("./order.js");
const Avis = require("./avis.js");

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
    },

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }
  },
  {
    sequelize: connection,
  }
);

Product.hasMany(Avis, { foreignKey: 'productId' });


module.exports = Product;
