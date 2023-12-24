const connection = require("./config.js");
const User = require("./user.js");
const Order = require("./order.js");
const Product = require("./product.js");

// Associations entre model

module.exports = {
  User,
  Order,
  Product,
  connection,
};