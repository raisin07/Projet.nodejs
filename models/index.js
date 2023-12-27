
const User = require("./user.js");
const Order = require("./order.js");
const Product = require("./product.js");
const Avis = require("./avis.js");
const connection = require('./config');

// Associations
Product.hasMany(Order); 
Order.belongsTo(Product); 

User.hasMany(Order); 
Order.belongsTo(User); 

User.hasMany(Avis); 
Avis.belongsTo(User); 

Product.hasMany(Avis); 
Avis.belongsTo(Product); 

module.exports = {
  connection,
  User,
  Order,
  Product,
  Avis,
};