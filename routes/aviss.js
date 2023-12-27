const { Router } = require("express");
const { Avis } = require("../models");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

// Obtenir tous les avis
router.get("/avis", checkAuth(), async (req, res) => {
  const avis = await Avis.findAll();
  res.json(avis);
});

// Créer un nouvel avis
router.post("/avis", checkAuth(), async (req, res, next) => {
  try {
    const newAvis = new Avis({ ...req.body, userId: req.user.id });
    await newAvis.save();
    res.status(201).json(newAvis);
  } catch (error) {
    next(error);
  }
});

// Obtenir un avis spécifique
router.get("/avis/:id", checkAuth(), async (req, res) => {
  const avis = await Avis.findByPk(req.params.id);
  if (avis) {
    res.json(avis);
  } else {
    res.sendStatus(404);
  }
});

// Mettre à jour un avis
router.put("/avis/:id", checkAuth(), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const [nbUpdated] = await Avis.update(req.body, { where: { id } });
    if (!nbUpdated) {
      res.sendStatus(404);
    } else {
      res.json(await Avis.findByPk(id));
    }
  } catch (error) {
    next(error);
  }
});

// Supprimer un avis
router.delete("/avis/:id", checkAuth(), async (req, res) => {
  const id = parseInt(req.params.id);
  const nbDeleted = await Avis.destroy({ where: { id } });
  res.sendStatus(!nbDeleted ? 404 : 204);
});

module.exports = router;