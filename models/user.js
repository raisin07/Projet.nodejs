const { Model, DataTypes } = require("sequelize");
const connection = require("./config");
const bcrypt = require("bcryptjs");


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
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      allowNull: false
    }
  },
  {
    sequelize: connection,
    modelName: 'User'
  }
);


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