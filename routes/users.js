const { Router } = require("express");
const { User } = require("../models/user");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const router = new Router();


// GET tous les utilisateurs
router.post('/', async (req, res) => {
  try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

// Get collection users
router.get(
  "/users",
  checkAuth(),
  async (req, res) => {
     const users = await User.findAll({
      where: req.query,
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  }
);


// Nouvel utilisateur
router.post(
  "/users",
  checkAuth({ anonymous: true }),
  checkRole('ADMIN', {
    anonymous: true,
    securedFields: ["role"],
  }),
  async (req, res, next) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      console.log("Here");
      next(error);
    }
  }
);

// Obtenir un utilisateur spécifique
router.get("/users/:id", checkAuth(), async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send('ID invalide');
    }

    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      res.status(404).send('Utilisateur non trouvé');
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération de l’utilisateur');
  }
});


// Update a specific user
router.put(
  "/users/:id",
  checkAuth(),
  checkRole('ADMIN', {
    securedFields: ["role"],
  }),
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const [nbUpdated] = await User.update(req.body, {
        where: {
          id,
        },
        individualHooks: true,
      });
      if (!nbUpdated) {
        res.sendStatus(404);
      } else {
        res.json(
          await User.findByPk(id, { attributes: { exclude: ["password"] } })
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

// DELETE a specific user
router.delete("/users/:id",
 checkAuth(),
 checkRole('ADMIN', {
  securedFields: ["role"],
 }),
 async (req, res) => {
  const id = parseInt(req.params.id);
  const nbDeleted = await User.destroy({
    where: {
      id,
    },
  });
  res.sendStatus(!nbDeleted ? 404 : 204);
});

module.exports = router;
>>>>>>> refs/remotes/origin/main
