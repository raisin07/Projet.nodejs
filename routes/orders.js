const express = require('express');
const router = express.Router();

const { Order } = require('../models/order');
const { User }= require('../models/user'); 


// GET toutes les commandes
router.get('/', async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [User]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET commande unique grâce à son ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [User]
        });
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST nouvel commande
router.post('/', async (req, res) => {
    try {
        const newOrder = await Order.create(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// supprimer une commande
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Order.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send("Order deleted");
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
