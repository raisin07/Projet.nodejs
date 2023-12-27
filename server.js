// Connexion de la base de donnée
require("./models/config");

const checkRequestFormat = require('./middlewares/checkRequestFormat');
const errorHandler = require('./middlewares/errorHandler');
const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const avisRoutes = require('./routes/aviss');


//express
const express = require("express");
const app = express();

// On configure les routes dans le dossier routes 

// Celui ci était un test
// app.use("/post", require("./routes/post.js"));


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur Express');
  });
  
app.get('/users', (req, res) => {
    console.log('Requête reçue sur /users');
    // ...
  });
app.use(checkRequestFormat);


app.use(orderRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(avisRoutes);

app.use(errorHandler);

// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => console.log('Le server est sur le port ' + PORT));
