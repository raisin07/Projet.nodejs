const express = require("express");
const router = express.Router();

// Les routes

router.get("/", (req,res) => {
    res.json({ message : "Voici les données "});
});


// Pour exporter les routes
module.exports = router;