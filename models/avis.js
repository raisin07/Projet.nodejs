const { Model, DataTypes } = require("sequelize");
const connection = require("./config"); 
const User = require('./user.js');
const Product = require('./product.js'); 
const Order = require('./order.js'); 

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

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'id',
      }
    },

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Order',
        key: 'id',
      }
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

Avis.belongsTo(Product, { foreignKey: 'productId' });
Avis.belongsTo(User, { foreignKey: 'userId' });
Avis.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = Avis;
