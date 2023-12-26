const { Model, DataTypes } = require("sequelize");
const connection = require("./config");
const bcrypt = require("bcryptjs");
const Order = require("./order.js");
const Avis = require("./avis.js");

class User extends Model {}

User.init(
  {
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [25],
      },
    },

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize: connection,
  }
);

User.hasMany(Order, { foreignKey: 'userId' });
User.hasMany(Avis, { foreignKey: 'userId' });


function hashPassword(user) {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
}

User.addHook("beforeCreate", hashPassword);
User.addHook("beforeUpdate", (user, { fields }) => {
  if (fields.includes("password")) {
    hashPassword(user);
  }
});

module.exports = User;