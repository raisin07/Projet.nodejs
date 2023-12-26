// Connexion de la base de donnée
require("./models/config");

const checkRequestFormat = require('./middlewares/checkRequestFormat.js');
const checkAuth = require('./middlewares/checkAuth.js');
const errorHandler = require('./middlewares/errorHandler.js');
const orderRoutes = require('./routes/orders.js');
const productRoutes = require('./routes/products.js');
const userRoutes = require('./routes/users.js');
const avisRoutes = require('./routes/aviss.js');


//express
const express = require("express");
const app = express();

// On configure les routes dans le dossier routes 

// Celui ci était un test
// app.use("/post", require("./routes/post.js"));

app.use(checkRequestFormat);
app.use(express.json());

app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/avis', avisRoutes);


app.use(errorHandler);

// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => console.log('Le server est sur le port ' + PORT));
