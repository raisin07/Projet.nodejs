const express = require("express");

const app = express();
const PORT = 3000;

// On configure les routes ici

app.get("/post", (req,res) => {
    res.json({ message : "Voici les données "});
});
    

// Lancer le serveur
app.listen(PORT, () => console.log('Le server est sur le port ' + PORT));

