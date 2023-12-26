
const User = require("./user.js");
const Order = require("./order.js");
const Product = require("./product.js");
const Avis = require("./avis.js");
const connection = require('./config');

// Associations
Product.hasMany(Order); // Un produit peut être dans plusieurs commandes
Order.belongsTo(Product); // Une commande a un produit spécifique

User.hasMany(Order); // Un utilisateur peut avoir plusieurs commandes
Order.belongsTo(User); // Une commande appartient à un utilisateur

User.hasMany(Avis); // Un utilisateur peut avoir plusieurs avis
Avis.belongsTo(User); // Un avis appartient à un utilisateur

Product.hasMany(Avis); // Un produit peut avoir plusieurs avis
Avis.belongsTo(Product); // Un avis est pour un produit spécifique

module.exports = {
  connection,
  User,
  Order,
  Product,
  Avis,
};