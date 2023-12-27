const { Router } = require("express");
const { Product } = require("../models/product");
const { Order } = require("../models/order");
const { User } = require("../models/user");
const checkRole = require("../middlewares/checkRole");
const checkAuth = require("../middlewares/checkAuth");
const router = new Router();

// Obtenir toutes les commandes
router.get("/orders", checkAuth(), async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [Product, User] 
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des commandes", error });
  }
});

// Créer une nouvelle commande
router.post("/orders", checkAuth(), async (req, res, next) => {
  try {
    const newOrder = new Order({ ...req.body, userId: req.user.id }); 
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// Obtenir une commande spécifique
router.get("/orders/:id", checkAuth(), async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [Product, User] 
    });
    if (order) {
      res.json(order);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la commande", error });
  }
});

// Mettre à jour une commande
router.put("/orders/:id", checkAuth(), checkRole('ADMIN'), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const [nbUpdated] = await Order.update(req.body, { where: { id } });
    if (!nbUpdated) {
      res.sendStatus(404);
    } else {
      const updatedOrder = await Order.findByPk(id, {
        include: [Product, User] 
      });
      res.json(updatedOrder);
    }
  } catch (error) {
    next(error);
  }
});

// Supprimer une commande
router.delete("/orders/:id", checkAuth(), checkRole('ADMIN'), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const nbDeleted = await Order.destroy({ where: { id } });
    res.sendStatus(!nbDeleted ? 404 : 204);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la commande", error });
  }
});

module.exports = router;
