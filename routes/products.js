const { Router } = require("express");
const { Product } = require("../models");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const router = new Router();

// Obtenir tous les produits
router.get("/products", checkAuth(), async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Créer un nouveau produit
router.post("/products", checkAuth(), checkRole(checkRole.ROLES.ADMIN), async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// Obtenir un produit spécifique
router.get("/products/:id", checkAuth(), async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.sendStatus(404);
  }
});

// Mettre à jour un produit
router.put("/products/:id", checkAuth(), checkRole(checkRole.ROLES.ADMIN), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const [nbUpdated] = await Product.update(req.body, { where: { id } });
    if (!nbUpdated) {
      res.sendStatus(404);
    } else {
      res.json(await Product.findByPk(id));
    }
  } catch (error) {
    next(error);
  }
});

// Supprimer un produit
router.delete("/products/:id", checkAuth(), checkRole(checkRole.ROLES.ADMIN), async (req, res) => {
  const id = parseInt(req.params.id);
  const nbDeleted = await Product.destroy({ where: { id } });
  res.sendStatus(!nbDeleted ? 404 : 204);
});

module.exports = router;

