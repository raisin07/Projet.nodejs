const { Sequelize } = require("sequelize");

const username = 'root';
const password = 'toor';
const host = 'localhost';
const database = 'buy';
const port = 3306;

const DEFAULT_DATABASE_URL = `mysql://${username}:${password}@${host}:${port}/${database}`;

const connection = new Sequelize(
  process.env.DATABASE_URL || DEFAULT_DATABASE_URL
);

connection.authenticate().then(() => console.log("Database connected"));

module.exports = connection;