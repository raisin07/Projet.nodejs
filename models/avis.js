const { Model, DataTypes } = require("sequelize");
const connection = require("./config");
const Order = require("./order.js"); 
const User = require('./user.js');
const Product = require('./product.js');


class Avis extends Model {}

Avis.init(
  {
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    
    note: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    commentaire: {
      type: DataTypes.TEXT,
      allowNull: true, 
    },

    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize: connection,
    modelName: 'Avis'
  }
);


module.exports = Avis;
