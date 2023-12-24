const express = require("express");
const checkRequestFormat = require("./controllers/checkRequestFormat");
const errorHandler = require("./controllers/errorHandler");
const orderRoutes = require('./routes/orders.js');
const productRoutes = require('./routes/products.js');
const userRoutes = require('./routes/users.js');
const securityRouter = require("./routes/security");

// Connexion de la base de donnée
require("./models/config");

const app = express();

// On configure les routes dans le dossier routes 

// Celui ci était un test
// app.use("/post", require("./routes/post.js"));

app.use(checkRequestFormat);
app.use(express.json());

app.use(securityRouter);

// Orders
app.use('/orders', orderRoutes);

// Users
app.use('/users', userRoutes);

//Products
app.use('/products', productRoutes);

app.use(errorHandler);

// Lancer le serveur
const PORT = 5000;
app.listen(PORT, () => console.log('Le server est sur le port ' + PORT));
