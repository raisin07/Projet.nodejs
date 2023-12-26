const connection = require("./config.js");
const User = require("./user.js");
const Order = require("./order.js");
const Product = require("./product.js");
const Avis = require("./avis.js");

// Associations entre models

module.exports = {
  User,
  Order,
  Product,
  Avis,
  connection,
};